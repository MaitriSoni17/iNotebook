import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    // Get all Notes
    const getNotes = async () => {
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg1OTFhOTBlMDE5YzAxM2FmNzQyZDU2In0sImlhdCI6MTc1MDY3MTcwMH0.Il-syvG1YNgLmtFTGTPXK0zWMbZz_3u_LO3JL-r8Dmg",
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json()
        console.log(json)
        setNotes(json)
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg1OTFhOTBlMDE5YzAxM2FmNzQyZDU2In0sImlhdCI6MTc1MDY3MTcwMH0.Il-syvG1YNgLmtFTGTPXK0zWMbZz_3u_LO3JL-r8Dmg",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json()
        console.log(json)
        console.log("Adding a new note.")
        const note = {
            "_id": "685ab36494c9d7e45656cd67",
            "user": "68591a90e019c013af742d56",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2025-06-24T14:17:08.607Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }

    // Delete a Note
    const deleteNote = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg1OTFhOTBlMDE5YzAxM2FmNzQyZDU2In0sImlhdCI6MTc1MDY3MTcwMH0.Il-syvG1YNgLmtFTGTPXK0zWMbZz_3u_LO3JL-r8Dmg",
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json()
        console.log(json)
        console.log("Deleting note : " + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg1OTFhOTBlMDE5YzAxM2FmNzQyZDU2In0sImlhdCI6MTc1MDY3MTcwMH0.Il-syvG1YNgLmtFTGTPXK0zWMbZz_3u_LO3JL-r8Dmg",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json()
        console.log(json)
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;