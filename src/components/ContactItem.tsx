"use client"
import { ContactType } from '@/db/types';
import { updateContact } from '@/lib/api';
import React, { useState } from 'react';

interface ContactProps {
    contact: {
        id: number,
        first_name: string,
        last_name: string,
        job: string,
        description: string
    },
    isEditing: boolean,
    onEdit: (id: number, editedContact: ContactType) => void,
    startEditing: (id: number) => void,
    stopEditing: () => void,
    onDelete: (id: number) => void
}

const ContactItem: React.FC<ContactProps> = ({ contact, isEditing, onEdit, startEditing, stopEditing, onDelete }) => {
    // const [isEditing, setIsEditing] = useState(false);
    const [editedContact, setEditedContact] = useState(contact);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedContact(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Call the API to update the contact, assuming you've a function called 'updateContact'
        await onEdit(editedContact.id, editedContact);

        // await updateContact(editedContact.id, editedContact);
        // setIsEditing(false);
    };

    return (
        // <div>
        //     {isEditing ? (
        // <form onSubmit={handleEditSubmit}>
        //     <input
        //         name="first_name"
        //         value={editedContact.first_name}
        //         onChange={handleInputChange}
        //         required
        //     />
        //     <input
        //         name="last_name"
        //         value={editedContact.last_name}
        //         onChange={handleInputChange}
        //         required
        //     />
        //     <input
        //         name="job"
        //         value={editedContact.job}
        //         onChange={handleInputChange}
        //         required
        //     />
        //     <input
        //         name="description"
        //         value={editedContact.description}
        //         onChange={handleInputChange}
        //         required
        //     />
        //     <button type="submit">Save</button>
        //     <button onClick={() => stopEditing()}>Cancel</button>
        // </form>
        //     ) : (
        //         <>
        //             <h3>{contact.first_name} {contact.last_name}</h3>
        //             <p>{contact.job}</p>
        //             <p>{contact.description}</p>
        //             <button onClick={() => startEditing(contact.id)}>Edit</button>
        //             <button onClick={() => onDelete(contact.id)}>Delete</button>
        //         </>
        //     )}
        // </div>
        <div className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">{contact.first_name} {contact.last_name}</h2>
            <p className="text-gray-600 mb-4">{contact.job}</p>
            <p className="mb-4">{contact.description}</p>
            {isEditing ? (
                <div className="mb-2">
                    <form onSubmit={handleEditSubmit} className="bg-white p-6 rounded shadow mb-4">
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
                            <button type="button" onClick={() => stopEditing()} className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="flex">
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2" onClick={() => startEditing(contact.id)}>Edit</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => onDelete(contact.id)}>Delete</button>
                </div>
            )}
        </div>
    );

}

export default ContactItem;
