import { useState } from "react";
import Modal from "./components/Modal/Modal";

function App(){
  const [isOpen, setIsOpen] = useState(false);


  return(
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}
      title="Modal title">
        <p>Hello From Modal</p>
      </Modal>
    </div>
  )

}


export default App