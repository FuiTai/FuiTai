const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
    name: "rob",
    aliases: ["steal"],

    run: async (bot, message, args) => {


        let user = message.mentions.users.first() || message.author;
        let money = db.fetch(`coins_${user.id}`);
        let author = db.fetch(`rob_${message.author.id}`);
        let author2 = db.fetch(`coins_${message.author.id}`);
        let author3 = db.fetch(`rob_${user}`);
        let options = [`${money}`, `${Math.floor(Math.random() * 250)}`];
        let option = options[Math.floor(Math.random() * options.length)];

        let timeout = 600000;

        if (!args[0]) return message.channel.send({embed: {color: 'RED', description: '**⛔ | **Who are you trying to rob?'}})

        if (author !== null && timeout - (Date.now() - author) > 0) {
            let time = ms(timeout - (Date.now() - author));
            const Embed = new MessageEmbed()
                    .setTitle(`Woah there, slow it down man`)
                    .setThumbnail("https://cdn.discordapp.com/emojis/683981662106943488.png?v=1")
                    .setColor('RANDOM')
                    .setDescription(`⛔ | Dude, take a chill pill and enjoy the view. Wait **${time.minutes}m and ${time.seconds}s**\nDefault cooldown is \`9m and 59s\``)
                    .addField(`** **`, `In the meantime, you can chat with other members. Or, maybe you can tell us a little about yourself!`)
                message.channel.send(Embed);
        } else {

            if (message.author.id === user.id) {
                return message.channel.send({embed: {color: 'RED', description: '**⛔ | **You\'re trying to rob yourself? lol'}})
            }

            if (!user) {
                return message.channel.send({embed: {color: 'RED', description: '**⛔ | **Dude you can\'t rob air. Mention someone to rob'}})
            }
            if (author2 < 500) {
                return message.channel.send({embed: {color: 'RED', description: '**⛔ | **You must have 500 dollars in your wallet before robbing someone'}})
            }
        
            if (money < 250) {
                return message.channel.send({embed: {color: 'RED', description: '**⛔ | **Leave that poor soul alone. They barely have any money on them'}});
            }

            let random = Math.floor(Math.random() * 200) + 10;

            message.channel.send(`Robbing ${user.username}..`).then(
                msg => msg.edit(`✅ | Accessing their front door...`)
            ).then(
                msg1 => msg1.edit(`✅ | Access Gained`)
            ).then(
                msg2 => msg2.edit(`✅ | Searching for ${user.username}\'s wallet..`)
            ).then(
                msg3 => msg3.edit(`✅ | Wallet was found successfully`)
            ).then(
                msg4 => msg4.edit(`✅ | You found **${random} dollars** in ${user.username}\'s wallet!`)
            );
    
            db.subtract(`coins_${message.author.id}`, 250) 
            db.subtract(`coins_${user.id}`, random);
            db.add(`coins_${message.author.id}`, random);
            db.set(`rob_${message.author.id}`, Date.now());

        }
    }
}

