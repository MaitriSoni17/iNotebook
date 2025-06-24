import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "685ab34a94c9d7e45656cd5e",
            "user": "68591a90e019c013af742d56",
            "title": "My Title",
            "description": "Description",
            "tag": "Personal",
            "date": "2025-06-24T14:16:42.917Z",
            "__v": 0
        },
        {
            "_id": "685ab35094c9d7e45656cd60",
            "user": "68591a90e019c013af742d56",
            "title": "My Title2",
            "description": "Description2",
            "tag": "Personal",
            "date": "2025-06-24T14:16:48.488Z",
            "__v": 0
        },
        {
            "_id": "685ab35594c9d7e45656cd62",
            "user": "68591a90e019c013af742d56",
            "title": "My Title3",
            "description": "Description3",
            "tag": "Personal",
            "date": "2025-06-24T14:16:53.997Z",
            "__v": 0
        },
        {
            "_id": "685ab35c94c9d7e45656cd64",
            "user": "68591a90e019c013af742d56",
            "title": "My Title4",
            "description": "Description4",
            "tag": "Personal",
            "date": "2025-06-24T14:17:00.355Z",
            "__v": 0
        },
        {
            "_id": "685ab36494c9d7e45656cd66",
            "user": "68591a90e019c013af742d56",
            "title": "My Title5",
            "description": "Description5",
            "tag": "Personal",
            "date": "2025-06-24T14:17:08.607Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;