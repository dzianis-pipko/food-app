import { useState, type MouseEvent } from 'react';
import Button from './components/Button/Button'

function App() {

  const [counter, setCounter] = useState<number>(0);

  const addCounter = (e: MouseEvent) => {
    console.log(e);
    setCounter((count) => count + 1)
  }

  return (
    <>
      <Button onClick={addCounter} appearence={'big'}>click</Button>
      <Button onClick={addCounter} appearence={'small'}>click</Button>
      <div>{counter}</div>
    </>
  )
}

export default App
