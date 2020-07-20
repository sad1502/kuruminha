const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: true });
const prefix = '/';
const fetch = require('node-fetch') 
var fs = require('fs')

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

    if (cmd === 'mutartemp') {
      if (!args[2]) return message.reply("**Indique um Tempo! Ex: 3000 ( 3s )**")
      if (!member) return message.reply("**Você não mencionou ninguém para mutar temporariamente, ou a pessoa não está no servidor!**")
      if (!message.guild.member(msgauthor).hasPermission("ADMINISTRATOR")) return message.reply("**Você não tem a permissão necessária para isso!**")
      if (message.guild.member(member).hasPermission("ADMINISTRATOR")) return message.reply("**Você não pode mutar essa pessoa!**")

      var tempo_mutado = args[2];

      member.roles.add(mrole)
      message.reply("**O Usúario** <@"+member+"> **foi mutado temporariamente, O Usúario será desmutado em "+args[2]+"ms**")


      setTimeout(function(){
        member.roles.remove(mrole);
        message.channel.send("**O Usúario <@"+member+"> foi desmutado.**");
      }, tempo_mutado);    
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

      if (cmd === 'desmutar') {
        if (!member) return message.reply("**Você não mencionou ninguém para mutar, ou a pessoa não está no servidor!**")
        if (!message.guild.member(msgauthor).hasPermission("ADMINISTRATOR")) return message.reply("**Você não tem a permissão necessária para isso!**")
        if (!member.roles.cache.find(r => r.name === "mutado")) return message.reply("**Esse usúario não está mutado!**")
        member.roles.remove(mrole)
        message.reply("**O Usúario** <@"+member+"> **foi desmutado com sucesso!**")
      }

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
      let reason = args.slice(0).join(' ');
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

    //avatar
    if (cmd === 'avatar') {
    if(!member) {
    const msg = new Discord.MessageEmbed()
            .setColor(0xEE2A00)
            .setImage(message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter(message.author.username);
           message.reply(msg)
           return;
    }
    var membro = message.mentions.members.first()
    const msg = new Discord.MessageEmbed()
            .setColor(0xEE2A00)
            .setImage(membro.user.displayAvatarURL())
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

    //inicio comando help
    if (cmd === 'help') {
      const msg = new Discord.MessageEmbed()
            .setColor(0xEE2A00)
            .addField('ban', 'Bane o usúario mencionado, instantaneamente.')
            .addField('pergunta', 'Faz o bot enviar mensagens com respostas positivas/negativas para a sua pergunta.')
            .addField('poll', 'Permite os usúarios fazerem uma sugestão.')
            .addField('limpar', 'Limpa as mensagens de acordo com o número digitado.')
            .addField('avatar', 'Permite ver a foto de outras pessoas.')
            .addField('mutartemp', 'Muta o membro mencionado temporáriamente ( em ms )')
            .addField('jogando', 'Troca os status de jogando do bot para a palavra escolhida.')
            .addField('ping', 'Mostra o seu ping ms.')
            .addField('help', 'Faz o bot responder com essa mensagem.')
            .addField('mutar', 'Muta o Membro Mencionado.')
            .addField('desmutar', 'Desmuta o Membro Mencionado.')
            .setTimestamp()
            .setFooter('Kuruminha');
           message.reply(msg)
    }
    //fim comando help

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
  
  client.login('process.env.token');