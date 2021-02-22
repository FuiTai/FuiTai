const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const { promptMessage } = require("../../functions.js");

module.exports = {
  name: "farewellmsg",
  aliases: ["setfarewellmsg", "farewellmsgset"],
  category: "Administration",
  description: "Set a fare well message that will be sent on an specified channel of the server, when users leave the server!",
  usage: "<farewellmsg <Channel> <Message>",
  run: async (client, message, args) => {
    
    let farewellmsg = db.fetch(`serverfarewellmsg_${message.guild.id}`)
     let channel = message.mentions.channels.first()
    
         if (!channel) {
        // const embed2 = new Discord.MessageEmbed()
      //.setColor("RANDOM")
      //.setDescription("**Available Syntaxes**\n\n- `${message.guild.name}` => Displays The server name.\n- `${member.user.username}` => Displays the name of the user who is leaving the server.")
      
      const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("How to set a Nice Farewell Message")
      .setDescription("Please provide me the channel you'll like to me to send the farewell message in this server when users leave the server!\n\n**Example**:\n\n```<setfarewellmsg #farewell-channel Goodbye! I hope you come back...```\n\n**Result**:\n\nThe message will be sent on the channel you tagged, In this case **#farewell-channel**\n")
      .setImage("https://cdn.discordapp.com/attachments/803801997483835444/804124242098520124/unknown.png")
      return message.channel.send(embed)
      //, message.channel.send(embed2)
    }
     
    if (!args[1]) {
          // const embed2 = new Discord.MessageEmbed()
      //.setColor("RANDOM")
      //.setDescription("**Available Syntaxes**\n\n- `${message.guild.name}` => Displays The server name.\n- `${member.user.username}` => Displays the name of the user who is leaving the server.")
      
      const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("How to set a Nice Farewell Message")
      .setDescription("Please provide me the message you'll like to me to send in this server when users leave the server!\n\n**Example**:\n\n```<setfarewellmsg #farewell-channel Goodbye! I hope you come back...```\n\n**Result**:\n\nThe message will be sent on the channel you tagged, In this case **#farewell-channel**\n")
      .setImage("https://cdn.discordapp.com/attachments/803801997483835444/804124242098520124/unknown.png")
      return message.channel.send(embed)
      //, message.channel.send(embed2)
    }
    
    if (!message.member.permissions.has("MANAGE_GUILD")) {
        return message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | You don't have sufficient permissions to use that command! You need **MANAGE_SERVER** permission to use that command!"}})
    }
    
    if (farewellmsg !== null) {
      const promptEmbed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`This verification becomes invalid after 30s.`)
            .setDescription(`This server already has a farewell message set... Anyway, Would you like to change it? React with ✅ to **change it**, ❌ to **cancel!**\n\nRemember that I should have at least **READ AND SEND MESSAGES** permissions on the channel you tagged to send the farewell message!`)
            .addField(`Message:`, `${args.slice(1).join(" ")}`, true)
            .addField(`Farewell Channel:`, `${channel}`)
      
        // Send the message
        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reactioncollector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            // Verification stuffs
            if (!emoji) {
              message.channel.send("❌ | `TIMEOUT`")
            }
            if (emoji === "✅") {
              msg.delete()
              const embed = new Discord.MessageEmbed()
              .setColor("GREEN")
              .setDescription("✅ Ok! All done! The farewell message has been set! To change it in the future use this same command! To delete and disable the farewell message for this server use the `deletefarewellmsg` command!")
              .addField(`Message:`, `${args.slice(1).join(" ")}`)
              .addField(`Farewell Channel:`, `${channel}`, true)
              .setTimestamp()
              message.channel.send(embed)
              db.delete(`serverfarewellmsg_${message.guild.id}`)
              db.delete(`serverfarewellchannel_${message.guild.id}`)
              db.set(`serverfarewellmsg_${message.guild.id}`, args.slice(1).join(" "))
              db.set(`serverfarewellchannel_${message.guild.id}`, channel.id)
              
            } else if (emoji === "❌") {
                msg.delete();
                message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | Huh... well, the setup has been cancelled..."}})

            }
        });
      
    } else {
         const promptEmbed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`This verification becomes invalid after 30s.`)
            .setDescription(`Would you like to set a farewell message for this server? React with ✅ to **set it**, ❌ to **cancel!**\n\nRemember that I should have at least **READ AND SEND MESSAGES** permissions on the channel you tagged to send the farewell message!`)
            .addField(`Message:`, `${args.slice(1).join(" ")}`, true)
            .addField(`Farewell Channel:`, `${channel}`)
      
        // Send the message
        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reactioncollector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            // Verification stuffs
            if (!emoji) {
              message.channel.send("❌ | `TIMEOUT`")
            }
            if (emoji === "✅") {
              msg.delete()
              const embed = new Discord.MessageEmbed()
              .setColor("GREEN")
              .setDescription("✅ Ok! All done! The Farewell message has been set! To change it in the future use this same command! To delete and disable the farewell message for this server use the `deletefarewellmsg` command!")
              .addField(`Message:`, `${args.slice(1).join(" ")}`)
              .addField(`Farewell Channel:`, `${channel}`, true)
              .setTimestamp()
              message.channel.send(embed)
              db.set(`serverfarewellmsg_${message.guild.id}`, args.slice(1).join(" "))
              db.set(`serverfarewellchannel_${message.guild.id}`, channel.id)
              
            } else if (emoji === "❌") {
                msg.delete();
                message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | Huh... well, the setup has been cancelled..."}})

            }
        });
    }
    
  }
}
