import logo from './logo.svg';
import './Table.css';

function RenderCell(props) {
    let id, barId, section = {props};
    return (
        <div onClick={() => {console.log(id, barId, section)}} className="cell"></div>
    );
}
function RenderEndCell(props) {
    let id, barId, section = {props};
    return (
        <div onClick={() => {console.log(id, barId, section)}} className="cell-end"></div>
    );
}

function RenderBar(props) {
    let tmp = [];
    for (let i = 0; i < props.n - 1; i++) {
        tmp.push(<RenderCell id={props.id} barId={props.barId} section={i} />);
    }
    tmp.push(<RenderEndCell id={props.id} barId={props.barId} section={props.n-1} />);
    return tmp;
}

function RenderRow(props) {
    let rowElements = [];
    for (let j = 0; j < props.n; j++) {
        let tmp = [];
        for (let i = 0; i < props.k; i++) {
            tmp.push(<RenderBar n={props.m} id={j} barId={i} barSz={props.k}/>);
        }
        rowElements.push(<div className="row">{tmp}</div>);
    }
    return rowElements;
}

function Table(props) {

    return (
        <div className="table-wrapper">
            
            <RenderRow n={26} m={16} k={3}/>
            
        </div>
    );
}

export default Table;
