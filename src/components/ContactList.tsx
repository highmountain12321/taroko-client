"use client"

import React, { useEffect, useState } from 'react';
import { getContacts, deleteContact } from '../lib/api';
import ContactItem from './ContactItem';
import { ContactType } from '@/db/types';

const ContactList: React.FC = () => {
    const [contacts, setContacts] = useState<ContactType[]>([]);

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

    return (
        <div className="bg-white p-4 rounded shadow">
            <div className="text-center w-full text-3xl font-[600] pt-8 pb-8">Contacts</div>
            
                {/* Existing Contact List */}
                {contacts.length === 0 ? (
                    <div>No content</div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                        {contacts.map((contact) => (
                            <ContactItem key={contact.id} contact={contact} onDelete={handleDelete} />
                        ))}
                    </div>
                )}
            
        </div>

    );
}

export default ContactList;
