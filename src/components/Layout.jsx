import { Outlet, Link } from 'react-router-dom'
import { MessageSquare, Settings, Plus, Search, User } from 'lucide-react'

export default function Layout() {
  return (
    // The "Grey-White Gradient" Background
    <div className="flex h-screen bg-linear-to-br from-gray-900 via-white to-gray-900 text-gray-800 font-sans selection:bg-gray-200">
      
      {/* Glassmorphism Sidebar */}
      <nav className="w-20 md:w-72 h-full flex flex-col border-r border-white/50 bg-white/60 backdrop-blur-xl shadow-sm z-50 transition-all duration-300">
        
        {/* Header */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-gray-500/20">
              H
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-800 hidden md:block">
              HoneyBeeDigitals
            </span>
          </div>
        </div>


        <div className="px-4 mb-6">
          <button 
            onClick={() => window.location.reload()} 
            className="w-full flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white p-4 rounded-2xl shadow-xl shadow-gray-900/10 transition-all transform active:scale-95 group"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-medium hidden md:block">New Chat</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 mb-4 hidden md:block">
          <div className="relative group">
            <Search className="absolute left-4 top-3 text-gray-400 group-focus-within:text-gray-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-white/50 border border-transparent focus:border-gray-200 focus:bg-white rounded-2xl py-2.5 pl-11 pr-4 text-sm outline-none transition-all shadow-sm" 
            />
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4 space-y-2 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2 hidden md:block">
            Menu
          </div>
          <Link to="/" className="flex items-center gap-3 p-3.5 rounded-2xl bg-white shadow-sm border border-gray-100 text-gray-900 font-medium transition-all">
            <MessageSquare size={20} className="text-gray-900" />
            <span className="hidden md:block">Chat</span>
          </Link>
          
          <Link to="/settings" className="flex items-center gap-3 p-3.5 rounded-2xl hover:bg-white/50 text-gray-500 hover:text-gray-900 font-medium transition-all">
            <Settings size={20} />
            <span className="hidden md:block">Settings</span>
          </Link>
        </div>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-gray-100/50">
          <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-white/50 cursor-pointer transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 flex items-center justify-center text-gray-600">
              <User size={20} />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-bold text-gray-800">Shlok Thapa</p>
              <p className="text-xs text-gray-500">Software Engineer</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <Outlet />
      </main>
    </div>
  )
}