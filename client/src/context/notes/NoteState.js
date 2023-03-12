import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:8080";
  const notesIntial = [];
  const [notes, setNotes] = useState(notesIntial);

  const getNote = async () => {
    const url = `${host}/note/allnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "applicaiton/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  const addNote = async (title, descripation) => {
    const url = `${host}/note/addnote/${title}/${descripation}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "applicaiton/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };
  const deleteNote = async (id) => {
    const url = `${host}/note/delete/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "applicaiton/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    console.log(id);

    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  const editNote = async (noteId, title, descripation) => {
    const url = `${host}/note/updatenote/${noteId}/${title}/${descripation}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "applicaiton/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json, "iqnor it");
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === noteId) {
        element.title = title;
        element.descripation = descripation;
        break;
      }
    }
    console.log(newNotes);
    setNotes(newNotes);
  };
  return (
    <noteContext.Provider
      value={{ notes, editNote, deleteNote, addNote, getNote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
