import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'

import App from './app/App'

import 'app/styles/index.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)
root.render(
  <Router>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Router>,
)
