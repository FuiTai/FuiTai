
const math = require('mathjs');

const Discord = require('discord.js');

module.exports = {
    name: "calculate",
    aliases: ["calc"],
    description: "Get the answer to a math problem",


    run: async (client, message, args) => {

        if(!args[0]) return message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | Please provide a question!"}})

        let resp;

        try {
        if (args[0] === "help") return message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | Please provide a **valid** question!"}});
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            return message.channel.send({embed: {color: 'RED', description: ":no_entry_sign: | Please provide a **valid** question!"}});
        }

        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle('Calculator')
        .addField('Operation', `\`\`\`css\n${args.join(' ')}\`\`\``)
        .addField('Answer', `\`\`\`css\n${resp}\`\`\``)

        message.channel.send(embed);

    }
}
