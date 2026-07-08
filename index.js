// RIDOY RAJ FF HOLOGRAM PANEL BOT
const { makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    const sock = makeWASocket({ auth: state });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const from = msg.key.remoteJid;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

        // ওয়েলকাম মেসেজ
        if (text && text.toLowerCase() === 'hi') {
            await sock.sendMessage(from, { text: "আসসালামু আলাইকুম! RIDOY RAJ FF HOLOGRAM PANEL-এ আপনাকে স্বাগতম। 🎮\nআমাদের প্যানেলগুলো দেখতে 'Menu' লিখুন।" });
        }

        // মেনু অপশন
        if (text === 'Menu') {
            await sock.sendMessage(from, { text: "আমাদের প্যানেলগুলো সম্পর্কে জানতে নিচের কমান্ডগুলো ব্যবহার করুন:\n\n* টুর্নামেন্ট প্যানেল রিভিউ দেখতে টাইপ করুন: Tournament\n* BRCS প্যানেল রিভিউ দেখতে টাইপ করুন: BRCS\n* প্যানেল ক্রয় করতে টাইপ করুন: Buy Panel\n* সাপোর্ট পেতে টাইপ করুন: Support" });
        }

        // টুর্নামেন্ট প্যানেল রিভিউ
        if (text === 'Tournament') {
            await sock.sendMessage(from, { text: "এখানে টুর্নামেন্ট প্যানেল-এর রিভিউ ভিডিও দেওয়া হলো:\n\nhttps://vt.tiktok.com/ZSCT4xTxb/" });
        }

        // BRCS প্যানেল রিভিউ
        if (text === 'BRCS') {
            await sock.sendMessage(from, { text: "এখানে BRCS প্যানেল-এর রিভিউ ভিডিও দেওয়া হলো:\n\nhttps://vt.tiktok.com/ZSCT4Sawu/" });
        }

        // প্যানেল ক্রয় (প্রাইস লিস্ট)
        if (text === 'Buy Panel') {
            await sock.sendMessage(from, { text: "আমাদের প্যানেলগুলো ৩ মাসের জন্য দেওয়া হয়। প্রাইস লিস্ট নিচে দেওয়া হলো:\n\n🏆 টুর্নামেন্ট প্যানেল (3 মাস): 350 টাকা\n💎 BRCS প্যানেল (3 মাস): 300 টাকা\n💥 স্পেশাল অফার: দুটি প্যানেল একসাথে নিলে মাত্র 400 টাকা!\n\nপেমেন্ট করার জন্য আমাদের বিকাশ নম্বর (কপি করতে নাম্বারে লং প্রেস করুন):\n\n01727671230\n\nপেমেন্ট সম্পন্ন করে নিচের তথ্যগুলো সঠিকভাবে লিখে পাঠান:\n১. আপনার নাম:\n২. বিকাশ লাস্ট 4 ডিজিট:\n৩. ট্রানজেকশন আইডি:" });
        }

        // সাপোর্ট
        if (text === 'Support') {
            await sock.sendMessage(from, { text: "যেকোনো সমস্যার জন্য আমাদের সাপোর্টে যোগাযোগ করুন। আমাদের টিম দ্রুত আপনার সাথে যোগাযোগ করবে।" });
        }
    });
}

connectToWhatsApp();
