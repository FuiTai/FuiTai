const Discord = require("discord.js");
const db = require("quick.db");
const { promptMessage } = require("../../functions.js");

module.exports = {
  name: "deletewelcomemsg",
  category: "Administration",
  description: "Deletes any welcome message set for this server!",
  run: async (client, message, args) => {
    
    let welcomemsg = db.fetch(`serverwelcomemsg_${message.guild.id}`)
    
     if (!message.member.permissions.has("MANAGE_GUILD")) {
        return message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | You don't have sufficient permissions to use that command! You need **MANAGE_SERVER** permission to use that command!"}}) 
    } else
    
    if (welcomemsg === null) {
      return  message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | This server doesn't have any welcome message set..."}})
      
    } else {
      const promptEmbed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`This verification becomes invalid after 30s.`)
            .setDescription(`Are you sure you want to delete and disable the welcome messages for this server? React with ✅ to **delete and disable it**, ❌ to **cancel!**`)
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
              message.channel.send({embed: {color: 'GREEN', description: "✅ Ok! All done! The welcome message has been succesfully deleted and disabled for this server, you can enable it again with the `welcomemsg` command!"}})
              db.delete(`serverwelcomemsg_${message.guild.id}`)
              db.delete(`serverwelcomechannel_${message.guild.id}`)
            
              
            } else if (emoji === "❌") {
                msg.delete();
                message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | Huh... well, the setup has been cancelled..."}})
              
            }
        });
    }
    
  }
  
}
