import React from "react"
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
// import date from 'date-and-time';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


export default function TextEditor({currentNote, currentNoteId, updateNote}) {
  const [editorState, setEditorState] = React.useState(
    currentNote.body === "" ?
    EditorState.createEmpty() :
    EditorState.createWithContent(convertFromRaw(JSON.parse(currentNote.body)))
  )

  React.useEffect(() => {
    updateNote(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
  }, [editorState]);


  React.useEffect(() => {
    currentNote.body === "" ?
    setEditorState(EditorState.createEmpty()) :
    setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(currentNote.body))))
  }, [currentNoteId])

  const toolbarOptions = {
    options: ["inline", "blockType"],
    inline: {
      options: ["bold", "italic", "underline", "strikethrough"],
    },
    blockType: {
      inDropdown: true,
      options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
    },
  };

  return (
    <div className="pane editor">
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={toolbarOptions}
      />
    </div>
  )
}
