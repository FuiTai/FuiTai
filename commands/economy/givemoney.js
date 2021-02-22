const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: "givemoney",

    run: async (bot, message, args) => {



        if (message.author.id !== '567190722516877352') return message.channel.send({embed: {color: 'RED', description: '⛔ | This command is blocked!'}})


    if (!args[0]) return message.channel.send({embed: {color: 'RED', description: '⛔ | Please specify an amount to add.'}})
    if (isNaN(args[0])) return message.channel.send({embed: {color: 'RED', description: '⛔ | That was not a valid number!'}})

    let user = message.mentions.users.first() || message.author;
    message.channel.send({embed: {color: 'GREEN', description: `✅ | Successfully added **` + args[0] + `** dollars to`  + ` ${user.username}`}})
    db.add(`coins_${user.id}`, args[0]);

}
}