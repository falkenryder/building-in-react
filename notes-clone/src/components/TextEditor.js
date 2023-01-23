import React from "react"
// import ReactMde from "react-mde"
// import Showdown from "showdown"
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromHTML, convertToHTML } from 'draft-convert';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


export default function TextEditor({currentNote, updateNote}) {
  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(convertFromHTML(currentNote.body))
  )

  React.useEffect(() => {
    updateNote(convertToHTML(editorState.getCurrentContent()))
  }, [editorState]);

  // updateNote(convertedContent)

  const toolbarOptions = {
    options: ["inline", "blockType"],
    inline: {
      options: ["bold", "italic", "underline", "strikethrough"],
      className: "toolbar-options"
    },
    blockType: {
      inDropdown: true,
      options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
    },
  };

  const onSetEditorState = (newState) => {
    setEditorState(newState)
 }

  return (
    <div className="pane editor">
      <Editor
        editorState={editorState}
        onEditorStateChange={onSetEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={toolbarOptions}
      />
    </div>
  )
}

// export default function Editor({currentNote, updateNote}) {
//   const [selectedTab, setSelectedTab] = React.useState("write")

//   const converter = new Showdown.Converter({
//     tables: true,
//     simplifiedAutoLink: true,
//     strikethrough: true,
//     tasklists: true
//   })

//   return (
//     <section className="pane editor">
//       <ReactMde
//         value={currentNote.body}
//         onChange={updateNote}
//         selectedTab={selectedTab}
//         onTabChange={setSelectedTab}
//         generateMarkdownPreview={(markdown) =>
//           Promise.resolve(converter.makeHtml(markdown))}
//         minEditorHeight={80}
//         heightUnits="vh"
//       ></ReactMde>
//     </section>
//   )
// }
