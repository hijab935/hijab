const fs = require("fs");
module.exports.config = {
	name: "Khana",
    version: "1.1.1",
	hasPermssion: 0,
	credits: "PREM BABU", 
	description: "Just Respond",
	commandCategory: "no prefix",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	let react = event.body.toLowerCase();
	if(react.includes("KHANA") ||
     react.includes("khana") || react.includes("lunch") ||  react.includes("nasta") || 
react.includes("breakfast") ||
react.includes("dinner") ||
react.includes("khaa lo")) {
		var msg = {
				body: `💝𝐌𝐚𝐝𝐞 𝐁𝐲:-☞𝐗𝐃 𝐊𝐈𝐍𝐆☜\n🙂𝐀𝐀𝐎 𝐁𝐀𝐁𝐘 𝐌𝐄𝐑𝐄 𝐒𝐀𝐓𝐇 𝐊𝐇𝐀𝐎 𝐊𝐇𝐀𝐍𝐀🙂`,attachment: fs.createReadStream(__dirname + `/noprefix/khana.gif`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🍲", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

      }
