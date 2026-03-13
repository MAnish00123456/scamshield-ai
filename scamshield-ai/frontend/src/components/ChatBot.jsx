import { useState } from 'react'

const initialMessages = [
  {
    role: 'bot',
    text: 'Namaste! Koi suspicious message mila? Screenshot upload karo ya link paste karo — main check kar deta hun.',
  },
  {
    role: 'user',
    text: 'Mujhe ek message aaya hai ki mera SBI account band ho jayega, OTP share karo',
  },
  {
    role: 'bot',
    text: 'Yeh SCAM hai! SBI ya koi bhi bank kabhi OTP nahi mangta. Is number ko block karo aur cybercrime.gov.in pe report karo.',
  },
]

function ChatBot() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    setMessages((prev) => [...prev, { role: 'user', text: input }])
    setInput('')
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: 'Main is message ko analyze kar raha hun... Ek moment.' },
      ])
    }, 600)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <section className="chatbot-preview" id="chatbot">
      <div className="chat-box">
        <div className="chat-header">
          <div className="bot-avatar">AI</div>
          <span className="chat-header-name">ScamShield Assistant</span>
          <span className="chat-header-status">Online</span>
        </div>
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`msg ${msg.role}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Koi suspicious message ya link paste karo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="send-btn" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </section>
  )
}

export default ChatBot
