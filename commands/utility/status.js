const Discord = require("discord.js");
const { promisify } = require("util");
const cpuStat = require("cpu-stat");
const p = promisify(cpuStat.usagePercent);

module.exports = {
    name: "status",
    category: "Info",
    aliases: ["stats", "botstats"],
    description: "Check my status in Discord.",
    run: async (client, message, args) => {
      
      let percent = await p();

const moment = require("moment");
require('moment-duration-format');

const actividad = moment.duration(client.uptime).format(" D [days], H [hours], m [minutes], s [seconds]");
    
    
const embed = new Discord.MessageEmbed()
.setColor("PURPLE")

.setAuthor(`Bot Stats`, client.user.avatarURL())
.addField(`Developer`, `Jimmy.deb#0001`, true)
.addField(`Version`, `1.0.1`, true)
.addField(`Library`, `Discord.js 12.3.1`, true)

.addField(`Memory (RAM Usage)`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
.addField(`Uptime`, `${actividad}`, true)
.addField(`Servers`, `${client.guilds.cache.size}`, true)

.addField(`Users`, `${client.users.cache.size}`, true)
.addField(`Text Channels`, `${client.channels.cache.size}`, true)
.addField(`Voice Connections`, `${client.voice.connections.size}`, true)

.addField(`Links`, `
          [Support me!](https://www.paypal.com/paypalme/808Jimmy)
          [Invite me!](https://tinylink.net/meik0)`, true)


.addField(`CPU`, "`Intel(R) Xeon(R) CPU E5-2670 0 v8 @ 2.60GHz`", true)
.addField("CPU Usage", `\`${percent.toFixed(2)}%\``, true)

.setTimestamp()

message.channel.send(embed);
      
    }
}
