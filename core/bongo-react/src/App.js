import logo from './logo.svg';
import './App.css';
import Table from "./Table";

function App() {
  return (
    <div>
        Hello world!
        <Table blocks={1} blockSize={8} />
    </div>
  );
}

export default App;
