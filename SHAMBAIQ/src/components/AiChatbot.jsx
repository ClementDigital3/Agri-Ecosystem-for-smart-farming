import { useState, useEffect, useRef } from 'react'

function AiChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Jambo! I am Shamba-AI. I have access to your live soil sensors and market data. How can I assist you today?' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = (e) => {
    e.preventDefault()
    if(!input.trim()) return

    setMessages(prev => [...prev, { sender: 'user', text: input }])
    setInput('')
    setIsTyping(true)

    // Simulate AI inference delay
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, { sender: 'ai', text: 'Based on your current soil moisture reading (34%) and high Evapotranspiration risk, your crop is facing minor stress. I recommend a light irrigation pass of 5mm tonight after the wind dies down.' }])
    }, 2000)
  }

  return (
    <div className="ai-chatbot-system">
      {!open && (
        <button className="ai-fab" onClick={() => setOpen(true)}>
          <span className="ai-fab__icon pulse-glow">🤖</span>
        </button>
      )}

      {open && (
        <div className="ai-chat-window slide-in-bottom">
          <div className="ai-chat-window__header">
            <div className="ai-identity">
              🤖 Shamba-AI Assistant
              <span className="online-indicator"></span>
            </div>
            <button className="close-btn" onClick={() => setOpen(false)}>✕</button>
          </div>
          
          <div className="ai-chat-window__body">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-bubble chat-bubble--${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="chat-bubble chat-bubble--ai typing-indicator">
                <span className="dot"></span><span className="dot"></span><span className="dot"></span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          
          <form className="ai-chat-window__input" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask about fertilizer, pests, or market prices..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">⬆️</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default AiChatbot
