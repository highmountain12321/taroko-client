import { NextResponse } from "next/server";
import { writeContacts } from '../../../db/helper';
const contacts = require('../../../db/db_seed.json')

export async function POST() {
    try {
        writeContacts(contacts);
        return NextResponse.json({success:true, data: 'Successfully reset the db'}, {status: 200})
    } catch (err) {
        return NextResponse.json({success:false, data: {error: err}}, {status: 500})
    }
}