module.exports = {
    name: "canvas",



    run: async (client, message, args) => {
    const {createCanvas, loadImage} = require('canvas');
    const lienzo = createCanvas(736,736);
    const ctx = lienzo.getContext('2d');
  
    loadImage(message.author.avatarURL).then(img => {
  
  
      ctx.drawImage(img,0,0,736,736)
  
      ctx.fillStyle = 'FF00FF'
      ctx.font = '150px arial'
      ctx.fillText('careperro',50,700)
  
      const {
        Attachment
      } = require('discord.js');
      const attachment = new Attachment(lienzo.toBuffer(), 'careperro.png');
      message.channel.send(attachment)
    })
}
}