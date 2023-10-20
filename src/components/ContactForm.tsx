"use client"
import { ContactType } from '@/db/types';
import { addContact, updateContact } from '@/lib/api';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ContactProps {
    contact: {
        id: number,
        first_name: string,
        last_name: string,
        job: string,
        description: string
    },
    isEditing: boolean,
}

const ContactForm: React.FC<ContactProps> = ({ contact, isEditing }) => {
    // const [isEditing, setIsEditing] = useState(false);
    const [editedContact, setEditedContact] = useState(contact);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedContact(prevState => ({ ...prevState, [name]: value }));
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Call the API to update the contact, assuming you've a function called 'updateContact'
        if(isEditing){
            await updateContact(editedContact.id, editedContact)
        } else {
            await addContact(editedContact)
        }
        // await handleSubmit(editedContact.id, editedContact);
        router.push('/contacts')
    };

    return (
        <div className="mb-2">
            <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                    <input
                        name="first_name"
                        value={editedContact.first_name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                    <input
                        name="last_name"
                        value={editedContact.last_name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Job</label>
                    <input
                        name="job"
                        value={editedContact.job}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <input
                        name="description"
                        value={editedContact.description}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded resize-none"
                        // rows={4}
                    />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 mr-2">
                        Save
                    </button>
                    <button type="button" onClick={() => {router.push('/contacts')}} className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );

}

export default ContactForm;
