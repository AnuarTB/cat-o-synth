import logo from './logo.svg';
import './App.css';
import Table from "./Table";

function App() {
  return (
    <div>
        Hello world!
        <Table rowSize={5} blocks={1} blockSize={16} />
    </div>
  );
}

export default App;
