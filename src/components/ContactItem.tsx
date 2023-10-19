import React from 'react';

interface ContactProps {
    contact: {
        id: number,
        firstName: string,
        lastName: string,
        job: string,
        description: string
    },
    onDelete: (id: number) => void
}

const ContactItem: React.FC<ContactProps> = ({ contact, onDelete }) => {
    return (
        <div>
            <h3>{contact.firstName} {contact.lastName}</h3>
            <p>{contact.job}</p>
            <p>{contact.description}</p>
            <button onClick={() => onDelete(contact.id)}>Delete</button>
        </div>
    );
}

export default ContactItem;
