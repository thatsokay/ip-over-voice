import React from 'react'
import {Input} from '@rebass/forms'

import {FileData} from './types'

interface Props {
  onUpload: (file: FileData) => void
}

const Uploader: React.FC<Props> = ({onUpload}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    const files = event.target.files
    if (files === null) {
      return
    }

    const selectedFile = files[0]
    if (!selectedFile) {
      return
    }

    reader.onload = () => {
      const result = reader.result
      if (typeof result !== 'string') {
        return
      }
      onUpload({mimeType: selectedFile.type, data: result})
    }
    reader.readAsDataURL(selectedFile)
  }

  return <Input type="file" onChange={handleFileChange} />
}

export default Uploader
