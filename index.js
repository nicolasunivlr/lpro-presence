require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const hours = process.env.HOURS.split(",");

const sended = [];

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const channel = client.channels.cache.get(process.env.CHANNEL_ID);
  checkTimeLoop(channel);
});

const checkTimeLoop = (channel) => {
  setInterval(() => {
    const d = new Date();
    // Check date match and not already sended
    const dateCutHours = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDay(),
      d.getHours()
    );
    if (
      hours.includes(d.getHours().toString()) &&
      !sended.includes(dateCutHours.toString())
    ) {
      try {
        channel.send("N'oubliez pas de signer votre fiche de présence! 😃");
        console.log("message sended");
      } catch (e) {
        console.error(e);
      }
      sended.push(dateCutHours.toString());
    }
  }, 1000 * 10); // 10 sec
};

client.login(process.env.BOT_TOKEN);
