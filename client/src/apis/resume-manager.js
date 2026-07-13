import api from '../utils/interceptor';

export function uploadResume({ name, pdf }) {
	const formData = new FormData();
	formData.append('name', name);
	formData.append('pdf', pdf);

	return api.post('/resume/upload/', formData);
}

export function getAllResumes() {
	return api.get('/resume/get/');
}

export function getResumeById(resumeId) {
	return api.get(`/resume/get/${resumeId}/`);
}

export function setResumeActive(resume_id) {
	return api.post('/resume/set-active/', { resume_id });
}

export function getActiveResume(){
    return api.get('/resume/get-active/');
}

export function getResumeStatus(resumeId) {
	return api.get(`/resume/status/${resumeId}/`);
}

export function deleteResume(userId, resumeId) {
	return api.delete(`/resume/delete/${resumeId}`);
}
