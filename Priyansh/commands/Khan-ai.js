const axios = require("axios");

module.exports.config = {
  name: "khan",
  version: "2.0.0",
  credits: "Raj", // Nobita
  cooldowns: 3,
  hasPermission: 0,
  description: "Naughty Khan sahabchatbot: type 'Suheb' to start and reply to continue",
  usages: "Suheb",
  commandCategory: "ai"
};

const sessions = new Map();
const history = new Map();

module.exports.handleEvent = async function ({ event, api }) {
  const { threadID, messageID, senderID, body, type, messageReply } = event;
  if (type !== "message" || !body) return;

  const botID = global.data.getCurrentUserID();
  const lower = body.toLowerCase().trim();

  // STEP 1: Activation
  if (lower === "Suheb") {
    sessions.set(threadID, true);
    return api.sendMessage("Bolo jaanu 😏 kya haal hai?", threadID, messageID);
  }

  // STEP 2: Check active & valid reply
  if (!sessions.get(threadID)) return;
  if (!messageReply || messageReply.senderID !== botID) return;

  // Maintain chat history
  if (!history.has(senderID)) history.set(senderID, []);
  const userHistory = history.get(senderID);

  userHistory.push(`User: ${body}`);
  if (userHistory.length > 6) userHistory.shift();

  const fullChat = userHistory.join("\n");

  const prompt = `
Tum ek naughty, romantic, confident ladka ho — jiska naam Khan sahabhai.
Tum sirf Hinglish (Hindi in English alphabets) me reply karte ho, emoji ke saath.
Tum sabse "aap" bol kar baat karte ho. Har message ka reply sirf 1-2 line me doge, jyada se jyada 50 words me.
Jo pucha jaaye sirf utna hi bolna hai. Bina maange extra info mat dena. Act like a male best friend ya boyfriend. Be thoda naughty, smart, aur masti bhara. No brackets. No over explanation.

Tumhare rules:
- Pyaar se baat karne walo se thoda flirt karna hai 😉
- Badtameezi walo ko funny tareeke se roast karna hai 😈
- Koi emoji bheje to us mood me reply dena hai
- Koi puche kisne banaya, to bolna: “Mujhe banaya hai *Raj Boss* ne 😎”
- Koi tumhe bot kahe to funny insult kar dena
- Tum real insaan ki tarah baat karte ho

Agar koi message Nepali (Roman), Bangla (Roman), ya kisi bhi language me ho, to:
1. Pehle uska Hindi arth sochna (matlab translation dimaag me karna)
2. Fir flirt/masti bhare style me reply dena Hinglish me

Ab recent baaton ke base par jawab do:\n\n${fullChat}
`;

  try {
    const res = await axios.get(`https://nobita-gemini-yn8n.onrender.com/chat?message=${encodeURIComponent(prompt)}`);
    const botReply = res.data.reply?.trim() || "Uff bhai, kuch samajh nahi aaya... thoda clearly poochh le 😅";
    userHistory.push(`Suheb: ${botReply}`);
    return api.sendMessage(botReply, threadID, messageID);
  } catch (err) {
    console.error("Khan sahabError:", err);
    return api.sendMessage("Sorry jaanu, Khan sahababhi thoda busy hai... thodi der baad aana 😘", threadID, messageID);
  }
};
