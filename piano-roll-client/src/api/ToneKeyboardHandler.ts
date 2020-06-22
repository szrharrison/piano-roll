import * as Tone from "tone";
import _ from "lodash";

import { Key, sevenOctavePiano } from "../concerns/keyboard";
import Note from "../models/note";

export const notePaths = (instrument: string): { [key: string]: string } => {
  return sevenOctavePiano.reduce<{ [key: string]: string }>((acc, note) => {
    let mp3Note = note;
    if (note.search("#") !== -1) {
      mp3Note = nextLetter(note[0]) + "b" + note.substr(2);
    }
    acc[`${instrument}-${note}`] = `https://raw.githubusercontent.com/szrharrison/pre-rendered-soundfont-libs-for-midi-js/master/Compifont_NEW/${instrument}-mp3/${mp3Note}.mp3`;
    return acc;
  }, {});
};

class Player {
  multiPlayer: Tone.Players;

  constructor() {
    this.multiPlayer = new Tone.Players(notePaths("acoustic_grand_piano"));
    this.multiPlayer.toDestination();
    this.multiPlayer.fadeOut = 0.05;
    this.setInstrument("acoustic_grand_piano");
  }

  triggerKey = (noteName: Key) => {
    try {
      console.log(noteName);
      this.multiPlayer.player(`acoustic_grand_piano-${noteName}`).start("+0.1", 0, 0.5);
    } catch (err) {
    } // in case the buffers haven't loaded yet
  };

  addNote = (note: Note, instrument: string, isLoaded: boolean) => {
    try {
      if (isLoaded) {
        this.multiPlayer.player(`${instrument}-${note.name}`).sync().start(note.startTime, 0, note.duration);
      }
    } catch (err) {
      console.error(`%c ${err}`, "height: 5px;");
    }
  };

  setInstrument = (instrument: string, playersLoaded?: Function) => {
    if (
      /* if none if the buffers have the instrument name as a part of their key
        Note: buffers look like this:
        {
          buffername: Promise       // Resolves as the file being loaded
        }
      */
      !this.multiPlayer.has(`${instrument}-C3`)
    ) {
      const paths = notePaths(instrument);
      _.forIn(paths, (url, instrumentNote) => {
        this.multiPlayer.add(instrumentNote, url, () => {
          console.log(`%c ${instrumentNote}`, "height: 5px;");
          if (playersLoaded) {
            playersLoaded(instrumentNote);
          }
        });
      });
    }
  };

  play = () => Tone.Transport.start();

  pause = () => Tone.Transport.pause();

  stop = () => Tone.Transport.stop();

  setTimer = callback => Tone.Transport.scheduleRepeat(() => callback(Tone.Transport.seconds), 0.05);
}

const player = new Player();

export default player;

function nextLetter(string) {
  return string.replace(/([a-zA-Z])[^a-zA-Z]*$/, letter => {
    let character = letter.charCodeAt(0);
    switch (character) {
      case 71:
        return "A";
      default:
        return String.fromCharCode(++character);
    }
  });
}
