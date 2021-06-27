import React from 'react';
import './chord.css'

function Chord(props: any) {
    const notes = props.notes;
    const chordList = notes.map((note: string) => <li key={note}>
        {note}
    </li>
    );
    return (
        <div>
            <ul className="chord-list">{chordList}</ul>
        </div>
    );
}

export default Chord;