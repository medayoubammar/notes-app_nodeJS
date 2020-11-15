//const fs = require('fs')

//fs.writeFileSync('notes.txt','This file was created by Node.js !')

//fs.appendFileSync('notes.txt',' <br> this ligne was appended by Node js ')

// const getNotes = require("./notes");
// const chalk = require("chalk");

// const command = process.argv[2]

// if(command === 'add') {
//     console.log('adding note ..')
// }
// else if (command === 'remove') {
//     console.log('Removing note !')
// }

const notes = require("./notes");
const chalk = require("chalk");

const yargs = require("yargs");
const { demandOption } = require("yargs");

yargs.version("1.1.0");

//Create add commande :

yargs.command({
  command: "add",
  describe: "Add a new note to the project :",
  builder: {
    title: {
      describe: "Title of note",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Body of note",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => notes.addNote(argv.title, argv.body),
});
//Create remove commande :

yargs.command({
  command: "remove",
  builder: {
    title: {
      describe: "title of note to remove",
      demandOption: true,
      type: "string",
    },
  },
  describe: "remove a note from the project :",

  handler: (argv) =>
    // console.log("remove a NOTE !");
    notes.removeNote(argv.title),
});

//Create List commande :

yargs.command({
  command: "list",
  describe: "Listing all the notes :",
  handler: () => notes.listNotes(),
});

//Create read commande :

yargs.command({
  command: "read",
  describe: "read the note :",
  builder: {
    title: {
      describe: "title of note to read",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => notes.readNote(argv.title),
});

//console.log(process.argv)

//console.log(yargs.argv);
yargs.parse(); //we did that to print args one single time
