import React, {useState, useEffect} from 'react'
import {Button} from 'rebass'

import {createPGPRecognition, createAcknowledger} from './speech'
import {wordValues} from './PGPWordList'

const recognition = createPGPRecognition()
const {ack, nack} = createAcknowledger()

const Receiver: React.FC = () => {
  const [receivedBytes, setReceivedBytes] = useState<number[]>([])
  useEffect(() => {
    recognition.onresult = async (event) => {
      const result = event.results[0]![0]!.transcript
      const receivedByte = wordValues[result]
      if (receivedByte === undefined) {
        await nack()
        return
      }
      setReceivedBytes([...receivedBytes, receivedByte])
      await ack()
    }
  }, [receivedBytes])
  return <Button onClick={() => recognition.start()}>Receive</Button>
}

export default Receiver
