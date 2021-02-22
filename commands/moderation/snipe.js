const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "snipe",
    category: "Utility",
    description: "See the last message that was deleted on the server + the author of that message and the channel where the message was sent!",
    run: async (client, message, args) => {

        let snipedMessage = await db.fetch(`snipedMessage_${message.guild.id}`);
        if (snipedMessage === null) snipedMessage = "No messages has been deleted recently on this server.";

        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setTitle("Snipe Command")
        .setDescription(snipedMessage)
        .setTimestamp()
        message.channel.send(embed)

    }
}