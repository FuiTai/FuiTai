const { executionAsyncResource } = require("async_hooks");
const { MessageEmbed, DiscordAPIError, Channel } = require("discord.js");
  
const Discord = require('discord.js');
const bot = new Discord.Client();
module.exports = {
    name: 'coinflip',
    run: async (bot, message, args) => {
        let number = Math.floor(Math.random() * 2);
        if (number == 1) {
            let coinflip = new MessageEmbed()
                 .setColor(15002111)
                 .setTitle("Coin Flip")
                 .addField("The coinflip landed on:", "__Heads__")
                 .setThumbnail("https://i.ibb.co/G97XGrF/download.jpg")
                 .setFooter("Powered by AxDer#9242", "https://i.ibb.co/G97XGrF/download.jpg");
            message.channel.send(coinflip);
        }
        if (number == 0) {
            let coinflip = new MessageEmbed()
                 .setColor(15002111)
                 .setTitle("Coin Flip")
                 .addField("The coinflip landed on:", "__Tails__")
                 .setThumbnail("https://i.ibb.co/G97XGrF/download.jpg")
                 .setFooter("Powered by AxDer#9242", "https://i.ibb.co/G97XGrF/download.jpg");
            message.channel.send(coinflip);

        }
    }
};