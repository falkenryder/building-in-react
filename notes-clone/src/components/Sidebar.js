import React from "react"

export default function Sidebar(props) {
  const notesEl = props.notes.map((note, idx) => (
    <div key={note.id}>
      <div
        className={`title ${note.id === props.currentNote.id ?
          "selected-note" : ""
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <h4 className="text-snippet">Note #{idx + 1}</h4>
      </div>
    </div>
  ))

  return (
    <section className="pane sidebar">
      <div className="sidebar-header">
        <button className="new-note" onClick={props.newNote}>
          <i className="fa-solid fa-pen-to-square"></i>
          </button>
      </div>
      {notesEl}
    </section>
  )
}
