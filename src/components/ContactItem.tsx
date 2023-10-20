"use client"
import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
import ConfirmModal from './ConfirmModal';
import Image from 'next/image';

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
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const handleDeleteClick = () => {
        setModalOpen(true);
    }
    const handleCancelDelete = () => {
        setModalOpen(false);
    }
    const handleConfirmDelete = () => {
        onDelete(contact.id)
        setModalOpen(false)
    }
    return (
        <div className="border p-4 rounded shadow">
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <Image
                        className='w-16 h-16 rounded-full object-cover mb-4'
                        src={"/download.jpg"}
                        alt={`${contact.first_name}`}
                    />
                    <h2 className="text-lg font-semibold mb-2">{contact.first_name} {contact.last_name}</h2>

                </div>
                <div className="flex flex-col gap-2 mt-4">
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => { router.push(`/contacts/edit/${contact.id}`) }}>Edit</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700" onClick={handleDeleteClick}>Delete</button>
                </div>
                <ConfirmModal isOpen = {isModalOpen} onCancel={handleCancelDelete} onConfirm={handleConfirmDelete} />
            </div>

            <div className='md:ml-20'>
                <p className="text-gray-600 mb-2">Job: {contact.job}</p>
                <p className="mb-2">Description: {contact.description}</p>
            </div>



        </div>
    );

}

export default ContactItem;
