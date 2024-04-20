import * as fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";


const contactsPath = path.resolve("db", "contacts.json");

async function readContactFile() {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });

    return JSON.parse(data);
}

async function writeContactFile(contacts) {
    return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}
    
async function listContacts() {
    const contacts = await readContactFile();

    return contacts;
}

async function getContactById(contactId) {
    const contacts = await readContactFile();

    const contact = contacts.find((contact) => contact.id === contactId);

    if (typeof contact === undefined) return null;

    return contact;
}

async function removeContact(contactId) {
    const contacts = await readContactFile();

    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) return null;

    const removeContact = contacts[index];

    contacts.splice(index, 1);

    await writeContactFile(contacts);

    return removeContact;
}

async function addContact(name, email, phone) {
    const contacts = await readContactFile();

    const newContact = { name, email, phone, id: crypto.randomUUID() };

    const existContact = contacts.find(contact => contact.name === name && contact.email === email && contact.phone === phone);
    
    if (existContact) {
        return "\x1B[31m Contact already exist at list!";
    } else {
        contacts.push(newContact);
        await writeContactFile(contacts);
        return newContact;
    }
}


export default { listContacts, getContactById, removeContact, addContact };
