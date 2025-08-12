import React from 'react'
import Chatbot from 'react-chatbot-kit'
import config from './bot/config.jsx'
import MessageParser from './bot/MessageParser.js'
import ActionProvider from './bot/ActionProvider.jsx'

export default function App() {
  return (
    <div className="shell">
      <header>
        <img src="/logo.png" alt="DacX Real Estate" />
        <div>
          <h2>Dacx Real Estate</h2>
          <p>Dubai • Your dream home awaits</p>
        </div>
      </header>
      <div className="chat">
        <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />
      </div>
    </div>
  )
}