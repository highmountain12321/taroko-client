import Link from "next/link"

import ContactList from "@/components/ContactList"
import { getContacts } from "@/lib/api"

export default async function Page(){
    return (
        <div className="w-full h-screen">
            <div className="flex justify-between align-center p-4 border-b border-b-2 border-blue-500 bg-white items-center">
                <Link href={'/'} className="text-2xl font-bold">Contact List</Link>
                <Link href={"/contacts/add"} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2">Add contacts</Link>
            </div>
            <ContactList />
            <div id="modal-root"></div>
        </div>
    )
}