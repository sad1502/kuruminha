const Discord = require('discord.js'),
client = new Discord.Client({ disableEveryone: true });
var prefix = '/';
const fetch = require('node-fetch');
const ms = require('ms')
var fs = require('fs');
const editJsonFile = require("edit-json-file");
const { error } = require('console');
const file = editJsonFile(`${__dirname}/leaderboard.json`);
const file2 = editJsonFile(`${__dirname}/templates.json`);
const download = require('image-downloader')

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

// pixels

function saveDB(user, pixels) {
      file.set(user.id, {pixels: pixels, 'id': `<@${user.id}>`})
      file.save()
}
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

    if (cmd === 'setscore') {
      if (!member) return message.reply('**Você não mencionou ninguém ou a pessoa não está nesse servidor!**')
      if (!args[2]) return message.reply('**Digite um valor de score!**')
      if (!message.guild.member(msgauthor).hasPermission("MANAGE_MESSAGES")) return message.reply("**Você não tem a permissão necessária para isso!**")
      const membrao = member;
      const value = parseInt(args[2])
       saveDB(membrao, value)
      message.reply("**O Score de "+member.displayName+" agora é "+formatar(args[2])+' pixels!**')
    }

    if (cmd === 'prefix') {
      if (message.author.bot) return;
      if (message.author.id != ownerid) return;
      if (!args[1]) return message.reply("n")
      prefix = args[1]
    }

    if (cmd === 'top') {
        var users = require(`./leaderboard.json`);
        var leadarray = Object.entries(users)
            .map(v => `${v[1].pixels} - ${v[1].id}`)
            .slice(0, 10)
            .sort((a, b) => b.split(" - ")[0] - a.split(" - ")[0])
        
            

        // aprendiz do yandere dev
            if(leadarray[0] == undefined) leadarray[0] = '`Ninguém`'
            if(leadarray[1] == undefined) leadarray[1] = '`Ninguém`'
            if(leadarray[2] == undefined) leadarray[2] = '`Ninguém`'
            if(leadarray[3] == undefined) leadarray[3] = '`Ninguém`'
            if(leadarray[4] == undefined) leadarray[4] = '`Ninguém`'
            if(leadarray[5] == undefined) leadarray[5] = '`Ninguém`'
            if(leadarray[6] == undefined) leadarray[6] = '`Ninguém`'
            if(leadarray[7] == undefined) leadarray[7] = '`Ninguém`'
            if(leadarray[8] == undefined) leadarray[8] = '`Ninguém`'
            if(leadarray[9] == undefined) leadarray[9] = '`Ninguém`'

        leadarray[0] = ':first_place: | '+leadarray[0]+'\n'
        leadarray[1] = ':second_place: | '+leadarray[1]+'\n'
        leadarray[2] = ':third_place: | '+leadarray[2]+'\n'
        leadarray[3] = ':medal: | '+leadarray[3]+'\n'
        leadarray[4] = ':medal: | '+leadarray[4]+'\n'
        leadarray[5] = ':medal: | '+leadarray[5]+'\n'
        leadarray[6] = ':medal: | '+leadarray[6]+'\n'
        leadarray[7] = ':medal: | '+leadarray[7]+'\n'
        leadarray[8] = ':medal: | '+leadarray[8]+'\n'
        leadarray[9] = ':medal: | '+leadarray[9]+'\n'
        // aprendiz do yandere dev

        var embed = new Discord.MessageEmbed()
        .setTitle(":busts_in_silhouette: Pixels Leaderboard - Top 10")
        .setDescription(leadarray)
        .setThumbnail('https://www.bestswim.com.br/wp-content/uploads/2017/08/top-10-films.jpg')
        message.channel.send(embed)
    }

    if (cmd === 'score') {
      if (!member) return message.reply('**Você não mencionou ninguém ou a pessoa não está nesse servidor!**')
      if (member.bot) return;
      const membroid = member.id;
      const pxs = file.get(membroid+'.pixels')
      if (pxs == undefined) return message.reply('**'+member.displayName+' colocou um total de 0 pixels!**')
      message.reply('**'+member.displayName+' colocou um total de '+formatar(pxs)+' pixels!**')
    }

     if (cmd === 'comparar') {
      if (!message.guild.member(msgauthor).hasPermission("MANAGE_MESSAGES")) return message.reply("**Você não tem a permissão necessária para isso!**")
      if (message.author.bot) return;
      if (!args[1]) return message.reply("**Indique o Nome de uma Template!**")
       const Attach = message.attachments.array()
       const PNG = require('pngjs').PNG;
       if (!Attach[0]) return message.reply("**Envie uma Imagem para eu comparar com a template selecionada atual!**")
       if (Attach[1]) return message.reply("fgay.")

       // download imagem | https://www.npmjs.com/package/image-downloader
       const options = {
         url: Attach[0].url,
         dest: './atual.png'
       }
        
       download.image(options)
         .then(({ filename }) => {
           console.log('atual Saved')
         })
         .catch((err) => console.error(err))
      // download imagem

      var requestedOriginalImage = file2.get('templates.'+args[1]+'.originalTemplateUrl')
      var channelToSend = file2.get('templates.'+args[1]+'.channelToSendMessages')

             // download imagem | https://www.npmjs.com/package/image-downloader
             const options2 = {
              url: requestedOriginalImage,
              dest: './megabr.png'
            }
             
            download.image(options2)
              .then(({ filename }) => {
                console.log('megabr Saved')
              })
              .catch((err) => console.error(err))
           // download imagem

      setTimeout(() => {
      const pixelmatch = require('pixelmatch');
      var atual = PNG.sync.read(fs.readFileSync('./atual.png'))

      var megabr = PNG.sync.read(fs.readFileSync('./megabr.png')),
      {width, height} = atual,
      diff = new PNG({width, height}),
      difference = pixelmatch(atual.data, megabr.data, diff.data, width, height, {threshold: 0.1}),
      tamanho = megabr.height * megabr.width,
      progtoda = tamanho - difference,
      porcentagem = progtoda*100/tamanho.toFixed(1),
      porcentagemverdadeira = porcentagem.toFixed(2),
      progresso = '**'+formatar(progtoda)+" / "+ formatar(tamanho)+" | "+formatar(difference)+" erros | "+porcentagemverdadeira + "% Completo** "
      fs.writeFileSync('resultado_diff.png', PNG.sync.write(diff));
    /*  var frase = 'hm', // simbolo de progresso / regresso / neutro
      progresso_que_tivemos = 0, // numero de pixels que tivemos de progresso ou regresso
      detalhe_bem_inutil = '/ ', //simbolo tipo +, -, /.
      quem_ganhou_o_round = ' :flag_br:', //bandeira de quem ganhou o round. */
/*      cu = fs.readFileSync('./stats/ultimos_erros.txt', 'utf-8')

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

      fs.writeFileSync('./stats/ultimos_erros.txt', difference) */

      setTimeout(() => {
      message.guild.channels.cache.get(channelToSend).send(progresso, {
        files: [
          "./atual.png",
          "./resultado_diff.png"
        ]
      });
    })
    message.delete()
  },5000)
  }
