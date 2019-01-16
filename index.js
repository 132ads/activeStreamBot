// Reqs for bot
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({
  disableEveryone: true
});

// Setting bot activity status and performing console log to verify bot is working.
bot.on("ready", () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("Supporting Streamers!")
});
// On presence update, will check for streaming and add role when detects change in presence that is a twitch stream.
bot.on("presenceUpdate", (oldMember, newMember) => {
            let streamer = newMember.guild.roles.find(role => role.name === "Streamer");
            if (oldMember.presence.game != null) {
              if (oldMember.presence.game.url != null) {
                if (oldMember.presence.game.url.slice(0,21) == "https://www.twitch.tv") {
                  newMember.removeRole(streamer);
                  //console.log(newMember)
                  console.log("Removed streamer role from", newMember.user.username)
                }
              }
            }
            if (newMember.presence.game != null) {
              if (newMember.presence.game.url != null) {
                if (newMember.presence.game.url.slice(0,21) == "https://www.twitch.tv") {
                  newMember.addRole(streamer);
                  console.log(newMember)
                  console.log("Added role from", newMember.user.username)
                }
              }
            }
        })
bot.login(botconfig.token);
