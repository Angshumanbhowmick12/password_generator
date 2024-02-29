import { useCallback,useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'

import './App.css'

function App() {
  const [type,setType]=useState('text')
  const [length, setLength] = useState(8)
  const [numberAllow, setNumberAllow] = useState(false)
  const [charecterAllow, setCharecterAllow] = useState(false)
  const [password, setPassword] = useState("")
  const [copy,setCopy] = useState("copy")

  const passwordRef=useRef(null)
  
 const passwordGenerator= useCallback(()=>{
   let pass=""
   let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz"
  if(numberAllow) str+="0123456789"
  if(charecterAllow) str+="!@#$%^&*-_+=`~{}[]"

  for(let i=1;i<=length;i++){
    let char= Math.floor(Math.random() * str.length + 1)

    pass +=str.charAt(char)
    
  }

  setPassword(pass)

 },[length,numberAllow,charecterAllow,setPassword])

 const copyPasswordToClipBoard =useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,999)
  window.navigator.clipboard.writeText(password)

  setCopy('copied')
 },[password,setCopy])

 useEffect(()=>{
  passwordGenerator()
  setCopy('copy')
 },[length,numberAllow,charecterAllow,passwordGenerator])
 

  return (
    <>
    <div className=' w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-4xl text-center text-white'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
        <input type={type}
        value={password}
        className='w-full outline-none py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        <button className='outline-none bg-white px-2 py-1 shrink-0'
        onClick={()=> setType(type=== 'password' ? 'text' : 'password')}>😍</button>
        <button 
        className=' outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        onClick={copyPasswordToClipBoard}
        >{copy}</button>
      </div>

      <div className=' flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={180}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{
            setLength(e.target.value)
          }}
          />
          <label> length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={numberAllow}
          id="numberInput"
          onChange={()=>{
            setNumberAllow((prev)=> !prev);
          }} />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={charecterAllow}
          id="charecterInput"
          onChange={()=>{
            setCharecterAllow((prev)=> !prev);
          }} />
          <label htmlFor="charecterInput">characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
