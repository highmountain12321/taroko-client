"use client"

import React, { useEffect, useState } from 'react';
import { getContacts, deleteContact, addContact } from '../lib/api';
import ContactItem from './ContactItem';
import { ContactType } from '@/db/types';

const ContactList: React.FC = () => {
    const [contacts, setContacts] = useState<any[]>([]);
    const [newContact, setNewContact] = useState<ContactType>({
        id:-1,
        first_name: '',
        last_name: '',
        job: '',
        description: ''
    });
    
    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = async () => {
        const response = await getContacts();
        setContacts(response.data.data);
    };

    const handleDelete = async (id: number) => {
        await deleteContact(id);
        loadContacts();
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewContact(prevState => ({ ...prevState, [name]: value }));
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Call the API to add the contact, assuming you've a function called 'addContact'
        await addContact(newContact);
        loadContacts(); // Refresh the list
        // Reset the form values
        setNewContact({
            id: -1,
            first_name: '',
            last_name: '',
            job: '',
            description: ''
        });
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="first_name"
                    value={newContact.first_name}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    required
                />
                <input
                    name="last_name"
                    value={newContact.last_name}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    required
                />
                <input
                    name="job"
                    value={newContact.job}
                    onChange={handleInputChange}
                    placeholder="Job"
                    required
                />
                <input
                    name="description"
                    value={newContact.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    required
                />
                <button type="submit">Add Contact</button>
            </form>

            {/* Existing Contact List */}
            {contacts.length === 0 ? (
                <div>No content</div>
            ) : (
                contacts.map((contact) => (
                    <ContactItem key={contact.id} contact={contact} onDelete={handleDelete} />
                ))
            )}
        </div>

    );
}

export default ContactList;
