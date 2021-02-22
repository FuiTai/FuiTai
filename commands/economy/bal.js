const Discord = require('discord.js');
const db = require ('quick.db');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "balance",
    aliases: ["bal", "Bal", "bAl", "BAL", "baL", "BaL", "bAL", "BAl"],
    run: async (bot, message, args) => {
        
        

            let user = message.mentions.users.first() || message.author;
            let money = db.fetch(`coins_${user.id}`);
            let bank = db.fetch(`bank1_${user.id}`);

            if (money === null) money = 0
            if (bank === null) bank = 0

            const Embed  = new MessageEmbed()             
                .setColor('GREEN')  
                .setTitle(`${user.username}\'s balance`)
                .setDescription(`:money_with_wings:**Wallet:** ${money}\n:bank:**Bank:** ${bank}\n:moneybag:**Total:** ${money + bank}`)
            message.channel.send(Embed);

    }
}
