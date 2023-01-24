import React from "react"
import date from 'date-and-time';


export default function Sidebar(props) {
  const notesEl = props.notes.map((note) => (
    <div key={note.id}>
      <div
        className={`title ${note.id === props.currentNote.id ?
          "selected-note" : ""
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <div><h4 className="text-snippet">
          { note.body === "" || JSON.parse(note.body).blocks[0].text === "" ? "New Note" : JSON.parse(note.body).blocks[0].text}
        </h4></div>
        <div className="time"><p>
          { date.format(new Date(), 'D/M/YY') === date.format(new Date(note.lastUpdated), 'D/M/YY') ?
          date.format(new Date(note.lastUpdated), 'hh:mm A') :
          date.format(new Date(note.lastUpdated), 'D/M/YY')
          }
        </p>
        <p style={{opacity: "0.7"}}>
          {note.body !== "" && JSON.parse(note.body).blocks[1]
          && JSON.parse(note.body).blocks.find((block, idx) => idx !== 0 && block.text !== "").text}
        </p>
        </div>
      </div>
    </div>
  ))

  return (
    <section className="pane sidebar">
      <div className="sidebar-header">
        <button className="button" onClick={(event) => props.deleteNote(event, props.currentNote.id)}>
          <i className="fa-solid fa-trash-can"></i>
          </button>
        <button className="button" onClick={props.newNote}>
          <i className="fa-solid fa-pen-to-square"></i>
          </button>

      </div>
      {notesEl}
    </section>
  )
}
