import React from 'react'

import {FileData} from './types'

const chunkEvery = (str: string, count: number) =>
  str.match(new RegExp(`.{1,${count}}`, 'g'))?.map((chunk) => chunk)

interface Props {
  fileData: FileData
}

const Speaker: React.FC<Props> = ({fileData}) => {
  const threeByteGroups = chunkEvery(fileData.data, 4)
  return <>{JSON.stringify(threeByteGroups)}</>
}

export default Speaker
