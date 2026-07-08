const express = require('express');
const app = express();
const { makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is running! ⚡');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    
    const sock = makeWASocket({ 
        auth: state, 
        printQRInTerminal: false,
        browser: ["Ridoy Raj Bot", "Chrome", "1.0.0"]
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== 401;
            if (shouldReconnect) connectToWhatsApp();
        } else if (connection === 'open') {
            console.log('Bot Connected Successfully! 🚀');
        }
    });

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const from = msg.key.remoteJid;
        const text = (msg.message.conversation || msg.message.extendedTextMessage?.text || "").toLowerCase();

        if (text.includes('hi')) {
            await sock.sendMessage(from, { text: "আসসালামু আলাইকুম! RIDOY RAJ FF HOLOGRAM PANEL-এ আপনাকে স্বাগতম। 🎮\n\nআমাদের প্যানেলের বিশেষত্ব:\n✅ ১০০% মেইন আইডি নিরাপদ\n🚫 আইডি ব্যান হবে না\n🚫 ব্ল্যাক লিস্টে পড়বে না\n🛡️ এন্টি ব্যান সিস্টেম যুক্ত\n\nআমাদের প্যানেলগুলো দেখতে 'Menu' লিখুন। ✨" });
        } 
        else if (text.includes('menu')) {
            await sock.sendMessage(from, { text: "আমাদের প্যানেলগুলো সম্পর্কে জানতে নিচের কমান্ডগুলো ব্যবহার করুন: 📋\n\n* টুর্নামেন্ট প্যানেল রিভিউ দেখতে টাইপ করুন: Tournament 🏆\n* BRCS প্যানেল রিভিউ দেখতে টাইপ করুন: BRCS 💎\n* প্যানেল ক্রয় করতে টাইপ করুন: Buy Panel 💥\n* সাপোর্ট পেতে টাইপ করুন: Support 🛠️" });
        } 
        else if (text.includes('tournament')) {
            await sock.sendMessage(from, { text: "এখানে টুর্নামেন্ট প্যানেল-এর রিভিউ ভিডিও দেওয়া হলো: 🏆\n\nhttps://vt.tiktok.com/ZSCT4xTxb/" });
        } 
        else if (text.includes('brcs')) {
            await sock.sendMessage(from, { text: "এখানে BRCS প্যানেল-এর রিভিউ ভিডিও দেওয়া হলো: 💎\n\nhttps://vt.tiktok.com/ZSCT4Sawu/" });
        } 
        else if (text.includes('buy panel')) {
            await sock.sendMessage(from, { text: "আমাদের প্যানেলগুলো ৩ মাসের জন্য দেওয়া হয়। প্রাইস লিস্ট নিচে দেওয়া হলো: 💥\n\n🏆 টুর্নামেন্ট প্যানেল (৩ মাস): ৩৫০ টাকা\n💎 BRCS প্যানেল (৩ মাস): ৩০০ টাকা\n💥 বিশেষ অফার: দুটি প্যানেল একসাথে নিলে মাত্র ৪০০ টাকা! 🔥\n\nপেমেন্ট করার জন্য আমাদের বিকাশ নম্বর:\n01727671230 💰\n\nপেমেন্ট সম্পন্ন করে নিচের তথ্যগুলো সঠিকভাবে লিখে পাঠান:\n১. আপনার নাম:\n২. বিকাশ লাস্ট ৪ ডিজিট:\n৩. ট্রানজেকশন আইডি: ✅" });
        } 
        else if (text.includes('support')) {
            await sock.sendMessage(from, { text: "যেকোনো সমস্যার জন্য আমাদের সাপোর্টে যোগাযোগ করুন। আমাদের টিম দ্রুত আপনার সাথে যোগাযোগ করবে। 🛠️🤝" });
        }
    });
}

connectToWhatsApp();
