import { ContactType } from '@/db/types';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const getContacts = async () => {
    console.log("dlkfdlf")
    return axios.get(`${BASE_URL}/api/contacts`);
};

export const addContact = async (contact: ContactType) => {
    return axios.post(`${BASE_URL}/api/contacts`, {contact});
};

export const updateContact = async (id: number, contact: any) => {
    return axios.patch(`${BASE_URL}/api/contacts/${id}`, {info: contact});
};

export const deleteContact = async (id: number) => {
    return axios.delete(`${BASE_URL}/api/contacts/${id}`);
};
