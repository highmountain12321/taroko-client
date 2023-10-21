const fs = require('fs');
const path = require('path')
import { ContactType } from "./types";

const filePath = path.join(process.cwd(), 'src/db', 'contacts.json')

// const contacts = JSON.parse(rawdata);

export const getContacts = async ()=> {
    try {
        const rawdata = await fs.readFileSync(filePath);
        return JSON.parse(rawdata) as ContactType[];
    } catch (e) {
        return [] as ContactType[]
    }
};
let contacts;
getContacts().then(results=> contacts = results)

// export const writeContacts = async (contacts:ContactType[]) => await fs.writeFileSync(filePath, JSON.stringify(contacts));
export const writeContacts = async (contact_lists:ContactType[]) => contacts = contact_lists;

module.exports = {
  getContacts,
  writeContacts,
};