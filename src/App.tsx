import React from 'react';
import './App.css';
import Chord from './chords/chord';

const noteValueToString: Record<number, string> = {
  0: 'C',
  1: 'C#',
  2: 'D',
  3: 'D#',
  4: 'E',
  5: 'F',
  6: 'F#',
  7: 'G',
  8: 'G#',
  9: 'A',
  10: 'A#',
  11: 'H'
}

const noteStringToValue: Record<string, number> = {
  'C': 0,
  'C#': 1,
  'D': 2,
  'D#': 3,
  'E': 4,
  'F': 5,
  'F#': 6,
  'G': 7,
  'G#': 8,
  'A': 9,
  'A#': 10,
  'H': 11
}

class App extends React.Component<{}, {notes: string[], sharp: number}> {
  constructor(props: any) {
    super(props);
    this.state = {
      notes: [],
      sharp: 0
    };
    this.onChangeNote = this.onChangeNote.bind(this);
    this.onChangeSharp = this.onChangeSharp.bind(this);
  }

  onChangeNote(event: any) {
    var noteValue: number = +event.target.value;
    let noteList: string[] = this.calculateChordFromBaseNote(noteValue);
    this.setState({notes : noteList, sharp : this.state.sharp});
  }

  onChangeSharp(event: any) {
    var sharpValue: number = +event.target.value;
    let noteList: string[] = this.calculateChordFromBaseNote(noteStringToValue[this.state.notes[0]] + sharpValue);
    this.setState({notes : noteList, sharp : this.state.sharp});
  }

  calculateChordFromBaseNote(baseNote: number): string[] {
    var noteStringList: string[] = [noteValueToString[baseNote % 12], noteValueToString[(baseNote + 4) % 12], noteValueToString[(baseNote + 7) % 12], noteValueToString[(baseNote + 11) % 12]];
    return noteStringList;
  }

  render() {
    return (
      <div className="App">
        <div onChange={this.onChangeNote}>
          <input type="radio" value="0" name="note" /> C
          <input type="radio" value="2" name="note" /> D
          <input type="radio" value="4" name="note" /> E
          <input type="radio" value="5" name="note" /> F
          <input type="radio" value="7" name="note" /> G
          <input type="radio" value="9" name="note" /> A
          <input type="radio" value="11" name="note" /> H
        </div>

        <div onChange={this.onChangeSharp}>
          <input type="radio" value="1" name="sharp" /> #
          <input type="radio" value="0" name="sharp" /> none
          <input type="radio" value="-1" name="sharp" /> b
        </div>

        <Chord notes={this.state.notes}/>
      </div>
    );
  }
}

export default App;
