const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const { promptMessage } = require("../../functions.js");

module.exports = {
  name: "setprefix",
  category: "Administration",
  description: "Change my prefix on your server!",
  usage: "<setprefix <prefix>",
  run: async (client, message, args) => {

    let serverprefix = db.fetch(`serverprefix_${message.guild.id}`)

    if (!args[0]) {
      return message.channel.send({embed: {color: 'RED', description: "⛔ | Please provide me the prefix you'll like to use with me on this server. `<setprefix prefix`"}})
    }

    if (!message.member.hasPermission("MANAGE_GUILD")) {
      return message.channel.send({embed: {color: 'RED', description: "⛔ | :no_entry_sign: You don't have sufficient permissions to use that command! You need **MANAGE_SERVER** permission to use that command!"}})
    }

    else if (serverprefix !== null) {
      const promptEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor(`This verification becomes invalid after 30s.`)
        .setDescription(`This server already have a custom prefix, that is **${serverprefix}**... Anyway would you like to change it to **${args[0]}**?\nReact with ✅ to **change it**, ❌ to **cancel**!`)

      // Send the message
      await message.channel.send(promptEmbed).then(async msg => {
        // Await the reactions and the reaction collector
        const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

        // The verification stuffs
        if (!emoji) {
          message.channel.send("❌ | `TIMEOUT`")
        }
        if (emoji === "✅") {
          msg.delete();
          message.channel.send({embed: {color: 'GREEN', description: `✅ Ok! All done! My prefix for this server has been set to **${args[0]}**\n\nTo change my prefix in the future use this same command, to delete my custom prefix of this server use the` + "`resetprefix` command!"}})
          db.delete(`serverprefix_${message.guild.id}`)
          db.set(`serverprefix_${message.guild.id}`, args[0])

        } else if (emoji === "❌") {
          msg.delete();
          message.channel.send({embed: {color: 'RED', description: `**⛔ | **Prefix change cancelled!`}})

        }
      });
    } else {
      const promptEmbed2 = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor(`This verification becomes invalid after 30s.`)
        .setDescription(`Would you like to change the prefix of this server to **${args[0]}**?\nReact with ✅ to **change it**, ❌ to **cancel**!`)

      // Send the message
      await message.channel.send(promptEmbed2).then(async msg => {
        // Await the reactions and the reaction collector
        const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

        // The verification stuffs
        if (!emoji) {
          message.channel.send({embed: {color: 'RED', description: "❌ | `TIMEOUT`"}})
        }
        if (emoji === "✅") {
          msg.delete();
          message.channel.send({embed: {color: 'GREEN', description: `✅ Ok! All done! My prefix for this server has been set to **${args[0]}**\n\nTo change my prefix in the future use this same command, to delete my custom prefix of this server use the` + "`resetprefix` command!"}})
          db.set(`serverprefix_${message.guild.id}`, args[0])

        } else if (emoji === "❌") {
          msg.delete();
          message.channel.send({embed: {color: 'RED', description: `**⛔ | **Prefix change cancelled!`}})

        }
      });
    }
  }
}