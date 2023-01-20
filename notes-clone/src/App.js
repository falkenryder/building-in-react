import './App.css';
import React from 'react';
import Split from 'react-split';
import {nanoid} from "nanoid";
// import date from 'date-and-time';
import Sidebar from './components/Sidebar'
import Editor from './components/Editor';

export default function App() {
  const [notes, setNotes] = React.useState([])
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  )

  const createNewNote = () => {
    const newNote = {
      id: nanoid(),
      body: ""
      // lastUpdated: date.format(new Date(), 'ddd, MMM DD YYYY')
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  const updateNote = (text) => {
    setNotes(prevNotes => prevNotes.map(note => {
      console.log(note.id === currentNoteId)
      return note.id === currentNoteId ? {...note, body: text} : note
    }))
  }

  const findCurrentNote = () => {
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
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
