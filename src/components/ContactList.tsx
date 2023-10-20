"use client"

import React, { useEffect, useState } from 'react';
import { getContacts, deleteContact, addContact, updateContact } from '../lib/api';
import ContactItem from './ContactItem';
import { ContactType } from '@/db/types';

const ContactList: React.FC = () => {
    const [contacts, setContacts] = useState<any[]>([]);
    const [newContact, setNewContact] = useState<ContactType>({
        id: -1,
        first_name: '',
        last_name: '',
        job: '',
        description: ''
    });
    const [editingId, setEditingId] = useState<number | null>(null);
    const startEditing = (id: number) => {
        setEditingId(id);
    };

    const stopEditing = () => {
        setEditingId(null);
    };

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
    const handleEdit = async (id: number, editedContact: ContactType) => {
        await updateContact(editedContact.id, editedContact);
        loadContacts();
        stopEditing();
    }
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
                <input
                    name="first_name"
                    value={newContact.first_name}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    required
                    className="w-full p-2 mb-2 border rounded"
                />
                <input
                    name="last_name"
                    value={newContact.last_name}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    required
                    className="w-full p-2 mb-2 border rounded"
                />
                <input
                    name="job"
                    value={newContact.job}
                    onChange={handleInputChange}
                    placeholder="Job"
                    required
                    className="w-full p-2 mb-2 border rounded"
                />
                <input
                    name="description"
                    value={newContact.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    required
                    className="w-full p-2 mb-2 border rounded"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Add Contact</button>
            </form>

            {/* Existing Contact List */}
            <div className="bg-white p-4 rounded shadow">
                {contacts.length === 0 ? (
                    <div>No content</div>
                ) : (
                    <div className="grid gap-4">
                        {contacts.map((contact) => (
                            <ContactItem key={contact.id} contact={contact} isEditing={contact.id == editingId} onEdit={handleEdit} startEditing={startEditing} stopEditing={stopEditing} onDelete={handleDelete} />
                        ))}
                    </div>
                )}
            </div>
        </div>




    );
}

export default ContactList;
