const Discord = require("discord.js");
const { promptMessage } = require("../../functions.js");
const db = require("quick.db");

module.exports = {
    name: "autosnipe",
    category: "Administration",
    description: "Enable Auto Snipe on your server, so like that you'll know every time a user deletes a message, what was the message content and all that!",
    usage: "n!autoSnipe",
    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
           return message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | You don't have sufficient permissions to use that command! You need **MANAGE_MESSAGES** permission to use that command!"}})
        }

        let autoSnipe = await db.fetch(`autosnipe_${message.guild.id}`);

        if (autoSnipe !== null) {

            const promptEmbed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setAuthor(`This verification becomes invalid after 30s.`)
                .setDescription(`The Auto Snipe Function is already enabled on this server, want to disable the Auto Snipe function on this server?\nReact with ✅ to **disable it**, ❌ to **cancel**!`)

            // Send the message
            await message.channel.send(promptEmbed).then(async msg => {
                // Await the reactions and the reaction collector
                const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

                // The verification stuffs
                if (!emoji) {
                    return message.channel.send({embed: {color: 'RED', description: "❌ `TIMEOUT`"}})
                }
                if (emoji === "✅") {
                    msg.delete();
                    message.channel.send({embed: {color: 'GREEN', description: `✅ Ok! All done! The Auto Snipe function has been disabled for this server!\n\nTo enable this function in the future use this same command!`}})
                    db.delete(`autosnipe_${message.guild.id}`);

                } else if (emoji === "❌") {
                    msg.delete();
                    message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | Operation Cancelled..."}})

                }
            });

        } else {
            const promptEmbed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setAuthor(`This verification becomes invalid after 30s.`)
                .setDescription(`Do you want to enable the Auto Snipe function on this server?\nReact with ✅ to **enable it**, ❌ to **cancel**!`)

            // Send the message
            await message.channel.send(promptEmbed).then(async msg => {
                // Await the reactions and the reaction collector
                const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

                // The verification stuffs
                if (!emoji) {
                    return message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | `TIMEOUT`"}})
                }
                if (emoji === "✅") {
                    msg.delete();
                    message.channel.send({embed: {color: 'GREEN', description: `✅ | Ok! All done! The Auto Snipe function has been enabled for this server!\n\nTo disable this function in the future use this same command!`}})
                    db.set(`autosnipe_${message.guild.id}`, true);

                } else if (emoji === "❌") {
                    msg.delete();
                    message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | Operation Cancelled..."}})

                }
            });
        }

    }
}