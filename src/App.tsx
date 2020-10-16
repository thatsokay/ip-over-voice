import React from 'react'
import {ThemeProvider} from 'emotion-theming'
import {Heading} from 'rebass'
const theme = require('@rebass/preset')

const App = () => (
  <ThemeProvider theme={theme}>
    <Heading>IP over Voice</Heading>
  </ThemeProvider>
)

export default App
