"use client"

import React, { useEffect, useState } from 'react';
import { getContacts, deleteContact } from '../lib/api';
import ContactItem from './ContactItem';
import { ContactType } from '@/db/types';
import Image from 'next/image';

const ContactList: React.FC = () => {
    const [contacts, setContacts] = useState<ContactType[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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

    const handleSort = () => {
        const sortedContacts = [...contacts].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.first_name.localeCompare(b.first_name);
            } else {
                return b.first_name.localeCompare(a.first_name);
            }
        });
        setContacts(sortedContacts);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <div className="flex items-center justify-center mb-4 relative">
                <div className="text-3xl font-semibold">Contacts</div>
                <button className="px-4 py-2 rounded absolute right-0 top-0" onClick={handleSort}>
                    <div className='flex'>
                        <div className={sortOrder === 'asc' ? 'flex flex-col': 'flex flex-col-reverse'}>
                            <span>A</span>
                            <span>Z</span>
                        </div>    
                        <img src='/arrow-down.svg' alt='down-arrow' />
                    </div>
                </button>
                
            </div>

            {contacts.length === 0 ? (
                <div>No content</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
                    {contacts.map((contact) => (
                        <ContactItem key={contact.id} contact={contact} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ContactList;
