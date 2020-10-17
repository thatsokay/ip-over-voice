import React, {useRef, useMemo, useCallback} from 'react'
import {Button} from 'rebass'

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

const utterance = new SpeechSynthesisUtterance()

const speak = (text: string) =>
  new Promise((resolve) => {
    utterance.text = text
    utterance.onend = resolve
    speechSynthesis.speak(utterance)
  })

const createRecognition = () => {
  const grammar = `#JSGF V1.0; grammar word; public <word> = ${wordList.flat()} ;`
  const recognition = new SpeechRecognition()
  const speechRecognitionList = new SpeechGrammarList()
  speechRecognitionList.addFromString(grammar, 1)
  recognition.grammars = speechRecognitionList
  recognition.continuous = false
  recognition.lang = 'en-US'
  recognition.interimResults = false
  recognition.maxAlternatives = 1
  return recognition
}

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
