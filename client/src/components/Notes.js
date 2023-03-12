import React, { useContext, useEffect, useState, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import UpdateModel from "./UpdateModel";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
  const Navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNote, addNote } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNote();
    } else {
      Navigate("/login");
    }

    //eslint-disable-next-line
  }, []);
  const [addnote, setAddnote] = useState({
    title: "",
    descripation: "",
  });
  const [note, setNote] = useState({
    id: "",
    title: "",
    descripation: "",
  });
  const handelchange = (e) => {
    setAddnote({ ...addnote, [e.target.name]: e.target.value });
  };

  const handelClick = (e) => {
    e.preventDefault();
    addNote(addnote.title, addnote.descripation);
    setAddnote({
      title: "",
      descripation: "",
    });
    props.showAlert("Added successfully", "success");
  };
  const update = (currNote) => {
    console.log(note);
    ref.current.click();
    setNote({
      id: currNote._id,
      title: currNote.title,
      descripation: currNote.descripation,
    });
  };

  const ref = useRef(null);

  return (
    <div>
      <div>
        <h1>Add Note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={handelchange}
              minLength={3}
              required
              placeholder="Enter the Title"
              value={addnote.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="descripation" className="form-label">
              Descripation
            </label>
            <input
              type="text"
              className="form-control"
              id="descripation"
              name="descripation"
              onChange={handelchange}
              minLength={6}
              required
              placeholder="Enter the Descripation"
              value={addnote.descripation}
            />
          </div>
          <button
            disabled={
              addnote.title.length < 3 || addnote.descripation.length < 6
            }
            type="submit"
            onClick={handelClick}
            className="btn btn-primary"
          >
            Add note
          </button>
        </form>
      </div>
      <UpdateModel showAlert={props.showAlert} refe={ref} note={note} />
      {/* *************************************** */}
      <div className="container">
        <h1>Your Note</h1>
        <h3 className="mx-3">{notes.length === 0 && "No Notes to Display"}</h3>
        {notes.map((n) => {
          return (
            <Noteitem
              showAlert={props.showAlert}
              key={n._id}
              note={n}
              update={update}
            />
          );
        })}
      </div>
    </div>
  );
}
