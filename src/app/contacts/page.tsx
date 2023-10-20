import Link from "next/link"

import ContactList from "@/components/ContactList"
import { getContacts } from "@/lib/api"

export default async function Page(){
    return (
        <div>
            <h1>Contact List App</h1>
            <Link href={"/contacts/add"} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2">Add contacts</Link>
            <ContactList />
        </div>
    )
}