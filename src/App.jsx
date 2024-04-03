import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [option, setOption] = useState(1);
  const [messge, setMessage] = useState('');
  const [copyText, setCopyText] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{

    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSHUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "~{}()*&^%$#@!+-<>?";
    
    for(let i = 1;i <= length;i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  },[length,numberAllowed,charAllowed,setPassword]);

  const copyToClipboard = () =>{
    console.log(option);
    passwordRef.current.select();
    passwordRef.current.focus();
    passwordRef.current?.setSelectionRange(0,option);
    const partialPassword = passwordRef.current.value.substring(0, option);
    navigator.clipboard.writeText(partialPassword);
    setCopyText(partialPassword);
    setMessage('Coppied!');
    setTimeout(() => {
      setCopyText("");
      setMessage("");
    }, 3000);
  }

  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,charAllowed,setPassword]);

  return (
    <>
      <div className='w-ful max-w-2xl mx-auto shadow-md rounded-lg px-4 text-orange-500 bg-gray-400'>

        <h1 className='text-4xl text-center mb-4'>Password Generator</h1>
        
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-3 px-3 rounded-md'
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />

          <button 
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            onClick={copyToClipboard}  
          >Copy</button>

        <select id="mySelect" onChange={(e) => setOption(e.target.value)}>
          {[...Array(100).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>

        </div>

        <div className='text-black'>
          { copyText && messge+' This Password '+copyText }
        </div>

        <div className="flex shadow rounded-lg overflow-hidden mb-4 w-96">
          <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={ (e) => setLength(e.target.value) }
          />
          <label htmlFor="" className='text-blue-700 font-semibold ml-3 w-96'> Length : {length} </label>

          <input 
          className='max-w-xl'
          type="checkbox" 
          id="numberInput"
          defaultValue={numberAllowed} 
          onChange={ () => setNumberAllowed( (prev) => !prev ) }
          />
          <label htmlFor="numberInput" className='text-blue-700 w-96'>Number Allowed</label>

          <input 
          type="checkbox" 
          id="charInput"
          defaultValue={charAllowed} 
          onChange={ () => setCharAllowed( (prev) => !prev ) }
          />
          <label htmlFor="charInput" className='text-blue-700'>Special Char Allowed</label>
        </div>

      </div>
    </>
  )
}


const dropDownOption = (props) =>{
  return (
    <option key={props.key} value={props.value}>{props.value}</option>
  )
}

export default App
