const path = require("path");
const fs = require("fs/promises");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  return contactById;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactsListAfterRemove = contacts.filter(
    (contact) => contact.id !== contactId
  );
  const removedContact = await getContactById(contactId);

  await fs.writeFile(
    contactsPath,
    JSON.stringify(contactsListAfterRemove)
  );
  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newId = parseInt(contacts[contacts.length - 1].id) + 1;
  const newContact = {
    id: `${newId}`,
    name,
    email,
    phone,
  };
  const newContactsList = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
  return newContact;
}

const contactsActions = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = contactsActions;
