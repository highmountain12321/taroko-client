import { NextRequest, NextResponse } from "next/server";
import { getContacts, writeContacts } from '../../../db/helper';
const contacts = require('../../../db/db_seed.json')

export async function POST(req: NextRequest) {
    try {
        // const contact = req.body as Partial<ContactType>;

        writeContacts(contacts);
        return NextResponse.json({success:true, data: 'Successfully reset the db'}, {status: 200})
    } catch (err) {
        return NextResponse.json({success:false, data: {error: err}}, {status: 500})
    }
}