import { getContacts, writeContacts } from '../../../../db/helper';
import { NextRequest,NextResponse } from "next/server";

export async function GET(req: NextRequest,{params}:{params:{id:string}}) {
    console.log('id')
    console.log(params)
    const id = params.id

    try {
        const contacts = await getContacts();
        const contact = contacts.find(contact => contact.id === Number(id));
        
        if (!contact) {
            return NextResponse.json({ success: false, message: 'Contact not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, data: contact }, { status: 200});
    } catch (err) {
        return NextResponse.json({ success: false, data: { error: err } }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest,{params}:{params:{id:string}}) {
    const { id } = params;
    const body = await req.json();
    const info = body.info

    console.log(info, "PATCH Info")

    const contacts = await getContacts();
    const contact = contacts.find(contact => contact.id === Number(id));

    if (!contact) {
        return NextResponse.json({ success: false, message: 'Contact not found' }, { status: 404 })
    }

    const updatedContact = { ...contact, ...info };
    await writeContacts(contacts.map(contact => contact.id === updatedContact.id ? updatedContact : contact));
  
    return NextResponse.json({ success: true, data: updatedContact, message: 'Contact updated successfully' }, {status:200})
}

export async function DELETE(req: NextRequest,{params}:{params:{id:string}}) {
    const { id } = params;

    const contacts = await getContacts();
    const contact = contacts.find(contact => contact.id === Number(id));
  
    if (!contact) {
        return NextResponse.json({ success: false, message: 'Contact not found' }, { status: 404 })
    }
  
    const updatedContacts = contacts.filter(contact => contact.id !== Number(id));
    await writeContacts(updatedContacts);

    return NextResponse.json({ success: true, data: contact, message: 'Contact deleted successfully' }, {status:200})
}
