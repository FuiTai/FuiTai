const Discord = require('discord.js');
const {token} = require('./config.json');
const { Collection } = require('discord.js');
const { GiveawaysManager } = require("discord-giveaways");
const client = new Discord.Client({ ws: { properties: { $browser: "Discord Android" }} });
const fs = require('fs');
const db = require("quick.db");
const config = require('./config.json');
client.config = config;

// status
client.once('ready', () => {
    client.user.setActivity(`<help | v1.0.1`, { type: 'LISTENING' });
});

if(!db.get("giveaways")) db.set("giveaways", []);

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {

    // This function is called when the manager needs to get all the giveaway stored in the database.
    async getAllGiveaways(){
        // Get all the giveaway in the database
        return db.get("giveaways");
    }

    // This function is called when a giveaway needs to be saved in the database (when a giveaway is created or when a giveaway is edited).
    async saveGiveaway(messageID, giveawayData){
        // Add the new one
        db.push("giveaways", giveawayData);
        // Don't forget to return something!
        return true;
    }

    async editGiveaway(messageID, giveawayData){
        // Gets all the current giveaways
        const giveaways = db.get("giveaways");
        // Remove the old giveaway from the current giveaways ID
        const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageID !== messageID);
        // Push the new giveaway to the array
        newGiveawaysArray.push(giveawayData);
        // Save the updated array
        db.set("giveaways", newGiveawaysArray);
        // Don't forget to return something!
        return true;
    }

    // This function is called when a giveaway needs to be deleted from the database.
    async deleteGiveaway(messageID){
        // Remove the giveaway from the array
        const newGiveawaysArray = db.get("giveaways").filter((giveaway) => giveaway.messageID !== messageID);
        // Save the updated array
        db.set("giveaways", newGiveawaysArray);
        // Don't forget to return something!
        return true;
    }

};

// Create a new instance of your new class
const manager = new GiveawayManagerWithOwnDatabase(client, {
    storage: false,
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: ["MANAGE_MESSAGES"],
        embedColor: `BLUE`,
        reaction: "🎉"
    }
});
client.giveawaysManager = manager;
// We now have a client.giveawaysManager property to manage our giveaways!

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});


// farewell message
  client.on("guildMemberRemove", member => {
    let farewellmsg = db.fetch(`serverfarewellmsg_${member.guild.id}`)
    let channel = db.fetch(`serverfarewellchannel_${member.guild.id}`)
    if (farewellmsg === null) return;
    if (!channel) return;

    client.channels.cache.get(channel).send(`**${member.user.tag}**, Left the server...\n${farewellmsg}`);
  });

// autosnipe
client.on("messageDelete", async message => {
    if (message.author.bot) return;
    await db.set(`snipedMessage_${message.guild.id}`, `User: **${message.author.tag} ID: ${message.author.id}**\nDeleted a message on channel: ${message.channel}\nMessage deleted: ${message.content}`)

    let autosnipe = await db.fetch(`autosnipe_${message.guild.id}`);

    if (autosnipe !== null) {

      let snipedMessage = await db.fetch(`snipedMessage_${message.guild.id}`);
      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setTitle("Auto Snipe")
        .setDescription(snipedMessage)
        .setImage("https://media.discordapp.net/attachments/621531082893819904/643455137800650752/giphy.gif")
        .setTimestamp()
      message.channel.send(embed)
    }
  })

// editsnipe aka gotcha
client.on('messageUpdate', async (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  if (newMessage.author.bot) return;
  await db.set(`oldMessage_${newMessage.guild.id}`, oldMessage.content)
  await db.set(`newMessage_${newMessage.guild.id}`, newMessage.content)
  await db.set(`messageAuthor_${newMessage.guild.id}`, oldMessage.author.tag)
  await db.set(`messageAuthorID_${newMessage.guild.id}`, oldMessage.author.id)

})

// commands
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

// handler
["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

// antiwords
client.on("message", async message => {
  if (!message.guild) return;
  let antiwords = await db.fetch(`antiwords_${message.guild.id}`);

  if (antiwords === "on") {
    let words = await db.get(`blacklistedwords_${message.guild.id}`);

    if (words.some(word => message.content.toLowerCase().includes(word))) {
      if (message.member.hasPermission("ADMINISTRATOR")) return;
      if (message.member.hasPermission("MANAGE_GUILD")) return;

      message.delete()

      const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle("Message deleted!")
      .setDescription(`:no_entry_sign: | Your message was deleted for containing a word banned in: ${message.guild.name}\n Your message was: ${message.content}`)
      message.author.send(embed)



    }

  }

  // prefix
    let prefix = db.fetch(`serverprefix_${message.guild.id}`);
    if (prefix === null) prefix = "<";

    // some important variables
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command)
        command.run(client, message, args);
});



client.login(token);
