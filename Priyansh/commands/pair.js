const { loadImage, createCanvas } = require("canvas");
const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
  name: "pair",
  version: "1.0.0",
  author: "xemon | Converted by Raj",
  countDown: 5,
  role: 0,
  shortDescription: "Pair two people",
  longDescription: "Randomly pairs two users based on gender",
  category: "love",
  guide: "{pn}"
};

module.exports.run = async function ({ api, event, usersData }) {
  const pathImg = __dirname + "/cache/pairbg.png";
  const pathAvt1 = __dirname + "/cache/pair1.png";
  const pathAvt2 = __dirname + "/cache/pair2.png";

  const id1 = event.senderID;
  const name1 = (await usersData.get(id1))?.name || "User 1";

  const threadInfo = await api.getThreadInfo(event.threadID);
  const all = threadInfo.userInfo;
  let gender1 = "OTHER";

  for (let user of all) {
    if (user.id == id1) {
      gender1 = user.gender === 1 ? "FEMALE" : user.gender === 2 ? "MALE" : "OTHER";
    }
  }

  const botID = api.getCurrentUserID();
  let candidates = [];

  if (gender1 === "FEMALE") {
    candidates = all.filter(u => u.gender === 2 && u.id !== id1 && u.id !== botID).map(u => u.id);
  } else if (gender1 === "MALE") {
    candidates = all.filter(u => u.gender === 1 && u.id !== id1 && u.id !== botID).map(u => u.id);
  } else {
    candidates = all.filter(u => u.id !== id1 && u.id !== botID).map(u => u.id);
  }

  if (candidates.length === 0) {
    return api.sendMessage("⚠️ No suitable match found!", event.threadID, event.messageID);
  }

  const id2 = candidates[Math.floor(Math.random() * candidates.length)];
  const name2 = (await usersData.get(id2))?.name || "User 2";

  const matchPercent = Math.floor(Math.random() * 100) + 1;

  const backgrounds = [
    "https://i.postimg.cc/wjJ29HRB/background1.png",
    "https://i.postimg.cc/zf4Pnshv/background2.png",
    "https://i.postimg.cc/5tXRQ46D/background3.png"
  ];
  const backgroundURL = backgrounds[Math.floor(Math.random() * backgrounds.length)];

  const userInfo1 = await api.getUserInfo(id1);
  const userInfo2 = await api.getUserInfo(id2);
  const avatarURL1 = userInfo1[id1]?.thumbSrc || "";
  const avatarURL2 = userInfo2[id2]?.thumbSrc || "";

  const avatar1 = (await axios.get(avatarURL1, { responseType: "arraybuffer" })).data;
  fs.writeFileSync(pathAvt1, Buffer.from(avatar1, "utf-8"));

  const avatar2 = (await axios.get(avatarURL2, { responseType: "arraybuffer" })).data;
  fs.writeFileSync(pathAvt2, Buffer.from(avatar2, "utf-8"));

  const background = (await axios.get(backgroundURL, { responseType: "arraybuffer" })).data;
  fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));

  const baseImage = await loadImage(pathImg);
  const baseAvt1 = await loadImage(pathAvt1);
  const baseAvt2 = await loadImage(pathAvt2);

  const canvas = createCanvas(baseImage.width, baseImage.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(baseAvt1, 100, 150, 300, 300);
  ctx.drawImage(baseAvt2, 900, 150, 300, 300);

  const finalBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, finalBuffer);

  fs.removeSync(pathAvt1);
  fs.removeSync(pathAvt2);

  return api.sendMessage({
    body: `💞Successful pairing!\n💌Wish you two hundred years of happiness. 🥰\nMay you both always be happy🙂\n👫 ${name1} + ${name2}\n❤️ Match Percentage: ${matchPercent}%`,
    mentions: [{ tag: name2, id: id2 }],
    attachment: fs.createReadStream(pathImg)
  }, event.threadID, () => fs.unlinkSync(pathImg), event.messageID);
};
