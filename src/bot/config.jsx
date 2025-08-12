import React from 'react'
import { createChatBotMessage } from 'react-chatbot-kit'
import QuickReplies from './widgets/QuickReplies.jsx'

const config = {
  botName: 'Yasmin',
  initialMessages: [
    createChatBotMessage("Marhaba! I'm Yasmin from Arabian Sands Realty. Are you looking to buy or rent?")
  ],
  widgets: [
    {
      widgetName: 'quickReplies',
      widgetFunc: (props) => <QuickReplies {...props} />
    }
  ],
  state: { sessionId: null, leadScore: null, suggestions: [] }
}

export default config