import React, {useState} from 'react'
import {Text} from 'rebass'
import {Input} from '@rebass/forms'

const Sender = () => {
  const [dataUrl, setDataUrl] = useState<string | null>(null)

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
      setDataUrl(result)
    }
    reader.readAsDataURL(selectedFile)
  }

  return (
    <>
      <Input type="file" onChange={handleFileChange} />
      <Text fontFamily="monospace">{dataUrl}</Text>
    </>
  )
}

export default Sender
