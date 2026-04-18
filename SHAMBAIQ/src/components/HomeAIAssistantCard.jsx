import { useState, useEffect, useRef } from 'react'

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10 2l1.65 5.35L17 9l-5.35 1.65L10 16l-1.65-5.35L3 9l5.35-1.65L10 2z" fill="currentColor" />
      <path d="M19 14l.82 2.18L22 17l-2.18.82L19 20l-.82-2.18L16 17l2.18-.82L19 14z" fill="currentColor" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HomeAIAssistantCard() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: "Hello! I've analyzed your field telemetry. Your South Block is showing early moisture drop. How can I help you optimize today's work?" }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  useEffect(scrollToBottom, [messages, isTyping])

  const suggestedPrompts = [
    'Should I irrigate Zone A?',
    'Market price for Sorghum?',
    'Drone survey findings?',
  ]

  const handleSend = (text) => {
    const query = text || input
    if (!query.trim()) return

    const newMsg = { id: Date.now(), role: 'user', text: query }
    setMessages(prev => [...prev, newMsg])
    setInput('')
    setIsTyping(true)

    // AI logic simulation
    setTimeout(() => {
      let response = "I'm checking that for you..."
      const q = query.toLowerCase()

      if (q.includes('irrigate')) response = "Based on current soil sensors (64% moisture), irrigation isn't urgent for Zone A, but Zone C might need attention in 48 hours."
      if (q.includes('market')) response = "Sorghum is currently trading at 3,400 KES per bag in Machakos. It's up 4% from last week."
      if (q.includes('drone')) response = "The latest UAV survey detected localized wilting in the South Block corner. I recommend targeted mulching there."

      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', text: response }])
      setIsTyping(false)
    }, 1200)
  }

  return (
    <div className="home-ai-card glass-panel">
      <div className="home-ai-card__header">
        <span className="home-ai-card__icon">
          <SparkleIcon />
        </span>
        <div>
          <h3 className="home-ai-card__title">Farm Intelligence</h3>
          <p className="home-ai-card__subtitle">Context-aware dryland assistant</p>
        </div>
      </div>
      
      <div className="home-ai-card__chat-window">
         {messages.map(m => (
           <div key={m.id} className={`chat-bubble chat-bubble--${m.role}`}>
             {m.text}
           </div>
         ))}
         {isTyping && <div className="chat-bubble chat-bubble--ai typing-dots"><span>.</span><span>.</span><span>.</span></div>}
         <div ref={chatEndRef} />
      </div>

      <div className="home-ai-card__prompts">
        {suggestedPrompts.map((prompt) => (
          <button 
            key={prompt} 
            className="home-ai-card__prompt-chip"
            onClick={() => handleSend(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="home-ai-card__input-group">
        <input 
          type="text" 
          className="home-ai-card__input" 
          placeholder="Ask about crops, soil, or drone scans..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="home-ai-card__submit" onClick={() => handleSend()} aria-label="Send query">
          <SendIcon />
        </button>
      </div>
    </div>
  )
}

export default HomeAIAssistantCard
