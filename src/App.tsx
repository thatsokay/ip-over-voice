import React from 'react'
import {ThemeProvider} from 'emotion-theming'
import {Button, Heading} from 'rebass'

import Sender from './Sender'

const theme = require('@rebass/preset').default

const App = () => (
  <ThemeProvider theme={theme}>
    <Heading>IP over Voice</Heading>
    <Button
      onClick={() =>
        speechSynthesis.speak(new SpeechSynthesisUtterance('test'))
      }
    >
      Send
    </Button>
    <Sender />
  </ThemeProvider>
)

export default App
