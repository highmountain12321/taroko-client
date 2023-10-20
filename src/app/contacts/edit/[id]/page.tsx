

import ContactForm from "@/components/ContactForm"
import { ContactType } from "@/db/types"
import { getContactById } from "@/lib/api"

export default async function Page({params}: {params: {id: string}}){
    const id = params.id
    console.log("id is : ", id)
    const contact = await getContactById(Number(id))
    return (
        <div className="w-full h-screen bg-white">
            <div className="flex justify-center items-center p-4">
                <h1 className="text-3xl font-bold">Edit Contacts</h1>
            </div>
            <ContactForm contact={contact.data.data} isEditing={true} />
        </div>
    )
}