const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const { promptMessage } = require("../../functions.js");

module.exports = {
  name: "welcomemsg",
  aliases: ["setwelcomemsg", "welcomemsgset"],
  category: "Administration",
  usage: "<welcomemsg <Channel> <Message>",
  run: async (client, message, args) => {
    let welcomemsg = db.fetch(`serverwelcomemsg_${message.guild.id}`);
    let channel = message.mentions.channels.first();

    if (!channel) {
     // const embed2 = new Discord.MessageEmbed()
       // .setColor("RANDOM")
        //.setDescription(
         // "**Available Syntaxes**\n\n- `${member.guild.name}` => Displays The server name.\n- `${member.user.username}` => Displays the name of the user who is joining.\n- `${member}` => Mentions the user who is joining."
        //);

      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("How to set a Nice Welcome Message")
        .setDescription(
          "Please provide me the channel you'll like to me to send the welcome message in this server when new users join!\n\n**Example**:\n\n```<setwelcomemsg #welcome-channel Hello! and Welcome to the server! I hope we can be good friends! Don't forget to read out the rules to prevent a ban!```\n\n**Result**:\n\nThe message will be sent on the channel you tagged, In this case **#welcome-channel**\n"
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/803801997483835444/804124118651633695/unknown.png"
        );
      return message.channel.send(embed)
      //, message.channel.send(embed2);
    }

    if (!args[1]) {
           // const embed2 = new Discord.MessageEmbed()
       // .setColor("RANDOM")
        //.setDescription(
         // "**Available Syntaxes**\n\n- `${member.guild.name}` => Displays The server name.\n- `${member.user.username}` => Displays the name of the user who is joining.\n- `${member}` => Mentions the user who is joining."
        //);

      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("How to set a Nice Welcome Message")
        .setDescription(
          "Please provide me the message you'll like to me to send in this server when new users join!\n\n**Example**:\n\n```<setwelcomemsg #welcome-channel Hello! and Welcome to the server! I hope we can be good friends! Don't forget to read out the rules to prevent a ban!```\n\n**Result**:\n\nThe message will be sent on the channel you tagged, In this case **#welcome-channel**\n"
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/803801997483835444/804124118651633695/unknown.png"
        );
      return message.channel.send(embed)
      //, message.channel.send(embed2);
    }

    if (!message.member.hasPermission("MANAGE_GUILD")) {
      return message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | You don't have sufficient permissions to use that command! You need **MANAGE_SERVER** permission to use that command!"}})
    }

    if (welcomemsg !== null) {
      const promptEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor(`This verification becomes invalid after 30s.`)
        .setDescription(
          `This server already has a welcome message set... Anyway, Would you like to change it? React with ✅ to **change it**, ❌ to **cancel!**\n\nRemember that I should have at least **READ AND SEND MESSAGES** permissions on the channel you tagged to send the welcome message!`
        )
        .addField(`Message:`, `${args.slice(1).join(" ")}`, true)
        .addField(`Welcome Channel:`, `${channel}`);

      // Send the message
      await message.channel.send(promptEmbed).then(async msg => {
        // Await the reactions and the reactioncollector
        const emoji = await promptMessage(msg, message.author, 30, [
          "✅",
          "❌"
        ]);

        // Verification stuffs
        if (!emoji) {
          return message.channel.send({embed: {color: 'RED', description: "❌ | `TIMEOUT`"}})
        }
        if (emoji === "✅") {
          msg.delete();
          const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(
              "✅ Ok! All done! The welcome message has been set! To change it in the future use this same command! To delete and disable the welcome message for this server use the `deletewelcomemsg` command!"
            )
            .addField(`Message:`, `${args.slice(1).join(" ")}`)
            .addField(`Welcome Channel:`, `${channel}`, true)
            .setTimestamp();
          message.channel.send(embed);
          db.delete(`serverwelcomemsg_${message.guild.id}`);
          db.delete(`serverwelcomechannel_${message.guild.id}`);
          db.set(
            `serverwelcomemsg_${message.guild.id}`,
            args.slice(1).join(" ")
          );
          db.set(`serverwelcomechannel_${message.guild.id}`, channel.id);
        } else if (emoji === "❌") {
          msg.delete();
          message.channel.send({embed: {color: 'RED', description: "⛔ | Well... the setup has been cancelled..."}})
        }
      });
    } else {
      const promptEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor(`This verification becomes invalid after 30s.`)
        .setDescription(
          `Would you like to set a welcome message for this server? React with ✅ to **set it**, ❌ to **cancel!**\n\nRemember that I should have at least **READ AND SEND MESSAGES** permissions on the channel you tagged to send the welcome message!`
        )
        .addField(`Message:`, `${args.slice(1).join(" ")}`, true)
        .addField(`Welcome Channel:`, `${channel}`);

      // Send the message
      await message.channel.send(promptEmbed).then(async msg => {
        // Await the reactions and the reactioncollector
        const emoji = await promptMessage(msg, message.author, 30, [
          "✅",
          "❌"
        ]);

        // Verification stuffs
        if (!emoji) {
          return  message.channel.send({embed: {color: 'RED', description: "❌ | `TIMEOUT`"}})
        }
        if (emoji === "✅") {
          msg.delete();
          const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(
              "✅ Ok! All done! The welcome message has been set! To change it in the future use this same command! To delete and disable the welcome message for this server use the `deletewelcomemsg` command!"
            )
            .addField(`Message:`, `${args.slice(1).join(" ")}`)
            .addField(`Welcome Channel:`, `${channel}`, true)
            .setTimestamp();
          message.channel.send(embed);
          db.set(
            `serverwelcomemsg_${message.guild.id}`,
            args.slice(1).join(" ")
          );
          db.set(`serverwelcomechannel_${message.guild.id}`, channel.id);
        } else if (emoji === "❌") {
          msg.delete();
          message.channel.send({embed: {color: 'RED', description: "⛔ | Well... the setup has been cancelled..."}});
        }
      });
    }
  }
};
