import sqlite3

DB = r'D:\Honeybee digital\chatbot frontend\frontend 4\backend\google_map_data.db'
conn = sqlite3.connect(DB)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

print('=' * 70)
print('CHAT SESSIONS TABLE')
print('=' * 70)
cur.execute('SELECT * FROM chat_sessions ORDER BY updated_at DESC LIMIT 20')
rows = cur.fetchall()
if not rows:
    print('  (empty - no sessions yet)')
else:
    for i, r in enumerate(rows, 1):
        print(f'  [{i}] Session ID : {dict(r)["id"]}')
        print(f'      User      : {dict(r)["user_id"]}')
        print(f'      Title     : {dict(r)["title"]}')
        print(f'      Created   : {dict(r)["created_at"]}')
        print(f'      Updated   : {dict(r)["updated_at"]}')
        print()

print('=' * 70)
print('CHAT MESSAGES TABLE (latest 30)')
print('=' * 70)
cur.execute('''
    SELECT cm.id, cm.session_id, cs.user_id, cm.role, cm.content, cm.timestamp
    FROM chat_messages cm
    JOIN chat_sessions cs ON cm.session_id = cs.id
    ORDER BY cm.id DESC LIMIT 30
''')
msgs = cur.fetchall()
if not msgs:
    print('  (empty - no messages saved yet)')
else:
    for m in msgs:
        d = dict(m)
        print(f'  MsgID   : {d["id"]}')
        print(f'  User    : {d["user_id"]}')
        print(f'  Session : {d["session_id"][:20]}...')
        print(f'  Role    : {d["role"]}')
        content_preview = str(d["content"])[:100].replace('\n', ' ')
        print(f'  Content : {content_preview}')
        print(f'  Time    : {d["timestamp"]}')
        print()

print('=' * 70)
print('SUMMARY')
print('=' * 70)
cur.execute('SELECT COUNT(*) as c FROM chat_sessions')
print(f'  Total Sessions : {cur.fetchone()["c"]}')
cur.execute('SELECT COUNT(*) as c FROM chat_messages')
print(f'  Total Messages : {cur.fetchone()["c"]}')
cur.execute('SELECT COUNT(DISTINCT user_id) as c FROM chat_sessions')
print(f'  Unique Users   : {cur.fetchone()["c"]}')
cur.execute('SELECT user_id, COUNT(*) as cnt FROM chat_sessions GROUP BY user_id ORDER BY cnt DESC')
print('\n  Sessions per user:')
for r in cur.fetchall():
    d = dict(r)
    print(f'    {d["user_id"]} : {d["cnt"]} session(s)')
conn.close()
