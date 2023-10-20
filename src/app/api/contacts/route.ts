import { NextResponse, NextRequest } from "next/server";
import { getContacts, writeContacts } from '../../../db/helper'
import { ContactType } from "@/db/types";
import { NextApiRequest, NextApiResponse } from "next";
// import { getContacts } from "@/app/db/helper";

export async function GET(
    req: NextRequest
) {

    try{
        const response = await getContacts();
        return NextResponse.json({success:true, data: response})
    } catch (err) {
        return NextResponse.json({success:false, data: {error: err}}, {status: 500})
    }
}

export async function POST(req: NextRequest) {
    try {
        // const contact = req.body as Partial<ContactType>;

        const body = await req.json()
        const { contact } = body

        if (!contact.first_name || !contact.last_name || !contact.job || !contact.description) {
            return NextResponse.json({ success: false, data: { error: 'Required fields are missing' } }, { status: 500 });
        }

        const contacts = await getContacts();

        const newContact = {
            id: contacts.length + 1,
            first_name: contact.first_name,
            last_name: contact.last_name,
            job: contact.job,
            description: contact.description
        } as ContactType;

        contacts.push(newContact);

        await writeContacts(contacts);
        return NextResponse.json({success:true, data: newContact}, {status: 201})
    } catch (err) {
        return NextResponse.json({success:false, data: {error: err}}, {status: 500})
    }
}