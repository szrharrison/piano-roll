import React, { ChangeEvent, FunctionComponent, useCallback, useState } from "react";
import { connect } from "react-redux";
import { Midi } from "@tonejs/midi";

import { fetchSingleSong } from "../actions/fetchSingleSong";
import { fetchCreateSong } from "../actions/createSongActions";
import { ReduxStore } from "../reducers";
import { bindActionCreators } from "redux";

export type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const SongSelector: FunctionComponent<Props> = props => {
  const { fetchSingleSong, createSong } = props;
  const [selected, setSelected] = useState("default");

  const handleChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const songId = e.target.value;
    setSelected(songId);
    fetchSingleSong(songId);
  }, [fetchSingleSong]);

  const handleAdd = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();
    let file = e.target.files?.[0];


    reader.onloadend = () => {
      const result: string = reader.result as string;
      // const base64 = result.slice(result.search(/,/) + 1);
      const jsonSong = Midi.fromUrl(result);
      createSong(JSON.parse(JSON.stringify(jsonSong)));
    };
    // @ts-ignore
    reader.readAsDataURL(file);
  }, [createSong]);


  const options = props.songs.map(song => (
    <option key={`song_${song.id}`} value={song.id}>
      {song.title}
    </option>
  ));
  return (
    <div className="song-selector clearfix">
      <select value={selected} onChange={handleChange}>
        <option value='default' disabled>Select a song from the list</option>
        {options}
      </select>
      <form>
        <input name="midi-file"
               type="file"
               accept=".midi,.mid"
               placeholder="Add a New Song"
               className="file-input"
               onChange={handleAdd}/>
      </form>
    </div>
  );
};

const mapStateToProps = (state: ReduxStore) => ({
  songs: state.music.allSongs
});

let mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    fetchSingleSong,
    createSong: fetchCreateSong
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SongSelector);
