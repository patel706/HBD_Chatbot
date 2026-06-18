import { useState } from 'react'
import ChatWidget from './components/Chatwidget'
import Launcher from './components/Launcher'

export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const [chatQuery, setChatQuery] = useState('')
  const [chatAction, setChatAction] = useState('')

  const handleSearchSubmit = () => {
    if (searchVal.trim()) {
      setChatQuery(searchVal.trim())
      setIsOpen(true)
      setSearchVal('')
    }
  }

  const handleTrendingClick = (city) => {
    setChatQuery(city)
    setIsOpen(true)
  }

  const handleAddBusinessClick = () => {
    setChatAction('add_new_business')
    setIsOpen(true)
  }

  return (
    <div className="relative min-h-screen bg-white">
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-br from-indigo-600 via-blue-500 to-indigo-400 clip-path-hero -z-10 opacity-10"></div>

      {/* NAVBAR */}
      <header className="px-6 py-6 flex items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">H</div>
          <span className="text-2xl font-black text-gray-900 tracking-tight">Honeybee <span className="text-indigo-600 italic">Digital</span></span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-bold text-gray-600">
          <a href="#" className="text-indigo-600 border-b-2 border-indigo-600 pb-1">Home</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Categories</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Trending</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">About</a>
        </nav>
        <button 
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all hover:-translate-y-0.5" 
          onClick={handleAddBusinessClick}
        >
          Add Business
        </button>
      </header>

      {/* HERO SECTION */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-40">
        <div className="text-center space-y-8 animate-in fade-in slide-in-from-top-4 duration-1000">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
            Discover <span className="text-indigo-600 underline decoration-indigo-200">What You</span> <br />
            Are Looking For
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Finding local businesses, events, and trending spots in your city has never been easier. Start your journey today!
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-4xl mx-auto pt-8">
            <div className="relative flex-1 w-full bg-white rounded-2xl shadow-2xl shadow-indigo-100 p-2 border border-gray-100 flex items-center gap-3">
              <div className="pl-4 text-indigo-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              </div>
              <input
                type="text"
                placeholder="Ex. Best Pizza, Ayurvedic Center, Gym..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                className="w-full py-4 text-lg font-medium text-gray-800 focus:outline-none placeholder:text-gray-300"
              />
              <button 
                onClick={handleSearchSubmit}
                className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
              >
                Search
              </button>
            </div>
          </div>

          <div className="pt-8 flex flex-wrap justify-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-400">
            <span>Trending:</span>
            <span onClick={() => handleTrendingClick('Pune')} className="text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full cursor-pointer hover:bg-indigo-100">Pune</span>
            <span onClick={() => handleTrendingClick('Jaipur')} className="text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full cursor-pointer hover:bg-indigo-100">Jaipur</span>
            <span onClick={() => handleTrendingClick('Indore')} className="text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full cursor-pointer hover:bg-indigo-100">Indore</span>
            <span onClick={() => handleTrendingClick('Delhi')} className="text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full cursor-pointer hover:bg-indigo-100">Delhi</span>
          </div>
        </div>
      </main>

      {/* CHAT WIDGET & LAUNCHER */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-4">
        {/* POPUP / TOOLTIP */}
        {!isOpen && (
          <div className="bg-indigo-600 text-white px-4 py-2 rounded-xl rounded-br-none shadow-xl animate-bounce-slow font-bold text-[10px] uppercase tracking-wider relative mb-1">
            Chat Click Here
            <div className="absolute right-0 bottom-[-4px] w-2 h-2 bg-indigo-600 transform rotate-45"></div>
          </div>
        )}

        <div
          className={`transition-all duration-300 origin-bottom-right transform ${isOpen
              ? 'scale-100 opacity-100'
              : 'scale-95 opacity-0 pointer-events-none'
            } w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col`}
        >
          <ChatWidget 
            onClose={() => setIsOpen(false)} 
            initialQuery={chatQuery} 
            onClearInitialQuery={() => setChatQuery('')}
            initialAction={chatAction}
            onClearInitialAction={() => setChatAction('')}
          />
        </div>

        <Launcher isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </div>

      <style jsx>{`
        .clip-path-hero {
          clip-path: ellipse(100% 55% at 50% 15%);
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  )
}
