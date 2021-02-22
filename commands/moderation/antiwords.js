const Discord = require('discord.js');
const db = require('quick.db');
const { promptMessage } = require('../../functions.js');

module.exports = {
    name: 'antiWords',
    aliases: ['antiwords', 'anti-words', 'anti-words'],
    category: 'Moderation\n',
    description: "Don't want the members of your server to have bad manners? Dont worry because Fuitai is here to keep your Discord Server safe! Just type `<antiWords add <Word you dont want people to say>`\n\nPeople who has ADMINISTRATOR or MANAGE_MESSAGES won't affected by this system. **You will have to use the command again for each word you'll like to add!**\n",
    usage: '`<antiWords add <Word>` - Enables and add a Word to the Anti Words system of this server.\n\n`<antiWords list` - See the list of all the blacklisted Words of this server.\n\n`<antiWords disable` - Disable the Anti Words system for this server and deletes all the Words of it.\n\n',
    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | You don't have sufficient permissions to use that command! You need **MANAGE_SERVER** permission to use this command!"}})


        const filter = message.author;

        if (args[0] === 'list') {

            let words = await db.get(`blacklistedwords_${message.guild.id}`);

            if (words !== null) {

                let embed = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setAuthor(`${message.guild.name}'s Blacklisted Words!`, message.guild.iconURL())
                    .setDescription("Here is a list of all the Blacklisted Words for this server! That means that everytime a user say one of this words, his message will be deleted and a message will be sent to the user saying that he should not say that kind of words!\n\nTo add words or enable the Anti Words system, use `<antiWords add <Word>`, **Remember that you have to use this command again for each link you want to add**, to disable and delete all the Words from the Anti Words system of this server, use `<antiWords disable`")
                    .addField("Words:", `${words}`)
                    .setTimestamp()
                return message.channel.send(embed)

            }

            let embed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setAuthor(`${message.guild.name}'s Blacklisted Words!`, message.guild.iconURL())
                .setDescription("Here is a list of all the Blacklisted Words for this server! That means that everytime a user say one of this words, his message will be deleted and a message will be sent to the user saying that he should not say that kind of words!\n\nTo add words or enable the Anti Words system, use `<antiWords add <Word>` **Remember that you have to use this command again for each word you want to add**, to disable and delete all the words from the Anti Words system of this server, use `<antiWords disable`\n\n*It seems like this server doesn't have the Anti Words system enabled yet...*")
                .setTimestamp()
            return message.channel.send(embed)
        }

        else if (args[0] === 'disable') {
            if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | You don't have sufficient permissions to use that command! You need **MANAGE_SERVER** permission to use this command!"}})
            let antiWords = await db.fetch(`antiwords_${message.guild.id}`);

            if (antiWords === null) return message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | This server doesn't have the Anti Words system enabled yet! You can enable it with: `<antiWords add <Word>`, you have to use the command again for each word you'll like to add. Example: `<antiWords add u noob`, so everytime a user send a message that contains: **u noob**, I will delete it and advertise the user that he can't say that kind of words!"}})

            const promptEmbed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setAuthor(`This verification becomes invalid after 30s.`)
                .setDescription(`Are you sure you want to disable the Anti Words system?`)

            // Send the message
            await message.channel.send(promptEmbed).then(async msg => {
                // Await the reactions and the reactioncollector
                const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

                // Verification stuffs

                if (!emoji) {
                    message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | `TIMEOUT`"}})

                }

                if (emoji === "✅") {
                    msg.delete();

                    db.delete(`antiwords_${message.guild.id}`)
                    db.delete(`blacklistedwords_${message.guild.id}`)
                    return message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | The Anti Words system for this server was successfully disabled! Use the `<antiWords add <Word>` to enable it again in the future!"}})
                } else if (emoji === "❌") {
                    msg.delete();

                    return message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | Well... The setup was cancelled..."}})
                }
            });

        } else if (args[0] === 'add') {

            let antiwords = await db.fetch(`antiwords_${message.guild.id}`)

            if (antiwords === null) {
                if (!message.member.hasPermission("MANAGER_GUILD")) return message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | You don't have sufficient permissions to use that command! You need **MANAGE SERVER** permission to use this command!"}})
                if (!args[1]) return message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | Please provide the word you want me to lock for this server! `<antiWords add <Word>`\n\nExample: `<antiWords add u noob`\n\n**__Remember that you'll have to use the command again for each word you want to add!__**"}})

                db.set(`tempwords_${message.guild.id}`, args[1])


                let wordslist = db.get(`blacklistedwords_${message.guild.id}`)
                let blacklistword = db.fetch(`tempwords_${message.guild.id}`);

                const promptEmbed = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setAuthor(`This verification becomes invalid after 30s.`)
                    .setDescription(`Would you like to enable the Anti Words system on this server?`)
                    .addField("Words:", `${blacklistword}`)

                // Send the message
                await message.channel.send(promptEmbed).then(async msg => {
                    // Await the reactions and the reactioncollector
                    const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);


                    if (!emoji) {
                        db.delete(`templinks_${message.guild.id}`)
                        return message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | `TIMEOUT`"}})
                    }

                    // Verification stuffs
                    if (emoji === "✅") {
                        msg.delete();

                        db.set(`antiwords_${message.guild.id}`, "on")
                        db.push(`blacklistedwords_${message.guild.id}`, blacklistword)
                        db.delete(`tempwords_${message.guild.id}`)

                        let newWords = db.get(`blacklistedwords_${message.guild.id}`)

                        let embed = new Discord.MessageEmbed()
                            .setColor("GREEN")
                            .setDescription("✅ | All Done! The Anti Words system for this server has been enabled!\n\nTo disable it in the future, use `<antiWords disable` command!")
                            .addField("Words:", `${newWords}`)
                            .setTimestamp()
                        return message.channel.send(embed)

                    } else if (emoji === "❌") {
                        msg.delete();

                        db.delete(`tempwords_${message.guild.id}`)
                        return message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | Well... The setup was cancelled..."}})
                    }
                });


            } else if (antiwords !== null) {

                if (!message.member.hasPermission("MANAGER_GUILD")) return message.reply(":no_entry_sign: | You don't have sufficient permissions to use that command! You need **MANAGE SERVER** permission to use this command!");
                if (!args[1]) return message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | Please provide the word you want me to lock for this server! `<antiWords add <Word>`\n\nExample: `<antiWords add u noob`\n\n**__Remember that you'll have to use the command again for each word you want to add!__**"}})

                db.set(`tempwords_${message.guild.id}`, args[1])


                let linkslist = db.get(`blacklistedwords_${message.guild.id}`)
                let blacklistword = db.fetch(`tempwords_${message.guild.id}`);


                const promptEmbed = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setAuthor(`This verification becomes invalid after 30s.`)
                    .setDescription(`Would you like to add more words to the Anti Words system of this server?`)
                    .addField("Words:", `${blacklistword}`)

                // Send the message
                await message.channel.send(promptEmbed).then(async msg => {
                    // Await the reactions and the reactioncollector
                    const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);


                    // Verification stuffs

                    if (!emoji) {
                        db.delete(`templinks_${message.guild.id}`)
                        return message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | `TIMEOUT`"}})

                    }

                    if (emoji === "✅") {
                        msg.delete();

                        db.push(`blacklistedwords_${message.guild.id}`, blacklistword)
                        db.delete(`tempwords_${message.guild.id}`)

                        let newWords = db.get(`blacklistedwords_${message.guild.id}`)

                        let embed = new Discord.MessageEmbed()
                            .setColor("GREEN")
                            .setDescription("✅ | All Done! The Words for the Anti Words system of this server has been updated!")
                            .addField("Words:", `${newWords}`)
                            .setTimestamp()
                        return message.channel.send(embed)

                    } else if (emoji === "❌") {
                        msg.delete();

                        db.delete(`tempwords_${message.guild.id}`)
                        return message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | Well... The setup was cancelled..."}})
                    }

                });

            }


        } else {

            const embed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle("Anti Words System")
                .setDescription("Dont want the members of your server to have bad manners? Dont worry because Fuitai is here to keep your Discord Server safe! Just type `<antiWords add <Word you dont want people say>`\n\nPeople who has ADMINISTRATOR or MANAGE_MESSAGES won't affected by this system. **You will have to use the command again for each word you'll like to add!**\n\n`<antiWords add <Word>` - Enables and add a Word to the Anti Links system of this server.\n\n`<antiWords list` - See the list of all the blacklisted words of this server.\n\n`<antiWords disable` - Disable the Anti Words system for this server and deletes all the Words of it.\n\n")
                .setTimestamp()
            return message.channel.send(embed)

        }

    }
}