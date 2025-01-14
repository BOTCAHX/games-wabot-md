import uploadFile from "../lib/uploadFile.js";
import uploadImage from "../lib/uploadImage.js";
let handler = async (m, { conn, text }) => {
    let [t1, t2] = text.split `|`;
    if (!t1)
        throw 'No Text';
    if (!t2) {
        t2 = t1;
        t1 = '';
    }
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime)
        throw `Unknown Mimetype`;
    if (!/image\/(jpe?g|png)/.test(mime))
        throw `Mime ${mime} tidak support`;
    let img = await q.download();
    let link = await uploadImage(img).catch(e => uploadFile(img));
    conn.sendFile(m.chat, global.API('https://api.memegen.link', `/images/custom/${encodeURIComponent(t1)}/${encodeURIComponent(t2)}.png`, {
        background: link
    }), 'meme.png', `Nih :|`, m);
};
handler.help = ['memeg'].map(v => v + '<apa|apa>');
handler.tags = ['tools'];
handler.command = /^(memeg)$/i;
export default handler;
