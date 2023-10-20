"use client"

import React, { useEffect, useState } from 'react';
import { getContacts, deleteContact } from '../lib/api';
import ContactItem from './ContactItem';

const ContactList: React.FC = () => {
    const [contacts, setContacts] = useState<any[]>([]);

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = async () => {
        const response = await getContacts();
        console.log("sadala", response)
        setContacts(response.data.data);
    };

    const handleDelete = async (id: number) => {
        await deleteContact(id);
        loadContacts();
    };

    return (
        contacts?.length === 0 ? <div>No content</div> :
        <div>
            {contacts.map(contact => 
                <ContactItem key={contact.id} contact={contact} onDelete={handleDelete} />
            )}
        </div>
    );
}

export default ContactList;
