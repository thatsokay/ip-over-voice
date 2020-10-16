import React from 'react'

import {FileData} from './types'

const chunkEvery = (str: string, count: number) =>
  str.match(new RegExp(`.{1,${count}}`, 'g'))!.map((chunk) => chunk)

const strToInts = (str: string) => str.split('').map((c) => c.charCodeAt(0))

interface Props {
  fileData: FileData
}

const Speaker: React.FC<Props> = ({fileData}) => {
  const threeByteChunks = chunkEvery(fileData.data, 4)
  return (
    <>
      {JSON.stringify(
        threeByteChunks.map((chunk) => atob(chunk)).map(strToInts),
      )}
    </>
  )
}

export default Speaker
