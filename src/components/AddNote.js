import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"
const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        props.refClose.current.click();
        props.showAlert("Note Added Successfully", "success");
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="container my-3">
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" value={note.title} id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" value={note.description} id="description" name="description" onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" value={note.tag} id="tag" name="tag" onChange={onChange} minLength={5} required/>
                    </div>
                    <hr className="my-4" />
                    <button disabled={note.title.length < 5 || note.description < 5} type="submit" className="btn btn-primary" onClick={handleClick}><i className="bi bi-cloud-plus-fill me-2"></i>Add Note</button>
                </form>
            </div>
        </>
    )
}

export default AddNote