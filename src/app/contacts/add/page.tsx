

import ContactForm from "@/components/ContactForm"
import { ContactType } from "@/db/types"

export default async function Page(){
    return (
        <div className="w-full h-screen bg-white">
            <div className="flex justify-center items-center p-4">
                <h1 className="text-3xl font-bold">Add Contacts</h1>
            </div>
            <ContactForm contact={{} as ContactType} isEditing={false} />
        </div>
    )
}