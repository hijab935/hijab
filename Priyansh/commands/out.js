module.exports.config = {
  name: "leave",
  version: "1.0.3",
  hasPermssion: 2,
  credits: "Raj",
  description: "Bot leaves group with custom message",
  commandCategory: "Admin",
  usages: "leave",
  cooldowns: 3,
  usePrefix: false // ✅ No Prefix
};

module.exports.handleEvent = async function({ api, event }) {
  const message = event.body?.toLowerCase();
  const senderID = event.senderID;

  if (!message) return;

  // ✅ Trigger phrases
  if (message === "nikal yha se" || message === "nikal group se" || message === "exit group") {
    // Check if sender is admin
    const threadInfo = await api.getThreadInfo(event.threadID);
    const adminIDs = threadInfo.adminIDs.map(e => e.id);
    if (!adminIDs.includes(senderID)) return;

    const farewell = "Ok 🅧D 🅚I🅝G🧚🩷🎸Boss Ja Rahi hu Group se 🥰";

    await api.sendMessage(farewell, event.threadID);
    setTimeout(() => {
      api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
    }, 2000);
  }
};

module.exports.run = async function({ api, event, args }) {
  const tid = args[0];
  if (!tid) return api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);

  const farewell = "ok malik ja rhi";

  await api.sendMessage(farewell, event.threadID);
  setTimeout(() => {
    api.removeUserFromGroup(api.getCurrentUserID(), tid);
  }, 2000);
};