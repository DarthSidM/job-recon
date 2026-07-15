import api from '../utils/interceptor';

export function buildResume({
    active_resume_id,
    message,
    jd,
    session_id = null,
}) {
    return api.post('/builder/build-resume/', {
        message,
        jd,
        session_id,
    });
}