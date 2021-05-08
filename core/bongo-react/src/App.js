import './App.css';
import 'antd/dist/antd.css';
import axios from 'axios';
import Table from "./Table";
import { useState } from 'react';
import { Button, Radio } from 'antd';
import bongo_cat from './images/bongo-cat-sticker.jpg';
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import Names from "./Names";

function arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele != value;
    });
}

function App() {
    const block_num = 3;
    let initial_notes = [];
    for (let i = 0; i < block_num; i ++)
        initial_notes.push({});
    const [notes, setNotes] = useState(initial_notes);
    const num_to_keyboard = {
        0: 'A',
        1: 'D'
    }
    const toggleNote = (barId, sectionId, rowId) => {
        let copy_notes = [...notes];
        console.log(`bar: ${barId} section: ${sectionId} row: ${rowId}`)
        console.log(copy_notes);
        let keyboard = num_to_keyboard[rowId];
        if(copy_notes[barId].hasOwnProperty(sectionId)) {
            if(copy_notes[barId][sectionId].includes(keyboard)) {
                copy_notes[barId][sectionId] = arrayRemove(copy_notes[barId][sectionId], keyboard);
                if(copy_notes[barId][sectionId].length == 0)
                    delete copy_notes[barId][sectionId];
            } else {
                copy_notes[barId][sectionId].push(keyboard);
            }
        } else {
            copy_notes[barId][sectionId] = [keyboard];
        }
        console.log(copy_notes);
        setNotes(copy_notes);
    }

    const createJson = () => {
        let res = {
            'notes': notes
        }
        console.log("hello!");
        console.log(res);
        // axios.defaults.headers = {"Api-key": "d2510238-af47-11eb-86a8-0242ac110008"};
        // axios.post("https://json.extendsclass.com/bin", JSON.stringify(notes))
        //     .then((res) => {
        //         console.log(res.data.uri);
        //     });
    }

    return (
        <div>
            <div className={'container'}>
                <Title>
                    Welcome to Bongo Cat music sequencer!
                </Title>
                <img className={"cropped1"} src={bongo_cat} alt={'Bongo Cat'}/>
            </div>
            <br/>
            <div className={'horizontal'}>
                <Names />
                <Table barNum={block_num} toggleNote={toggleNote}/>
            </div>
            <br/>
            <div className={'container'}>
                <Button type="primary" shape="round" size={'large'} onClick={createJson}>
                    Play
                </Button>
            </div>
        </div>
    );
}

export default App;
