import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import styled from 'styled-components';
import 'draft-js/dist/Draft.css';

const ContentEditorDiv = styled('div')`
  width: 100vw;
  height: 500px;
`;

export default function ContentEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  return (
    <ContentEditorDiv>
      <div>editor</div>
      <Editor editorState={editorState} onChange={setEditorState} />
    </ContentEditorDiv>
  );
}
