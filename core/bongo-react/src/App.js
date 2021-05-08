import './App.css';
import 'antd/dist/antd.css';
import axios from 'axios';
import Table from "./Table";
import { useState } from 'react';
import { Button, Radio } from 'antd';

function App() {
    const block_num = 3;
    let initial_notes = [];
    for (let i = 0; i < block_num; i ++)
        initial_notes.push({});
    console.log(initial_notes);
    const [notes, setNotes] = useState(initial_notes);

    const addNote = (barId, sectionId, rowId) => {
        let copy_notes = [...notes];
        console.log(`bar: ${barId} section: ${sectionId} row: ${rowId}`)
        console.log(copy_notes);
        if(copy_notes[barId].hasOwnProperty(sectionId)) {
            copy_notes[barId][sectionId].push(rowId);
        } else {
            copy_notes[barId][sectionId] = [rowId];
        }
        console.log(copy_notes);
        setNotes(copy_notes);
    }

    const createJson = () => {
        console.log("hello!");
        // axios.defaults.headers = {"Api-key": "d2510238-af47-11eb-86a8-0242ac110008"};
        // axios.post("https://json.extendsclass.com/bin", JSON.stringify(notes))
        //     .then((res) => {
        //         console.log(res.data.uri);
        //     });
    }

    return (
        <div>
            Hello world!
            <Table barNum={block_num} addNote={addNote}/>
            <Button type="primary" shape="round" size={'large'} onClick={createJson}>
                Convert
            </Button>
        </div>
    );
}

export default App;
