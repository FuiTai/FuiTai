const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
    name: "beg",
    description: "Beg for money",

    run: async (bot, message, args) => {

        let user = message.author;
        let timeout = 1800000;
        let amount = Math.floor(Math.random() * 5) + 1;
        let celebrities = [
            "**Johnny Depp**",
            "**Arnold Schwarzenegger**",
            "**Jim Carrey**",
            "**Emma Watson**",
            "**Daniel Radcliffe**",
            "**Leonardo DiCaprio**",
            "**Tom Cruise**",
            "**Brad Pitt**",
            "**Charles Chaplin**",
            "**Morgan Freeman**",
            "**Tom Hanks**",
            "**Hugh Jackman**",
            "**Matt Damon**",
            "**Sylvester Stallone**",
            "**Will Smith**",
            "**Clint Eastwood**",
            "**Cameron Diaz**",
            "**George Clooney**",
            "**Steven Spielberg**",
            "**Harrison Ford**",
            "**Robert De Niro**",
            "**Robert Downey Jr.**",
            "**Mark Wahlberg**",
            "**Dwayne Johnson**",
            "**Jackie Chan**"
        ]
        let celebrity = celebrities[Math.floor(Math.random() * celebrities.length)]

        let beg = db.fetch(`beg_${message.author.id}`);

        if(beg !== null && timeout - (Date.now() - beg) > 0) {
            let time = ms(timeout - (Date.now() - beg));

            const embed = new MessageEmbed()
                .setTitle(`Woah there, slow it down man`)
                .setThumbnail("https://cdn.discordapp.com/emojis/683981662106943488.png?v=1")
                .setColor('RANDOM')
                .setDescription(`⛔ | Stop begging so much, you little begger. \nYou can have more dollars in **${time.minutes}minutes and ${time.seconds}seconds**\nDefault cooldown is \`30 minutes\``)
                .addField(`** **`, `In the meantime, you can chat with other members. Or, maybe you can tell us a little about yourself!`)
            message.channel.send(embed);
        } else {
            message.channel.send({embed: {color: 'GREEN', description: `✅ | ${celebrity} has donated **${amount} dollars** to <@${message.author.id}>.`}})

            db.add(`coins_${message.author.id}`, amount)
            db.set(`beg_${message.author.id}`, Date.now())
        }
    }
}