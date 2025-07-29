module.exports.config = {
  name: "beta",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "Raj",
  description: "No prefix reply only to Papa and Mom UID when they say 'beta'",
  commandCategory: "fun",
  usages: "beta",
  cooldowns: 3,
  usePrefix: false // 🔓 No prefix needed
};

module.exports.handleEvent = async function ({ api, event }) {
  const papaUID = "61577345783888"; // 🔁 Replace with your Papa's Facebook UID
  const momUID = "100098765432109";  // 🔁 Replace with your Mom's Facebook UID
  const sender = event.senderID;
  const message = event.body?.toLowerCase();

  if (!message || message !== "beta") return;

  if (sender === papaUID) {
    const papaReplies = [
      "Bolo Papa ji 👨‍🦳, beta hazir hai 🫡",
      "Papa ❤️ aap aaye toh ghar roshan ho gaya 💡",
      "Papa ji 😄 kuch kaam bolo na!",
      "Papa, chai bana doon? ☕",
      "Papa, aaj bhi school mat bhejna 🥲"
    ];
    const reply = papaReplies[Math.floor(Math.random() * papaReplies.length)];
    return api.sendMessage(reply, event.threadID, event.messageID);
  }

  if (sender === momUID) {
    const momReplies = [
      "Maa ji 🥹 aapki yaad aa gayi!",
      "Mummy 😘 kuch khila do please!",
      "Maa ❤️ aapka beta bhukhha hai 🍽️",
      "Mummy, homework kar liya 🤓",
      "Maa, bina bataye kahan chali gayi thi 😭"
    ];
    const reply = momReplies[Math.floor(Math.random() * momReplies.length)];
    return api.sendMessage(reply, event.threadID, event.messageID);
  }

  // ❌ Ignore if message is not from papa/mom
  return;
};

module.exports.run = () => {};
