import {wordList} from './PGPWordList'

declare global {
  const webkitSpeechRecognition: SpeechRecognition
  const webkitSpeechGrammarList: SpeechGrammarList
}

const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList

export const createSpeaker = () => {
  const utterance = new SpeechSynthesisUtterance()
  return (text: string) =>
    new Promise((resolve) => {
      utterance.text = text
      utterance.onend = resolve
      speechSynthesis.speak(utterance)
    })
}

export const createRecognition = () => {
  const grammar = `#JSGF V1.0; grammar word; public <word> = ${wordList
    .flat()
    .join(' | ')} ;`
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
