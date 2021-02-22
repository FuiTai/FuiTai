const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "gotcha",
    aliases: ["editsnipe", "snipeedit", "snipedit"],
    category: "Utility",
    description: "See the last message that was edited on the server + the author of that message, old message, new message!",
    run: async (client, message, args) => {

        let oldmessage = await db.fetch(`oldMessage_${message.guild.id}`)
        let newmessage = await db.fetch(`newMessage_${message.guild.id}`)
        let messageAuthor = await db.fetch(`messageAuthor_${message.guild.id}`)
        let messageAuthorID = await db.fetch(`messageAuthorID_${message.guild.id}`)

        if (oldmessage === null) return message.channel.send({embed: {color: 'RED', description: ':no_entry_sign: | No messages has been edited recently on this server!'}});

        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setTitle("Gotcha")
        .setDescription(`User: **${messageAuthor}** ID: **${messageAuthorID}**\nEdited a message!\n\n**Old Message:**\n${oldmessage}\n\n**Edited to:**\n${newmessage}`)
        .setTimestamp()
        message.channel.send(embed)
    }
}
