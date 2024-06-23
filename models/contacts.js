// const fs = require('fs/promises')

import fs from 'fs/promises';
import path from "path";
import { nanoid } from 'nanoid';


const contactsPath = path.join('models', 'contacts.json');

const listContacts = async () => {
  try {
        const contacts = await fs.readFile(contactsPath);
        return JSON.parse(contacts);
    } catch (error) {
        console.error("Error reading contacts:", error.message);
    }
}

const getContactById = async (contactId) => {
    try {
        const contacts =await listContacts();
        const result = contacts.find ((contact) => contact.id === contactId)
        return result || null;
    } catch (error) {
        console.error("Error reading contacts by id:", error.message)
    }
};


const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
        return null;
    }
    const deletedContact = contacts.splice(index,1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts,null,2))
    return deletedContact;
} catch (error) {
    console.error("Error removing contact:", error.message);
}
};


const addContact = async (body) => {
  try {
    const {name,email, phone} = body
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const allContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;
  } catch (error) {
    console.error("Error adding new contact:", error.message);
  }
};

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null
  }
  contacts[index] = {
    id,
    name,
    email,
    phone,
  };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contacts[index];
};

export { listContacts, getContactById, removeContact, addContact, updateContact };
// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
