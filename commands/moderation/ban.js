const Discord = require('discord.js');
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "ban",
    aliases: ["b", "ba", "bn"],
    category: "Moderation",
    description: "Bans the member",
    usage: "<id | mention>",
    run: async (client, message, args) => {
        const logChannel = message.guild.channels.cache.get(c => c.name === "logs") || message.channel;

        

        // No args
        if (!args[0]) {
            return message.channel.send({embed: {color: 'RED', description: '**⛔ | **Please provide a person to ban!'}})
            //.then(m => m.delete({ timeout: 5000 }));
        }

        // No reason
        if (!args[1]) {
            return message.channel.send({embed: {color: 'RED', description: '**⛔ | **Please provide a reason to ban!'}})
            //.then(m => m.delete({ timeout: 5000 }));
        }

        // No author permissions
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send({embed: {color: 'RED', description: '**⛔ | **You do not have permissions to ban members. Please contact a staff member!'}})
            //.then(m => m.delete({ timeout: 5000 }));
        
        }
        // No bot permissions
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.channel.send({embed: {color: 'RED', description: '**⛔ | **I do not have permissions to ban members. Please contact a staff member!'}})
            //.then(m => m.delete({ timeout: 5000 }));
        }

        const toBan = message.mentions.members.first() || message.guild.members.get(args[0]);

        // No member found
        if (!toBan) {
            return message.channel.send({embed: {color: 'RED', description: '**⛔ | **Couldn\'t find that member, try again!'}})
            //.then(m => m.delete({ timeout: 5000 }));
        }

        // Can't ban urself
        if (toBan.id === message.author.id) {
            return message.channel.send({embed: {color: 'RED', description: '**⛔ | **You can\'t ban yourself!'}})
            //.then(m => m.delete({ timeout: 5000 }));
        }

        // Check if the user's banable
        if (!toBan.bannable) {
            return message.channel.send({embed: {color: 'RED', description: '**⛔ | **I can\'t ban that person due to role hierarchy, I suppose!'}})
            //.then(m => m.delete({ timeout: 5000 }));
        }
        
        const embed = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(toBan.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(stripIndents`**✅ Banned member:** ${toBan} (${toBan.id})
            **:detective: Banned by:** ${message.member} (${message.member.id})
            **Reason:** ${args.slice(1).join(" ")}`);

            const promptEmbed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`This verification becomes invalid after 30s.`)
            .setDescription(`Do you want to ban ${toBan}?`)

        // Send the message
        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reactioncollector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            // Verification stuffs
            if (emoji === "✅") {
                msg.delete();

                toBan.ban({ reason: `${args.slice(1).join(" ")}` })
                    .catch(err => {
                        if (err) return message.channel.send({embed: {color: 'RED', description: `**⛔ | **Well.... the ban didn't work out. Here's the error! ${err}`}})
                    });

                logChannel.send(embed);
            } else if (emoji === "❌") {
                msg.delete();

                message.channel.send({embed: {color: 'RED', description: `**⛔ | **Ban canceled!`}})
                //.then(m => m.delete({ timeout: 10000 }));
            }
        });
    }
};