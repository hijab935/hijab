module.exports.config = {
  name: "leave",
  version: "1.0.1",
  hasPermssion: 2,
  credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 + Raj Edit",
  description: "Bot leaves the group (no prefix)",
  commandCategory: "Admin",
  usages: "out [tid]",
  cooldowns: 3,
  usePrefix: false // ✅ no prefix
};

module.exports.handleEvent = async function({ api, event }) {
  const message = event.body?.toLowerCase();
  const senderID = event.senderID;

  if (!message) return;

  // ✅ Trigger words (you can change this)
  if (message === "bot nikal ja yha se" || message === "left ho ja" || message === "nikal yha se") {
    // Only allow Admins to use this
    const threadInfo = await api.getThreadInfo(event.threadID);
    const adminIDs = threadInfo.adminIDs.map(e => e.id);
    if (!adminIDs.includes(senderID)) return;

    return api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
  }
};

module.exports.run = async function({ api, event, args }) {
  const tid = args.join(" ");
  if (!tid) return api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);

  try {
    await api.removeUserFromGroup(api.getCurrentUserID(), tid);
    return api.sendMessage("The bot has left this group", event.threadID, event.messageID);
  } catch (err) {
    return api.sendMessage("❌ Unable to leave group. Check TID or permissions.", event.threadID);
  }
};
