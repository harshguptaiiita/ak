import React from 'react';
import './App.css';
import DraggableElement from "./component/Draggable";
function App() {
  return (
    <div className="App">
    <DraggableElement
      title={`Title 1`}
      width={`500`}
      height={`250`}
      top={`150`}
      left={`200`}
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat.
      </p>
    </DraggableElement>
    <DraggableElement
      title={`Title 2`}
      width={`400`}
      height={`250`}
      top={`30`}
      left={`20`}
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostghgvrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat.
      </p>
    </DraggableElement>
  </div>
  );
}

export default App;
