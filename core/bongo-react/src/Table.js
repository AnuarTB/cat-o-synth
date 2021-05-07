import './Table.css';
import React, { useState } from 'react';
import useSound from 'use-sound';

import bongoSfx0 from './sounds/bongo0.mp3';
import bongoSfx1 from './sounds/bongo1.mp3'; 
import cowbell from './sounds/cowbell.mp3';
import cymbal from './sounds/cymbal.mp3';
import meow from './sounds/meow.mp3';
import tambourine from './sounds/tambourine.mp3';
import keyboard1 from './sounds/keyboard1.mp3';
import keyboard2 from './sounds/keyboard2.mp3';
import keyboard3 from './sounds/keyboard3.mp3';
import keyboard4 from './sounds/keyboard4.mp3';
import keyboard5 from './sounds/keyboard5.mp3';
import keyboard6 from './sounds/keyboard6.mp3';
import keyboard7 from './sounds/keyboard7.mp3';
import keyboard8 from './sounds/keyboard8.mp3';
import keyboard9 from './sounds/keyboard9.mp3';
import keyboard0 from './sounds/keyboard0.mp3';
import marimba1 from './sounds/marimba1.mp3';
import marimba2 from './sounds/marimba2.mp3';
import marimba3 from './sounds/marimba3.mp3';
import marimba4 from './sounds/marimba4.mp3';
import marimba5 from './sounds/marimba5.mp3';
import marimba6 from './sounds/marimba6.mp3';
import marimba7 from './sounds/marimba7.mp3';
import marimba8 from './sounds/marimba8.mp3';
import marimba9 from './sounds/marimba9.mp3';
import marimba0 from './sounds/marimba0.mp3';

const order = [bongoSfx0, bongoSfx1, cowbell, cymbal, meow, tambourine, keyboard1, keyboard2, keyboard3, keyboard4, keyboard5, keyboard6, keyboard7, keyboard8, keyboard9, keyboard0,
marimba1, marimba2, marimba3, marimba4, marimba5, marimba6, marimba7, marimba8, marimba8, marimba8, marimba9, marimba0];

function RenderCell(props) {
    const [active, setActive] = useState(false);
    let {id, barId, section} = props;
    let clsName = "cell" + (props.isEnd ? " end" : "") + (active ? " active" : "");
    return (
        <div onClick={() => {
            props.play();
            console.log(barId, section, id);
            props.addNote(barId, section, id);
            setActive(!active);
        }} className={clsName}></div>
    );
}


function RenderBar(props) {
    let tmp = [];
    const [play] = useSound(order[props.id]);
    for (let i = 0; i < props.n; i++) {
        tmp.push(<RenderCell id={props.id} barId={props.barId} section={i} addNote={props.addNote} isEnd={i === (props.n - 1) ? true : false} play={play}/>);
    }
    return tmp;
}

function RenderRow(props) { 
    let rowElements = [];
    for (let j = 0; j < props.n; j++) {
        let tmp = [];
        for (let i = 0; i < props.k; i++) {
            tmp.push(<RenderBar n={props.m} id={j} barId={i} barSz={props.k} addNote={props.addNote}/>);
        }
        rowElements.push(<div className="row">{tmp}</div>);
    }
    return rowElements;
}

function Table(props) {

    return (
        <div className="table-wrapper">
            
            <RenderRow n={26} m={16} k={props.barNum} addNote={props.addNote}/>
            
        </div>
    );
}

export default Table;
