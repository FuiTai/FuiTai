const Discord = require('discord.js');
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "kick",
    aliases: ["k", "ki", "testkick"],
    category: "Moderation",
    description: "Kicks the member",
    usage: "<id | mention>",
    run: async (client, message, args) => {
        const logChannel = message.guild.channels.cache.get(c => c.name === "logs") || message.channel;

       

        // No args
        if (!args[0]) {
            return message.channel.send({embed: {color: 'RED', description: '**⛔ | **Please provide a person to kick!'}})
                //.then(m => m.delete({ timeout: 5000 }));
        }

        // No reason
        if (!args[1]) { 
            return message.channel.send({embed: {color: 'RED', description: '**⛔ | **Please provide a reason to kick!'}})
                //.then(m => m.delete({ timeout: 5000 }));
        }

        // No author permissions
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.channel.send({embed: {color: 'RED', description: '**⛔ | **You do not have permissions to kick members. Please contact a staff member!'}})
                //.then(m => m.delete({ timeout: 5000 }));
        }

        // No bot permissions
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.channel.send({embed: {color: 'RED', description: '**⛔ | **I do not have permissions to kick members. Please contact a staff member!'}})
                //.then(m => m.delete({ timeout: 5000 }));
        }

        const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);

        // No member found
        if (!toKick) {
            return message.channel.send({embed: {color: 'RED', description: '**⛔ | **Couldn\'t find that member, try again!'}})
                //.then(m => m.delete({ timeout: 5000 }));
        }

        // Can't kick urself
        if (toKick.id === message.author.id) {
            return message.channel.send({embed: {color: 'RED', description: '**⛔ | **You can\'t kick yourself!'}})
                //.then(m => m.delete({ timeout: 5000 }));
        }

        // Check if the user's kickable
        if (!toKick.kickable) {
            return message.channel.send({embed: {color: 'RED', description: '**⛔ | **I can\'t kick that person due to role hierarchy, I suppose!'}})
                //.then(m => m.delete({ timeout: 5000 }));
        }
                
        const embed = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(toKick.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(stripIndents`**✅  Kicked member:** ${toKick} (${toKick.id})
            **:detective: Kicked by:** ${message.member} (${message.member.id})
            **Reason:** ${args.slice(1).join(" ")}`);

        const promptEmbed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`This verification becomes invalid after 30s.`)
            .setDescription(`Do you want to kick ${toKick}?`)

        // Send the message
        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reaction collector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            // The verification stuffs
            if (emoji === "✅") {
                msg.delete();

                toKick.kick(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return message.channel.send({embed: {color: 'RED', description: `**⛔ | **Well.... the kick didn't work out. Here's the error! ${err}`}})
                    });

                logChannel.send(embed);
            } else if (emoji === "❌") {
                msg.delete();

                message.channel.send({embed: {color: 'RED', description: `**⛔ | **Kick canceled!`}})
                //    .then(m => m.delete({ timeout: 10000 }));
            }
        });
    }
};