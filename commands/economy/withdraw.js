const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "withdraw",
    aliases: ["with"],
    description: "Withdraw money out of your bank account.",

    run: async (bot, message, args) => {


        let user = message.author.id;
        let member = db.fetch(`coins_${message.author.id}`);
        let member2 = db.fetch(`bank1_${message.author.id}`);
        let money = await db.fetch(`bank1_${message.author.id}`);

        if (money === 0) {
            return message.reply({embed: {color: 'RED', description: '⛔ | **You don\'t have any money to withdraw**'}})
        }

        if(message.content.includes('-')) {
            return message.channel.send({embed: {color: 'RED', description: '⛔ | **You can\'t withdraw negative money**'}});
        }

        if(args[0] == 'all') {
            db.subtract(`bank1_${message.author.id}`, money);
            db.add(`coins_${message.author.id}`, money);
            message.channel.send({embed: {color: 'GREEN', description: '✅ | **Successfully withdrawn all your dollars from your bank account**'}});

        } else {

            if(!args[0]) {
                return message.channel.send({embed: {color: 'RED', description: '⛔ | **You can\'t withdraw nothing. Specify an amount**'}});
            }

            if(member2 < args[0]) {
                return message.channel.send({embed: {color: 'RED', description: '⛔ | **You don\'t have that much money in your bank account**'}});
            }

            message.channel.send({embed: {color: 'GREEN', description: `✅ | Successfully withdrawn **${args[0]} dollars** from your bank account`}});
            db.subtract(`bank1_${message.author.id}`, args[0]);
            db.add(`coins_${message.author.id}`, args[0]);
        }
    }
}