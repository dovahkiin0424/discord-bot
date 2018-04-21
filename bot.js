var Discord = require("discord.js");
var bot = new Discord.Client();
var fs = require('fs');

bot.on('message', message => {

  var sender = message.author;
  var msg = message.content.toUpperCase();
  var prefix = '!'
  var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));
  var cont = message.content.slice(prefix.length).split(" ");
  var args = cont.slice(1);

  if (!message.content.startsWith(prefix)) return;

  var cmd = bot.commands.get(cont[0])
  if (cmd) cmd.run(bot, message, args);

  bot.commands = new Discord.Collection();

  fs.readdir('./commands/', (err, files) => {
      if(err) console.error(err);

      var jsfiles = files.filter(f => f.split('.').pop() === 'js');
      if (jsfiles.length <= 0) {return console.log('A parancsok nem találhatók')}
      else {console.log(jsfiles.length + ' parancs található.') }

      jsfiles.forEach((f, i) => {
        var cmds = requires(`./commands/${f}`);
        console.log(`A ${f} parancs betöltése...`);
        bot.commands.set(cmds.config.command, cmds);
      })
  })


  if (msg.includes('KÖCSÖG')) {
      message.delete()
      message.reply('Ne káromkodj!!! :rage: :rage:');
  return;
  }

  if (msg.includes('ANYÁD')) {
      message.delete()
      message.reply('Ne káromkodj!!! :rage: :rage:');
return;
}

  if (msg.includes('BUZI')) {
      message.delete()
      message.reply('Ne káromkodj!!! :rage: :rage:');
return;
}

  if (msg.includes('KURVA')) {
      message.delete()
      message.reply('Ne káromkodj!!! :rage: :rage:');
return;
}

  if (!userData[sender.id]) userData[sender.id] = {
    messagesSent: 0
  }

  userData[sender.id].messagesSent++;

  fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
    if (err) console.error(err);
  });

  if (msg === prefix+'USERSTATS') {
    message.channel.send('Eddig **' + userData[sender.id].messagesSent + '** üzenetet küldtél!')
  }

});

bot.on('guildMemberAdd', member => {
  console.log('Tag ' + member.username + 'csatlakozott a szerverhez!')

  var role = member.guild.roles.find('name', 'Tag');

  member.addRole(role)
})

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setGame("with his BANHAMMER");
});

bot.login('process.env.BOT_TOKEN')
