const ms = require('ms');

module.exports = {
    name: "start",
    run: async (client, message, args) => {
    
    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return  message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | You don't have the required permissions to use this command. You'll need **__MANAGE MESSAGES__** permission to use that command! Or you can create a role called `giveaways` it'll work too!"}})
    
    }
    
    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if(!giveawayChannel){
        return  message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | You have to mention a valid channel!"}})
    
    }
    
    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return  message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | You have to specify a valid duration!"}})
    }
    
    // Number of winners
    let giveawayNumberWinners = args[2];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return  message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | You have to specify a valid number of winners!"}})
    }
    
    // Giveaway prize
    let giveawayPrize = args.slice(3).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return  message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | You have to specify a valid prize!"}})
    }
    
    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
        // The giveaway duration
        time: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: giveawayNumberWinners,
        // Who hosts this giveaway
        hostedBy: client.config.hostedBy ? message.author : null,
        // Messages
        messages: {
            giveaway: "🎊 **New giveaway!**",
            giveawayEnded: "🎉**Giveaway ended**",
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "React with 🎉 to participate!",
            winMessage: "Congratulations, {winners}! You won **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway cancelled, no valid participations...",
            hostedBy: "Hosted by: {user}",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });
    
    message.channel.send({embed: {color: 'GREEN', description: `✅ | *Giveaway created in ${giveawayChannel}!*`}})
    }
    };