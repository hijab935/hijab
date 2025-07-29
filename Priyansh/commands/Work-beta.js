module.exports.config = {
  name: "beta",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Raj",
  description: "Sirf papa aur mom UID par beta jaisa reply de",
  commandCategory: "fun",
  usages: "beta",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event }) {
  const papaUID = "1000xxxxxxxxxx"; // 🔁 Replace with papa ka UID
  const momUID = "61577345783888";  // 🔁 Replace with mom ka UID

  const sender = event.senderID;

  if (sender !== papaUID && sender !== momUID) return;

  const papaReplies = [
    "Bolo Papa, beti yahin hai apki ❤️",
    "Papa ji, aapki beti hazir hai 😄",
    "Papa, kuch kaam bola hota to batao 😌",
    "Aap aaye toh group ki roshni badh gayi papa g 😇"
  ];

  const momReplies = [
    "Maa ❤️, aapka beta yahin hai!",
    "Mumma ji 😍 kuch khilao na!",
    "Maa, padhai kar raha hoon 😅",
    "Mummy 😘 mujhe yaad aayi aapki roti 🍽️"
  ];

  const replyList = sender === papaUID ? papaReplies : momReplies;
  const reply = replyList[Math.floor(Math.random() * replyList.length)];

  return api.sendMessage(reply, event.threadID, event.messageID);
};
