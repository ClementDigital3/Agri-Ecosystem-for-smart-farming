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
  const suggestedPrompts = [
    'Should I irrigate Zone A today?',
    'Current market price for Sorghum?',
    'Forecast for next week?',
  ]

  return (
    <div className="home-ai-card">
      <div className="home-ai-card__header">
        <span className="home-ai-card__icon">
          <SparkleIcon />
        </span>
        <div>
          <h3 className="home-ai-card__title">ShambaIQ Agronomist</h3>
          <p className="home-ai-card__subtitle">Ask anything about your farm or market</p>
        </div>
      </div>
      
      <div className="home-ai-card__prompts">
        {suggestedPrompts.map((prompt) => (
          <button key={prompt} className="home-ai-card__prompt-chip">
            {prompt}
          </button>
        ))}
      </div>

      <div className="home-ai-card__input-group">
        <input 
          type="text" 
          className="home-ai-card__input" 
          placeholder="Ask about crops, soil, or weather..." 
        />
        <button className="home-ai-card__submit" aria-label="Send query">
          <SendIcon />
        </button>
      </div>
    </div>
  )
}

export default HomeAIAssistantCard
