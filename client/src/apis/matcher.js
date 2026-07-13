import api from '../utils/interceptor';

export function getMatchedJobs(){
    return api.get('/matcher');
}