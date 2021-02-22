const { MessageEmbed } = require("discord.js")

// ferdi esto ta roto mira aver si lo arreglas
module.exports = {
  name: "suggest",
  usage: "suggest <message>",
  description: "Send your Suggestion",
  category: "main",
  run: (client, message, args) => {
    
    if(!args.length) {
      return message.channel.send({embed: {color: 'RED', description: "⛔ | Please give the suggestion"}})
    }
    
    let channel = message.guild.channels.cache.find((x) => (x.name === "suggestion" || x.name === "suggestions" || x.name === "suggest" || x.name === "⚒︱suggestions"))
    
    
    if(!channel) {
      return message.channel.send({embed: {color: 'RED', description: "⛔ | There is no channel with name suggestions (Please create one!)"}})
    }

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send({embed: {color: 'RED', description: '**⛔ | **I do not have permissions to run this command. Please contact a staff member! I need MANAGE_MESSAGES '}})
        //.then(m => m.delete({ timeout: 5000 }));
    }
                                                    
    //    .then(message.delete().catch(O_o=>{})({ timeout: 10000 }));
    message.delete({ timeout: 5000 }).catch(O_o=>{}); 
    let embed = new MessageEmbed()
    .setAuthor("SUGGESTION: " + message.author.tag, message.author.avatarURL())
    .setThumbnail(message.author.avatarURL())
    .setColor("#ff2050")
    .setDescription(args.join(" "))
    .setTimestamp()
    
    
    channel.send(embed).then(m => {
      m.react("✅")
      m.react("❌")
    })
    

    
    message.channel.send({embed: {color: 'GREEN', description: "✅ | Sucesfully sended the suggestion!"}})
    .then(m => m.delete({ timeout: 5000 }));

    
  }
}