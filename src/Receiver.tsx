import React from 'react'
import {Button} from 'rebass'

import {createRecognition} from './speech'

const recognition = createRecognition()
recognition.onresult = (event) => console.log(event.results[0]![0]!.transcript)

const Receiver: React.FC = () => {
  const receive = () => recognition.start()
  return <Button onClick={receive}>Receive</Button>
}

export default Receiver
