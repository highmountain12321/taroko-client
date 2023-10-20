"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

interface ContactProps {
    contact: {
        id: number,
        first_name: string,
        last_name: string,
        job: string,
        description: string
    },
    onDelete: (id: number) => void
}

const ContactItem: React.FC<ContactProps> = ({ contact, onDelete }) => {
    const router = useRouter()
    return (
        <div className="border p-4 rounded shadow">
            <img
                className='w-16 h-16 rounded-full object-cover mb-4'
                src={"/download.jpg"}
                alt={`${contact.first_name}`}
            />
            <h2 className="text-lg font-semibold mb-2">{contact.first_name} {contact.last_name}</h2>
            <p className="text-gray-600 mb-4">Job: {contact.job}</p>
            <p className="mb-4">Description: {contact.description}</p>

            <div className="flex">
                {/* <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2" onClick={() => startEditing(contact.id)}>Edit</button> */}
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2" onClick={() => { router.push(`/contacts/edit/${contact.id}`) }}>Edit</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => onDelete(contact.id)}>Delete</button>
            </div>

        </div>
    );

}

export default ContactItem;
