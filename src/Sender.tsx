import React, {useRef, useMemo, useCallback} from 'react'
import {Button} from 'rebass'

import {createSpeaker} from './speech'
import {FileData} from './types'
import {wordList} from './PGPWordList'

/**
 * Divides a string into a list of strings, each with a number of characters
 * given by `count`.
 */
const chunkEvery = (str: string, count: number) =>
  str.match(new RegExp(`.{1,${count}}`, 'g'))!.map((chunk) => chunk)

/**
 * Returns the unicode values of each character of the given string.
 */
const strToInts = (str: string) => str.split('').map((c) => c.charCodeAt(0))

const speak = createSpeaker()

interface Props {
  fileData: FileData
}

const Sender: React.FC<Props> = ({fileData}) => {
  const stopSpeaking = useRef(false)
  const wordData = useMemo(
    () =>
      chunkEvery(fileData.data, 4)
        .map((chunk) => atob(chunk))
        .flatMap(strToInts)
        .map((byte) => wordList[byte]![0]!),
    [fileData.data],
  )
  const speakData = useCallback(async () => {
    stopSpeaking.current = false
    for (const word of wordData) {
      if (stopSpeaking.current) {
        break
      }
      await speak(word)
    }
  }, [wordData])
  return (
    <>
      <Button onClick={speakData}>Speak</Button>
      <Button
        onClick={() => {
          stopSpeaking.current = true
        }}
      >
        Stop
      </Button>
    </>
  )
}

export default Sender
