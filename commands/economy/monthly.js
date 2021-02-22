const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');


module.exports = {
    name: "monthly",

    run: async (bot, message, args) => {
        
        let timeout = 2592000000;
        let amount = 200;
        let Avatar = message.author.displayAvatarURL({format: 'gif'});

            let monthly = db.fetch(`monthly_${message.author.id}`);
            
        if (monthly !== null && timeout - (Date.now() - monthly) > 0) {
            let time = ms(timeout - (Date.now() - monthly));
                const Embed = new MessageEmbed()
                    .setTitle(`Woah there, slow it down man`)
                    .setThumbnail("https://cdn.discordapp.com/emojis/683981662106943488.png?v=1")
                    .setColor('RANDOM')
                    .setDescription(`⛔ | What do you see me? A bank? Wait **${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s**!\nDefault cooldown is \`719h and 59m\``)
                    .addField(`** **`, `In the meantime, you can chat with other members. Or, maybe you can tell us a little about yourself!`)
                message.channel.send(Embed);
            } else {
                let embed = new MessageEmbed()
                .setTitle(`Here are your monthly dollars, ${message.author.username}`)
                .setColor('RANDOM')
                .setDescription(`✅ | ${amount} were placed into your wallet!`)
                message.channel.send(embed);

                db.add(`coins_${message.author.id}`, amount)
                db.set(`monthly_${message.author.id}`, Date.now())
            }
    }
}