const jimp = require("jimp")

module.exports = {
    name: "trump",
   aliases: ["faketrump", "tmp", "trumpimg"],
   category: "fun",
    description: "Says whatever you ask him",

    run: (client, message, args) => {

        let img = jimp.read("https://cdn.discordapp.com/attachments/747483679890341908/756156592449257602/trump.png")
        
        if (!args[0]) return message.channel.send({embed: {color: 'RED', description: `:no_entry_sign: | Tell me what trump should say!`}})
        message.delete().catch(O_o=>{}); 
            try {
                message.channel.startTyping(4)
        img.then(image => {
            jimp.loadFont(jimp.FONT_SANS_32_BLACK).then(font => {
                image.resize(1000,500)
                image.print(font, 22, 120, args.join(" "), 600)
                image.getBuffer(jimp.MIME_PNG, (err, i) => {
                    message.channel.send({files: [{ attachment: i, name: "trump.png"}]})
                message.channel.stopTyping(true);
                }) 
            })
        })
        } catch (e) {
        message.channel.send({embed: {color: 'RED', description: `:no_entry_sign: | Oops! Something went wrong...\n` + "```" + e + "```"}});
    }
    }
}
