const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "deposit",
    aliases: ["dep"],
    description: "desposting money into your bank account",

    run: async (bot, message, args) => {




        let user = message.author;
        let author1 = db.fetch(`coins_${message.author.id}`);
        let author2 = db.fetch(`bank1_${message.author.id}`);
        let money = await db.fetch(`coins_${message.author.id}`);
        let bank = await db.fetch(`bank1_${message.author.id}`);

        if (args[0] == 'alll') return message.channel.send("huh?");
        if (args[0] == 'al') return message.channel.send('nah I accept cash only');

        if(money === 0) {
            return message.reply({embed: {color: 'RED', description: '⛔ | You don\'t have any money to deposit'}})
        };

        if (message.content.includes('-')) {
            return message.channel.send({embed: {color: 'RED', description: '**⛔ |** You can\'t deposit negative money'}})
        };

        if (args[0] == 'all') {
            db.add(`bank1_${message.author.id}`, money);
            db.subtract(`coins_${message.author.id}`, money);
            message.channel.send({embed: {color: 'GREEN', description: '**🏦 |** You have deposited all your dollars into your bank'}});
        } else {

            if (!args[0]) {
                return message.channel.send({embed: {color: 'RED', description: '**💳 |** Specify an amount to deposit'}}).catch(
                    err => console.log(err)
                )
            };

            if (author1 < args[0]) {
                return message.channel.send({embed: {color: 'RED', description: '⛔ | You don\'t have that much money to deposit'}})
            };

            const embed = new MessageEmbed()
                .setColor('BLUE')
                .setDescription(`✅ | Successfully deposited **${args[0]} dollars** into your bank account`)
            message.channel.send(embed);
            db.add(`bank1_${message.author.id}`, args[0]);
            db.subtract(`coins_${message.author.id}`, args[0]);
        }
    }
}