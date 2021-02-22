const db = require('quick.db')
const Discord = require('discord.js')


module.exports = {
    name: "removemoney",

    run: async (bot, message, args) => {



        if (message.author.id !== '567190722516877352') return message.channel.send({embed: {color: 'RED', description: '⛔ | This command is blocked!'}})
        let money = db.fetch(`coins_${message.guild.id}_${message.author.id}`);
        let user = message.mentions.users.first() || message.author;

        if (isNaN(args[0])) return message.channel.send({embed: {color: 'RED', description: '⛔ | That was not a valid number!'}})
        db.subtract(`coins_${user.id}`, args[0]);
    let bal = await db.fetch(`coins_${user.id}`)

    let embed = new Discord.MessageEmbed()
    .setAuthor(`✅ | Removed money!`, message.author.displayAvatarURL)
    .addField(`Amount`, `${args[0]} dollars`)
    .addField(`Balance Updated`, `${bal} dollars`)
    .setColor("GREEN") // random = "RANDOM"
    .setTimestamp()
    // you can change it to args[1] if you want to, but then it's not gonna work like I want it to.

    message.channel.send(embed)





}
}