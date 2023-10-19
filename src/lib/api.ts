import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const getContacts = async () => {
    return axios.get(`${BASE_URL}/contacts`);
};

export const addContact = async (contact: any) => {
    return axios.post(`${BASE_URL}/contacts`, contact);
};

export const updateContact = async (id: number, contact: any) => {
    return axios.put(`${BASE_URL}/contacts/${id}`, contact);
};

export const deleteContact = async (id: number) => {
    return axios.delete(`${BASE_URL}/contacts/${id}`);
};
