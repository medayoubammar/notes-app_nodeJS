const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => " Your notes ..";

// ADD note function


const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find((note) => note.title === title);
  
  debugger
  
  if (!duplicateNote) {
    //console.log(notes)
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log("New note added :D ");
  } else {
    console.log("Title taken !");
  }
};

// save note note function
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

// load notes note function
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

// REMOVE note function

const removeNote = (title) => {
  const oldNotes = loadNotes();
  const newNotes = oldNotes.filter((note) => note.title !== title);

  if (oldNotes.length === newNotes.length) {
    console.log(chalk.red.inverse('this note doesn"t exist !'));
  } else {
    console.log(chalk.green.inverse("note removed successfully !"));

    saveNotes(newNotes);
  }
};

//List Notes function

const listNotes = () => {
  console.log(chalk.blue.inverse("Your notes :"));
  const currentNotes = loadNotes();
  currentNotes.map((note) => {
    console.log(note.title);
  });
};

//READ note function

const readNote = (title) => {
  const currentNotes = loadNotes();
  const specificNote = currentNotes.find((note) => note.title === title);
  if (!specificNote) {
    console.log(chalk.red.inverse("Note not found !"));
  } else {
   console.log(chalk.blue.inverse(specificNote.title));
   console.log(specificNote.body)
  
  }
};

//EXPORT functions
module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
