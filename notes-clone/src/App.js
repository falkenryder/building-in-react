import './App.css';
import React from 'react';
import Split from 'react-split';
import {nanoid} from "nanoid";
import Sidebar from './components/Sidebar'
import TextEditor from './components/TextEditor';

export default function App() {
  const [notes, setNotes] = React.useState(() =>
    JSON.parse(localStorage.getItem("notes")) || [{
      id: nanoid(),
      body: "",
      lastUpdated: Date.now()
    }]
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

  const updateNote = (str) => {
    setNotes(prevNotes => {
      let arr = []
      prevNotes.forEach(note =>
        note.id === currentNoteId ?
        arr.unshift({...note, body: str, lastUpdated: Date.now()}) :
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
        <Split
          sizes={[30,70]}
          gutterSize={2}
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
            <TextEditor
              currentNote={findCurrentNote()}
              currentNoteId={currentNoteId}
              updateNote={updateNote}
            />
          }
      </Split>
    </main>
  );
}
