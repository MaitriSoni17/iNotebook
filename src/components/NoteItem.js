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
                        <div className="modal-body">
                            {note.description}
                        </div>
                        <div class="modal-footer position-relative">
                            <p className="position-absolute top-0 start-0 mt-4 text-secondary">Created: {note.date.split("T")[0]}</p>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={() => { deleteNote(note._id); props.showAlert("Note Deleted Successfully", "success"); }}>Delete</button>
                            <button type="button" class="btn btn-primary" onClick={()=>{ref.current.click();}}>Edit Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card my-3">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title" onClick={displayNote} style={{ cursor: "pointer" }}>{note.title}</h5>
                            <i className="bi bi-trash-fill mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Note Deleted Successfully", "success"); }}></i>
                            <i className="bi bi-pencil-square mx-2" onClick={() => { updateNote(note) }}></i>
                        </div>
                        <p className="card-text">{note.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem