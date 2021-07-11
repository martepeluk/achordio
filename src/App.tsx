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
  11: 'B'
}

const flatNoteValue: Record<number, string> = {
  0: 'C',
  1: 'Db',
  2: 'D',
  3: 'Eb',
  4: 'E',
  5: 'F',
  6: 'Gb',
  7: 'G',
  8: 'Ab',
  9: 'A',
  10: 'Bb',
  11: 'B'
}

// third = 0 is a major third
class App extends React.Component<{}, {baseNote: number, sharp: number, third: number, seventh: number}> {
  constructor(props: any) {
    super(props);
    this.state = {
      baseNote: 0,
      sharp: 0,
      third: 0,
      seventh: -1
    };
    this.onChangeNote = this.onChangeNote.bind(this);
    this.onChangeSharp = this.onChangeSharp.bind(this);
    this.onChangeThird = this.onChangeThird.bind(this);
    this.onChangeSeventh = this.onChangeSeventh.bind(this);
    this.calculateChordFromBaseNote = this.calculateChordFromBaseNote.bind(this);
  }

  onChangeNote(event: any) {
    var noteValue: number = +event.target.value;
    var curState = {...this.state}
    curState.baseNote = noteValue
    this.setState(curState);
  }

  onChangeSharp(event: any) {
    var sharpValue: number = +event.target.value;
    var curState = {...this.state}
    curState.sharp = sharpValue
    this.setState(curState);
  }

  onChangeThird(event: any) {
    var thirdValue: number = +event.target.value;
    var curState = {...this.state}
    curState.third = thirdValue
    this.setState(curState);
  }

  onChangeSeventh(event: any) {
    var seventhValue: number = +event.target.value;
    var curState = {...this.state}
    curState.seventh = seventhValue
    this.setState(curState);
  }

  calculateChordFromBaseNote(): string[] {
    if (this.state.baseNote < 0) {
      return [];
    }
    var baseNote: number = (this.state.baseNote + this.state.sharp + 12) % 12;

    let prime : string = this.calculateNoteFromBaseNoteAndDiff(baseNote, 0)
    let third : string = this.calculateNoteFromBaseNoteAndDiff(baseNote + 4, this.state.third)
    let fifth : string = this.calculateNoteFromBaseNoteAndDiff(baseNote + 7, 0)
    let seventh : string = this.calculateNoteFromBaseNoteAndDiff(baseNote + 11, this.state.seventh)

    var noteStringList: string[] = [prime, third, fifth, seventh];
    return noteStringList;
  }

  calculateNoteFromBaseNoteAndDiff(baseNote: number, diff: number) : string {
    if (this.state.sharp >= 0) 
    {
      return noteValueToString[(baseNote + diff + 12) % 12]
    } else {
      if (diff < 0) {
        return flatNoteValue[(baseNote + diff + 12) % 12]
      } else {
        return noteValueToString[(baseNote + diff + 12) % 12]
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div onChange={this.onChangeNote}>
          <input type="radio" value="0" name="note" defaultChecked/> C
          <input type="radio" value="2" name="note" /> D
          <input type="radio" value="4" name="note" /> E
          <input type="radio" value="5" name="note" /> F
          <input type="radio" value="7" name="note" /> G
          <input type="radio" value="9" name="note" /> A
          <input type="radio" value="11" name="note" /> H
        </div>

        <div onChange={this.onChangeSharp}>
          <input type="radio" value="1" name="sharp" /> #
          <input type="radio" value="0" name="sharp" defaultChecked/> &#9838;
          <input type="radio" value="-1" name="sharp" /> &#9837;
        </div>

        <div onChange={this.onChangeThird}>
          <input type="radio" value="-1" name="third" /> minor3
          <input type="radio" value="0" name="third" defaultChecked/> major3
        </div>

        <div onChange={this.onChangeSeventh}>
          <input type="radio" value="-1" name="seventh" defaultChecked/> minor7
          <input type="radio" value="0" name="seventh"/> major7
        </div>

        <Chord notes={this.calculateChordFromBaseNote()}/>
      </div>
    );
  }
}

export default App;
