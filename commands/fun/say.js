const Discord = require('discord.js');
const db = require('quick.db');
module.exports = {
    name: "say",
   aliases: ["tell", "sa", "messagexd"],
   category: "fun",
    description: "Says whatever you ask him",

   run: (client, message, args) => {

let banned = db.fetch(`banned_${message.author.id}`);

    if (banned === true) return message.react("🚫").then(message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | You are banned from using this command! If you think this is an issue, please contact Jimmy.deb#0001"}}));

    if(!args[0]) return message.channel.send({embed: {color: 'RED', description: ':no_entry_sign: | Please tell me what you want me to say!'}});

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return  message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | You don't have the required permissions to use this command. You'll need **__MANAGE MESSAGES__** permission to use that command!"}})

    const sayMessage = args.join(" ");
    

    message.delete().catch(O_o=>{}); 

    message.channel.send(sayMessage);


    
    const {formatDate} = require('../../functions.js')
    console.log(`\nSay log!\nServer name: ${message.guild.name}\nServer ID: ${message.guild.id}\nMember username & tag: ${message.author.tag}\nMember ID: ${message.author.id}\nAt: ${formatDate(message.createdAt)} ${message.createdAt.getHours()}:${message.createdAt.getMinutes()}.${message.createdAt.getSeconds()}\nSaid: ${sayMessage}`);

  }
}
