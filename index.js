import { program } from "commander";
import Contacts from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await Contacts.listContacts();
      console.table(list);
      break;

    case "get":
      const get = await Contacts.getContactById(id);
      console.table(get);
      break;

    case "add":
      const add = await Contacts.addContact(name, email, phone);
      console.table(add);
      break;

    case "remove":
      const remove = await Contacts.removeContact(id);
      console.table(remove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);