const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { promptMessage } = require("../../functions.js");
const db = require("quick.db");

const chooseArr = ["🗻", "📰", "✂"];

module.exports = {
    name: "rps",
    category: "fun",
    description: "Rock Paper Scissors game. React to one of the emojis to play the game.",
    usage: "rps",
    run: async (client, message, args) => {
        let money = parseInt(args[0]);
        let moneydb = db.fetch(`coins_${message.author.id}`)
      
        if (isNaN(args[0])) return message.channel.send({embed: {color: 'RED', description: '**⛔ |** Specify an amount to bet'}})
        //.then(m => m.delete({ timeout: 5000 }));
      
      if (money > moneydb) return message.channel.send({embed: {color: 'RED', description: '**⛔ |** You don\'t have that amount of money'}})
      //.then(m => m.delete({ timeout: 5000 }));
      
      if (money > 1000) return message.channel.send({embed: {color: 'RED', description: `**⛔ |** The maximium amount of dollars you can bet is 1000 dollars!`}})
      //.then(m => m.delete({ timeout: 5000 }));
      
      if (money < 5) return message.channel.send({embed: {color: 'RED', description: `**⛔ |** You gotta bet more than that, c'mon dude. [**5+ dollars**]`}})
      //.then(m => m.delete({ timeout: 5000 }));
      
          const embed = new MessageEmbed()
            .setColor("#ffc7e6")
            .setFooter(message.guild.me.displayName, client.user.displayAvatarURL)
            .setDescription("Add a reaction to one of these emojis to play the game!")
            .setTimestamp();

        const m = await message.channel.send(embed);
        // Wait for a reaction to be added
        const reacted = await promptMessage(m, message.author, 30, chooseArr);

        // Get a random emoji from the array
        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        // Check if it's a win/tie/loss
        const result = await getResult(reacted, botChoice);
        // Clear the reactions
        await m.reactions.removeAll();

            embed
            .setDescription("Results!")
            .addField(result, `${reacted} vs ${botChoice}`);

            


        m.edit(embed);




        function getResult(me, clientChosen) {
            if (me === undefined) {
                return "Hello? Are you there? well... tell me when you're back, I'll be giving you back your dollars!";
            }
            if ((me === "🗻" && clientChosen === "✂") ||
                (me === "📰" && clientChosen === "🗻") ||
                (me === "✂" && clientChosen === "📰")) {
               money *= 2
              db.add(`coins_${message.author.id}`, money)
              return  `You won ${money} dollars! Isn't that nice?`;
            } else if (me === clientChosen) {
                return "It seems like none of us win this match... It's a Tie!";
            } else {
                db.subtract(`coins_${message.author.id}`, args[0]);
                return `You lost! So I'm taking ${money} dollars from your wallet!`;
            }
        }
    }
}
