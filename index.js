const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      if (!contactById) {
        throw new Error(`Contact with id=${id} not found`);
      } else {
        console.log(contactById);
      }
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      if (!newContact) {
        throw new Error(`Something going wrong, please try again`);
      } else {
        console.log(`${newContact.name} succesfully added`);
      }
      break;

    case "remove":
      const removedContact = await removeContact(id);
      if (!removedContact) {
        throw new Error(`Contact with id=${id} not found`);
      } else {
        console.log(`${removedContact.name} succesfully removed`);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

(async () => {
  await invokeAction(argv);
})();
