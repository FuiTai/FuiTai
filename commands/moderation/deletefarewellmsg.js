const Discord = require("discord.js");
const db = require("quick.db");
const { promptMessage } = require("../../functions.js");

module.exports = {
  name: "deletefarewellmsg",
  category: "Administration",
  description: "Delete any farewell message for this server!",
  run: async (client, message, args) => {
    
    let farewellmsg = db.fetch(`serverfarewellmsg_${message.guild.id}`)
    
     if (!message.member.permissions.has("MANAGE_GUILD")) {
        return message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | You don't have sufficient permissions to use that command! You need **MANAGE_SERVER** permission to use that command!"}})  
    } else
    
    if (farewellmsg === null) {
        message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | This server doesn't have any farewell message set..."}})
      
    } else {
      const promptEmbed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`This verification becomes invalid after 30s.`)
            .setDescription(`Are you sure you want to delete and disable the farewell messages for this server? React with ✅ to **delete and disable it**, ❌ to **cancel!**`)
        // Send the message
        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reactioncollector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            // Verification stuffs
            if (!emoji) {
              message.channel.send("❌ `TIMEOUT`")
            }
            if (emoji === "✅") {
              msg.delete()
              message.channel.send({embed: {color: 'GREEN', description: "✅ Ok! All done! The farewell message has been succesfully deleted and disabled for this server, you can enable it again with the `farewellmsg` command!"}})
              db.delete(`serverfarewellmsg_${message.guild.id}`)
              db.delete(`serverfarewellchannel_${message.guild.id}`)
              
            } else if (emoji === "❌") {
                msg.delete();
                message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | Huh... well, the setup has been cancelled..."}})
              
            }
        });
    }
    
  }
  
}