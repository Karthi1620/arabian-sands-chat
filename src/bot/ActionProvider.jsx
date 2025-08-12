import React from 'react'
import axios from 'axios'

const API_BASE = '/api' // Vite proxy → FastAPI at http://localhost:8001

export default class ActionProvider {
  constructor(createChatBotMessage, setStateFunc /*, createClientMessage */) {
    this.createChatBotMessage = createChatBotMessage
    this.setState = setStateFunc
  }

  sendToBackend = async (message) => {
    let sessionId = localStorage.getItem('as_session_id') || null
    try {
      const { data } = await axios.post(`${API_BASE}/chat`, { session_id: sessionId, message })
      if (!sessionId) {
        sessionId = data.session_id
        localStorage.setItem('as_session_id', sessionId)
      }

      // Optional: keep suggested slots in state
      if (Array.isArray(data.suggested_slots) && data.suggested_slots.length) {
        this.setState(prev => ({ ...prev, suggestions: data.suggested_slots }))
      }

      const botMsg = this.createChatBotMessage(data.reply, {
        widget: Array.isArray(data.suggested_slots) && data.suggested_slots.length ? 'quickReplies' : undefined,
        payload: { slots: data.suggested_slots || [], sessionId }
      })

      this.setState(prev => ({
        ...prev,
        messages: [...prev.messages, botMsg],
        sessionId,
        leadScore: data.lead_score
      }))
    } catch (e) {
      console.error('Chat API error:', e?.response?.status, e?.response?.data || e?.message)
      const botMsg = this.createChatBotMessage("Sorry, I'm having trouble. Can I connect you to a human agent?")
      this.setState(prev => ({ ...prev, messages: [...prev.messages, botMsg] }))
    }
  }

  chooseSlot = (iso) => {
    // Send a structured message so backend can capture exactly this ISO slot
    this.sendToBackend(`SELECT_SLOT ${iso}`)
  }
}