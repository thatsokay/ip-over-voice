import React, {useState} from 'react'
import {ThemeProvider} from 'emotion-theming'
import {Button, Heading, Text} from 'rebass'

import Uploader from './Uploader'
import {FileData} from './types'

const theme = require('@rebass/preset').default

const App = () => {
  const [fileData, setFileData] = useState<FileData | null>(null)
  return (
    <ThemeProvider theme={theme}>
      <Heading>IP over Voice</Heading>
      <Button
        onClick={() =>
          speechSynthesis.speak(new SpeechSynthesisUtterance('test'))
        }
      >
        Send
      </Button>
      <Uploader onUpload={setFileData} />
      <Text fontFamily="monospace">{fileData?.data}</Text>
    </ThemeProvider>
  )
}

export default App
