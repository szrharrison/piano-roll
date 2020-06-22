import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import makeGetNoteForPlayer from "../selectors/notesSelectors";
import { Key } from "../concerns/keyboard";
import { ReduxStore } from "../reducers";

type OwnProps = {
  name: Key
  noteId: number
}

export type Props = OwnProps & ReturnType<ReturnType<typeof makeMapStateToProps>>

const Note: FunctionComponent<Props> = (props) => {
  const noteStyle = {
    left: `${Math.round(props.note.startTime * 200) + 4}px`,
    width: `${Math.round(props.note.duration * 200)}px`
  };
  return <div className="note" style={noteStyle}>
    <span>
      {props.name}
    </span>
  </div>;
};


const makeMapStateToProps = () => {
  const getNoteForPlayer = makeGetNoteForPlayer();
  return (state: ReduxStore, ownProps: OwnProps) => ({
    note: getNoteForPlayer(state, ownProps)
  });
};

export default connect(makeMapStateToProps)(Note);
