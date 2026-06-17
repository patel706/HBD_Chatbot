import { useState } from 'react'
import { Send, Paperclip, Mic } from 'lucide-react'

export default function InputBox({ onSend }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    onSend(input)
    setInput('')
  }

  return (
    <div className="bg-white/80 backdrop-blur-2xl p-2 rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-white/50 ring-1 ring-gray-100">
      <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
        
        <button type="button" className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <Paperclip size={20} />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 text-lg py-3 px-2"
        />

        <div className="flex items-center gap-1 pr-1">
          <button type="button" className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <Mic size={20} />
          </button>
          <button 
            type="submit"
            disabled={!input.trim()}
            className="p-3 bg-gray-900 text-white rounded-full hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  )
}