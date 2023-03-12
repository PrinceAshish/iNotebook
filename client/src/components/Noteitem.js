import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function Noteitem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, update } = props;
  const handelDelete = () => {
    deleteNote(note._id);
    props.showAlert("Deleetd successfully", "success");
  };
  return (
    <>
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <hr />
          <p className="card-text">{note.descripation}</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              update(note);
            }}
          >
            <i className="far fa-edit"></i> Edit
          </button>
          <button className="mx-3 btn btn-danger" onClick={handelDelete}>
            <i className="far fa-trash-alt"></i> Delete
          </button>
        </div>
      </div>
    </>
  );
}
