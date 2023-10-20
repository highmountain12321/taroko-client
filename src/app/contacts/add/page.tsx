

import ContactForm from "@/components/ContactForm"
import { ContactType } from "@/db/types"

export default async function Page(){
    return (
        <div className="w-full h-full">
            <h1>Contact List App</h1>
            <ContactForm contact={{} as ContactType} isEditing={false} />
        </div>
    )
}