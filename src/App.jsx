import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Note from './Components/Note'
// import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Note/>
    </>
  )
}

export default App
