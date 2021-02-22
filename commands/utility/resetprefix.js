const Discord = require("discord.js");
const db = require("quick.db");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "resetprefix",
  aliases: ["delprefix", "delcustomprefix", "deletecustomprefix", "removecustomprefix", "removeprefix", "deleteprefix"],
    category: "Administration",
    description: "Delete any custom prefix of your server!",
    run: async (client, message, args) => {
      
      let serverprefix = db.fetch(`serverprefix_${message.guild.id}`)
      
      if (!message.member.hasPermission("MANAGE_GUILD")) {
        return message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | You don't have sufficient permissions to use that command! You need **MANAGE_SERVER** permission to use that command!"}})
      } 
       else if (serverprefix === null) {
        return message.channel.send({embed: {color: 'RED', description: "⛔ | This server doesn't have any custom prefixes..."}})
        
      } else {
        const promptEmbed2 = new Discord.MessageEmbed()
        .setColor("GREEN")
            .setAuthor(`This verification becomes invalid after 30s.`)
            .setDescription(`Are you sure you want to delete the custom prefix of this server?\n\nReact with ✅ to **delete it**, ❌ to **cancel**!\n\nMy new prefix for this server after this will be my default prefix: **<**`)

        // Send the message
        await message.channel.send(promptEmbed2).then(async msg => {
            // Await the reactions and the reaction collector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            // The verification stuffs
            if (!emoji) {
              message.channel.send("❌ `TIMEOUT`")
            }
            if (emoji === "✅") {
                msg.delete();
                message.channel.send({embed: {color: 'GREEN', description: "✅ Ok! All done! My custom prefix for this server has been **deleted!**\n\nTo change my prefix in the future use the `setprefix`command\n\nMy new prefix is: **<**"}})
            db.delete(`serverprefix_${message.guild.id}`)
                           
            } else if (emoji === "❌") {
                msg.delete();
                message.channel.send({embed: {color: 'RED', description: `**⛔ | **Custom Prefix elimination cancelled!`}})

            }
        });
      }
      }
    }