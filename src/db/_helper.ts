const fs = require('fs');
const path = require('path')
import { ContactType } from "./types";

const filePath = path.join(process.cwd(), 'src/db', 'db_seed.json')

// const contacts = JSON.parse(rawdata);

export const getContacts_from_file = async ()=> {
    try {
        const rawdata = await fs.readFileSync(filePath);
        return JSON.parse(rawdata) as ContactType[];
    } catch (e) {
        return [] as ContactType[]
    }
};
let contacts:ContactType[] = [];
getContacts_from_file().then(results=> contacts = results)

export const getContacts = async ()=> {
    return contacts;
}

// export const writeContacts = async (contacts:ContactType[]) => await fs.writeFileSync(filePath, JSON.stringify(contacts));
export const writeContacts = async (contact_lists:ContactType[]) => contacts = contact_lists;

module.exports = {
  getContacts,
  writeContacts,
};