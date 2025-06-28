import React, { useContext, useRef } from 'react'
import noteContext from "../context/notes/noteContext"

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote, ref } = props;
    const refDisplay = useRef(null);
    const displayNote = () => {
        refDisplay.current.click();
        console.log("Note Displayed")
    }
    return (
        <>
            <button ref={refDisplay} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target={`#NoteDisplay-${note._id}`}>
                Launch demo modal
            </button>
            <div className="modal fade" id={`NoteDisplay-${note._id}`} tabindex="-1" aria-labelledby={`NoteDisplay-${note._id}`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`NoteDisplay-${note._id}`}>{note.title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body position-relative">
                            <p className="position-absolute top-0 end-0 bg-warning p-1 px-3 fw-medium rounded-pill rounded-end-0">{note.tag}</p>
                            {note.description}
                        </div>
                        <div className="modal-footer position-relative">
                            <p className="position-absolute top-0 start-0 mt-4 text-secondary ms-3">Created: {note.date.split("T")[0]}</p>
                            <button type="button" className="btn btn-secondary fs-6" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger fs-6" data-bs-dismiss="modal" onClick={() => { deleteNote(note._id); props.showAlert("Note Deleted Successfully", "success"); }}><i className="bi bi-trash3-fill me-2"></i>Delete</button>
                            <button type="button" className="btn btn-primary fs-6" onClick={() => { ref.current.click(); }}><i className="bi bi-pencil-square me-2"></i>Edit Note</button>
                        </div>
                    </div>
                </div>
            </div>



            <div className="col-md-3">
                <div className="card bg-primary bg-opacity-10 border-primary my-5 rounded-4 shadow">
                    <div className="card-body positive-relative">
                        <div className="d-inline" onClick={displayNote} style={{ cursor: "pointer" }}>
                            <h5 className="card-title position-relative">{note.title}</h5>
                            <hr />
                            <p className="card-text fw-bold">{note.description}</p>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-evenly">
                            <i className="bi bi-trash-fill me-3 text-danger fs-5" onClick={() => { deleteNote(note._id); props.showAlert("Note Deleted Successfully", "success"); }}></i>
                            <i className="bi bi-pencil-square me-4 pe-2 text-primary fs-5" onClick={() => { updateNote(note) }}></i>
                            <p className="text-secondary ms-5 ps-5">{note.date.split("T")[0]}</p>
                        </div>
                        <p className="position-absolute top-0 end-0 bg-warning p-1 px-3 fw-medium rounded-pill rounded-end-0 mt-2">{note.tag}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem