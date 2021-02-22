const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: "avatar",
    aliases: ["av", "icon"],
    run: async (client, message, args) => {

        let server = message.guild;

        let memberAvatar = message.mentions.users.first();

        if(!message.mentions.users.first() || message.guild.members.cache.get(args[0])) {
        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`[Avatar URL](${message.author.displayAvatarURL({size: 2048, dynamic: true, format: 'png'})})`)
        .setTitle(`${message.author.username}'s avatar`)
        .setImage(message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))

        message.channel.send(embed);
        } else {

        let User = message.mentions.users.first()

        const otherEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${User.username}'s avatar`)
        .setDescription(`[Avatar URL](${User.displayAvatarURL({size: 2048, format: 'png', dynamic: true })})`)
        .setImage(message.mentions.users.first().displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))

        message.channel.send(otherEmbed);
        }

    }
}