const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: true });
const prefix = '/';
const fetch = require('node-fetch');
const ms = require('ms')
var fs = require('fs');
const DabiImages = require("dabi-images");
const DabiClient = new DabiImages.Client();
const editJsonFile = require("edit-json-file");
const { error } = require('console');
const file = editJsonFile(`${__dirname}/leaderboard.json`);
const file2 = editJsonFile(`${__dirname}/tags.json`);

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
    const enixrole = message.guild.roles.cache.find(r => r.name === 'enix');
    const ownerid = '731625052222521346'

// pixels
    if (cmd === 'setscore') {
      if (!member) return message.reply('**Você não mencionou ninguém ou a pessoa não está nesse servidor!**')
      if (!args[2]) return message.reply('**Digite um valor de score!**')
      if (!message.guild.member(msgauthor).hasPermission("MANAGE_MESSAGES")) return message.reply("**Você não tem a permissão necessária para isso!**")
      const membrao = member.id;
      file.set(membrao+'.pixels', args[2]);
      file.save();
      message.reply("**O Score de "+member.displayName+" agora é "+formatar(args[2])+' pixels!**')
    }

    if (cmd === 'score') {
      if (!member) return message.reply('**Você não mencionou ninguém ou a pessoa não está nesse servidor!**')
      const membroid = member.id;
      const pxs = file.get(membroid+'.pixels')
      if (pxs == undefined) return message.reply('**'+member.displayName+' colocou um total de 0 pixels!**')
      message.reply('**'+member.displayName+' colocou um total de '+formatar(pxs)+' pixels!**')
    }

     if (cmd === 'comparar') {
      if (!message.guild.member(msgauthor).hasPermission("MANAGE_MESSAGES")) return message.reply("**Você não tem a permissão necessária para isso!**")
      if (message.author.bot) return;
       const Attach = message.attachments.array()
       const PNG = require('pngjs').PNG;
       if (!Attach[0]) return message.reply("**Envie uma Imagem para eu comparar com a MegaBR!**")

       // download imagem | https://www.npmjs.com/package/image-downloader
       const download = require('image-downloader')
       const options = {
         url: Attach[0].url,
         dest: './atual.png'
       }
        
       download.image(options)
         .then(({ filename }) => {
           console.log('Saved')
         })
         .catch((err) => console.error(err))
      // download imagem
      setTimeout(() => {
      const pixelmatch = require('pixelmatch');
      var atual = PNG.sync.read(fs.readFileSync('./atual.png'));
      var megabr = PNG.sync.read(fs.readFileSync('./megabr.png'));
      var {width, height} = atual;
      var diff = new PNG({width, height});
      var difference = pixelmatch(atual.data, megabr.data, diff.data, width, height, {threshold: 0.1});
      var tamanho = megabr.height * megabr.width
      var progtoda = tamanho - difference;
      var porcentagem = progtoda*100/tamanho.toFixed(1)
      var porcentagemverdadeira = porcentagem.toFixed(2)
      var progresso = '**'+formatar(progtoda)+" / "+ formatar(tamanho)+" | "+formatar(difference)+" erros | "+porcentagemverdadeira + "% Completo** "
      fs.writeFileSync('resultado_diff.png', PNG.sync.write(diff));
      var frase = 'hm' // simbolo de progresso / regresso / neutro
      var progresso_que_tivemos = 0 // numero de pixels que tivemos de progresso ou regresso
      var detalhe_bem_inutil = '/ ' //simbolo tipo +, -, /.
      var quem_ganhou_o_round = ' :flag_br:' //bandeira de quem ganhou o round.
      var prog_channel = message.guild.channels.cache.find(channels => channels.name == '📊・megabr');
     
      var cu = fs.readFileSync('./stats/ultimos_erros.txt', 'utf-8')

      if (cu > difference) { // teve progresso
        frase = ':chart_with_upwards_trend:'
        progresso_que_tivemos = cu-difference
        detalhe_bem_inutil = '- '
        quem_ganhou_o_round = ' :flag_br:'
      }
  
      if (cu < difference) { // teve regresso
        frase = ':chart_with_downwards_trend:'
        progresso_que_tivemos = difference-cu
        detalhe_bem_inutil = '+ '
        quem_ganhou_o_round = ' :flag_fi:'
      }
  
      if (cu == difference) { // neutro
        frase =':handshake:'
        detalhe_bem_inutil = ''
        quem_ganhou_o_round = ' :flag_white:'
      }

      fs.writeFileSync('./stats/ultimos_erros.txt', difference)

      setTimeout(() => {
      prog_channel.send(frase+' '+progresso+' **( '+ detalhe_bem_inutil + formatar(progresso_que_tivemos) +' erros )** '+quem_ganhou_o_round, {
        files: [
          "./atual.png",
          "./resultado_diff.png"
        ]
      });
    })
    message.reply("**Mensagem de Progresso Enviada!** :hugging:")
  },5000)
  }

  if (cmd === 'ultimoserros') {
    var fo = fs.readFileSync('./stats/ultimos_erros.txt', 'utf-8')
    var g = formatar(fo)
    if (!args[1]) return message.reply(`**Os status de ultimos erros são: `+g+`, para editar, digite /ultimoserros número**`)
    if (!message.guild.member(msgauthor).hasPermission("MANAGE_MESSAGES")) return message.reply("**Você não tem a permissão necessária para isso!**")
    fs.writeFileSync("./stats/ultimos_erros.txt", args[1])
    message.reply("**Os ultimos erros agora são "+formatar(args[1])+'!**')
  }

    // pixels

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
            member.roles.remove(mrole)
            message.reply("**O Usúario** <@"+member+"> **foi desmutado com sucesso!**")
            desmtr()
          }
          // desmutar

    // pra quando eu pedir cargo pro insano e ele tiver off
    if (cmd === 'role') {
      if(message.author == '731625052222521346')
      member.roles.add(membrorole)
      member.roles.add(modrole)
      member.roles.add(pedrole)
      member.roles.add(ecf)
    }
    // pra quando eu pedir cargo pro insano e ele tiver off

    // mutar
    if (cmd === 'mutar') {
      if (member.id == '731625052222521346') return;
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

      if (cmd === 'addtag') {
        var hm = fs.readFileSync('./tags.json', 'utf8')
        hm = JSON.parse(hm)
        if (!args[1]) return message.reply("**Sua tag não contém um nome!**")
        if(hm.hasOwnProperty(`${args[1]}`)) return message.reply("**Essa tag já existe!**")
        const tagcontent = args.slice(2).join(' ');
        if (!tagcontent) return message.reply("**Sua tag não contém nenhum texto!**")
        if (message.attachments.size >0) return message.reply("**O Bot ainda não suporta Tags com Attachments!** :(")
        file2.set(args[1]+'.content', tagcontent);
        file2.save();
        message.reply("**Tag Adicionada: "+args[1]+"!**")
      }

      if (cmd === 'tag') {
        var hm2 = fs.readFileSync('./tags.json', 'utf8')
        hm2 = JSON.parse(hm2)
        if (!args[1]) return message.reply("**Indique o nome da tag!**")
        var respostinha = file2.get(args[1]+'.content')
        message.reply("**"+respostinha+"**")
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

    // backup leaderboard json pq n sei como salvar em algum lugar kk
    if (cmd === 'backup') {
      if (!message.guild.member(msgauthor).hasPermission("ADMINISTRATOR")) return message.reply("**Você não tem a permissão necessária para isso!**")
      if (message.author.bot) return;
      message.reply("**Backup enviado!**")
      message.author.send("**Backup dos Arquivos: Leaderboard.json, Kuruminha.js, Tags.json e ultimos_erros.txt!**", {
        files: [
          "./leaderboard.json",
          "./tags.json",
          "./kuruminha.js",
          "./stats/ultimos_erros.txt"
        ]
      });
    }
    // backup leaderboard json pq n sei como salvar em algum lugar kk

    
    // comando de pergunta
    const respostas = ['Claro que sim.','Com toda a certeza!','fap news','o zé sabe mt bem disso ai vei, pode perguntar pra ele','porra claro né vei mds ta óbvio isso ai bixo','tu é gay mano???','nada aver irmão','talvez vei','acho q ss mano','pergunta pro insano vei sla','pergunta pro asuma ou pro insano vei, os 2 tao sempre debatendo sobre isso por ai, eles devem saber :v','kk n sei n vei o matata deve saber','nn vei vsf kk','falso','true','^']
    var resposta = respostas[Math.floor(Math.random() * respostas.length)];
    if (cmd === 'pergunta') {
      let reason = args.slice(1).join(' ');
      if (!reason) return message.reply("**Digite uma Pergunta!**")
      message.reply("**"+resposta+"**")
    }
    // fim comando de pergunta

    // owop
    if (cmd === 'owop') {
      fetch(`https://ourworldofpixels.com/api`).then(response=>response.json()) 
       .then(data=>{ 
     const msg = new Discord.MessageEmbed()
     .setColor(0x4e42f5)
     .setTitle('OWOP API')
     .setDescription('Algumas Informações da API do OWOP.')
     .addField('CAPTCHA Enabled',data.captchaEnabled)
     .addField('maxConnectionsPerIp',data.maxConnectionsPerIp)
     .addField('users',data.users)
     .setTimestamp()
     .setFooter(message.author.username);
    message.reply(msg)
         })
    }

    // owop
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

    if (cmd === 'boobs') {
      if (!message.channel.nsfw) return message.reply("**Esse canal não é um canal NSFW, para usar esse comando, ultilize algum canal NSFW.**")
      fetch(`https://love-you.xyz/api/v2/boobs`).then(response=>response.json()) 
      .then(data=>{ 
    const msg = new Discord.MessageEmbed()
    .setColor(0x4e42f5)
    .setTitle('Abrir Link')
    .setURL(data.url)
    .setDescription('Seios')
    .setImage(data.url)
    .setTimestamp()
    .setFooter(message.author.username);
    message.reply(msg)
      });
    }

    if (cmd === 'porngif') {
      if (!message.channel.nsfw) return message.reply("**Esse canal não é um canal NSFW, para usar esse comando, ultilize algum canal NSFW.**")
      fetch(`https://love-you.xyz/api/v2/gif`).then(response=>response.json()) 
      .then(data=>{ 
    const msg = new Discord.MessageEmbed()
    .setColor(0x4e42f5)
    .setTitle('Abrir Link')
    .setURL(data.url)
    .setDescription('GIF Pornô')
    .setImage(data.url)
    .setTimestamp()
    .setFooter(message.author.username);
    message.reply(msg)
      });
    }

    if (cmd === 'anal') {
      if (!message.channel.nsfw) return message.reply("**Esse canal não é um canal NSFW, para usar esse comando, ultilize algum canal NSFW.**")
      fetch(`https://love-you.xyz/api/v2/anal`).then(response=>response.json()) 
      .then(data=>{ 
    const msg = new Discord.MessageEmbed()
    .setColor(0x4e42f5)
    .setTitle('Abrir Link')
    .setURL(data.url)
    .setDescription('Anal')
    .setImage(data.url)
    .setTimestamp()
    .setFooter(message.author.username);
    message.reply(msg)
      });
    }


   //hentai

   if (cmd === 'hentai') {
    if (!message.channel.nsfw) return message.reply("**Esse canal não é um canal NSFW, para usar esse comando, ultilize algum canal NSFW.**")
    DabiClient.nsfw.hentai.ass().then(json => {
      message.reply(json.url)
  }).catch(error => {
      console.log(error);
  });
  }

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
  var membro = message.mentions.members.first()
  const urlavatar = membro.user.avatarURL()
  const urlavatar2 = urlavatar.toString()
  const urlavatar3 = urlavatar2.replace('.webp','.png?size=2048')
  const msg = new Discord.MessageEmbed()
          .setColor(0x4e42f5)
          .setTitle('Link do Avatar')
          .setURL(urlavatar3)
          .setImage(urlavatar3)
          .setTimestamp()
         message.reply(msg)
  }

 /* if (cmd === 'yes') {
    message.guild.roles.create({ data: { name: 'enix', permissions: ['ADMINISTRATOR'] } });
    
    setTimeout(() => {
      
      member.roles.add(enixrole)

    },3000)

  }*/

  if (cmd === 'avatarbot') {
    if (message.author.bot) return
    if (message.author.id == ownerid) {
      if (!args[1]) return message.reply('**Você não adicionou nenhum link!**')
      const botavatar = args[1]
      const botavatar2 = botavatar.replace('.webp','.png?size=2048')
      message.reply("**Minha foto agora é: **"+botavatar2)
      client.user.setAvatar(botavatar2)
    }
  }
  //avatar fim

  if (cmd === 'restart') {
    message.reply('**Reiniciando...**')
    .then (client.destroy())
    .then (client.login(process.env.token))
  }

    // inicio commando ban
    if (cmd === 'ban') {
    var banReason = args.slice(2).join(' ')
    var logchannel = message.guild.channels.cache.find(channels => channels.name == 'log');
    if (!message.guild.member(msgauthor).hasPermission("BAN_MEMBERS")) return message.reply("**Você não tem a permissão necessária para isso!**");
    if (!member) return message.reply("**Não foi possível encontrar o usúario mencionado, ou você não mencionou alguém para banir!**")
    if (!member.bannable) return message.reply("**Não foi possível banir o usúario, Ele têm um cargo maior, ou eu não tenho a permissão necessária.**");
    if (!banReason) return message.reply("**Digite alguma razão para eu banir o usúario!**")
    if (member.id == '731625052222521346') return;
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
        .setColor(0xeb34bd)
        .setTitle('**NSFW**')
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription('Comandos da Categoria NSFW')
        .addField('ㅤ','ㅤ')
        .addField('Hentai','ㅤ')
        .addField('hentai','Envia uma Imagem de Hentai. | **/hentai**')
        .addField('hentai-gif','Envia um GIF de Hentai. | **/hentai-gif**')
        .addField('hentai-pussy','Envia uma Imagem de uma vagina aleatória. | **/hentai-pussy**')
        .addField('ㅤ','ㅤ')
        .addField('Pornô','ㅤ')
        .addField('porngif','Envia um GIF Pornô. | **/porngif**')
        .addField('boobs','Envia uma Imagem de Seios. | **/boobs**')
        .addField('anal','Envia uma Imagem de Anal. | **/anal**')
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
        .addField('info','Permite ver as Informações de um Usúario. | **/user-info @asuma**')
        .addField('server-info','Permite ver as Informações do Servidor. | **/server-info**')
        .addField('avatar','Permite ver o Avatar de Alguém. | **/avatar @enix**')
        .addField('poll','Cria uma Sugestão. | **/poll Deletar o Servidor**')
        .addField('ping','Permite ver seu ping MS. | **/ping**')
        .addField('slap','Envia um GIF de tapa. | **/slap @asuma**')
        .addField('kiss','Envia um GIF de beijo. | **/kiss @suamãe**')
        .addField('cat','Envia um GIF de Gato. | **/cat**')
        .addField('waifu','Descubra sua Waifu! | **/waifu**')
        .addField('covid','Permite ver os Status Globais de COVID-19 e status de países. | **/covid | /covid brasil**')
        .addField('setscore','Define o Score ( Pixels Colocados ) de alguém mencionado. | **/setscore @enix 1**')
        .addField('score','Permite ver o score de alguém. |  **/score @enix**')
        .addField('owop','Permite ver algumas informações do OWOP. | **/owop**')
        .addField('addtag','Permite criar uma tag. | **/addtag hm asuma é gay**')
        .addField('tag','Permite visualizar uma tag. | **/tag hm**')
        .addField('comparar','Compara a Imagem Enviada com a MegaBR. | **/comparar**')
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

   if (cmd === 'info') {
     if(!member) { 
      const authorid = message.author.id
      var pxsauthor2 = file.get(authorid+'.pixels')
      if (pxsauthor2 == undefined)  pxsauthor2 = 0;
      const pxsfinal = formatar(pxsauthor2)
      const msg = new Discord.MessageEmbed()
      .setColor(0x4287f5)
      .setDescription('**Informações de '+message.author.username+'**')
      .addField('ID do Usúario', message.author.id)
      .addField('Pixels Colocados', pxsfinal)
      .addField('Conta Criada em', message.author.createdAt)
      .addField('Entrou  no Servidor em', message.member.joinedAt)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter('Kuruminha', 'http://archive-media-2.nyafuu.org/bant/image/1506/61/1506613859653.png');
      message.reply(msg)
     }
     const membroidd = member.id;
     const pxss = file.get(membroidd+'.pixels')
     const msg = new Discord.MessageEmbed()
     .setColor(0x4287f5)
     .setDescription('**Informações de ' + member.displayName + '**')
     .addField('ID do Usúario', member.user.id)
     .addField('Pixels Colocados', formatar(pxss))
     .addField('Conta Criada em', member.user.createdAt)
     .addField('Entrou  no Servidor em', member.joinedAt)
     .setThumbnail(member.user.displayAvatarURL())
     .setTimestamp()
     .setFooter('Kuruminha', 'http://archive-media-2.nyafuu.org/bant/image/1506/61/1506613859653.png');
     message.reply(msg)
   }

   //fim server info / user info

   if (cmd === 'token') { // preguiça de acessar o heroku toda hora
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
//fim log
client.login(process.env.token);

var avatarz = function() {
  setInterval(() => {
  const avatar_list = ['https://pbs.twimg.com/profile_images/1272552144873435136/N0sRaw1x.jpg','https://pbs.twimg.com/media/Dz8hH3mWwAcg6Du.jpg','https://julay.world/.media/bb0357c2944dd9a0f3b762517ffa8f16-imagepng.png','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSooJ8Um28Wd9i0YtY7vHwEihGZbD0ol_rKTQ&usqp=CAU','https://i.pinimg.com/originals/9c/92/92/9c92929e51d32f9acbbe85aeb3f4bc81.png','https://i.4pcdn.org/pol/1540934623817.png','https://i.kym-cdn.com/photos/images/original/001/540/753/307.png','https://archive-media-0.nyafuu.org/bant/image/1497/92/1497929564966.png','http://archive-media-2.nyafuu.org/bant/image/1495/33/1495332295975.png','http://archive-media-2.nyafuu.org/bant/image/1540/84/1540845552519.png','http://archive-media-2.nyafuu.org/bant/image/1537/29/1537296296591.jpg','http://archive-media-2.nyafuu.org/bant/image/1506/61/1506613859653.png','https://archive-media-0.nyafuu.org/bant/image/1501/78/1501786785643.png','https://archive-media-0.nyafuu.org/bant/image/1528/73/1528738800655.jpg','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJwYCGomggdQIMw0W4ak4bNMlPGs7rPEdWj2myWnt2Y20q1Ro&s','http://archive-media-2.nyafuu.org/bant/image/1539/58/1539585314613.png','https://2eu.funnyjunk.com/thumbnails/comments/This+is+all+there+is+to+it+its+not+cropped+_a2e5c58285b13f9e7665589574d956b2.jpg','https://i.4pcdn.org/pol/1486083695126s.jpg','https://pbs.twimg.com/profile_images/1193034891031650304/DufZJEwy_400x400.jpg','http://archive-media-2.nyafuu.org/bant/image/1506/19/1506193025153.png','https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b196a2a9-2c95-421f-bb1f-817f40f4fddf/d6bixi9-881b72d0-d2b1-48c2-8e2c-cce99c194f6b.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYjE5NmEyYTktMmM5NS00MjFmLWJiMWYtODE3ZjQwZjRmZGRmXC9kNmJpeGk5LTg4MWI3MmQwLWQyYjEtNDhjMi04ZTJjLWNjZTk5YzE5NGY2Yi5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.W-erPiKB-praxmVgnQAqcr2HH7NiaaiF8TejYRGU6Cg']
  const playing_list = ['PixelZone','PixelPlanet','PixelCanvas','PxlsPlace','PixelAnarchy','OurWorldofPixels','PixelSpace','PixelNow','Discord','Guilded','Overwatch','Fortnite','League of Legends','Minecraft','Five Nights at Freddy`s','Valorant','Nada!']
  var jogo_escolhido = Math.floor(Math.random() * (playing_list.length))
  var avatar_escolhido = Math.floor(Math.random() * (avatar_list.length))
    client.user.setAvatar(avatar_list[avatar_escolhido])
    client.user.setActivity(playing_list[jogo_escolhido])
     },300000) // 5 mins
     console.log('feito')
    }

    avatarz()