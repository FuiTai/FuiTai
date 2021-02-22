const Discord = require('discord.js');
module.exports = {
    name: "help",
   aliases: ["h", "commands", "list"],
   category: "help",
    description: "avaible commands",

   run: (client, message, args) => {

                                        
                                       
                                        
    
        
    let embed = new Discord.MessageEmbed();
                                        embed.setTitle("List of commands! :sparkles:");
                                        embed.setColor ("PURPLE");
                                        embed.setDescription("Don't forget that the default prefix is '<'\n"+
                                        "Total commands: 41!\n"+
                                        "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"+
                                        "\n[Invite me!](https://tinylink.net/meik0) | [Support me!](https://www.paypal.com/paypalme/808Jimmy)\n"+ 
                                        "\n"+
                                        "**Utility**\n"+
                                        "`giveaway`, `setprefix`, `resetprefix`, `welcomemsg`, `farewellmsg`, `deletewelcomemsg`, `deletefarewellmsg`, `avatar`, `ping`, `suggest`, `calc`, `github`, `userinfo`, `status`, `invite`\n"+
                                        "\n"+
                                        "**Economy**\n"+
                                        "`advertise`, `bal`, `beg`, `daily`, `deposit`, `give`, `monthly`, `rob`, `slots`, `weekly`, `withdraw`, `work`, `rps`\n"+
                                        "\n"+
                                        "**Moderation**\n" +
                                        "`kick`, `ban`, `purge`, `autosnipe`, `snipe`, `editsnipe`, `antiwords`\n"+
                                        "\n"+
                                        "**Fun**\n"+
                                        "`say`, `memes`, `lovecalc`, `trump`\n"+
                                        "\n"+
                                        "**Giveaways**\n"+
                                        "`start`, `end`, `reroll`\n")
                                        .setThumbnail("https://cdn.discordapp.com/avatars/798048714878746654/bb142206d65d2b1930eba907088a561d.png");
                                        message.channel.send(embed);
   }

}
