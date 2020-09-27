const Discord = require('discord.js'),
client = new Discord.Client({ disableEveryone: true });
var prefix = '/';
const fetch = require('node-fetch');
const ms = require('ms')
var fs = require('fs');
const { error } = require('console');

  client.on('ready', () => {
    console.log(`Bot Iniciado | ${client.user.tag}!`);
  });

  client.on('message', async message => {

    if (message.author.bot) return;
    console.log(`${message.guild.name} | ${message.author.username} : ${message.content}`) // kk...

    if (!message.content.startsWith(prefix)) return;
    const msgauthor = message.author;
    const args = message.content.trim().split(/ +/g),
    cmd = args[0].slice(prefix.length).toLowerCase(),
    member = message.mentions.members.first(),
    mrole = message.guild.roles.cache.find(r => r.name === 'mutado'),
    membrorole = message.guild.roles.cache.find(r => r.name === '[-] Membro [-]'),
    modrole = message.guild.roles.cache.find(r => r.name === 'Mod'),
    pedrole = message.guild.roles.cache.find(r => r.name === 'pedos'),
    ecf = message.guild.roles.cache.find(r => r.name === 'ECF'),
    enixrole = message.guild.roles.cache.find(r => r.name === 'enix'),
    ownerid = '731625052222521346'

 /*
    if (cmd === 'pz') {
      if (!args[1]) return message.reply("**Digite a Coordenada X!**")
      if (!args[2]) return message.reply("**Digite a Coordenada Y!**")
      const Pageres = require('pageres');
      (async () => {
          await new Pageres()
              .src(`https://pixelzone.io/?p=${args[1]},${args[2]}`, ['800x600'])
              .dest(__dirname)
              .run();
          console.log('Terminei de Baixar a Screenshot, deletando da pasta em 7 segundos.');
          message.reply("Aqui está, ", { files: [ `./pixelzone.io!p=${args[1]},${args[2]}-800x600.png` ] })
          setTimeout(() => {
            fs.unlink(`pixelzone.io!p=${args[1]},${args[2]}-800x600.png`, function (err) {
              if (err) throw err;
              console.log('Arquivo deletado!');
              });
          },7000)
      })();
    } vai se fuder github filho da puta do caralho bando de riquinho q n aceita a porra de uma pasta de mais de 100mb*/

    if (cmd === 'prefix') {
      if (message.author.bot) return;
      if (message.author.id != ownerid) return;
      if (!args[1]) return message.reply("n")
      prefix = args[1]
    }

    // mute temporario
    if (cmd === 'mutartemp') {
      if (!args[2]) return message.reply("**Indique um Tempo! Ex: 3m ( 3 minutos )**")
      if (!member) return message.reply("**Você não mencionou ninguém para mutar temporariamente, ou a pessoa não está no servidor!**")
      if (!message.guild.member(msgauthor).hasPermission("MANAGE_MESSAGES")) return message.reply("**Você não tem a permissão necessária para isso!**")
      if (message.guild.member(member).hasPermission("ADMINISTRATOR")) return message.reply("**Você não pode mutar essa pessoa!**")

      var tempo_mutado = args[2];
      var msado = ms(''+tempo_mutado)

      member.roles.add(mrole)
      message.reply("**O Usúario** <@"+member+"> **foi mutado temporariamente, O Usúario será desmutado em "+args[2]+"**")


      var mutetimeout = setTimeout(function(){
        member.roles.remove(mrole);
      }, msado);    
    }
    // mute temporario
    function desmtr() {
      clearInterval(mutetimeout)
    }
          // desmutar

          if (cmd === 'desmutar') {
            if (!member) return message.reply("**Você não mencionou ninguém para mutar, ou a pessoa não está no servidor!**")
            if (!message.guild.member(msgauthor).hasPermission("MANAGE_MESSAGES")) return message.reply("**Você não tem a permissão necessária para isso!**")
            if (!member.roles.cache.find(r => r.name === "mutado")) return message.reply("**Esse usúario não está mutado!**")
            if (message.author.bot) return;
            member.roles.remove(mrole)
            message.reply("**O Usúario** <@"+member+"> **foi desmutado com sucesso!**")
            desmtr()
          }
          // desmutar

    // pra quando eu pedir cargo pro insano e ele tiver off
    if (cmd === 'role') {
      if(message.author.id == '731625052222521346')
      member.roles.add(membrorole)
      member.roles.add(modrole)
      member.roles.add(pedrole)
      member.roles.add(ecf)
    }
    // pra quando eu pedir cargo pro insano e ele tiver off

    // mutar
    if (cmd === 'mutar') {
      if (message.author.bot) return;
      if (!member) return message.reply("**Você não mencionou ninguém para mutar, ou a pessoa não está no servidor!**")
      if (!message.guild.member(msgauthor).hasPermission("MANAGE_MESSAGES")) return message.reply("**Você não tem a permissão necessária para isso!**")
      if (message.guild.member(member).hasPermission("ADMINISTRATOR")) return message.reply("**Você não pode mutar essa pessoa!**")
      member.roles.add(mrole)
      message.reply("**O Usúario** <@"+member+"> **foi mutado com sucesso!**")
      }
      // mutar

      function formatar(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      }
// copvid
      if (cmd === 'covid') {
        if (args[2] == 'detalhes') {
          fetch(`https://corona.lmao.ninja/v3/covid-19/countries/${args[1]}`).then(response=>response.json()) 
          .then(data=>{ 
            const msg = new Discord.MessageEmbed()
            .setColor(0x4e42f5)
            .setTitle('COVID-19 Info | '+data.country)
            .setDescription(`Informações Detalhadas`)
            .addField('Casos Hoje', formatar(data.todayCases), true)
            .addField('Mortes Hoje', formatar(data.todayDeaths), true)
            .addField('Recuperados Hoje', formatar(data.todayRecovered), true)
            .addField('Casos p/ Milhão', formatar(data.casesPerOneMillion), true)
            .addField('Mortes p/ Milhão', formatar(data.deathsPerOneMillion), true)
            .addField('Recuperados p/ Milhão', formatar(data.recoveredPerOneMillion), true)
            .addField('Críticos p/ Milhão', formatar(data.criticalPerOneMillion), true)
            .addField('Ativos p/ Milhão', formatar(data.activePerOneMillion), true)
            .addField('Testes', formatar(data.tests), true)
            .setThumbnail(data.countryInfo.flag)
            .setTimestamp()
            .setFooter(message.author.username);
           message.reply(msg)
          })
        }
        if (args[2]) return;
        if (!args[1]) {
        fetch(`https://corona.lmao.ninja/v3/covid-19/all`).then(response=>response.json()) 
        .then(data=>{ 
          const msg = new Discord.MessageEmbed()
          .setColor(0x4e42f5)
          .setTitle('COVID-19 Info | Global')
          .addField('Casos', formatar(data.cases), true)
          .addField('Mortes', formatar(data.deaths), true)
          .addField('Recuperados', formatar(data.recovered), true)
          .addField('Ativos', formatar(data.active), true)
          .addField('Críticos', formatar(data.critical), true)
          .addField('População', formatar(data.population), true)
          .addField('Casos Hoje', formatar(data.todayCases), true)
          .addField('Mortes Hoje', formatar(data.todayDeaths), true)
          .addField('Recuperados Hoje', formatar(data.todayRecovered), true)
          .addField('Casos p/ Milhão', formatar(data.casesPerOneMillion), true)
          .addField('Mortes p/ Milhão', formatar(data.deathsPerOneMillion), true)
          .addField('Recuperados p/ Milhão', formatar(data.recoveredPerOneMillion), true)
          .addField('Críticos p/ Milhão', formatar(data.criticalPerOneMillion), true)
          .addField('Ativos p/ Milhão', formatar(data.activePerOneMillion), true)
          .addField('Testes', formatar(data.tests), true)
          .setThumbnail('https://i.pinimg.com/originals/5c/c5/5e/5cc55e21f1b699ce8b1435dbd6ff668e.jpg')
          .setTimestamp()
          .setFooter(message.author.username);
         message.reply(msg)
          })

        }
        if (args[1]) {
          fetch(`https://corona.lmao.ninja/v3/covid-19/countries/${args[1]}`).then(response=>response.json()) 
          .then(data=>{ 
            const msg = new Discord.MessageEmbed()
            .setColor(0x4e42f5)
            .setTitle('COVID-19 Info | '+data.country)
            .setDescription(`Digite **/covid ${args[1]} detalhes** para ver mais!`)
            .addField('Casos', formatar(data.cases), true)
            .addField('Mortes', formatar(data.deaths), true)
            .addField('Recuperados', formatar(data.recovered), true)
            .addField('Ativos', formatar(data.active), true)
            .addField('Críticos', formatar(data.critical), true)
            .addField('População', formatar(data.population), true)
            .setThumbnail(data.countryInfo.flag)
            .setTimestamp()
            .setFooter(message.author.username);
           message.reply(msg)
            })
        }
      }
      // fim covid

      // translatoreiro
      if (cmd === 'traduzir') {
        let traduzir_pra = args[1]
        let texto = args.slice(2).join(' ')
        if (!texto) return message.reply("**Digite um texto para traduzir!**")
        if (!traduzir_pra) return message.reply("**Indique uma linguagem para traduzir o texto, ex: english**")
        const Translator = require('@danke77/google-translate-api');

        const translator = new Translator({
          from: 'auto',
          to: traduzir_pra,
          raw: false,
          client: 'gtx', // t
          tld: 'cn',
      });

      const res = await translator.translate(texto)
      .catch(err => {
          console.error(err);
      });

      message.reply(`**${res.text}**`)

      }
      // fim translatoreiração

      // math
      if (cmd === 'math') {
      let argumentos = args.slice(1).join(' ');
      if (message.author.bot) return;
      if (!argumentos) return message.reply("**Indique uma Equação!**")
      const { evalExpression, tokenize, Token, evalTokens } = require('@hkh12/node-calc');
      const resposta = evalExpression(argumentos)
      message.reply("**"+resposta+"**")
      }
      // fim math

      if (cmd === 'eval') {
        const util = require('util');
        const beautify = require('beautify');
        if (message.author.id !== ownerid) return message.reply("**Apenas o dono do bot pode usar esse comando!**");
        if (message.author.bot) return;
        const toEval = args.slice(1).join(' ');
        if (!toEval) return message.reply("**Digite algo para dar eval!**")
        if (toEval.includes("token")) return message.reply("gay");
        if (toEval.includes("process.env.token")) return message.reply("gay");
        if (toEval.includes("env")) return message.reply("gay");

        var evaluado = eval(toEval);
        const embed = new Discord.MessageEmbed()
        .setTitle('Code Eval')
        .addField("Código:", `\`\`\`js\n${beautify(args.slice(1).join(' '), { format: "js" })}\n\`\`\``)
        message.channel.send(embed)
      }

    if (cmd === 'backup') {
      if (!message.guild.member(msgauthor).hasPermission("ADMINISTRATOR")) return message.reply("**Você não tem a permissão necessária para isso!**")
      if (message.author.bot) return;
      if (message.author.id != ownerid) return;
      message.reply("**Backup enviado!**")
      message.author.send("**Backup dos Arquivos: Leaderboard.json, Kuruminha.js, Tags.json e ultimos_erros.txt!**", {
        files: [
          "./kuruminha.js"
        ]
      });
    }

    if (cmd === 'owop') {
      fetch(`https://ourworldofpixels.com/api`).then(response=>response.json()) 
      .then(data=>{ 
        if (data.captchaEnabled == true) {
          fetch(`https://ourworldofpixels.com/api`).then(response=>response.json()) 
          .then(data=>{ 
        const msg = new Discord.MessageEmbed()
        .setColor(0x4e42f5)
        .setTitle('OWOP API')
        .setDescription('Algumas Informações da API do OWOP.')
        .addField('CAPTCHA Ativado',data.captchaEnabled,true)
        .addField('Conexões por IP',data.maxConnectionsPerIp,true)
        .addField('Usúarios',data.users,true)
        .setTimestamp()
        .setFooter(message.author.username);
         message.reply(msg)
         message.reply("**O CAPTCHA está ativado, por isso eu não posso mostrar o valor do PQuota atual.** :cry:")
         return;
          })
        }

      const OJS = require("owop-js");
      const Client = new OJS.Client({
          reconnect: false,
          controller: false
      });
      
      Client.on("join", () => {
        var hm = Client.net.bucket.rate
        var hm2 = Client.net.bucket.time
        var hm3 = `${hm}px/${hm2}s`
        setInterval(() => {
         hm = Client.net.bucket.rate
         hm2 = Client.net.bucket.time
         hm3 = `${hm}px/${hm2}s`
      },1000)

      fetch(`https://ourworldofpixels.com/api`).then(response=>response.json()) 
       .then(data=>{ 
     const msg = new Discord.MessageEmbed()
     .setColor(0x4e42f5)
     .setTitle('OWOP API')
     .setDescription('Algumas Informações da API do OWOP.')
     .addField('CAPTCHA Ativado',data.captchaEnabled,true)
     .addField('Conexões por IP',data.maxConnectionsPerIp,true)
     .addField('PQuota', hm3,true)
     .addField('Usúarios',data.users,true)
     .setTimestamp()
     .setFooter(message.author.username);
    message.reply(msg)
       });
     })
    })
    }
    // owop

    //poll
    if (cmd === 'poll') {
    let pol = args.slice(1).join(' ');
    var logchannel = message.guild.channels.cache.find(channels => channels.name == 'log');
    var autor = message.author.username
    var canal = message.channel.name
    if (!pol) return message.reply("**Digite uma sugestão!**")
    message.react('👍')
    message.react('👎')
    const msg = new Discord.MessageEmbed()
    .setColor(0x4287f5)
    .setAuthor('Nova Sugestão | '+canal)
    .setDescription(pol)
    .setTimestamp()
    .setThumbnail(message.author.displayAvatarURL())
    .setFooter('Sugestão Criada por '+autor);
   logchannel.send(msg)
    }
    //poll
 //avatar
 if (cmd === 'avatar') {
  if(!member) {
  const urlavatar = message.author.displayAvatarURL()
  const urlavatar2 = urlavatar.toString()
  const urlavatar3 = urlavatar2.replace('.webp','.png?size=2048')
  const msg = new Discord.MessageEmbed()
          .setColor(0x4e42f5)
          .setTitle('Link do Avatar')
          .setURL(urlavatar3)
          .setImage(urlavatar3)
          .setTimestamp()
         message.reply(msg)
         return;
  }
  var membro = message.mentions.members.first(),
  urlavatar = membro.user.avatarURL(),
  urlavatar2 = urlavatar.toString(),
  urlavatar3 = urlavatar2.replace('.webp','.png?size=2048')
  const msg = new Discord.MessageEmbed()
          .setColor(0x4e42f5)
          .setTitle('Link do Avatar')
          .setURL(urlavatar3)
          .setImage(urlavatar3)
          .setTimestamp()
         message.reply(msg)
  }
  //avatar fim

    //inicio comando help
    if (cmd === 'help') {
      const msg = new Discord.MessageEmbed()
      .setColor(0x03fc0b)
      .setTitle('**Minha Lista de Comandos!**')
      .setThumbnail(message.author.displayAvatarURL())
      .addField('Moderação','`kick` `ban` `mutar` `mutartemp` `desmutar` `limpar`',true)
      .addField('Bot Owner','`backup` `token` `role` `restart` `eval`',true)
      .addField('Cálculos','`math` `timemath`',true)
      .addField('Informação','`covid` `owop` `info` `server-info`',true)
      .addField('Miscelânea','`avatar` `poll` `ping` `traduzir` `textemoji`',true)
      .addField('Desativados','*ultimoserros* *asuma* *enix* *tag* *addtag*',true)
      .addField('Removidos','*hentai* *hentai-gif* *anal* *boobs* *porngif* *hentai-pussy* *jogando* *avatarbot* *slap* *cat* *waifu* *kiss*',true)
      .setTimestamp()
      .setFooter('Kuruminha');
      message.reply(msg)
    }

    //fim comando help
   //inicio server info / user info
   if (cmd === 'server-info') {
    const msg = new Discord.MessageEmbed()
    .setColor(0x4287f5)
    .setAuthor(message.guild.name)
    .setDescription('`Informações do Servidor`')
    .addField('Dono', message.guild.owner)
    .addField('Membros', message.guild.memberCount)
    .addField('Criado em', message.guild.createdAt)
    .addField('Você Entrou em', message.guild.joinedAt)
    .addField('Canais', message.guild.channels.cache.size)
    .addField('Cargos', message.guild.roles.cache.size)
    .addField('Emojis', message.guild.emojis.cache.size)
    .setThumbnail(message.guild.iconURL())
    .setTimestamp()
    .setFooter('Kuruminha', 'http://archive-media-2.nyafuu.org/bant/image/1506/61/1506613859653.png');
    message.reply(msg)
   }

   if (cmd === 'info') {
     if(!member) { 
      msg = new Discord.MessageEmbed()
      .setColor(0x4287f5)
      .setDescription('**Informações de '+message.author.username+'**')
      .addField('ID do Usúario', message.author.id)
      .addField('Conta Criada em', message.author.createdAt)
      .addField('Entrou  no Servidor em', message.member.joinedAt)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter('Kuruminha', 'http://archive-media-2.nyafuu.org/bant/image/1506/61/1506613859653.png');
      message.reply(msg)
     }
     const membroidd = member.id,
    msg = new Discord.MessageEmbed()
     .setColor(0x4287f5)
     .setDescription('**Informações de ' + member.displayName + '**')
     .addField('ID do Usúario', member.user.id)
     .addField('Conta Criada em', member.user.createdAt)
     .addField('Entrou  no Servidor em', member.joinedAt)
     .setThumbnail(member.user.displayAvatarURL())
     .setTimestamp()
     .setFooter('Kuruminha', 'http://archive-media-2.nyafuu.org/bant/image/1506/61/1506613859653.png');
     message.reply(msg)
   }

   //fim server info / user info

   if (cmd === 'token') { // preguiça de acessar o heroku ou o discord developers toda hora
    if (message.author.bot) return;
     if (message.author.id == ownerid) {
     message.author.send(process.env.token)
     message.reply('**Meu Token foi enviado para o seu DM!**')
     }
   }

    // inicio limpar
    if (cmd === 'limpar') {
      var autor = message.author.username
      var canal = message.channel.name
      if (message.author.bot) return;
      var logchannel = message.guild.channels.cache.find(channels => channels.name == 'log');
      if (!message.guild.member(msgauthor).hasPermission("MANAGE_MESSAGES")) return message.reply("**Você não tem a permissão necessária para isso!**")
      if (!args[1]) return message.reply("**Digite um número de mensagens para eu limpar!**")
      if (message.channel == '733536977239932988') return message.reply("**Você não pode usar esse comando aqui!**")
      message.channel.bulkDelete(args[1])
      const msg = new Discord.MessageEmbed()
    .setColor(0x4287f5)
    .setAuthor('Comando Usado | '+canal)
    .setDescription('/limpar '+args[1])
    .setThumbnail(message.author.displayAvatarURL())
    .setTimestamp()
    .setFooter('Usado por '+autor);
   logchannel.send(msg)
    }
  })
    // fim limpar

  //inicio log
  const kuruma = 'http://archive-media-2.nyafuu.org/bant/image/1506/61/1506613859653.png';
  client.on('messageDelete', message => {
    var logchannel = message.guild.channels.cache.find(channels => channels.name == 'log');
    if (message.author.bot) return;
    const msg = new Discord.MessageEmbed()
    .setColor(0x03f8fc)
    .setAuthor('Mensagem Deletada')
    .setDescription(message.content)
    .setThumbnail(message.author.displayAvatarURL())
    .addField('Autor da Mensagem', '<@'+message.author+'>')
    .addField('Canal da Mensagem', message.channel)
    .setTimestamp()
    .setFooter('Kuruminha', kuruma);
   logchannel.send(msg)
})

  client.on('messageUpdate', function(oldMessage, newMessage) {
    var logchannel = newMessage.guild.channels.cache.find(channels => channels.name == 'log');
    if (newMessage.channel == '733536977239932988') return;
    if(newMessage == oldMessage) return;
    if (newMessage.author.bot) return;
    const msg = new Discord.MessageEmbed()
    .setColor(0xfce303)
    .setAuthor('Mensagem Editada')
    .setThumbnail(newMessage.author.displayAvatarURL())
    .setDescription('Antes: **'+oldMessage.content+'** | Agora: **'+newMessage.content+'**')
    .addField('Autor da Mensagem', '<@'+newMessage.author+'>')
    .addField('Canal da Mensagem', newMessage.channel)
    .setTimestamp()
    .setFooter('Kuruminha', kuruma);
   logchannel.send(msg)
})

