import React from "react"

export default function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id} className="noteelem">
            <div
                
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{note.body.split('\n')[0]}</h4>
                <button 
                    className="delete-btn"
                    onClick={(event)=>props.delete(event,note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ))

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <img className="sidebar-logo"src="https://tse1.mm.bing.net/th?id=OIP.Kj4CHhh5IEbk4t9eKkRjZgAAAA&pid=Api&rs=1&c=1&qlt=95&w=108&h=108"/>
                <h3>My Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
