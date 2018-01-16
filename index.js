const botconfig = require("./botconfig.json");
const Discord =  require("discord.js");

const bot =  new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log("works")
  bot.user.setGame("op SchaapieNetwork")
});


bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}help`){
      message.channel.send("Help aan het versturen..").then(msg => {msg.delete(3000)}).catch(console.error);
      return message.author.send("```!help - Verstuurd de commands van de bot.\n!serverinfo - Geeft je de informatie van de server.\n!botinfo - Verstuurt informatie over de bot.\n!nick [new nickname] - Verandert de naam van de bot.```");
    }

    if(cmd === `${prefix}serverinfo`){
      let serverembed =  new Discord.RichEmbed()
      .setDescription("__**Server Informatie**__")
      .setColor("#ff0000")
      .addField("Eigenaren:", "Mex (ScheepiePower), Jelle (SchaapieLive)")
      .addField("Staff:", "sneakyywoof")
      .addField("Members:", message.guild.memberCount);
      return message.channel.send(serverembed);
    }

    if(cmd === `${prefix}botinfo`){
      let botembed =  new Discord.RichEmbed()
      .setDescription("__**Bot Informatie**__")
      .setColor("#ff0000")
      .addField("Developer:", "Mex (ScheepiePower)")
      .addField("Created On:", "01/13/2018")
      .addField("Joined this server at:", "01/14/2018");
      return message.channel.send(botembed);
    }

    if(cmd === `${prefix}nick`){
      message.guild.members.get(bot.user.id).setNickname(message.content.replace("!nick ", ""));
      return message.channel.send("Changed my nickname.").then(msg => {msg.delete(3000)}).catch(console.error);
    }

});

bot.on("guildMemberAdd", async (member, guild) => {
  let memberrole = member.guild.roles.find("name", "Member")
  member.addRole(memberrole).catch(console.error);
});

bot.login(process.env.BOT_TOKEN);
