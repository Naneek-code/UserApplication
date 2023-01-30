import api from './api';

export async function registerUser(data) {
    return await api.post('Users', data);
}

export async function listUsers() {
    return await api.get('Users');
}

export async function deleteUsers(id) {
    return await api.delete(`Users/${id}`);
}

export async function editUser(id, data) {
    return await api.put(`Users/${id}`, data);
}