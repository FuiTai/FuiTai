
const Discord = require('discord.js');
const db = require('quick.db');
const beautify = require("beautify");

module.exports = {
  name: 'eval',
  aliases: ["ev", "e"],
  category: "admincmds",
  description: "undefined",
  run: async (client, message, args) => {

    let dev = db.fetch(`dev_${message.author.id}`);

    if (dev === null) return message.react("🚫");

    //if (message.author.id !== '567190722516877352') return message.react("🚫");

    if (!args[0]) return message.react("❌");

    try {

      if (args.join(" ").toLowerCase().includes("token")) {
        return message.react("🚫");
      }

      const toEval = args.join(" ");
      const evaluated = eval(toEval);

      let embed = new Discord.MessageEmbed()
      .setColor("#00FF00")
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTitle("Eval")
      .addField("To evaluate:", `\`\`\`js\n${beautify(args.join(" "), { format: "js" })}\n\`\`\``)
      .addField("Evaluated:", evaluated)
      .addField("Type of:", typeof(evaluated));
    
      message.react("✅")
      message.channel.send(embed);
    } catch (e) {

      let embed = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setTitle("\:x: Error!")
      .setDescription(e)
      .setFooter(client.user.username, client.user.displayAvatarURL());

      message.react("❌")
      message.channel.send(embed);
    }
  }
}

