import React from 'react';
import './App.css';
import Form from "./formComponent";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Form/>
        </BrowserRouter>
    </div>
  );
}

const sub = (data) => {
    debugger;
};
export default App;
