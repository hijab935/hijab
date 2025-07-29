module.exports.config = {
  name: "beta",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Raj",
  description: "Funny replies when someone says 'beta'",
  commandCategory: "fun",
  usages: "beta",
  cooldowns: 2,
  usePrefix: false // 🔥 No prefix needed!
};

module.exports.run = async function ({ api, event }) {
  const mammiUID = "100000000000001"; // 👩‍🍼 Mammi UID here
  const papaUID = "61577345783888";  // 👨 Papa UID here

  const msg = event.body?.toLowerCase().trim();
  if (msg !== "beta") return;

  // 👩 Mammi's savage + sweet replies
  const mammiReplies = [
    "Beta ji, khaana thanda ho gaya... memes baad me 🙄",
    "Bas beta bolne se kaam nahi chalega, jhaadu bhi lagao 😂",
    "Beta, mummy bhi kabhi rest kare? 😩",
    "Kya beta, toothpaste bhi finish kar diya? 🤨",
    "Beta beta mat kar, mummy gussa ho gayi 😤"
  ];

  // 👨 Papa's strict + funny replies
  const papaReplies = [
    "Beta, WiFi ka password change kar diya ab 😏",
    "Papa ke paise se attitude la rahe ho? 😒",
    "Beta, papa hu main... Google nahi 😑",
    "Mujhe papa mat bula jab tak job nahi lagti 💼",
    "Beta ji, electricity bill bhar diya ho to bolna 💡"
  ];

  // 🌍 Others' savage meme replies
  const otherReplies = [
    "Beta bolke baap banne ka try kar raha hai kya? 🤡",
    "Beta ho ya bandwidth? Lag hi nahi rahe 😂",
    "Mere saamne beta mat ban... baap online hai 😎",
    "Beta kehke kya prove karega? 😏",
    "Tu beta nahi, background noise hai 🔇"
  ];

  let reply;
  if (event.senderID === mammiUID) {
    reply = mammiReplies[Math.floor(Math.random() * mammiReplies.length)];
  } else if (event.senderID === papaUID) {
    reply = papaReplies[Math.floor(Math.random() * papaReplies.length)];
  } else {
    reply = otherReplies[Math.floor(Math.random() * otherReplies.length)];
  }

  return api.sendMessage(reply, event.threadID, event.messageID);
};
