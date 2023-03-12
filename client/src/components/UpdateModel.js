import React, { useState, useContext, useRef } from "react";
import noteContext from "../context/notes/noteContext";

export default function UpdateModel(props) {
  const { refe, note } = props;
  const { editNote } = useContext(noteContext);
  const refClose = useRef(null);
  const [updateNote, setUpdateNote] = useState({
    updatetitle: note.title,
    updatedescripation: note.descripation,
  });
  const handelchange = (e) => {
    setUpdateNote({ ...updateNote, [e.target.name]: e.target.value });
  };
  const handelClick = () => {
    editNote(note.id, updateNote.updatetitle, updateNote.updatedescripation);
    refClose.current.click();
    props.showAlert("Updated successfully", "success");
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={refe}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Box
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="updatetitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="updatetitle"
                    name="updatetitle"
                    onChange={handelchange}
                    placeholder="Edit Your Title"
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="updatedescripation" className="form-label">
                    Descripation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="updatedescripation"
                    name="updatedescripation"
                    onChange={handelchange}
                    placeholder="Edit your Descripation"
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                disabled={
                  updateNote.updatetitle.length < 3 ||
                  updateNote.updatedescripation.length < 6
                }
                type="button"
                onClick={handelClick}
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
