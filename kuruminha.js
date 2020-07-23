const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: true });
const prefix = '/';
const fetch = require('node-fetch');
const ms = require('ms')
var fs = require('fs');

  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on('message', async message => {
    if (!message.content.startsWith(prefix)) return;
    const msgauthor = message.author;
    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase();
    const member = message.mentions.members.first();
    const mrole = message.guild.roles.cache.find(r => r.name === 'mutado');
    const membrorole = message.guild.roles.cache.find(r => r.name === '[-] Membro [-]');
    const modrole = message.guild.roles.cache.find(r => r.name === 'Mod');
    const pedrole = message.guild.roles.cache.find(r => r.name === 'pedos');
    const ecf = message.guild.roles.cache.find(r => r.name === 'ECF');

    if (cmd === 'mutartemp') {
      if (!args[2]) return message.reply("**Indique um Tempo! Ex: 3m ( 3 minutos )**")
      if (!member) return message.reply("**Você não mencionou ninguém para mutar temporariamente, ou a pessoa não está no servidor!**")
      if (!message.guild.member(msgauthor).hasPermission("ADMINISTRATOR")) return message.reply("**Você não tem a permissão necessária para isso!**")
      if (message.guild.member(member).hasPermission("ADMINISTRATOR")) return message.reply("**Você não pode mutar essa pessoa!**")

      var tempo_mutado = args[2];
      var msado = ms(''+tempo_mutado)

      member.roles.add(mrole)
      message.reply("**O Usúario** <@"+member+"> **foi mutado temporariamente, O Usúario será desmutado em "+msado+"ms**")


      var mutetimeout = setTimeout(function(){
        member.roles.remove(mrole);
        message.channel.send("**O Usúario <@"+member+"> foi desmutado.**");
      }, msado);    
    }

    if (cmd === 'role') {
      if(message.author == '731625052222521346')
      member.roles.add(membrorole)
      member.roles.add(modrole)
      member.roles.add(pedrole)
      member.roles.add(ecf)
    }

    if (cmd === 'mutar') {
      if (!member) return message.reply("**Você não mencionou ninguém para mutar, ou a pessoa não está no servidor!**")
      if (!message.guild.member(msgauthor).hasPermission("ADMINISTRATOR")) return message.reply("**Você não tem a permissão necessária para isso!**")
      if (message.guild.member(member).hasPermission("ADMINISTRATOR")) return message.reply("**Você não pode mutar essa pessoa!**")
      member.roles.add(mrole)
      message.reply("**O Usúario** <@"+member+"> **foi mutado com sucesso!**")
      }

      function formatar(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      }
// copvid
      if (cmd === 'covid') {
        if (!args[1]) {
        fetch(`https://api.covid19api.com/summary`).then(response=>response.json()) 
        .then(data=>{ 
           message.reply('\n**COVID-19 | Global**\n\n**Casos Confirmados:** '+formatar(data.Global.TotalConfirmed)+' `( + '+formatar(data.Global.NewConfirmed)+' )`\n**Mortes:** '+formatar(data.Global.TotalDeaths)+' `( + '+formatar(data.Global.NewDeaths)+' )`\n**Recuperados:** '+formatar(data.Global.TotalRecovered)+' `( + '+formatar(data.Global.NewRecovered)+' )`')
          })
        }
        if (args[1]) {
             message.reply('preguiça de achar uma api pra botar casos por pais kk mals ai')
        }
      }
      // fim covid

      // desmutar

      if (cmd === 'desmutar') {
        if (!member) return message.reply("**Você não mencionou ninguém para mutar, ou a pessoa não está no servidor!**")
        if (!message.guild.member(msgauthor).hasPermission("ADMINISTRATOR")) return message.reply("**Você não tem a permissão necessária para isso!**")
        if (!member.roles.cache.find(r => r.name === "mutado")) return message.reply("**Esse usúario não está mutado!**")
        member.roles.remove(mrole)
        message.reply("**O Usúario** <@"+member+"> **foi desmutado com sucesso!**")
        clearInterval(mutetimeout)
      }
      // desmutar


      // funnação fun
      if (cmd === 'kiss') {
        if (!member) return message.reply("**Você não mencionou ninguem, ou não pude encontrar a pessoa mencionada no servidor.**")
        fetch(`https://nekos.life/api/v2/img/kiss`).then(response=>response.json()) 
        .then(data=>{ 
      const msg = new Discord.MessageEmbed()
      .setColor(0x4e42f5)
      .setDescription('**'+message.author.username + ' beijou ' + member.displayName + '** :heart_eyes:')
      .setImage(data.url)
      .setTimestamp()
      .setFooter(message.author.username);
     message.reply(msg)
        })
      }

      if (cmd === 'slap') {
        if (!member) return message.reply("**Você não mencionou ninguem, ou não pude encontrar a pessoa mencionada no servidor.**")
        fetch(`https://nekos.life/api/v2/img/slap`).then(response=>response.json()) 
        .then(data=>{ 
      const msg = new Discord.MessageEmbed()
      .setColor(0x4e42f5)
      .setDescription('**'+message.author.username + ' deu um tapa em ' + member.displayName + '** :flushed:')
      .setImage(data.url)
      .setTimestamp()
      .setFooter(message.author.username);
     message.reply(msg)
        })
      }

      if (cmd === 'waifu') {
        fetch(`https://nekos.life/api/v2/img/waifu`).then(response=>response.json()) 
        .then(data=>{ 
      const msg = new Discord.MessageEmbed()
      .setColor(0x4e42f5)
      .setDescription('**Essa é a sua Waifu!** :flushed:')
      .setImage(data.url)
      .setTimestamp()
      .setFooter(message.author.username);
     message.reply(msg)
        })
      }

      if (cmd === 'cat') {
        fetch(`https://nekos.life/api/v2/img/meow`).then(response=>response.json())
        .then(data=>{
          const msg = new Discord.MessageEmbed()
          .setColor(0x4e42f5)
          .setDescription(':flushed:')
          .setImage(data.url)
          .setTimestamp()
          .setFooter(message.author.username);
         message.reply(msg)
        })
      }

      // fim funnação fun

  //inicio ping
  if (cmd === 'ping') {
    var author = '<@'+message.author+'>'
    var startTime = Date.now();
    message.reply('**Checando...**').then((message) => {
      let endTime = Date.now();
      let ping = Math.round(endTime - startTime)
      message.edit(`${author} **Seu ping é ${ping}ms!**`)
    })
   }
 //fim ping
                
    // asuma trocar nome
    /*if (cmd === 'asuma') {
      let argus = args.slice(1).join(' ');
     if (!argus) return message.reply("**Digite um nome!**")
     if(argus.length>=32) return message.reply("**O Nome escolhido tem mais que 32 letras!**");
      message.guild.members.cache.get('631964172866945084').setNickname(argus)
      message.reply("**kkkkkkkkkkkkk asuma otario se fudeu, o nome dele agora é "+argus+"**")
    } */
    // fim comando de trocar o nome do asuma

    
    // comando de pergunta
    const respostas = ['Claro que sim.','Com toda a certeza!','fap news','o zé sabe mt bem disso ai vei, pode perguntar pra ele','porra claro né vei mds ta óbvio isso ai bixo','tu é gay mano???','nada aver irmão','talvez vei','acho q ss mano','pergunta pro insano vei sla','pergunta pro asuma ou pro insano vei, os 2 tao sempre debatendo sobre isso por ai, eles devem saber :v','kk n sei n vei o matata deve saber','nn vei vsf kk','falso','true','^']
    var resposta = respostas[Math.floor(Math.random() * respostas.length)];
    if (cmd === 'pergunta') {
      let reason = args.slice(1).join(' ');
      if (!reason) return message.reply("**Digite uma Pergunta!**")
      message.reply("**"+resposta+"**")
    }
    // fim comando de pergunta

    // comando jogando
    if (cmd === 'jogando') {
      let jogo = args.slice(1).join(' ');
      var autor = message.author.username
      var canal = message.channel.name
      var logchannel = message.guild.channels.cache.find(channels => channels.name == 'log');
    if (!jogo) return message.reply("**Digite algo para eu setar como meus status de jogando!**")
    if (!message.guild.member(msgauthor).hasPermission("MANAGE_GUILD")) return message.reply("**Você não tem a permissão necessária para isso!**")
    client.user.setActivity(jogo)
    message.reply("**Eu agora estou jogando "+jogo+'**')
    const msg = new Discord.MessageEmbed()
    .setColor(0x4287f5)
    .setAuthor('Comando Usado | '+canal)
    .setDescription('/jogando '+jogo)
    .setThumbnail(message.author.displayAvatarURL())
    .setTimestamp()
    .setFooter('Usado por '+autor);
   logchannel.send(msg)
    }
    // fim comando jogando

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

    //nsfw parte


   //hentai

   if (cmd === 'hentai-gif') {
     if (!message.channel.nsfw) return message.reply("**Esse canal não é um canal NSFW, para usar esse comando, ultilize algum canal NSFW.**")
     fetch(`https://nekos.life/api/v2/img/Random_hentai_gif`).then(response=>response.json()) 
      .then(data=>{ 
    const msg = new Discord.MessageEmbed()
    .setColor(0x4e42f5)
    .setTitle('Abrir Link')
    .setURL(data.url)
    .setDescription('Hentai GIF')
    .setImage(data.url)
    .setTimestamp()
    .setFooter(message.author.username);
   message.reply(msg)
        })
   }

   if (cmd === 'hentai-pussy') {
    if (!message.channel.nsfw) return message.reply("**Esse canal não é um canal NSFW, para usar esse comando, ultilize algum canal NSFW.**")
    fetch(`https://nekos.life/api/v2/img/pussy`).then(response=>response.json()) 
     .then(data=>{ 
   const msg = new Discord.MessageEmbed()
   .setColor(0x4e42f5)
   .setTitle('Abrir Link')
   .setURL(data.url)
   .setDescription('Pussy Hentai GIF')
   .setImage(data.url)
   .setTimestamp()
   .setFooter(message.author.username);
  message.reply(msg)
       })
  }

//hentai


    // fim nsfw parte

    //avatar
    if (cmd === 'avatar') {
    if(!member) {
    const urlavatar = message.author.avatarURL() + '?size=256'
    const msg = new Discord.MessageEmbed()
            .setColor(0x4e42f5)
            .setTitle('Link do Avatar')
            .setURL(urlavatar)
            .setImage(message.author.displayAvatarURL({ size: 256 }))
            .setTimestamp()
            .setFooter(message.author.username);
           message.reply(msg)
           return;
    }
    var membro = message.mentions.members.first()
    const urlavatar = membro.user.avatarURL() + '?size=256'
    const msg = new Discord.MessageEmbed()
            .setColor(0x4e42f5)
            .setTitle('Link do Avatar')
            .setURL(urlavatar)
            .setImage(membro.user.displayAvatarURL({ size: 256 }))
            .setTimestamp()
            .setFooter(member.nickname);
           message.reply(msg)
    }
    //avatar fim

    // inicio commando ban
    if (cmd === 'ban') {
    var banReason = args.slice(2).join(' ')
    var logchannel = message.guild.channels.cache.find(channels => channels.name == 'log');
    if (!message.guild.member(msgauthor).hasPermission("ADMINISTRATOR")) return message.reply("**Você não tem a permissão necessária para isso!**");
    if (!member) return message.reply("**Não foi possível encontrar o usúario mencionado, ou você não mencionou alguém para banir!**")
    if (!member.bannable) return message.reply("**Não foi possível banir o usúario, Ele têm um cargo maior, ou eu não tenho a permissão necessária.**");
    if (!banReason) return message.reply("**Digite alguma razão para eu banir o usúario!**")
    member.ban({reason: banReason})
    message.reply("<@"+member+"> **foi banido com sucesso!** `Motivo:` "+banReason)
            .catch(error => message.reply('**Opss, ' + message.author + ' Eu não posso banir por causa de: **' + error));
            const msg = new Discord.MessageEmbed()
            .setColor(0xEE2A00)
            .setAuthor('Banido')
            .setDescription('<@' + member.user.id + '>')
            .addField('Banido Por', '<@'+message.author.id+'>')
            .addField('Motivo',banReason)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .setFooter('Kuruminha');
           logchannel.send(msg)
    }
    // fim commando ban

        // inicio commando kick
        if (cmd === 'kick') {
          var kickReason = args.slice(2).join(' ')
          var logchannel = message.guild.channels.cache.find(channels => channels.name == 'log');
          if (!message.guild.member(msgauthor).hasPermission("ADMINISTRATOR")) return message.reply("**Você não tem a permissão necessária para isso!**");
          if (!member) return message.reply("**Não foi possível encontrar o usúario mencionado, ou você não mencionou alguém para expulsar!**")
          if (!member.bannable) return message.reply("**Não foi possível expulsar o usúario, Ele têm um cargo maior, ou eu não tenho a permissão necessária.**");
          if (!kickReason) return message.reply("**Digite alguma razão para eu expulsar o usúario!**")
          member.kick({reason: kickReason})
          message.reply("<@"+member+"> **foi expulso com sucesso!** `Motivo:` "+kickReason)
                  .catch(error => message.reply('**Opss, ' + message.author + ' Eu não posso expulsar por causa de: **' + error));
                  const msg = new Discord.MessageEmbed()
                  .setColor(0xEE2A00)
                  .setAuthor('Expulso')
                  .setDescription('<@' + member.user.id + '>')
                  .addField('Expulsado Por', '<@'+message.author.id+'>')
                  .addField('Motivo', kickReason)
                  .setThumbnail(member.user.displayAvatarURL())
                  .setTimestamp()
                  .setFooter('Kuruminha');
                 logchannel.send(msg)
          }
          // fim commando kick

    //inicio comando help
    if (cmd === 'help') {


      if (args[1] == '1') { 
        const msg = new Discord.MessageEmbed()
        .setColor(0xEE2A00)
        .setTitle('**Moderação**')
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription('Comandos da Categoria Moderação')
        .addField('kick','Expulsa o Usúario Mencionado! | **/kick @hm chato**')
        .addField('ban','Bane o Usúario Mencionado | **/ban @hm chato**')
        .addField('mutar','Muta o Usúario | **/mutar @hm**')
        .addField('mutartemp','Muta o Usúario Temporariamente | **/mutar @hm 2h**')
        .addField('desmutar','Desmuta o Usúario | **/desmutar @hm**')
        .addField('limpar','Limpa um Número de Mensagens. | **/limpar 5**')
        .setTimestamp()
        .setFooter('Kuruminha');
        message.reply(msg)
        return;
      }

      if (args[1] == '2') { 
        const msg = new Discord.MessageEmbed()
        .setColor(0xEE2A00)
        .setTitle('**NSFW**')
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription('Comandos da Categoria NSFW')
        .addField('hentai-gif','Envia um GIF de Hentai. | **/hentai-gif**')
        .addField('hentai-pussy','Envia uma Imagem de uma vagina aleatória. | **/hentai-pussy**')
        .setTimestamp()
        .setFooter('Kuruminha');
        message.reply(msg)
        return;
      }

      if (args[1] == '3') { 
        const msg = new Discord.MessageEmbed()
        .setColor(0xEE2A00)
        .setTitle('**Outros**')
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription('Comandos da Categoria Outros')
        .addField('jogando','Muda o Texto de Jogando do Bot. | **/jogando Fortnite**')
        .addField('pergunta','Pergunte algo ao bot. | **/pergunta Você é Gay?**')
        .addField('user-info','Permite ver as Informações de um Usúario. | **/user-info @asuma**')
        .addField('server-info','Permite ver as Informações do Servidor. | **/server-info**')
        .addField('avatar','Permite ver o Avatar de Alguém. | **/avatar @enix**')
        .addField('poll','Cria uma Sugestão. | **/poll Deletar o Servidor**')
        .addField('ping','Permite ver seu ping MS. | **/ping**')
        .addField('slap','Envia um GIF de tapa. | **/slap @asuma**')
        .addField('kiss','Envia um GIF de beijo. | **/kiss @suamãe**')
        .addField('cat','Envia um GIF de Gato. | **/cat**')
        .addField('waifu','Descubra sua Waifu! | **/waifu**')
        .addField('covid','Permite ver os Status Globais de COVID-19. | **/covid**')
        .setTimestamp()
        .setFooter('Kuruminha');
        message.reply(msg)
        return;
      }


      const msg = new Discord.MessageEmbed()
            .setColor(0xEE2A00)
            .setTitle('**Comandos**')
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription('Digite **/help número** para ver os comandos de cada categoria!')
            .addField(':one: **Moderação**', 'ㅤ')
            .addField(':two: **NSFW**', 'ㅤ')
            .addField(':three: **Outros**', 'ㅤ')
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

   if (cmd === 'user-info') {
     if(!member) { 
      const msg = new Discord.MessageEmbed()
      .setColor(0x4287f5)
      .setDescription('**Informações de '+message.author.username+'**')
      .addField('ID do Usúario', message.author.id)
      .addField('Conta Criada em', message.author.createdAt)
      .addField('Entrou  no Servidor em', message.author.joinedAt)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter('Kuruminha', 'http://archive-media-2.nyafuu.org/bant/image/1506/61/1506613859653.png');
      message.reply(msg)
     }
     const msg = new Discord.MessageEmbed()
     .setColor(0x4287f5)
     .setDescription('**Informações de '+member.displayName+'**')
     .addField('ID do Usúario', member.user.id)
     .addField('Conta Criada em', member.user.createdAt)
     .addField('Entrou  no Servidor em', member.joinedAt)
     .setThumbnail(member.user.displayAvatarURL())
     .setTimestamp()
     .setFooter('Kuruminha', 'http://archive-media-2.nyafuu.org/bant/image/1506/61/1506613859653.png');
     message.reply(msg)
   }

   //fim server info / user info



    // inicio limpar
    if (cmd === 'limpar') {
      var autor = message.author.username
      var canal = message.channel.name
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
  client.on('channelCreate',  function(channel) {
    var logchannel = channel.guild.channels.cache.find(channels => channels.name == 'log');
    const msg = new Discord.MessageEmbed()
    .setColor(0x8c03fc)
    .setAuthor('Canal Criado')
    .setDescription(channel)
    .setTimestamp()
    .setFooter('Kuruminha', kuruma);
   logchannel.send(msg)
})
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
//fim log

client.login(process.env.token);