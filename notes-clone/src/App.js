import './App.css';
import React from 'react';
import Split from 'react-split';
import {nanoid} from "nanoid";
// import date from 'date-and-time';
import Sidebar from './components/Sidebar'
import Editor from './components/Editor';

export default function App() {
  const [notes, setNotes] = React.useState(() =>
    JSON.parse(localStorage.getItem("notes")) || []
  )

  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  )

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  const createNewNote = () => {
    const newNote = {
      id: nanoid(),
      body: "",
      lastUpdated: Date.now()
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  const updateNote = (text) => {
    setNotes(prevNotes => {
      let arr = []
      prevNotes.forEach(note =>
        note.id === currentNoteId ?
        arr.unshift({...note, body: text, lastUpdated: Date.now()}) :
        arr.push(note)
      )
      return arr
    })
  }

  const findCurrentNote = () => {
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
  }

  const deleteNote = (event, noteId) => {
    event.stopPropagation()
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
  }

  return (
    <main>
      {
        notes.length > 0 ?
        <Split
          sizes={[30,70]}
          direction="horizontal"
          className='split'
        >
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {
            currentNoteId && notes.length > 0 &&
            <Editor
              currentNote={findCurrentNote()}
              updateNote={updateNote}
            />
          }
      </Split> :
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button
            className="first-note"
            onClick={createNewNote}
          >
            Create new note
          </button>
        </div>
      }
    </main>
  );
}
