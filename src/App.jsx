import React from "react"
import Sidebar from "../components/Sidebar"
import Editor from "../components/Editor"
import Split from "react-split"
import {nanoid} from "nanoid"
import { notesCollection, db } from '../firebase'
import { addDoc, onSnapshot, doc, deleteDoc, setDoc } from "firebase/firestore"


export default function App() {
    const [notes, setNotes] = React.useState([])
    const [currentNoteId, setCurrentNoteId] = React.useState("")
    const [tempNoteText, setTempNoteText] = React.useState("");

    const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt)
    const currentNote = notes.find(note => note.id === currentNoteId) || notes[0]

    console.log("Main Component called")

    console.log(notes,currentNoteId,currentNote,sortedNotes)
    React.useEffect(() => {

        const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
            console.log("getting changes from firebase")
            const notesArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id:doc.id
            }))
            setNotes(notesArr)
        })
        return unsubscribe
    },[])
    
    React.useEffect(() => {
        if (!currentNoteId) {
            console.log("setting current note id to notes0.id ")
            setCurrentNoteId(notes[0]?.id)
        }
    }, [notes])

    React.useEffect(() => {
        if (currentNote) {
            console.log("setting tempNote text from current body")
            setTempNoteText(currentNote.body)
        }  
    }, [currentNote])

    // React.useEffect(() => {
    //     if (currentNote) {
    //         console.log("setting tempNote text from current body")
    //         setTempNoteText(currentNote?.body)
    //     }  
    // }, [])
    
    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (currentNote && tempNoteText !== currentNote.body) {
                updateNote(tempNoteText)
            }
        }, 500)
        return () => clearTimeout(timeoutId)
    }, [tempNoteText])

    async function createNewNote() {
        console.log("creating a new note")
        const newNote = {
            body: "Untitled Note",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        const newNoteRef = await addDoc(notesCollection, newNote)
        setCurrentNoteId(newNoteRef.id)
    }
    
    async function updateNote(text) {

        // const temp = [...notes]
        // const current = temp.find(tempnote => currentNoteId === tempnote.id)
        // temp.splice(temp.indexOf(current),1)
        // temp.unshift({
        //     id: currentNoteId,
        //     body:text
        // })
        // setNotes(oldnotes => temp)
        console.log("updating a note to firfebase")
        const docRef = doc(db, "notes", currentNoteId)
        await setDoc(docRef, { body: text, updatedAt:Date.now() },{merge:true})
    }
    
    function deleteNote(event, noteId) {
        event.stopPropagation()
        // let temp = [...notes]
        // temp = temp.filter(tem => tem.id != noteId)
        
        // if(noteId === currentNoteId) setCurrentNoteId( (temp[0]?.id) || '')
        // setNotes(temp)
        console.log("deleting a note from firfebase")
        const docRef = doc(db,'notes',noteId)
        deleteDoc(docRef)
    } 

    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={sortedNotes}
                    currentNote={currentNote}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    delete={deleteNote}    
                />
                <Editor     
                        tempText={tempNoteText} 
                        setTempText={setTempNoteText} 
                />
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
