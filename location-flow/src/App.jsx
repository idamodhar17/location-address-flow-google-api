import { useState } from 'react'
import Map from "./components/Map"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Location Selector</h1>
    <Map />
    </>
  )
}

export default App