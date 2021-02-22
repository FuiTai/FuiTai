const Discord = require('discord.js');
module.exports = {
    name: "invite",
   aliases: ["i", "invi", "inv"],
   category: "help",
    description: "avaible commands",

   run: (client, message, args) => {

                                        
                                       
                                        
    
        
    let embed = new Discord.MessageEmbed();
                                        embed.setTitle("Fuitai invite! :sparkles:");
                                        embed.setColor ("PURPLE");
                                        embed.setDescription("https://tinylink.net/meik0");
                                        message.channel.send(embed);
   }

}


