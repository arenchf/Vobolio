import logo from './logo.svg';
import './App.css';
import {useEffect} from "react"

function App() {
  useEffect(() => {
    console.log("IPS:",fetch("https://159.223.20.212/api/hello/"))
    console.log("VB:",fetch("http://vobolio.com/api/hello/"))
    console.log("VBS:",fetch("https://vobolio.com/api/hello/"))
    console.log("IP:",fetch("http://159.223.20.212/api/hello/"))
    fetch("http://localhost/api/hello/").then((val)=>{
      console.log("LO",val.json)
    })
    // console.log("LO:",)

    
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
