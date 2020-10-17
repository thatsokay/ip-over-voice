import React, {useState, useEffect} from 'react'
import {Button} from 'rebass'

import {createRecognition} from './speech'
import {wordValues} from './PGPWordList'

const recognition = createRecognition()

const Receiver: React.FC = () => {
  const [receivedBytes, setReceivedBytes] = useState<number[]>([])
  useEffect(() => {
    recognition.onresult = (event) => {
      const result = event.results[0]![0]!.transcript
      const receivedByte = wordValues[result.toLowerCase()]
      if (receivedByte === undefined) {
        return
      }
      setReceivedBytes([...receivedBytes, receivedByte])
    }
  }, [receivedBytes])
  return <Button onClick={() => recognition.start()}>Receive</Button>
}

export default Receiver
