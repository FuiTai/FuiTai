const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');
module.exports = {
    name: "pay",
    aliases: ["give"],
    description: "pay/give someone some money",

    run: async (bot, message, args) => {

        
        let member2 = message.mentions.users.first();
        let user = message.mentions.users.first();
        let member = db.fetch(`coins_${message.author.id}`);
        let rob = db.fetch(`rob_${message.author.id}`);
        let give = db.fetch(`give_${message.author.id}`);
        let timeout = 180000;

        if (give !== null && timeout - (Date.now() - give) > 0) {
            let time = ms(timeout - (Date.now() - give));
            message.channel.send({embed: {color: 'RED', description: `⛔ | Howdy partner. We know you\'re rich n stuff, but you gotta wait a couple of minutes after giving someone some cash\n\nTime Remaining: **${time.minutes}m and ${time.seconds}s**`}})
        } else {

        if (!user) return message.channel.send({embed: {color: 'RED', description: '⛔ | Please mention someone to pay'}})
        if (message.author.id === user.id) {
            return message.channel.send({embed: {color: 'RED', description: '**⛔ | **You can\'t give money to yourself lol'}})
        }
        if (!args[1]) return message.channel.send({embed: {color: 'RED', description: '⛔ | Please specify the amount.'}})
        if (message.content.includes('-')) return message.channel.send({embed: {color: 'RED', description: '⛔ | Specify a real amount'}})
        if (member < args[1]) return message.channel.send({embed: {color: 'RED', description: '⛔ | You don\'t have that much money.'}})
        
        message.channel.send({embed: {color: 'GREEN', description: `✅ | You gave ${user.username} **${args[1]}** dollars`}})

        db.add(`coins_${user.id}`, args[1]);
        db.subtract(`coins_${message.author.id}`, args[1]);
        db.set(`rob_${message.author.id}`, Date.now());
        db.set(`give_${message.author.id}`, Date.now());

        }
    }
}