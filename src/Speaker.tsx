import React, {useMemo, useCallback} from 'react'
import {Button} from 'rebass'

import {FileData} from './types'
import PGPWordList from './PGPWordList.json'

const chunkEvery = (str: string, count: number) =>
  str.match(new RegExp(`.{1,${count}}`, 'g'))!.map((chunk) => chunk)

const strToInts = (str: string) => str.split('').map((c) => c.charCodeAt(0))

interface Props {
  fileData: FileData
}

const Speaker: React.FC<Props> = ({fileData}) => {
  const wordData = useMemo(
    () =>
      chunkEvery(fileData.data, 4)
        .map((chunk) => atob(chunk))
        .flatMap(strToInts)
        .map((byte) => PGPWordList[byte]![0]!),
    [fileData.data],
  )
  const speak = useCallback(
    () =>
      wordData.forEach((word) =>
        speechSynthesis.speak(new SpeechSynthesisUtterance(word)),
      ),
    [wordData],
  )
  return <Button onClick={speak}>Speak</Button>
}

export default Speaker