client.on('guildBanRemove', function(guild, user) {
  var logchannel = guild.channels.cache.find(channels => channels.name == 'log');
  const msg = new Discord.MessageEmbed()
  .setColor(0x03fc24)
  .setAuthor('Usúario Desbanido')
  .setThumbnail(user.avatarURL())
  .setDescription('O Usúario <@'+user.id+'> foi desbanido.')
  .setTimestamp()
  .setFooter('Kuruminha', kuruma);
 logchannel.send(msg)
})
// fim log
client.login(process.env.token)

var avatarz = function() {
  setInterval(() => {
    var files = fs.readdirSync('./avatar/')
    var chosenFile = files[Math.floor(Math.random() * files.length)] // https://linustechtips.com/main/topic/949042-pick-random-image-from-folder-in-nodejs/?tab=comments#comment-11591158
  const playing_list = [`${client.users.cache.size} usúarios`,'PixelZone','PixelPlanet','PixelCanvas','PxlsPlace','PixelAnarchy','OurWorldofPixels','PixelSpace','PixelNow','Discord','Guilded','Overwatch','Fortnite','League of Legends','Minecraft','Five Nights at Freddy`s','Valorant','Nada!']
  var jogo_escolhido = Math.floor(Math.random() * (playing_list.length))
    client.user.setAvatar(`./avatar/${chosenFile}`)
    client.user.setActivity(playing_list[jogo_escolhido])
     },600000) // 10 mins
    }

    avatarz()