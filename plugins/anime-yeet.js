import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix }) => {
    let res = await fetch('https://api.waifu.pics/sfw/yeet')
    if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.url) throw 'Error!'
    conn.sendButton(m.chat, 'YEET', author, json.url, [['next', `${usedPrefix}yeet`]], m)
}
handler.help = ['yeet']
handler.tags = ['Anime']
handler.command = /^(yeet)$/i
//MADE IN ERPAN 1140 BERKOLABORASI DENGAN BTS
export default handler