const Discord = require('discord.js');

module.exports = {
  name: "ping",
  aliases: ["pi", "ms", "latency"],
  category: "Information",
  description: "Returns Latency and API Latency.",
  run: async (client, message, args) => {

const moment = require("moment");
require('moment-duration-format');

const actividad = moment.duration(client.uptime).format(" D [days], H [hours], m [minutes], s [seconds]");
    

    
      message.channel.startTyping(7);
      
        const msg = await message.channel.send(`🏓 Pinging....`);
    
       message.channel.stopTyping(true);
    
        msg.edit(`🏓 Pong! Bot latency is ${Math.floor(msg.createdAt - message.createdAt)}ms\n` + `:telephone: API latency is ${Math.floor(message.client.ws.ping)}ms\n` +`:coffee: I have been up for ${actividad}`);
    


  }
}
