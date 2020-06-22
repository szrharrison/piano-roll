import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import _ from "lodash";

import makeGetNotesByPitch from "../selectors/noteSlotsSelectors";
import Note from "./Note";
import { Key } from "../concerns/keyboard";
import { ReduxStore } from "../reducers";

type OwnProps = {
  pianoKey: Key,
  dark: boolean
}

export type Props = OwnProps & ReturnType<ReturnType<typeof makeMapStateToProps>>

const NoteSlot: FunctionComponent<Props> = props => {
  const { dark, pianoKey } = props;
  let notes = null;
  if (props.notes) {
    notes = props.notes.map((note, i) => <Note
      key={_.uniqueId("note_")}
      name={pianoKey}
      noteId={note.id}
    />);
  }
  return <div
    className={classNames("note-slot", {
      "dark": dark,
      "light": !dark
    })}
    style={{ width: `${props.duration * 200}px` }}
  >
    {notes}
  </div>;
};

const makeMapStateToProps = () => {
  const getNotesByPitch = makeGetNotesByPitch();
  return (state: ReduxStore, ownProps: OwnProps) => ({
    duration: state.music.song.duration,
    notes: getNotesByPitch(state, ownProps)
  });
};

export default connect(makeMapStateToProps)(NoteSlot);
