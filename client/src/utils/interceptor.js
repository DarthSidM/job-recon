const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

const getAuthHeaders = () => {
	const token = localStorage.getItem('token');
	return token ? { Authorization: `Bearer ${token}` } : {};
};

const buildUrl = (path, params) => {
	const url = new URL(`${API_BASE_URL}${path}`);
	if (params && typeof params === 'object') {
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== '') {
				url.searchParams.append(key, String(value));
			}
		});
	}
	return url.toString();
};

const parseResponse = async (response) => {
	const data = await response.json().catch(() => ({}));
	if (!response.ok) {
		const error = new Error(data?.message || data?.msg || 'Request failed');
		error.response = { status: response.status, data };
		throw error;
	}
	return { data, status: response.status };
};

const request = async (method, path, body, config = {}) => {
	const headers = {
		...getAuthHeaders(),
		...(config.headers || {}),
	};

	const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
	if (!isFormData && body !== undefined && method !== 'GET') {
		headers['Content-Type'] = headers['Content-Type'] || 'application/json';
	}

	const response = await fetch(buildUrl(path, config.params), {
		method,
		headers,
		body:
			method === 'GET' || body === undefined
				? undefined
				: isFormData
					? body
					: JSON.stringify(body),
	});

	return parseResponse(response);
};

const api = {
	get: (path, config = {}) => request('GET', path, undefined, config),
	post: (path, body, config = {}) => request('POST', path, body, config),
	patch: (path, body, config = {}) => request('PATCH', path, body, config),
	delete: (path, config = {}) => request('DELETE', path, config.data, config),
};

export default api;