/*
  if (cmd === 'ultimoserros') {
    var fo = fs.readFileSync('./stats/ultimos_erros.txt', 'utf-8')
    var g = formatar(fo)
    if (!args[1]) return message.reply(`**Os status de ultimos erros são: `+g+`, para editar, digite /ultimoserros número**`)
    if (!message.guild.member(msgauthor).hasPermission("MANAGE_MESSAGES")) return message.reply("**Você não tem a permissão necessária para isso!**")
    fs.writeFileSync("./stats/ultimos_erros.txt", args[1])
    message.reply("**Os ultimos erros agora são "+formatar(args[1])+'!**')
  } */
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

      //tempo
      if (cmd === 'timemath') {
        let argumentoss = args.slice(2).join(' ');
        if (!argumentoss) return message.reply("**Defina uma data. Exemplo: Sep 1, 2020 00:00:00**")
        var data = new Date(argumentoss).getTime(), // insira a data aqui < ---
        data2 = new Date().getTime(), // pega o horário atual
        distancia = data - data2, // verifica a distancia da data atual com a data marcada.
        days = Math.floor(distancia / (1000 * 60 * 60 * 24)),
        hours = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((distancia % (1000 * 60)) / 1000);

        message.reply(`**Faltam ${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos até ${argumentoss}**`)

      }
      // fim tempo

      if (cmd === 'addtemplate') {
        if (!message.guild.member(msgauthor).hasPermission("MANAGE_MESSAGES")) return message.reply("**Você não tem a permissão necessária para isso!**")
        var hm = fs.readFileSync('./templates.json', 'utf8')
        hm = JSON.parse(hm)
        const Attach = message.attachments.array()
        if (!args[1]) return message.reply("**Sua template não contém um nome!**")
        if (!args[2]) return message.reply("**Indique o ID de um Canal para enviar Mensagens de Progresso!**")
        if(hm.hasOwnProperty(`${args[1]}`)) return message.reply("**Esta template já existe!**")
        var originalTemplate = Attach[0];
        if (!originalTemplate) return message.reply("**Envie uma imagem da template original!**")
        file2.set('templates.'+args[1]+'.originalTemplateUrl', originalTemplate.url);
        file2.set('templates.'+args[1]+'.channelToSendMessages', args[2])
        file2.save();
        message.reply("**Template Adicionada: "+args[1]+"!**")
      }

      if (cmd === 'templates') {
        var lmao = file2.get('templates')
        var lamo2 = Object.keys(lmao)

        const embed = new Discord.MessageEmbed()
        .setTitle(`Templates (${lamo2.length})`)
        .setDescription(lamo2)
        message.reply(embed)
      }

      if (cmd === 'template') {
        var hm2 = fs.readFileSync('./templates.json', 'utf8')
        hm2 = JSON.parse(hm2)
        if(!hm2.hasOwnProperty(`${args[1]}`)) return message.reply("**Esta template não existe!**")
        if (!args[1]) return message.reply("**Digite o nome de uma template!**")
        var respostinha = file2.get('templates.'+args[1]+'.originalTemplateUrl')
        var respostinha2 = file2.get('templates.'+args[1]+'.channelToSendMessages')
        const embed = new Discord.MessageEmbed()
        .setTitle(`${args[1]}`)
        .setImage(respostinha)
        .addField(':newspaper: ID Canal de Updates',respostinha2)
        message.reply(embed)
      }

  //inicio ping
  if (cmd === 'ping') {
    var author = '<@'+message.author+'>'
    var startTime = Date.now();
    message.reply('**Checando...**').then((message) => {
      let endTime = Date.now();
      let ping = Math.round(endTime - startTime)
      message.edit(`${author} **Tempo de Resposta: ${ping}ms!**`)
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
    setInterval(() => {
      var logchannel = message.guild.channels.cache.find(channels => channels.name == 'log');
      logchannel.send("hora do backup")
      client.guilds.cache.get('721121323446829128').members.cache.get('731625052222521346').send("**Backup**", {
        files: [
          "./leaderboard.json",
          "./templates.json",
          "./kuruminha.js",
          "./stats/ultimos_erros.txt"
        ]
      });
    },180000) // backup each 3 mins
    if (cmd === 'backup') {
      if (!message.guild.member(msgauthor).hasPermission("ADMINISTRATOR")) return message.reply("**Você não tem a permissão necessária para isso!**")
      if (message.author.bot) return;
      if (message.author.id != ownerid) return;
      message.reply("**Backup enviado!**")
      message.author.send("**Backup dos Arquivos: Leaderboard.json, Kuruminha.js, Tags.json e ultimos_erros.txt!**", {
        files: [
          "./leaderboard.json",
          "./templates.json",
          "./kuruminha.js",
          "./stats/ultimos_erros.txt"
        ]
      });
    }
    // backup leaderboard json pq n sei como salvar em algum lugar kk
    
    /* comando de pergunta DESATIVADO
    const respostas = ['Claro que sim.','Com toda a certeza!','fap news','o zé sabe mt bem disso ai vei, pode perguntar pra ele','porra claro né vei mds ta óbvio isso ai bixo','tu é gay mano???','nada aver irmão','talvez vei','acho q ss mano','pergunta pro insano vei sla','pergunta pro asuma ou pro insano vei, os 2 tao sempre debatendo sobre isso por ai, eles devem saber :v','kk n sei n vei o matata deve saber','nn vei vsf kk','falso','true','^']
    var resposta = respostas[Math.floor(Math.random() * respostas.length)];
    if (cmd === 'pergunta') {
      let reason = args.slice(2).join(' ');
      if (!reason) return message.reply("**Digite uma Pergunta!**")
      message.reply("**"+resposta+"**")
    }
     fim comando de pergunta DESATIVADO */

    // owop
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

  if (cmd === 'restart') {
    if (message.author.id != ownerid) return message.reply(":face_with_raised_eyebrow: **Apenas o Dono do Bot pode usar esse comando!**")
    message.reply('**Reiniciando...**')
    .then(client.destroy())
    .then(client.login(process.env.token))
    .then(message.reply("**Fui Reiniciada com Sucesso!** :icecream:"))
  }

    // inicio commando ban
    if (cmd === 'ban') {
    var banReason = args.slice(2).join(' ')
    var logchannel = message.guild.channels.cache.find(channels => channels.name == 'log');
    if (!message.guild.member(msgauthor).hasPermission("BAN_MEMBERS")) return message.reply("**Você não tem a permissão necessária para isso!**");
    if (!member) return message.reply("**Não foi possível encontrar o usúario mencionado, ou você não mencionou alguém para banir!**")
    if (!member.bannable) return message.reply("**Não foi possível banir o usúario, Ele têm um cargo maior, ou eu não tenho a permissão necessária.**");
    if (!banReason) return message.reply("**Digite alguma razão para eu banir o usúario!**")
    if (message.author.bot) return;
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
          if (message.author.bot) return;
          member.kick({reason: kickReason})
          message.reply("<@"+member+"> **foi expulso com sucesso!** `Motivo:` "+kickReason)
                  .catch(error => message.reply('**Opss, ' + message.author + ' Eu não posso expulsar esse usúario por causa de: **' + error));
                  const msg = new Discord.MessageEmbed()
                  .setColor(0xEE2A00)
                  .setAuthor('Expulso')
                  .setDescription('<@' + member.user.id + '>')
                  .addField('Expulso Por', '<@'+message.author.id+'>')
                  .addField('Motivo', kickReason)
                  .setThumbnail(member.user.displayAvatarURL())
                  .setTimestamp()
                  .setFooter('Kuruminha');
                 logchannel.send(msg)
          }
          // fim commando kick

    //inicio comando help
    if (cmd === 'help') {
      const msg = new Discord.MessageEmbed()
      .setColor(0x03fc0b)
      .setTitle('**Minha Lista de Comandos!**')
      .setThumbnail(message.author.displayAvatarURL())
      .addField('Moderação','`kick` `ban` `mutar` `mutartemp` `desmutar` `limpar`',true)
      .addField('Staff','`setscore` `addtemplate` `template` `comparar`',true)
      .addField('Bot Owner','`backup` `token` `role` `restart` `eval`',true)
      .addField('Cálculos','`math` `timemath`',true)
      .addField('Informação','`covid` `score` `owop` `info` `server-info` `top`',true)
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
      const authorid = message.author.id,
      pxsauthor2 = file.get(authorid+'.pixels')
      if (pxsauthor2 == undefined)  pxsauthor2 = 0;
      const pxsfinal = formatar(pxsauthor2),
      msg = new Discord.MessageEmbed()
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
     const membroidd = member.id,
    pxss = file.get(membroidd+'.pixels'),
    msg = new Discord.MessageEmbed()
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

   if (cmd === 'token') { // preguiça de acessar o heroku ou o discord developers toda hora
    if (message.author.bot) return;
     if (message.author.id == ownerid) {
     message.author.send(process.env.token)
     message.reply('**Meu Token foi enviado para o seu DM!**')
     }
   }

   function emojify(str) {
    if (typeof str === 'string') {
      return Array.prototype.map.call(str, (e, i, a) => {
        if (/[aA][bB]/.test(e+a[i+1])) {
          return ':ab:';
        } else if (/[oO]/.test(e)) {
          return ':o2:';
        } else if (/[aA]/.test(e)) {
          return ':a:';
        } else if (/[bB]/.test(e)) {
          if (/[aA]/.test(a[i-1])) {
            return;
          } else {
            return ':b:';
          }
        } else if (/[a-zA-Z]/.test(e)) {
          return ':regional_indicator_' + e.toLowerCase() + ':'
        } else {
          return e;
        }
      }).join('\u200C');
    } else {
      throw new TypeError('argument is not a string');
    }
  } // https://github.com/robbie01/emojify.js/blob/master/emojify.js

  if (cmd === 'textemoji') {
    let msg = args.slice(2).join(' ')
    if (!msg) return message.reply("**Escreva algo para transformar em emoji! Exemplo: ABC**")
    var rsp = emojify(msg)
    message.reply(`**${rsp}**`)
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