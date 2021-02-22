const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');


module.exports = {
    name: "daily",

    run: async (bot, message, args) => {
        
        let timeout = 86400000;
        let amount = 25;
        let Avatar = message.author.displayAvatarURL({format: 'gif'});

            let daily = db.fetch(`daily_${message.author.id}`);
            
        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));
                const Embed = new MessageEmbed()
                    .setTitle(`Woah there, slow it down man`)
                    .setThumbnail("https://cdn.discordapp.com/emojis/683981662106943488.png?v=1")
                    .setColor('RANDOM')
                    .setDescription(`⛔ | What do you see me? A bank? Wait **${time.hours}h, ${time.minutes}m and ${time.seconds}s**\nDefault cooldown is \`23h and 59m\``)
                    .addField(`** **`, `In the meantime, you can chat with other members. Or, maybe you can tell us a little about yourself!`)
                message.channel.send(Embed);
            } else {
                let embed = new MessageEmbed()
                .setTitle(`Here are your daily dollars, ${message.author.username}`)
                .setColor('RANDOM')
                .setDescription(`✅ | ${amount} were placed into your wallet!`)
                message.channel.send(embed);

                db.add(`coins_${message.author.id}`, amount)
                db.set(`daily_${message.author.id}`, Date.now())
            }
    }
}