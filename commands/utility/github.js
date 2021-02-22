const { Discord, discord } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const fetch = require("node-fetch");
module.exports = {
    name: "github",
    aliases: ["gb", "githubuser", "githubusername"],
    category: "Information",
    description: "Returns Latency and API Latency.",
run: async (client, message, args) => {
     try {

  if (!args[0]) return message.channel.send({embed: {color: 'RED', description: `**⛔ | **Please give me an username!`}});
    
  fetch(`https://api.github.com/users/${args.join('-')}`)
    .then(res => res.json()).then(body => {
      if(body.message) return message.channel.send({embed: {color: 'RED', description: `**⛔ | **User Not Found!`}});
    let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio } = body;

            const embed = new MessageEmbed()
            .setAuthor(`${login}'s Information!`, avatar_url)
            .setColor("PURPLE")
            .setThumbnail(`${avatar_url}`)
            .addField(`Username`, `${login}`)
            .addField(`ID`, `${id}`)
            .addField(`Bio`, `${bio || "None"}`)
            .addField(`Public Repositories`, `${public_repos || "None"}`, true)
            .addField(`Followers`, `${followers}`, true)
            .addField(`Following`, `${following}`, true)
            .addField(`Location`, `${location || "None"}`)
            .addField(`Account Created`, moment.utc(created_at).format("dddd, MMMM, Do YYYY"))
            .setTimestamp();

            message.channel.send(embed);

    })

        } catch (error) {
            console.log(`[Commands] [github] Getting Error In github Command :\n`, error);
            return message.channel.send({embed: {color: 'RED', description: `**⛔ | **Something Went Wrong Try Again Later!`}})
        }
}
}