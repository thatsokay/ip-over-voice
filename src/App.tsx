import React, {useState} from 'react'
import {ThemeProvider} from 'emotion-theming'
import {Button, Heading} from 'rebass'

import Uploader from './Uploader'
import Speaker from './Speaker'
import {FileData} from './types'

const theme = require('@rebass/preset').default

const App = () => {
  const [fileData, setFileData] = useState<FileData | null>(null)
  return (
    <ThemeProvider theme={theme}>
      <Heading>IP over Voice</Heading>
      <Button
        onClick={() =>
          speechSynthesis.speak(new SpeechSynthesisUtterance(fileData?.data))
        }
      >
        Send
      </Button>
      <Uploader onUpload={setFileData} />
      {fileData && <Speaker fileData={fileData} />}
    </ThemeProvider>
  )
}

export default App
