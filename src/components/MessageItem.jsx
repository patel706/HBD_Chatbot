import React, { useState } from 'react';
import { Search, RefreshCw, LogIn, MessageSquare, AlertCircle, X, ArrowRight, TrendingUp, ChevronRight, ChevronLeft, PlusCircle, MapPin, Type, Trash2 } from 'lucide-react';

const MessageItem = ({ message, onAction, isLoggedIn, session }) => {
  const isBot = message.role === 'bot';
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  // State for cycling through suggestions carousel
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const formatFieldName = (field) =>
    field
      .replace(/_/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())

  const formatDate = (date) =>
    new Date(date).toLocaleString()
  // console.log(message);

  // 0. THINKING STATE
  if (message.type === 'thinking') {
    return (
      <div className="flex justify-start mb-4 animate-in fade-in">
        <div className="p-3.5 rounded-2xl shadow-sm text-sm italic bg-white border border-gray-200 text-gray-500 rounded-tl-none max-w-[75%] whitespace-pre-wrap break-words">
          🤖 Thinking...
        </div>
      </div>
    );
  }

  // 0.5 SEARCH OPTIONS (Find My Business - Name / Address buttons)
  if (message.type === 'search_options') {
    return (
      <div className="flex justify-start mb-4 animate-in slide-in-from-bottom-2 duration-300">
        <div className="max-w-[85%] w-full">
          <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-4 shadow-sm">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">{message.content}</p>
            <div className="flex gap-2">
              <button
                onClick={() => onAction('search_by_name')}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all text-xs font-bold"
              >
                <Type size={14} /> {message.labels?.name || 'Name'}
              </button>
              <button
                onClick={() => onAction('search_by_address')}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all text-xs font-bold"
              >
                <MapPin size={14} /> {message.labels?.address || 'Address'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 1. WELCOME CARD
  if (message.type === 'welcome_card') {
    return (
      <div className="flex justify-start mb-6 animate-in slide-in-from-bottom-2 duration-500">
        <div className="max-w-[85%] min-w-[280px] bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center border-b border-gray-100">
            <span className="text-4xl">🤖</span>
          </div>

          <div className="p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-2">
              {message.content}
            </h3>

            {/* Only show Search/Update buttons if logged in */}
            {isLoggedIn ? (
              <div className="space-y-3 mt-4">
                {session?.type === 'BUSINESS' ? (
                  <>
                    <button
                      onClick={() => onAction('search')}
                      className="w-full flex items-center justify-center gap-2 border border-blue-500 text-blue-600 bg-white hover:bg-blue-50 font-bold py-2.5 rounded-xl transition-all text-sm"
                    >
                      <Search size={16} /> Show My Business
                    </button>
                    <button
                      onClick={() => onAction('update')}
                      className="w-full flex items-center justify-center gap-2 border border-green-500 text-green-600 bg-white hover:bg-green-50 font-bold py-2.5 rounded-xl transition-all text-sm"
                    >
                      <RefreshCw size={16} /> Update My Business
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => onAction('add_new_business')}
                    className="w-full flex items-center justify-center gap-2 bg-[#4F46E5] text-white py-2.5 rounded-xl font-bold shadow-md hover:bg-[#4338ca] transition-all text-sm"
                  >
                    <PlusCircle size={16} /> Add Your Business Now
                  </button>
                )}
              </div>
            ) : (
              // Show Login / Skip if not logged in
              <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Login to access business tools</p>
                <button
                  onClick={() => onAction('login_trigger')}
                  className="w-full bg-[#4F46E5] text-white py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-[#4338ca] flex items-center justify-center gap-2"
                >
                  <LogIn size={14} /> Login Now
                </button>
                <button
                  onClick={() => onAction('skip')}
                  className="w-full mt-2 text-gray-400 text-xs hover:text-gray-600 flex items-center justify-center gap-1"
                >
                  Skip for now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. SUGGESTIONS GRID (UPGRADED PREMIUM DESIGN)
  if (message.type === 'suggestions') {
    const suggestions = Array.isArray(message.content) ? message.content : [];

    if (suggestions.length === 0) {
      return (
        <div className="flex justify-start mb-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-100 text-green-700 text-sm flex items-center gap-3 shadow-sm">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
            <span>Great job! Your profile looks complete.</span>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3 mb-6 animate-in slide-in-from-bottom-3 duration-500 max-w-[95%]">
        {/* Header Intro */}
        {message.intro && (
          <div className="flex justify-start mb-1">
            <div 
              className="p-4 bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl rounded-tl-none text-sm text-gray-800 shadow-sm leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: String(message.intro)
                  .replace(/\n/g, '<br />')
                  .replace(/\*\*(.*?)\*\*/g, '<b class="font-bold text-gray-900">$1</b>') 
              }}
            />
          </div>
        )}

        {/* The Grid of Action Tiles */}
        <div className="grid grid-cols-1 gap-3">
          {suggestions.map((item, idx) => (
            <div 
              key={idx}
              className="group bg-white rounded-2xl p-4 border border-gray-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between cursor-pointer active:scale-[0.98]"
              onClick={() => onAction('update_specific', item.field)}
            >
              {/* Highlight Bar */}
              <div className={`absolute top-0 left-0 w-1.5 h-full ${item.is_missing ? 'bg-orange-500' : 'bg-indigo-400'}`}></div>
              
              <div className="flex items-start justify-between mb-2">
                <div className={`p-2 rounded-xl ${item.is_missing ? 'bg-orange-50 text-orange-600' : 'bg-indigo-50 text-indigo-600'}`}>
                  <AlertCircle size={18} />
                </div>
                {item.is_missing && <span className="text-[9px] font-black uppercase tracking-tighter bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">Required</span>}
              </div>

              <div className="mb-4">
                <h4 className="font-bold text-gray-900 text-[13px] group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-gray-500 leading-snug mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.reason}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 group-hover:text-orange-500 transition-colors">
                <span>Update Now</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. AUTH PROMPT (UNCHANGED)
  if (message.type === 'auth_prompt') {
    return (
      <div className="flex justify-start mb-6 animate-in slide-in-from-bottom-2 duration-500">
        <div className="max-w-[85%] bg-red-50 border border-red-100 rounded-2xl p-4">
          <div className="flex items-start gap-3 mb-3">
            <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-red-700 font-medium leading-relaxed">
              {message.content}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 mt-2">
            <button
              onClick={() => onAction('login_trigger')}
              className="w-full flex items-center justify-center gap-2 bg-[#4F46E5] text-white hover:bg-[#4338ca] font-bold py-2.5 rounded-xl transition-all text-sm shadow-md"
            >
              <LogIn size={16} /> Login / Register
            </button>

            <button
              onClick={() => onAction('skip')}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 font-medium py-2 rounded-xl transition-all text-xs"
            >
              <MessageSquare size={14} /> Skip & Chat
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. DATABASE RESPONSE (UNCHANGED)
  if (message.type === 'database') {
    const items = Array.isArray(message.content) ? message.content : [];
    // console.log(items);

    if (items.length === 0) {
      return (
        <div className="flex justify-start mb-4">
          <div className="p-3.5 rounded-2xl shadow-sm text-sm bg-white border border-gray-200 text-gray-800 rounded-tl-none max-w-[75%] whitespace-pre-wrap break-words">
            No results found.
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-3 mb-4">
        {message.intro && (
          <div className="flex justify-start">
            <div className="p-3 bg-white border border-gray-100 rounded-2xl rounded-tl-none text-sm text-gray-700 shadow-sm mb-1">
              {message.intro}
            </div>
          </div>
        )}
        {items.map((biz) => (
          <div
            key={biz.global_business_id}
            className="flex justify-start animate-in fade-in"
          >
            <div className="p-3.5 rounded-2xl shadow-sm text-sm bg-white border border-gray-200 text-gray-800 rounded-tl-none max-w-[75%] whitespace-pre-wrap break-words">
              <strong>{biz.business_name}</strong><br />
              {biz.business_category}
              {biz.business_subcategory && ` • ${biz.business_subcategory}`}<br />
              {biz.website_url && (
                <a href={
                  biz.website_url.startsWith("http")
                    ? biz.website_url
                    : `https://${biz.website_url}`
                }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  🔗 Website URL
                </a>
              )}
              <br />
              📍 {biz.area ? `${biz.area}, ` : ''}{biz.city}{biz.state ? `, ${biz.state}` : ''}<br />
              ⭐ {biz.ratings}/5
            </div>
          </div>
        ))}

        {/* --- INLINE SUGGESTIONS FOR MISSING FIELDS --- */}
        {message.suggestions && message.suggestions.length > 0 && (
          <div className="flex justify-start animate-in slide-in-from-bottom-2">
             <div className="max-w-[85%] w-full bg-orange-50/50 border border-orange-100 rounded-2xl p-4">
                {/* Conversational Prompt */}
                {message.prompt && (
                  <div className="mb-3 text-sm font-bold text-gray-800">
                    {message.prompt}
                  </div>
                )}

                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={16} className="text-orange-500" />
                  <span className="text-xs font-bold text-orange-800 uppercase tracking-wider">Update Your Profile</span>
                </div>
                
                <div className="flex flex-col gap-2">
                  {message.suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => onAction('update_specific', suggestion.field)}
                      className="flex items-center justify-between p-2.5 bg-white border border-orange-100 rounded-xl hover:bg-orange-50 transition-all text-left"
                    >
                      <div className="flex flex-col overflow-hidden mr-2">
                        <span className="text-[11px] font-bold text-gray-800 truncate">{suggestion.title}</span>
                        <span className="text-[10px] text-gray-500 truncate">{suggestion.reason}</span>
                      </div>
                      <ChevronRight size={14} className="text-orange-400 shrink-0" />
                    </button>
                  ))}
                </div>
             </div>
          </div>
        )}
      </div>
    );
  }

  // 5. ONLINE RESPONSE (UNCHANGED)
  if (message.type === 'online') {
    const items = Array.isArray(message.content) ? message.content : [];

    if (items.length === 0) {
      return (
        <div className="flex justify-start mb-4">
          <div className="p-3.5 rounded-2xl shadow-sm text-sm bg-white border border-gray-200 text-gray-800 rounded-tl-none max-w-[75%] whitespace-pre-wrap break-words">
            No online results found.
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-3 mb-4">
        {items.map((biz, index) => (
          <div
            key={index}
            className="flex justify-start animate-in fade-in"
          >
            <div className="max-w-[85%] p-3.5 rounded-2xl shadow-sm text-sm bg-white border border-gray-200 text-gray-800 rounded-tl-none">
              <strong>{biz.business_name}</strong><br />
              {biz.business_category}<br />
              📍 {biz.city}, {biz.state}<br />
              ⭐ {biz.ratings}/5
              {biz.primary_phone && (
                <>
                  <br />📞 {biz.primary_phone}
                </>
              )}
              {biz.website_url && (
                <>
                  <br />
                  🔗 <a
                    href={biz.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Website
                  </a>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 6. UPDATE CONTROLS (UNDO / HISTORY / STOP)
  if (message.type === 'update_controls') {
    return (
      <div className="flex justify-start mb-4 animate-in fade-in">
        <div className="bg-white border border-gray-200 rounded-xl p-3 flex gap-2 max-w-[75%]">

          <button
            onClick={() => onAction('undo')}
            className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 transition"
          >
            ↩ Undo
          </button>

          <button
            onClick={() => onAction('history')}
            className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 transition"
          >
            🕘 History
          </button>

          <button
            onClick={() => onAction('stop_update')}
            className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition"
          >
            ✖ Stop
          </button>

        </div>
      </div>
    )
  }

  if (message.type === 'history') {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-3 max-w-[85%] shadow-sm mb-4">
        <div className="font-semibold text-sm text-gray-800 mb-2">
          🕒 Update History
        </div>

        <div className="space-y-3">
          {message.content.map(item => (
            <div
              key={item.id}
              className="text-sm border-l-4 border-indigo-400 pl-3"
            >
              <div className="text-gray-700 font-medium">
                {formatFieldName(item.field_name)}
              </div>

              <div className="text-gray-600">
                <span className="line-through text-red-500">
                  {item.old_value}
                </span>
                <span className="mx-2">→</span>
                <span className="text-green-600 font-semibold">
                  {item.new_value}
                </span>
              </div>

              <div className="text-xs text-gray-400 mt-1">
                {formatDate(item.updated_at)}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }



  // 8. MANAGE PRODUCTS (PREMIUM DESIGN)
  if (message.type === 'manage_products') {
    return (
      <div className="flex flex-col gap-3 mb-6 animate-in slide-in-from-bottom-2 duration-400">
        {message.intro && (
          <div className="flex justify-start mb-1">
            <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl rounded-tl-none text-xs font-bold text-indigo-700 shadow-sm backdrop-blur-sm">
              ✨ {message.intro}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-3">
          {message.content.map(p => (
            <div key={p.id} className="group bg-white border border-gray-100 rounded-2xl p-3 flex justify-between items-center shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div 
                  className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden border border-gray-100 shadow-inner group-hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => {
                    if (p.image_url) {
                      setActiveImage(p.image_url);
                      setIsPreviewOpen(true);
                    }
                  }}
                >
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl">📦</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors">{p.name}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100 shadow-sm">₹ {p.price}</span>
                    {p.category && <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{p.category}</span>}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => onAction('delete_product', p.id)}
                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 active:scale-90"
                title="Delete Product"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* IMAGE PREVIEW MODAL */}
        {isPreviewOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <button 
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
            >
              <X size={24} />
            </button>
            <img 
              src={activeImage} 
              className="max-w-full max-h-full rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300" 
              alt="Preview" 
            />
          </div>
        )}
      </div>
    )
  }

  // 9. MANAGE DEALS (PREMIUM DESIGN)
  if (message.type === 'manage_deals') {
    return (
      <div className="flex flex-col gap-3 mb-6 animate-in slide-in-from-bottom-2 duration-400">
        {message.intro && (
          <div className="flex justify-start mb-1">
            <div className="p-3 bg-pink-50/50 border border-pink-100 rounded-xl rounded-tl-none text-xs font-bold text-pink-700 shadow-sm backdrop-blur-sm">
              🔥 {message.intro}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-3">
          {message.content.map(d => (
            <div key={d.id} className="group bg-white border border-gray-100 rounded-2xl p-3.5 flex justify-between items-center shadow-sm hover:shadow-md hover:border-pink-100 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-pink-50/30 rounded-xl flex items-center justify-center text-xl shadow-inner group-hover:scale-105 transition-transform">
                  🏷️
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-gray-900 group-hover:text-pink-600 transition-colors">{d.title}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[12px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-lg border border-pink-100 shadow-sm">{d.discount_pct}% OFF</span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Until {d.expiry_date}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => onAction('delete_deal', d.id)}
                className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 active:scale-90"
                title="Delete Deal"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // 7. STANDARD TEXT / FAQ (SAFE STRING RENDER)
  return (
    <div
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4 min-w-0`}
    >
        <div
          className={`
            max-w-[72%]
            min-w-0
            px-3.5 py-3
            rounded-2xl
            text-sm
            leading-relaxed
            whitespace-pre-wrap
            break-words
            overflow-hidden
            ${isBot
              ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
              : 'bg-[#4F46E5] text-white rounded-tr-none shadow-md'
            }
          `}
          dangerouslySetInnerHTML={{ 
            __html: String(message.content)
              .replace(/\n/g, '<br />')
              .replace(/\*\*(.*?)\*\*/g, '<b class="font-bold text-gray-900">$1</b>') 
          }}
        />
    </div>
  );


};

export default MessageItem;