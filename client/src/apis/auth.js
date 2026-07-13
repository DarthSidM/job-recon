const AUTH_BASE_URL = `${import.meta.env.VITE_API_URL ?? ''}/auth`;

async function request(path, payload) {
	const response = await fetch(`${AUTH_BASE_URL}${path}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});

	let data = {};

	try {
		data = await response.json();
	} catch {
		data = {};
	}

	if (!response.ok) {
		throw new Error(data.message || 'Auth request failed');
	}

	return data;
}

export function login(payload) {
	return request('/login', payload);
}

export function signup(payload) {
	return request('/signup', payload);
}
