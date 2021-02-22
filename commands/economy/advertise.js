const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "advertise",
    aliases: ["ad"],
    run: async (bot, message, args) => {

        
            let timeoutWorked = 3600000
            let advertised = db.fetch(`advertised_${message.author.id}`)
            let views = Math.floor(Math.random() * 20) + 50;

            if(advertised !== null && timeoutWorked - (Date.now() - advertised) > 0) {
                let time = ms(timeoutWorked - (Date.now() - advertised));
                const Embed = new MessageEmbed()
                    .setTitle(`Woah there, slow it down man`)
                    .setThumbnail("https://cdn.discordapp.com/emojis/683981662106943488.png?v=1")
                    .setColor('RANDOM')
                    .setDescription(`⛔ | Chilll with the ads duude. Wait **${time.minutes}m and ${time.seconds}s**\nDefault cooldown is \`59m and 59s\``)
                    .addField(`** **`, `In the meantime, you can chat with other members. Or, maybe you can tell us a little about yourself!`)
                message.channel.send(Embed);
            } else {
                let amountEarned = Math.floor(Math.random() * 10) + 1

               message.channel.send({embed: {color: 'GREEN', description: `✅ | Your advertisment went worldwide and got **${views} views**. You earned **${amountEarned} dollars**, good job.`}})

                db.add(`coins_${message.author.id}`, amountEarned)
                db.set(`advertised_${message.author.id}`, Date.now())
                
                
        }
    }
}