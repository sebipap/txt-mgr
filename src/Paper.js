import React from 'react'
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';

export default class Paper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
        this.onChange = editorState => this.setState({editorState});
        this.handleKeyCommand = this.handleKeyCommand.bind(this);

        this.inputRef = React.createRef();

      }

    componentDidMount(){
    }

    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            this.onChange(newState);
            return 'handled';
        }

        return 'not-handled';
    }

    _onBoldClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
      }

    render(){
        return(
            <div id="paper" onClick={() => this.inputRef.current.focus()}>
                <button onClick={this._onBoldClick.bind(this)}>B</button>
                <hr />

                <div id="paper-editor">
                    <Editor editorState={this.state.editorState} onChange={this.onChange}  ref={this.inputRef} />
                </div>
            </div>

        )
            }
}