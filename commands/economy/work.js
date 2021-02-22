const Discord = require('discord.js');
const ms = require('parse-ms');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "work",
    run: async (bot, message, args) => {


            let timeoutWorked = 3600000;
            let worked = db.fetch(`worked_${message.author.id}`);

            if(worked !== null && timeoutWorked - (Date.now() - worked) > 0) {
                let time = ms(timeoutWorked - (Date.now() - worked));
                const Embed = new MessageEmbed()
                    .setTitle(`Woah there, slow it down man`)
                    .setThumbnail("https://cdn.discordapp.com/emojis/683981662106943488.png?v=1")
                    .setColor('RANDOM')
                    .setDescription(`⛔ | Hey! you're already tired, wait **${time.minutes}m ${time.seconds}s**!\nDefault cooldown is \`59m and 59s\``)
                    .addField(`** **`, `In the meantime, you can chat with other members. Or, maybe you can tell us a little about yourself!`)
                    message.channel.send(Embed);
            } else {
                let amountEarned = Math.floor(Math.random() * 1) + 25

                message.channel.send({embed: {color: 'GREEN', description: `✅ | Nice work ${message.author.username}, you have earned **${amountEarned} dollars** for one hour of work.`}});
                    db.add(`coins_${message.author.id}`, amountEarned);
                    db.set(`worked_${message.author.id}`, Date.now());
        }
    }
}
