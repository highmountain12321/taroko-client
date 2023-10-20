

import ContactList from "@/components/ContactList"
import { getContacts } from "@/lib/api"

export default async function Page(){
    return (
        <div>
            <h1>Contact List App</h1>
            <ContactList />
        </div>
    )
}