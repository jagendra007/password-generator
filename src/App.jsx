import { useCallback, useEffect, useRef, useState } from 'react';
// import copy from "copy-to-clipboard";
import './App.css';

function App() {

  const [length, setLength] = useState(11);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABDEGGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqustuvwxyz";

    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "!@#$%^&*(){}|"

    for (let i = 1; i <= length; i++) {

      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword])



//copy to clipboard function

  const handleCopyClick = async () => {
    try {
        await navigator.clipboard.writeText(password);
        alert("Copied to clipboard!");
    } catch (err) {
        console.error(
            "Unable to copy to clipboard.",
            err
        );
        alert("Copy to clipboard failed.");
    }
};

  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, characterAllowed, passwordGenerator]);


  return (
    <div className="App height100v bg">
      <div className="main-window txt-center content-center-col pt-10 my-0">


        <div id="pass-gen">
          <h1 id="main-heading" >Password Generator</h1>
          <div className="password-field content-center">
            <input
             type="text"
              id="input-field"
               placeholder="Password"
               value={password} 
               ref={passwordRef}
               readOnly/>
            <button type="button"  id="cpy-btn"  onClick={handleCopyClick} >Copy</button>
          </div>
          <div className="content-center p-1" id="pass-condition">
            <div>
              <label htmlFor="length" >
                <input
                  type="range"
                  min={10}
                  max={50}
                  value={length}

                  onChange={(e) => { setLength(e.target.value) }} />
                Length: {length}
              </label>
            </div>

            <div>
              <label htmlFor="number" >
                <input
                  type="checkbox"
                  id="number"
                  onChange={() => { setNumberAllowed((prev) => !prev) }}
                /> Number Allowed
              </label>
            </div>
            <div>
              <label htmlFor="number" >
                <input
                  type="checkbox"
                  id="number"
                  onChange={() => {setCharacterAllowed((prev) => !prev) }}
                /> Character Allowed
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
