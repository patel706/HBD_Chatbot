import { MessageSquare, X } from 'lucide-react'

export default function Launcher({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-14 h-14 rounded-full bg-black text-white shadow-2xl shadow-black/20 flex items-center justify-center hover:scale-110 transition-transform duration-200 active:scale-95"
    >
      {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
    </button>
  )
}