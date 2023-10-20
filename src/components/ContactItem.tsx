"use client"
import { updateContact } from '@/lib/api';
import React, {useState} from 'react';

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
    const [isEditing, setIsEditing] = useState(false);
    const [editedContact, setEditedContact] = useState(contact);
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedContact(prevState => ({ ...prevState, [name]: value }));
    };
    
    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Call the API to update the contact, assuming you've a function called 'updateContact'
        await updateContact(editedContact.id, editedContact);
        setIsEditing(false);
    };
    
    return (
        <div>
            {isEditing ? (
                <form onSubmit={handleEditSubmit}>
                    <input
                        name="first_name"
                        value={editedContact.first_name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        name="last_name"
                        value={editedContact.last_name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        name="job"
                        value={editedContact.job}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        name="description"
                        value={editedContact.description}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit">Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            ) : (
                <>
                    <h3>{contact.first_name} {contact.last_name}</h3>
                    <p>{contact.job}</p>
                    <p>{contact.description}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => onDelete(contact.id)}>Delete</button>
                </>
            )}
        </div>
    );

}

export default ContactItem;
