import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ChatArea from '../components/chat/ChatArea';

export default function ChatPage(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [initialQuery, setInitialQuery] = useState(null);
  const initialActionRef = useRef(null);

  // Read ?q= URL param and forward it to ChatArea as initial query
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setInitialQuery(q);
      // Remove from URL after capturing
      setSearchParams({}, { replace: true });
    }
  }, []);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <ChatArea
        {...props}
        initialQuery={initialQuery}
        onClearInitialQuery={() => setInitialQuery(null)}
        initialAction={initialActionRef.current}
        onClearInitialAction={() => { initialActionRef.current = null; }}
      />
    </div>
  );
}
