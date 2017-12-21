import React, { Component } from 'react'
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js'
import axios from 'axios'

class Manage extends Component {
  constructor() {
    super()
    this.state = {
      editorState: EditorState.createEmpty(),
    }

    this.onSaveClick = this.onSaveClick.bind(this)
    this.onEditorChange = this.onEditorChange.bind(this)
    this.onUnderlineClick = this.onUnderlineClick.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
  }

  onSaveClick(event) {
    const content = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
    const uri = process.env.API_URI + 'api/posts'
    axios.post(uri, {
      "post" : {
        "title": "Title",
        "content": content
      }
    })
    .then(res => {
      // TODO report saved
    })
    .catch(error => {
      console.log(error)
    })
  }

  onEditorChange(editorState) {
    console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
    this.setState({editorState})
  }

  onUnderlineClick() {
    this.onEditorChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'))
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)

    if (newState) {
      this.onEditorChange(newState)
      return 'handled'
    }

    return 'not-handled'
  }

  render() {
    return (
      <div>
        <button onClick={this.onSaveClick}>Save</button>
        <button onClick={this.onUnderlineClick}>Underline</button>
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange = {this.onEditorChange}
        />
      </div>
    );
  }
}

export default Manage
