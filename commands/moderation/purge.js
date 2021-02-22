const Discord = require('discord.js');
module.exports = {
    name: 'purge',
    aliases: ["prune"],
    guildOnly: true,
    modOnly: true,
    staffCmd: true,
    description: 'Prune up to 99 messages.',
    run: (client, message, args) => {
        
      
            
          

          
        
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.channel.send({embed: {color: 'RED', description: `**⛔ |** That doesn\'t seem to be a valid number!`}});
        } else if (amount <= 1 || amount > 100) {
            return message.channel.send({embed: {color: 'RED', description: `**⛔ |** You need to input a number between 1 and 99!`}});
        }

        

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
        .then(deleted => message.channel.send({embed: {color: 'GREEN', description: `✅ | I deleted \`${deleted.size}\` messages.`}}).then(m => m.delete({ timeout: 5000 })))
        .catch(err => message.channel.send({embed: {color: 'RED', description: `:no_entry_sign: | Something went wrong... ${err}`}}));

    }
}
