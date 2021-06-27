import React from 'react';
import './App.css';

const noteValues: Record<number, string> = {
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

class App extends React.Component {

  

  onChangeNote(event: any) {
    var noteValue: number = +event.target.value;
    console.log(noteValues[noteValue]);
    console.log(noteValues[(noteValue + 4) % 12]);
    console.log(noteValues[(noteValue + 7) % 12]);
    console.log(noteValues[(noteValue + 11) % 12]);
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
      </div>
    );
  }
}

export default App;
