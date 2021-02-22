const slotItems = [":penguin:",":cow:",":chicken:",":koala:",":octopus:",":dog:",":deer:"];
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
    name: "slots",
    aliases: ["bet"],
    description: "bet money",

    run: async (bot, message, args) => {

        let user = message.author;
        let usermoney = await db.fetch(`coins_${message.author.id}`)
        let money = parseInt(args[0]);
        let win = false;
        let avatar = message.author.displayAvatarURL({format: 'png', size: 2048, dynamic: true});
        let timeout = 1000;

            let slots = db.fetch(`slots_${message.author.id}`);

        let yu = [" ", ", noice", ", congratulations", ". Wanna lend me some?"];
        let kek = yu[Math.floor(Math.random() *yu.length)];
        let xd = [" ", " lol", " lmao", ". Get good", ". Damn bro you rly suck"];
        let iur = xd[Math.floor(Math.random() * kek.length)];


        if (!money) return message.channel.send({embed: {color: 'RED', description: '**⛔ |** Specify an amount to bet'}})
        if (money > usermoney) return message.channel.send({embed: {color: 'RED', description: '**⛔ |** You don\'t have that amount of money'}})
        if (money < 5) return message.channel.send({embed: {color: 'RED', description: `**⛔ |** You gotta bet more than that, c'mon dude. [**5+ dollars**]`}})

        let number = []
        for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }
    
        if (number[0] == number[1] && number[1] == number[2]) { 
            money *= 9
            win = true;
        } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
            money *= 2
            win = true;
        }

        if (slots !== null && timeout - (Date.now() - slots) > 0) {
            let time = ms(timeout - (Date.now() - slots));
                const Embed = new MessageEmbed()
                    .setTitle(`Woah there, slow it down man`)
                    .setThumbnail("https://cdn.discordapp.com/emojis/683981662106943488.png?v=1")
                    .setColor('RANDOM')
                    .setDescription(`⛔ | Woah there, you might lose all your dollars by betting. Wait **${time.seconds}s**\nDefault cooldown is \`1s\``)
                    .addField(`** **`, `In the meantime, you can chat with other members. Or, maybe you can tell us a little about yourself!`)
                message.channel.send(Embed);
        } else if (win) {
            let embed = new MessageEmbed()
                .setTitle(`Slots Machine`)
                .setColor("RANDOM")
                .setThumbnail("https://cdn.discordapp.com/attachments/740337517231865977/746548765057351811/dot.png")
                .setDescription(`✅ | You won **${money} dollars**\n\nYou now got **${money + usermoney} dollars** in your wallet`)
                .addField(`Results`, `**[${slotItems[number[0]]} - ${slotItems[number[1]]} - ${slotItems[number[2]]}]**`)
                .setFooter(`Nicee, wanna lend me some?`)
            message.channel.send(embed);
                db.add(`coins_${message.author.id}`, money);
                db.set(`slots_${message.author.id}`, Date.now());
        } else {
            let embed2 = new MessageEmbed()
                .setTitle(`Slots Machine`)
                .setColor("RANDOM")
                .setThumbnail("https://cdn.discordapp.com/attachments/740337517231865977/746548765057351811/dot.png")
                .setDescription(`⛔ | You Lost **${money} dollars**\n\nYou now got **${usermoney - money} dollars** in your wallet`)
                .addField(`Results`, `**[${slotItems[number[0]]} - ${slotItems[number[1]]} - ${slotItems[number[2]]}]**`)
                .setFooter(`Good luck next time`)
            message.channel.send(embed2)
                db.subtract(`coins_${message.author.id}`, money);
                db.set(`slots_${message.author.id}`, Date.now())
        }
    }
}
