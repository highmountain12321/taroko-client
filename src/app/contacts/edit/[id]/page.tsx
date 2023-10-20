

import ContactForm from "@/components/ContactForm"
import { ContactType } from "@/db/types"
import { getContactById } from "@/lib/api"

export default async function Page({params}: {params: {id: string}}){
    const id = params.id
    console.log("id is : ", id)
    const contact = await getContactById(Number(id))
    return (
        <div>
            <h1>Contact List App</h1>
            <ContactForm contact={contact.data.data} isEditing={true} />
        </div>
    )
}