import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
    const context = useContext(noteContext);
    let history = useNavigate();
    const { notes, getNotes, editNote, deleteNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
            // eslint-disable-next-line
        }
        else {
            history("/login")
        }
    },)
    const ref = useRef(null)
    const refClose = useRef(null)
    const refCloseAdd = useRef(null)
    const refAddNote = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Note Updated Successfully", "success");
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <>
            <button ref={ref} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" ref={refClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={onChange} minLength={5} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary fs-6" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger fs-6" data-bs-dismiss="modal" onClick={() => { deleteNote(note.id); props.showAlert("Note Deleted Successfully", "success"); }}><i className="bi bi-trash3-fill me-2"></i>Delete</button>
                            <button disabled={note.etitle.length < 5 || note.edescription < 5} type="button" onClick={handleClick} className="btn btn-primary fs-6"><i className="bi bi-pen-fill me-2"></i>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            <button ref={refAddNote} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#addnote">
                Launch demo modal
            </button>
            <div className="modal fade" id="addnote" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title" id="exampleModalLabel">Add a Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={refCloseAdd}></button>
                        </div>
                        <div className="modal-body">
                            <AddNote showAlert={props.showAlert} refClose={refCloseAdd} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1 className="col">Your Notes</h1>
                <button type="button" className="btn btn-primary w-auto fs-5" onClick={() => { refAddNote.current.click() }}><i className="bi bi-cloud-plus-fill mx-2"></i>Add Note</button>
                <div className="container-lg mt-5 text-secondary text-center fs-4">
                    {notes.length === 0 && "Your notes going to be display here!!"}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} ref={ref} />
                })}
            </div>
        </>
    )
}

export default Notes