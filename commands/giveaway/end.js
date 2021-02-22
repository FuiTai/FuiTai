const ms = require('ms');

module.exports = {
    name: "end",
run: async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return  message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | You don't have the required permissions to use this command. You'll need **__MANAGE MESSAGES__** permission to use that command! Or you can create a role called `Giveaways` it'll work too!"}});
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return  message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | You have to specify a valid message ID!"}})
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return  message.channel.send({embed: {color: 'RED', description: ':no_entry_sign: | Unable to find a giveaway for `'+ args.join(' ') +'`.'}})
    }

    // Edit the giveaway
    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    // Success message
    .then(() => {
        // Success message
        message.channel.send({embed: {color: 'GREEN', description:'✅ | Giveaway will end in less than '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' seconds...'}});
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)){
            message.channel.send({embed: {color: 'RED', description: ':no_entry_sign: | This giveaway has already ended!'}})
        } else {
            console.error(e);
            message.channel.send({embed: {color: 'RED', description: `⛔ | An error occured...`}});
        }
    });

}
};

