const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange,
  	ChatModification,
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { help, helpDetail } = require('./src/help')
const { nsfwmenu, sfwmenu, nekosmenu, cc } = require('./src/menus')
const { translate, wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson, fetchText } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const kagApi = require('@kagchi/kag-api')
const fetch = require('node-fetch')
const axios = require('axios')

const ffmpeg = require('fluent-ffmpeg')

const { removeBackgroundFromImageFile } = require('remove.bg')
const imgbb = require('imgbb-uploader')
const lolis = require('lolis.life')
const loli = new lolis()

const reported = JSON.parse(fs.readFileSync('./src/report.json'))
const limited = JSON.parse(fs.readFileSync('./src/limitadorKami.json'))
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./src/simi.json'))

const setiker = JSON.parse(fs.readFileSync('./strg/stik.json'))
const videonye = JSON.parse(fs.readFileSync('./strg/video.json'))
const audionye = JSON.parse(fs.readFileSync('./strg/audio.json'))
const imagenye = JSON.parse(fs.readFileSync('./strg/image.json'))

const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN:ᬊ᭄✞︎𝑲𝑨𝑴𝑰✰𝑺𝑨𝑴𝑨✞︎𖥨ํ∘̥⃟⸽⃟🌹\n' // full name
            + 'ORG:Owner Bot;\n' // the organization of the contact
            + 'TEL;type=CELL;type=VOICE;waid=556192827345:+55 (61) 9282-7345\n' // ID do WhatsApp + número de telefone
            + 'END:VCARD'

prefix = '.'
blocked = []
usedCommandRecently = []

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Hora ${pad(minutes)} Minuto e ${pad(seconds)} Segundo`
}

async function starts() {
	const client = new WAConnection()
	client.logger.level = 'warn'
	console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color('Digitalize o código qr acima'))
	})

	fs.existsSync('./BarBar.json') && client.loadAuthInfo('./BarBar.json')
	client.on('connecting', () => {
		start('2', 'Conectando...')
	})
	client.on('open', () => {
		success('2', 'Conectado')
	})
	await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./BarBar.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

	client.on('group-participants-update', async (anu) => { 
		function sleep(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
		  }
		if (anu.action == 'promote'){
			const mdata = await client.groupMetadata(anu.jid)
			//console.log(anu)
			num = anu.participants[0]
			teks = `*╔╦══•𝑺𝑯𝑼𝑵𝑨❦︎𝑩𝑶𝑻𖥨ํ∘̥⃟⸽⃟🌸•══╦╗*\n[NOVO ADM DETECTADO ⚠]\n@${num.split('@')[0]} _Bem-Vindo(a) ao time de administradores do grupo *${mdata.subject}* 💛_`
			client.sendMessage(mdata.id, teks, MessageType.text, {contextInfo: {"mentionedJid": [num]}})
		}
		if (anu.action == 'demote'){
			const mdata = await client.groupMetadata(anu.jid)
			//console.log(anu)
			num = anu.participants[0]
			teks = `*╔╦══•𝑺𝑯𝑼𝑵𝑨❦︎𝑩𝑶𝑻𖥨ํ∘̥⃟⸽⃟🌸•══╦╗*\n[MENOS 1 ADM ⚠]\n@${num.split('@')[0]} *Removido(a) do time de administradores do grupo _${mdata.subject}_ 💤*`
			client.sendMessage(mdata.id, teks, MessageType.text, {contextInfo: {"mentionedJid": [num]}})
		}

		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i.imgur.com/wi2CkRm.jpg'
				}
				//teks = `Oi @${num.split('@')[0]} seja bem-vindo(a) ao grupo *${mdata.subject}*\nRespeite as regras e aproveite a experiência✨`
				teks = `⸵░⃟🌻Oi @${num.split('@')[0]} 🥰\nSeja Bem-Vindo(a) ao ${mdata.subject}, sou a 𝑺𝑯𝑼𝑵𝑨❦𝑩𝑶𝑻𖥨ํ∘̥⃟⸽⃟🌸.\nRespeite as regras e se divirta ✨\n\nCaso precise, chame um administrador ou digite ${prefix}help\n🌙ꪾ〬ꩌ۪٬ླྀ  Estou sempre a disposição.`

				client.sendMessage(mdata.id, {url: ppimg}, MessageType.image,{caption: teks, contextInfo: {"mentionedJid": [num]}})
			} 
		if (anu.action == 'remove'){
			num = anu.participants[0]
			try {
				ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
			} catch {
				ppimg = 'https://i.imgur.com/wi2CkRm.jpg'
			}
			teks = `@${num.split('@')[0]} saiu/removido de *${mdata.subject}*`
			client.sendMessage(mdata.id, {url: ppimg}, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
		}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

	client.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	bateriA = []
	client.on(`CB:action,,battery`, json => {
		const batteryLevelStr = json[2][0][1].value
		const batterylevel = parseInt (batteryLevelStr)
		//console.log ("battery level: " + batterylevel + "%")
		bateriA.length = 0
		bateriA.push(batterylevel)
	});

	client.on('chat-update', async (mek) => {
		try {
            if (!mek.hasNewMessage) return
            mek = JSON.parse(JSON.stringify(mek)).messages[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const apiKey = 'SLpvUgOcMYwIx0pFeELt'
            const apikey = 'O8mUD3YrHIy9KM1fMRjamw8eg'
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('America/Sao_Paulo').format('DD/MM HH:mm')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			//budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
			const messagesC = pes.trim().toLowerCase()
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
			
			/*if(isCmd || !isCmd){
				client.sendMessage(from, 'xispe', text)
			}*/

			mess = {
				wait: 'Processando, aguarde ☕',
				success: 'Sucesso ✅',
				nsfw: 'Este recurso está desativado neste grupo! 🔞',
				error: {
					noarg: 'Argumento inválido/insuficiente!',
					stick: 'Falha, ocorreu um erro ao converter a imagem em figurinha 😔️',
					Iv: 'Talvez o link seja invalido ❌',
					fail: 'O comando falhou 😣'
				},
				only: {
					group: 'Este comando só pode ser usado em grupos! 💢',
					boss: 'Este comando exige cargo Boss 💢',
					owner: 'Este comando só pode ser usado pelo dono do bot! 💤',
					admin: 'Este comando só pode ser usado por *admins*! 🙂',
					Badmin: 'Este comando só pode ser usado quando o bot se tornar um administrador! ❌'
				}
			}

			const botNumber = client.user.jid
			const ownerNumber = ["556192827345@s.whatsapp.net"] // replace this with your number
			const bossNumber = ["556192827345@s.whatsapp.net"]
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : true
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isBoss = bossNumber.includes(sender)
			const isLimited = limited.includes(sender)
			const isReported = reported.includes(sender)
			
			//limitador de uso, impedindo rajada de spam command
			if(usedCommandRecently.includes(from)) return
			const adicionar = (from) => {
   		 		usedCommandRecently.push(from)
				setTimeout(() => {
					ind = usedCommandRecently.indexOf(from);
					usedCommandRecently.splice(ind, 1)
				}, 3000)
				}
			if (isCmd && !isOwner) adicionar(from)
			
			if(isGroup && messagesC.length>5500 && !isOwner && !isGroupAdmins){
				client.groupRemove(from, sender)
				client.blockUser (sender, "add")
				client.sendMessage(from, 'BANIDO E BLOQUEADO POR SUPEITA DE TRAVA-ZAP TXT!', MessageType.text)
			}
			//bloq por trava txt
			if(messagesC.length>5500 && !isOwner){
				client.blockUser(sender, "add")
			}
			//banir por link de grupo
			/*if(messagesC.includes('chat.whatsapp.com/') && !isGroupAdmins && !isOwner){
				client.groupRemove(from, sender)
				client.sendMessage(from, 'BANIDO POR LINK DE OUTROS GRUPOS', MessageType.text)
			}*/

			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks, type) => {
				client.sendMessage(hehe, teks, type)
			}

			function sleep(ms) {
				return new Promise(resolve => setTimeout(resolve, ms));
			  }
			
			//let pushname = client.contacts[sender] != undefined ? client.contacts[sender].vname: undefined
			let pushname = client.contacts[sender].notify
			colors = ['red','white','black','blue','yellow','green']
			const isMedia = content.includes('audioMessage') || content.includes('imageMessage') || content.includes('videoMessage') || content.includes('stickerMessage')
			const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isImage = content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~>\x1b[1;37m', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) return console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~>\x1b[1;37m', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in group', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) return console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))

			switch(command) {
				//referencia
				case 'attp':
					await axios.get(`https://api.xteam.xyz/attp?file&text=${encodeURIComponent(body.slice(6))}`, { responseType: 'arraybuffer' }).then(async (response) => {
						const attp = Buffer.from(response.data, 'binary').toString('base64')
						await fs.writeFile('./capetinha.webp', attp, {encoding: 'base64'},function(err){
							if(err){
							  console.log(err)
							}})
						await sleep(1000)
						client.sendMessage(from, fs.readFileSync('./capetinha.webp'), sticker)
						fs.unlinkSync('./capetinha.webp')
						})
					   break
				case 'piada':
					   anu =  await fetchText('https://v2.jokeapi.dev/joke/Any?format=txt')
					   translate(anu, 'pt').then((getPiada) => reply(`• En: ${anu}\n\n• Pt: ${getPiada}`))
					   //reply(anu)
					   break
				case 'bass':
					if(args < 1) return reply(mess.error.noarg)
					if(!isQuotedAudio) return reply('Marque um audio!')
					if(args[0] > 20)return reply('Bass muito alto, audio ficará inaudivel!\nRecomendado de 5 a 10 de bass!')
					reply(mess.wait)
						encmedia = isQuotedAudio ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await client.downloadMediaMessage(encmedia)
						await fs.writeFile('./bass.mp3', media, (err, ranp) => {
							ran = getRandom('.mp3')
							ffmpeg('bass.mp3')
							.audioFilter(`equalizer=f=40:width_type=h:width=50:g=${args[0]}`)
							.format('mp3')
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync('./bass.mp3')
								reply(mess.error.fail)
							})
							.on('end', function () {
								console.log('Finish')
								buffer = fs.readFileSync(ran)
								client.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', quoted: mek})
								fs.unlinkSync('./bass.mp3')
								fs.unlinkSync(ran)
							}, 3000)
							.save(ran)
						})
					break
				case 'nightcore':
					if(!isQuotedAudio) return reply('Marque um audio!')
					reply(mess.wait)
						encmedia = isQuotedAudio ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await client.downloadMediaMessage(encmedia)
						await fs.writeFile('./nightcore.mp3', media, (err, ranp) => {
							ran = getRandom('.mp3')
							ffmpeg('nightcore.mp3')
							.audioFilter('asetrate=44100*1.25')
							.format('mp3')
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync('./nightcore.mp3')
								reply(mess.error.fail)
							})
							.on('end', function () {
								console.log('Finish')
								buffer = fs.readFileSync(ran)
								client.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', quoted: mek})
								fs.unlinkSync('./nightcore.mp3')
								fs.unlinkSync(ran)
							}, 3000)
							.save(ran)
						})
					break
				case 'upimagem':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage)) {
                    	ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
                    	reply(mess.wait)
                    	owgi = await client.downloadAndSaveMediaMessage(ted)
                    	anu = await imgbb("ffbea792ddb0fe0e069ea930816eb64d", owgi)
						title = anu.title
						urlimg = anu.url
						display_url = anu.display_url
						size = Math.round((anu.size)/1000)
						un = 'KB'
						tempo = Math.round(anu.expiration/60/60/24)
						if(size > 1000){
							size = size/1000
							un = 'MB'
						}
						teks = `[IMAGEM UPADA COM SUCESSO 👩‍💻]\nPedido de: @${sender.split('@')[0]}\n\nFilename: ${title}\nLink: ${urlimg}\nDisplay url: ${display_url}\nSize: ${size} ${un}\nID: ${anu.id}\nExpira em ${tempo} dias 💨\n\nThumb: ${anu.thumb.url}\nPost: ${anu.delete_url}\n\nBy: 𝑺𝑯𝑼𝑵𝑨❦︎𝑩𝑶𝑻𖥨ํ∘̥⃟⸽⃟🌸`
						client.sendMessage(from, {url: anu.thumb.url}, image, {caption: teks, contextInfo: {"mentionedJid": [sender]}})
                    } else {
                      reply('Responda uma imagem com este comando.')
                    }	
					break
				case 'oppai':
					if(!isNsfw) return reply(mess.nsfw)
					tits = await fetchJson(`https://meme-api.herokuapp.com/gimme/tits`)
					teks = `Título: ${tits.title}\nUps: ${tits.ups}`
					client.sendMessage(from, {url: tits.url}, image, {quoted: mek, caption: teks})
					break
				case 'sorteio':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if(args.length < 1){args[0] = 1}
					if(args[0] > groupMembers.length) return reply('Você não pode sortear mais membros que há no grupo!!')
					members_id = []
					inD = []
					teks = ' '
					for(var i = 0; i < args[0]; i++) {
						sort = Math.floor(Math.random() * groupMembers.length)
						if(inD.indexOf(sort) == -1){
							//indice = sort
							inD.push(sort)
						}else{
							while(inD.indexOf(sort) != -1){
								sort = Math.floor(Math.random() * groupMembers.length)
								//indice = sort
							}
						}
						let nameD = client.contacts[groupMembers[sort].jid] != undefined ? client.contacts[groupMembers[sort].jid].vname || client.contacts[groupMembers[sort].jid].notify: undefined
						teks += `${i+1}° ${nameD}\n➢ Número: @${groupMembers[sort].jid.split('@')[0]}\n\n`
						members_id.push(groupMembers[sort].jid)
					}
					mentions(teks, members_id)
					break
				case 'dado':
					img = ['I','II','III','IV','V','VI']
					ind = Math.floor(Math.random() * img.length)
					buff = await fs.readFileSync(`./strg/media/${img[ind]}.webp`) 
					client.sendMessage(from, buff, sticker, {quoted: mek})
					.save(ran)
					break
				case 'chance':
					client.updatePresence(from, Presence.composing) 
                	var avb = body.slice(7)
                	if (args.length < 1) return reply(`Você precisa digitar da forma correta\nExemplo: ${prefix}chance do bot parar 😳`)
                	randomm = `${Math.floor(Math.random() * 100)}`
               		hasil = `A chance ${avb} é de *${randomm}%*`
            		client.sendMessage(from, hasil, text, {quoted: mek})
					break
				case 'ppt':
					if(args<1) return reply(`Escolha entre pedra/papel/tesoura`)
					ppt = ['pedra','papel','tesoura']
					bot = Math.floor(Math.random() * ppt.length)

					if(args[0] == 'pedra'){
						player = 0
					}else if(args[0] == 'papel'){
						player = 1
					}else if(args[0] == 'tesoura'){
						player = 2
					}else{
						reply('Você sabia que nessa brincadeira, só podemos jogar pedra ou papel ou tesora? 🙄')
					}
					
					if(player == bot){
						stts = 'Empate 😮'
					}else if(player == 0 && bot == 2){
						stts = 'Vitória do jogador 🎉'
					}else if(player == 1 && bot == 0){
						stts = 'Vitória do jogador 🎉'
					}else if(player == 2 && bot == 1){
						stts = 'Vitória do jogador 🎉'
					}else{
						stts = 'Vitória da ShunaBot 😎🤙'
					}
					reply(`\t*${stts}*\n\nVocê jogou ${ppt[player]} e a ShunaBot jogou ${ppt[bot]}`)
					break
				case 'gado':
					var chifre = [
					"ultra extreme gado 🤩", "Gado-Master 😆", "Gado-Rei 😋", "Gado 😀", "Escravoceta 😂", 
					"Escravo-ceta Maximo 🤣","Jogador De Fogo Grátis 🤢", "Mestre Do Frifai 😤 ", "Gado-Manso 🥰", 
					"Gado-Conformado 😍", "Gado-Incubado 😳", "Gado Deus 😎", "Mestre dos Gados 😲", "Topa tudo por buceta 🤡", 
					"Gado Comum 🙄", "Mini Gadinho 😊", "Gado Iniciante 👶", "Gado Basico 🤐", "Gado Intermediario 😁", 
					"Gado Avançado 🥱", "Gado Profisional 😴", "Gado Mestre 🙂", "Gado Chifrudo 😶","Chifrudo Deus 😫", "Mestre dos Chifrudos 😈"
					]
					var gado = chifre[Math.floor(Math.random() * chifre.length)]
					//gadop = `${Math.floor(Math.random() * 100)}`
					try{
						mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
						hisil = `@${mentioned[0].split('@')[0]} é de classe ${gado}`
						mentions(hisil, mentioned)
					}catch(e){
						if(pushname == undefined || pushname == null){
							hisil = `Você é de classe ${gado}`
						}else{
							hisil = `${pushname} é de classe ${gado}`
						}
						reply(hisil)
					}
					break
				case 'sn':
					if (args.length < 1) return reply(`Você deve fazer uma pergunta...\nExemplo: ${prefix}sn está de dia?`)
					like = ['https://i.imgur.com/Cjo9fl0.jpg','https://i.imgur.com/EvetJ6m.jpg','https://i.imgur.com/FriK5Iy.jpg','https://i.imgur.com/jCgkown.jpg','https://i.imgur.com/f9Gs5dz.jpg','https://i.imgur.com/2zrQPcx.jpg','https://i.imgur.com/PuiP3NE.jpg','https://i.imgur.com/zFDeVsC.png','https://i.imgur.com/0hDswa5.png','https://i.imgur.com/IGzcmKl.png']
            		dislike = ['https://i.imgur.com/9Hy1g37.jpg','https://i.imgur.com/8XmgyHa.jpg','https://i.imgur.com/jbmxOgC.jpg','https://i.imgur.com/0JldGDu.png','https://i.imgur.com/01OOeaJ.jpg','https://i.imgur.com/gYkpw6l.jpg','https://i.imgur.com/8fpmc7q.png','https://i.imgur.com/npSP94i.png','https://i.imgur.com/VWrCNtO.png']
					sn = ['sim', 'não']
                    quest = body.slice(4)
                    jawab = sn[Math.floor(Math.random() * (sn.length))]
					if(jawab == 'sim'){
						buffer = like[Math.floor(Math.random() * (like.length))]
						hasil = `${quest}\nSegundo meus cálculos, eu acredito que ${jawab}`
                   		client.sendMessage(from, {url: buffer}, image, {quoted: mek, caption: hasil})
					}else{
						buffer = dislike[Math.floor(Math.random() * (dislike.length))]
						hasil = `${quest}\nSegundo meus cálculos, eu acredito que ${jawab}`
                   		client.sendMessage(from, {url: buffer}, image, {quoted: mek, caption: hasil})
					}
                    break
				case 'bug':
					if(!isGroup) return reply(mess.only.group)
					if(isReported) return reply('Calma, aguarde 2min para reportar novamente 😐')
					if(args.length < 1) return reply(mess.error.noarg)
					quest = body.slice(5)
					if(isQuotedImage || isImage){
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						bufferr = await fs.readFileSync(media)
						teks = `Sender: ${pushname}\nNúmero: wa.me/${sender.split('@')[0]}\nData: ${time.split(' ')[0]}\nHora: ${time.slice(6)}\nMensagem: ${quest}`
						client.sendMessage(ownerNumber[0], bufferr, image, {caption: teks})
					}else if(!isMedia){
						teks = `Sender: ${pushname}\nNúmero: wa.me/${sender.split('@')[0]}\nData: ${time.split(' ')[0]}\nHora: ${time.slice(6)}\nMensagem: ${quest}`
						client.sendMessage(ownerNumber[0], teks, text)
						reply('Bug reportado com sucesso ✅')
					}else return reply(`Use *${prefix}bug (sua mensagem)*\nPS: Você pode mandar/marcar imagens (*APENAS IMAGENS*)!`)
					reported.push(sender)
					fs.writeFileSync('./src/report.json', JSON.stringify(reported))
					setTimeout( () => {
						ind = reported.indexOf(sender);
						reported.splice(ind, 1)
						fs.writeFileSync('./src/report.json', JSON.stringify(reported))
						}, 120000)
					break
				case 'shipp':
					if (!isGroup) return reply(mess.only.group)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null){
						reply(mess.wait)
						members_id = []
						inD = []
						teks = ' '
						sort = Math.floor(Math.random() * groupMembers.length)
						if(inD.indexOf(sort) == -1){
							//indice = sort
							inD.push(sort)
						}else{
							while(inD.indexOf(sort) != -1){
								sort = Math.floor(Math.random() * groupMembers.length)
								//indice = sort
							}
						}
						sort1 = Math.floor(Math.random() * groupMembers.length)
						if(inD.indexOf(sort1) == -1){
							//indice = sort
							inD.push(sort1)
						}else{
							while(inD.indexOf(sort1) != -1){
								sort1 = Math.floor(Math.random() * groupMembers.length)
								//indice = sort
							}
						}
						teks += `Shipp @${groupMembers[sort].jid.split('@')[0]} 💖 @${groupMembers[sort1].jid.split('@')[0]}`
						members_id.push(groupMembers[sort].jid)
						members_id.push(groupMembers[sort1].jid)
						mentions(teks, members_id)
					}
					else{
						mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
						//pro = '.\n'
						porc = `${Math.floor(Math.random() * 100)}`
						if(mentioned[1] == undefined || mentioned[1] == null){
							members_id = []
							teks = `Shipp @${sender.split('@')[0]} tem uma chance de ${porc}% de namorar com @${mentioned[0].split('@')[0]}`
							members_id.push(sender)
							members_id.push(mentioned[0])
							mentions(teks, members_id)
						} else{
							members_id = []
							teks = `Shipp @${mentioned[0].split('@')[0]} tem uma chance de ${porc}% de namorar com @${mentioned[1].split('@')[0]}`
							members_id.push(sender)
							members_id.push(mentioned[0])
							mentions(teks, members_id)
						}	
					}
					break
				case 'roleta':
			        client.updatePresence(from, Presence.composing) 
			        var emoji = ['🍕', '🍔', '🍟']
					cass = []
					for(x=0;x<9;x++){
			        cass[x] = `${Math.floor(Math.random() * 3)}`
					} 

			        resultado = `Vc tem sorte?\n➤     ${emoji[cass[0]]} ${emoji[cass[1]]} ${emoji[cass[2]]}\n➤     ${emoji[cass[3]]} ${emoji[cass[4]]} ${emoji[cass[5]]}\n➤     ${emoji[cass[6]]} ${emoji[cass[7]]} ${emoji[cass[8]]}`
         			reply(resultado)
					break
				case 'atris':
					if(!isNsfw) return reply(mess.nsfw)
					data = fs.readFileSync('./src/18.js');
					jsonData = JSON.parse(data);
					randIndex = Math.floor(Math.random() * jsonData.length);
					randKey = jsonData[randIndex];
					randTeks = randKey.teks

					data = fs.readFileSync('./src/18img.js');
					jsonData = JSON.parse(data);
					randIndex = Math.floor(Math.random() * jsonData.length);
					randKey = jsonData[randIndex];

					client.sendMessage(from, {url: randKey.img}, image, { quoted: mek, caption: randTeks})
					break
				case 'prev':
					if(isLimited) return reply('Calma, aguarde 30 seg para usar novamente 😐')
					if(args.length<1) return reply(mess.error.noarg)
					hot = body.slice(6)
					myApi = '7b3d86a0'
					anu = await fetchJson(`https://api.hgbrasil.com/weather?format=json&key=${myApi}&city_name=${hot}`);
					if(anu.error == true){
						myApi = '5ab0361d'
						anu = await fetchJson(`https://api.hgbrasil.com/weather?format=json&key=${myApi}&city_name=${hot}`);
					}
					if(anu.error == true){
						myApi = 'c8a6458b'
						anu = await fetchJson(`https://api.hgbrasil.com/weather?format=json&key=${myApi}&city_name=${hot}`);
					}
					forecast = JSON.stringify(anu.results.forecast);
					jsonData = JSON.parse(forecast);
					city = JSON.stringify(anu.results.city);

					Key = jsonData[0];
					Key1 = jsonData[1];
					Key2 = jsonData[2];
					Key3 = jsonData[3];
					Key4 = jsonData[4];

					mensagem = `_Previsão para os próximos dias:_
\t*${city.split('"')[1]}*

\t*HOJE*
➤ ${Key.weekday} ${Key.date}
➤ Max: ${Key.max} °C
➤ Min: ${Key.min} °C
➤ Descrição: ${Key.description}

\t*AMANHÃ*
➤ ${Key1.weekday} ${Key1.date}
➤ Max: ${Key1.max} °C
➤ Min: ${Key1.min} °C
➤ Descrição: ${Key1.description}`
					reply(mensagem)
					limited.push(sender)
					fs.writeFileSync('./src/limitadorKami.json', JSON.stringify(limited))
					setTimeout( () => {
						ind = limited.indexOf(sender);
						limited.splice(ind, 1)
						fs.writeFileSync('./src/limitadorKami.json', JSON.stringify(limited))
						}, 30000)
					break
				case 'clima':
					if(isLimited) return reply('Calma, aguarde 30 seg para usar novamente 😐')
					if(args.length<1) return reply(mess.error.noarg)
					hot = body.slice(7)
					myApi = '7b3d86a0'
					anu = await fetchJson(`https://api.hgbrasil.com/weather?format=json&key=${myApi}&city_name=${hot}`);
					if(anu.error == true){
						myApi = '5ab0361d'
						anu = await fetchJson(`https://api.hgbrasil.com/weather?format=json&key=${myApi}&city_name=${hot}`);
					}
					if(anu.error == true){
						myApi = 'c8a6458b'
						anu = await fetchJson(`https://api.hgbrasil.com/weather?format=json&key=${myApi}&city_name=${hot}`);
					}
					
					city = JSON.stringify(anu.results.city);
					temp = JSON.stringify(anu.results.temp);
					date = JSON.stringify(anu.results.date);
					hora = JSON.stringify(anu.results.time);
					description = JSON.stringify(anu.results.description);
					currently = JSON.stringify(anu.results.currently);
					humidity = JSON.stringify(anu.results.humidity);
					wind_speedy = JSON.stringify(anu.results.wind_speedy);
					try{
					dados = `☀️　　🌎　°🌓　•　	.°•	 🚀　　
★　*　　🛸　°	🚀　　　°·　
	•　°★　            .°•　      °·
▄▅▆▇▆▅▄▄▆▅▄▄▅▄▄▅▆▇▇▅▄
\t\t    _${city.split('"')[1]}_\n\nEstá com ${description.split('"')[1]}
Temperatura de ${temp}°C\nStatus: De ${currently.split('"')[1]}\nHumidade: ${humidity}%
Velocidade do Vento: ${wind_speedy.split('"')[1]}\n\n\t_${date.split('"')[1]} às ${hora.split('"')[1]}_`
					client.sendMessage(from, dados, text, {quoted: mek})
					} catch(e){
						reply("Há erros na API, favor avisar o dono!")
						client.sendMessage(from, {vcard: vcard}, MessageType.contact, { quoted: mek})
					}
					limited.push(sender)
					fs.writeFileSync('./src/limitadorKami.json', JSON.stringify(limited))
					setTimeout( () => {
						ind = limited.indexOf(sender);
						limited.splice(ind, 1)
						fs.writeFileSync('./src/limitadorKami.json', JSON.stringify(limited))
						}, 30000)
					break

				case 'meanime':		
					sfww = ['waifu', 'neko', 'shinobu', 'cringe', 'blush'];
					randIndex = Math.floor(Math.random() * sfww.length);
					randKey = sfww[randIndex];
					link = `https://waifu.now.sh/sfw/${randKey}`
					client.sendMessage(from, {url: link}, image, { quoted: mek, caption: `Você em versão anime 😋`})
					break
				case 'abraco':
					if (!isGroup) return reply(mess.only.group)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Você precisa mencionar alguém')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					nomor = mek.participant
					yhb = {
					text: `Que fofo... @${sender.split("@s.whatsapp.net")[0]} deu um abraço apertado em @${mentioned[0].split("@s.whatsapp.net")[0]} 🥰`,
					contextInfo: {mentionedJid: [mentioned]},
					contextInfo: {mentionedJid: [sender]}}
					client.sendMessage(from, yhb, text,{quoted: mek})
					break
				case 'del':
					if (isGroupAdmins || isOwner){
						try{
							client.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
							reply(mess.success)
						} 
						catch (e){
							reply(mess.error.fail)
						}
					} else{
						reply(mess.only.admin)
					}
					break
				case 'qrcode':
					buff = await getBuffer(`https://api.qrserver.com/v1/create-qr-code/?data=${body.slice(8)}&size=1080%C3%971080`)
					client.sendMessage(from, buff, image, {quoted: mek})
					break
				case 'revoke':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					client.revokeInvite(from)
					reply("Link revogado com sucesso ✅")
					break
				case 'acceptin':
					if(!isOwner) return reply(mess.only.owner)
					ahu = body.slice(10)
					if(ahu.startsWith('https:')){
						code = ahu.split('.com/')[1];
						client.acceptInvite(code)
					}else{
						client.acceptInvite(ahu)
					}
					reply("Verifique se tudo ocorreu corretamente por favor.")
					break
				case 'infogp':
					if (!isGroup) return reply(mess.only.group)
					teks = `-----[ INFO DO GRUPO ]-----\n📝 Nome: ${groupMetadata.subject}
📋 Descrição: \n${groupMetadata.desc}\n\n🚔 Adms: ${groupAdmins.length}\n👻 Membros: ${groupMembers.length}`
					pp = await client.getProfilePicture(from)
					client.sendMessage(from, {url: pp}, image, {caption: teks})
					break
				case 'me':
					if (!isGroup) return reply(mess.only.group)
					cargos = ''
					if(isGroupAdmins){
						admon = 'Sim'
						cargos += 'Admin'
					}else{
						admon = 'Não'
						cargos += 'Membro comum'
					}
					status = client.getStatus(sender)
					if(isBoss){
						mod = 'Sim'
						cargos += ', Mod'
					}else{
						mod = 'Não'
					}
					if(isOwner){
						dono = 'Sim'
						cargos += ', Dono'
					}else{
						dono = 'Não'
					}
					pp = await client.getProfilePicture(sender)
					status.then((val) =>{
						teks = `-----[ INFO SUA ]-----\n📝 Nome: ${pushname}\n📱 Número: wa.me/${sender.split('@')[0]}
📝 Cargo: ${cargos}\n📋 Status: ${val.status}\n🚔 Admin? ${admon}\n👨‍💻 Dono? ${dono}\n🎓 Mod? ${mod}`
						client.sendMessage(from, {url: pp}, image, {caption: teks})
					  })
					break
				case 'getstts':
					if(!isGroup) return reply(mess.only.group)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag inválida 😐')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
					status = client.getStatus(mentioned)
					status.then((val) =>{
						reply(`Status de @${mentioned.split('@')[0]}:\n\n`+val.status)
					  })
					break
				case 'setstts':
					if(!isOwner) return reply(mess.only.owner)
					client.setStatus(body.slice(9))
					reply("Status do bot mudado com sucesso 😊")
					break
				case 'setname':
					if(!isOwner) return reply(mess.only.owner)
					client.updateProfileName(body.slice(9))
					reply('Nome mudado com sucesso para: '+body.slice(9))
					break
				case 'setdesc':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					try{
					await client.groupUpdateDescription(from, body.slice(9))
					reply('Descrição atualizada com sucesso ✅')
					}catch(e){
						reply('Espere algum tempo até trocar novamente!')
					}
					break
				case 'setsubject':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					await client.groupUpdateSubject(from, body.slice(12))
					reply('Assunto atualizada com sucesso ✅')
					break
				case 'setfoto':
					if(!isGroupAdmins) return(mess.only.admin)
					if(!isGroup) return (mess.only.group)
					if(!isImage || !isQuotedImage) return reply('Marque *imagens* ou mande na legenda!')						
					encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
					media = await client.downloadAndSaveMediaMessage(encmedia)
					await client.updateProfilePicture(from, media)
					reply('Foto atualizada com sucesso a partir de midia ✅')
					fs.unlinkSync('./undefined.jpeg')
					break
				case 'block':
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.owner)
					client.updatePresence(from, Presence.composing)
					client.blockUser(`${body.slice(8)}@c.us`, "add")
					client.sendMessage(from, `Pedidos recebidos, bloquear ${body.slice(8)}@c.us`, text)
					break
				case 'unblock': 
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.owner)
					client.updatePresence(from, Presence.composing)
					client.blockUser (`${body.slice(10)}@c.us`, "remove")
					client.sendMessage(from, `Pedidos recebidos, desbloquear ${body.slice(10)}@c.us`, text)
					break
				case 'wame':
					client.updatePresence(from, Presence.composing) 
					options = {
					text: `「 *WHATSAPP LINK* 」\n\n_Solicitado por:_ *@${sender.split("@s.whatsapp.net")[0]}*\n\n*Seu link Whatsapp:* _https://wa.me/${sender.split("@s.whatsapp.net")[0]}_\n*Link API*: _https://api.whatsapp.com/send?phone=${sender.split("@")[0]}_`,
					contextInfo: { mentionedJid: [sender] }
					}
					client.sendMessage(from, options, text, { quoted: mek } )
					break
				case 'nekos':
					if(!isNsfw) return reply(mess.nsfw)
					if(args.length < 1) return reply(`Digite o tipo!!\nConsulte os tipos em *${prefix}nekosmenu*`)

					nekoss = ['Random_hentai_gif', 'erok', 'feetg', 'baka', 'bj', 'erokemo', 'tickle', 'feed', 'neko', 'kuni', 'femdom', 'futanari', 'poke', 'les', 'trap', 'pat', 'boobs', 'blowjob', 'hentai', 'hololewd', 'ngif', 'fox_girl', 'lewdk', 'solog', 'pussy', 'yuri', 'lewdkemo', 'lewd', 'anal', 'pwankg', 'nsfw_avatar', 'eron', 'pussy_jpg', 'hug', 'keta', 'cuddle', 'eroyuri', 'slap', 'cum_jpg', 'waifu', 'gecg', 'tits', 'avatar', 'holoero', 'classic', 'kemonomimi', 'feet', 'gasm', 'spank', 'erofeet', 'ero', 'solo', 'cum', 'smug', 'holo', 'nsfw_neko_gif']
					nekoInd = nekoss.indexOf(args[0]);
					if(nekoInd == -1) return reply(mess.error.noarg)
					//https://www.nekos.life/api/v2/endpoints link das endpoints
					getneko = await fetchJson(`https://www.nekos.life/api/v2/img/${body.slice(7)}`)
					client.sendMessage(from, {url: getneko.url}, image, { quoted: mek})
					break
				case 'shota':	
					getloli = await loli.getSFWShota();
					client.sendMessage(from, getloli, image, { quoted: mek})
					break
				case 'nsfwloli':
					if(!isNsfw) return reply(mess.nsfw)
					getloli = await loli.getNSFWLoli();
					client.sendMessage(from, getloli, image, { quoted: mek})
					break
				case 'loli':
					getloli = await loli.getSFWLoli();
					client.sendMessage(from, getloli, image, { quoted: mek})
					break

				//nsfw
				case 'nekosmenu':
					reply(nekosmenu(prefix))
					break
				case 'nsfwmenu':
					reply(nsfwmenu(prefix))
					break
				case 'sfwmenu':
					reply(sfwmenu(prefix))
					break
				case 'nsfw':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply(`Digite *${prefix}nsfw 1* para ativar 😉`)
					if (Number(args[0]) === 1) {
						if (isNsfw) return reply('O recurso já está ativo 😊')
						nsfw.push(from)
						fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
						reply('❬ SUCESSO ❭ ativado o recurso nsfw neste grupo 😳')
					} else if (Number(args[0]) === 0) {
						if (!isNsfw) return reply('O recurso já está desativo 😶')
						ind = nsfw.indexOf(from);
						nsfw.splice(ind, 1)
						fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
						reply('❬ SUCESSO ❭ desativado o recurso nsfw neste grupo 😣')
					} else {
						reply('Digite 1 para ativar ou 0 para desativar!')
					}

					break
				case 'sendnsfw':
					if(!isNsfw) return reply(mess.nsfw)
					if(args.length < 1) return reply(`Digite o tipo!!\nConsulte os tipos em *${prefix}nsfwmenu*`)

					nsfww = ['waifu', 'neko', 'trap', 'blowjob', 'random']
					nsfwInd = nsfww.indexOf(args[0]);
					if(nsfwInd == -1) return reply(mess.error.noarg)
		
					link = `https://waifu.now.sh/nsfw/${args[0]}`
					client.sendMessage(from, {url: link}, image, { quoted: mek})
					break
				//sfw
				case 'sendsfw':
					if(args.length < 1) return reply(`Digite o tipo!!\nConsulte os tipos em *${prefix}sfwmenu*`)
					
					sfww = ['waifu', 'neko', 'shinobu', 'bully', 'cry', 'hug', 'kiss', 'lick', 'pat', 'smug', 'highfive', 'nom', 'bite', 'slap', 'wink', 'poke', 'dance', 'cringe', 'blush', 'random'];
					sfwInd = sfww.indexOf(args[0]);
					if(sfwInd == -1) return reply(mess.error.noarg)

					link = `https://waifu.now.sh/sfw/${args[0]}`
					client.sendMessage(from, {url: link}, image, { quoted: mek, caption: `${args[0]} >//<`})
					break
				//temporizador
				case 'timer':
					if(args.length < 1) return reply('Digite o tempo!')
					if(args.length < 2) return reply('Digite o tipo:\n*seg* = segundos\n*min* = minutos\n*h* = horas')
					ms = '000'
					if (args[1]=="seg") {
						var timer = args[0]+ms
					} else if (args[1]=="min") {
						var timer = args[0]*60+ms
					} else if (args[1]=="h") {
						var timer = args[0]*3600+ms
					} else {
						return reply(mess.error.noarg)
					}
					reply("⏱ Começando...")
					setTimeout( () => {
					reply("O tempo acabou! ⏱")
					}, timer)
					break
				case 'meow':
					meow = await fetchJson(`https://www.nekos.life/api/v2/img/meow`)
					client.sendMessage(from, {url: meow.url}, image, { quoted: mek})
					break
				case 'wallpaper':
					meow = await fetchJson(`https://www.nekos.life/api/v2/img/wallpaper`)
					client.sendMessage(from, {url: meow.url}, image, { quoted: mek})
					break
				case 'kiss':
					links = ['https://i.imgur.com/uQ5P7T0.jpg', 'https://i.imgur.com/VEOrDvQ.jpg', 'https://i.imgur.com/Qd52T44.png']
					ind = Math.floor(Math.random() * links.length)
					if (!isGroup) return reply(mess.only.group)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Marque alguém 🥱')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					yhb =  `@${sender.split('@')[0]} deu um beijo em @${mentioned[0].split('@')[0]}🥰`
					client.sendMessage(from, {url: links[ind]}, image, {caption: yhb})
					break
				case 'grupodados':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if(args.length < 1) return reply(mess.error.noarg)
					client.updatePresence(from, Presence.composing)
					if(args[0] == 'adms'){
					open = {
						text: `Somente administradores podem mudar dados do grupo\nPor: @${sender.split("@")[0]}`,
						contextInfo: { mentionedJid: [sender] }
					}
					client.groupSettingChange (from, GroupSettingChange.settingsChange, true)
					client.sendMessage(from, open, text, {quoted: mek})
					}else if(args[0] == 'todos'){
					open = {
						text: `Todos podem editar os dados do grupo\nPor: @${sender.split("@")[0]}`,
						contextInfo: { mentionedJid: [sender] }
					}
					client.groupSettingChange (from, GroupSettingChange.settingsChange, false)
					client.sendMessage(from, open, text, {quoted: mek})
					} else{
						reply('Argumento inválido!')
					}
					break
				case 'grupo':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if(args.length < 1) return reply(mess.error.noarg)
					client.updatePresence(from, Presence.composing) 
					if(args[0] == 'close'){
						open = {
						text: `Grupo fechado pelo administrador @${sender.split("@")[0]}\nagora *todos os participantes* podem enviar mensagens`,
						contextInfo: { mentionedJid: [sender] }
						}
						client.groupSettingChange (from, GroupSettingChange.messageSend, true)
						client.sendMessage(from, open, text, {quoted: mek})
					}
					else if(args[0] == 'open'){
						open = {
							text: `Grupo aberto pelo administrador @${sender.split("@")[0]}\nagora *todos os participantes* podem enviar mensagens`,
							contextInfo: { mentionedJid: [sender] }
							}
							client.groupSettingChange (from, GroupSettingChange.messageSend, false)
							client.sendMessage(from, open, text, {quoted: mek})
					}else{
						reply('Digite um argumento válido!! *open* ou *close*')
					}
					break
					//mandar e baixar musica
				case 'play':   
	          		//if (!isUser) return reply(mess.only.daftarB)
                	reply(mess.wait)
            	    play = body.slice(5)
        	        anu = await fetchJson(`https://api.zeks.xyz/api/ytplaymp3?q=${play}&apikey=apivinz`)
    	          	//verifica se o video foi achado corretamente
					if (anu.status == false) return reply('Algo deu errado 😪')
	                infomp3 = `*Música encontrada!*\nTítulo: ${anu.result.title}\nLink: ${anu.result.source}\nTamanho: ${anu.result.size}\n\n*Enviado com sucesso ✅*`
            	    buffer = anu.result.thumbnail
        	        lagu = await getBuffer(anu.result.url_audio)
    	            client.sendMessage(from, {url: buffer}, image, {quoted: mek, caption: infomp3})
	                client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
                	break

				case 'plaq':
					if(!isNsfw) return reply(mess.nsfw)
					if (args.length < 1) return reply(`Digite o *texto*! (ex: ${prefix}plaq nick)`)
					teks = body.slice(6)
					if (teks.length > 15) return reply('O texto é longo, até 15 caracteres')
					reply('*Processando, por favor aguarde ☕*')
					buffer = await getBuffer(`https://ntenarec.sirv.com/IMG_20200509_203949_774.jpg?text.0.text=${teks}&text.0.position.x=16%25&text.0.position.y=-32%25&text.0.color=1a1a1a&text.0.opacity=85&text.0.font.family=Nanum%20Brush%20Script`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '*PRONTINHO ✅*'})	
					break
				
				case 'addsticker':
					if (!isBoss) return reply(mess.only.boss)
					if (!isQuotedSticker) return reply('Marque o sticker e digite um nome!')
					svst = body.slice(12)
					if (!svst) return reply('Qual é o nome do sticker?')
					boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					delb = await client.downloadAndSaveMediaMessage(boij)
					setiker.push(`${svst}`)
					await sleep(1000)
					const img = await fs.readFileSync(`./${delb}`)
					const base = img.toString('base64')
					fs.writeFileSync(`./strg/sticker/${svst}.webp`, base, {encoding: 'base64'},function(err){
						if(err){
						  console.log(err)
						}})
					fs.writeFileSync('./strg/stik.json', JSON.stringify(setiker))
					client.sendMessage(from, `Sticker adicionado ✅\nVerifique por ${prefix}liststicker`, MessageType.text, { quoted: mek })
					break
				case 'getsticker':
					namastc = body.slice(12)
					try{
					client.sendMessage(from, fs.readFileSync(`./strg/sticker/${namastc}.webp`), sticker, {quoted: mek})
					}catch(e){
						reply('Este nome de sticker não existe!')
					}
					break
				case 'liststicker':
				case 'stickerlist':
					if(setiker.length == 0) return reply('Não há stickers salvos no bot 🤔')
					teks = '*Lista de Stickers:*\n\n'
					for (let nome of setiker) {
						teks += `- ${nome}\n`
					}
					teks += `\n*Total: ${setiker.length}*`
					client.sendMessage(from, teks, text,{quoted: mek})
					break
				case 'rmvsticker':
					if (!isBoss) return reply(mess.only.boss)
					svst = body.slice(12)
					if (!svst) return reply('Qual é o nome do sticker?')
					ind = setiker.indexOf(svst);
					if(ind == -1) return reply('O nome de sticker não existe!')
					setiker.splice(ind, 1)
					fs.writeFileSync('./strg/stik.json', JSON.stringify(setiker))
					fs.unlinkSync(`./strg/sticker/${svst}.webp`)
					reply(`Sticker ${svst} removido com sucesso 🙂`)
					break
				case 'addvideo':
					if (!isBoss) return reply(mess.only.boss)
					if (!isMedia) return reply('Marque o vídeo e digite um nome!')
					svst = body.slice(10) 
					if (!svst) return reply('Qual é o nome do vídeo?')
					boij = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
					delb = await client.downloadMediaMessage(boij)
					videonye.push(`${svst}`)
					fs.writeFileSync(`./strg/video/${svst}.mp4`, delb)
					fs.writeFileSync('./strg/video.json', JSON.stringify(videonye))
					client.sendMessage(from, `Video adicionado ✅\nVerifique por ${prefix}listvideo`, MessageType.text, { quoted: mek })
					break
				case 'getvideo':
					namastc = body.slice(10)
					buffer = fs.readFileSync(`./strg/video/${namastc}.mp4`)
					//client.sendMessage(from, buffer, video, { mimetype: 'video/mp4', quoted: mek })
					client.sendMessage(from, buffer, video, { quoted: mek, caption: `Resultado para: ${namastc}` })
					break
				case 'listvideo':
				case 'videolist':
					if(videonye.length == 0) return reply('Não há videos salvos no bot 🤔')
					teks = '*Lista de Videos :*\n\n'
					for (let awokwkwk of videonye) {
						teks += `- ${awokwkwk}\n`
					}
					teks += `\n*Total: ${videonye.length}*`
					client.sendMessage(from, teks, text,{quoted: mek})
					break
				//aud
				case 'rmvideo':
					if (!isBoss) return reply(mess.only.boss)
					svst = body.slice(9)
					if (!svst) return reply('Qual é o nome do video?')
					ind = videonye.indexOf(svst);
					if(ind == -1) return reply('O nome de video não existe!')
					videonye.splice(ind, 1)
					fs.writeFileSync('./strg/video.json', JSON.stringify(videonye))
					fs.unlinkSync(`./strg/video/${svst}.mp4`)
					reply(`Video ${svst} removido com sucesso 🙂`)
					break
				case 'addaud':
					if (!isBoss) return reply(mess.only.boss)
					if (!isQuotedAudio) return reply('Marque o áudio e coloque o nome dele!')
					svst = body.slice(8)
					if (!svst) return reply('Qual é o nome do áudio??')
					boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					delb = await client.downloadMediaMessage(boij)
					audionye.push(`${svst}`)
					fs.writeFileSync(`./strg/audio/${svst}.mp3`, delb)
					fs.writeFileSync('./strg/audio.json', JSON.stringify(audionye))
					client.sendMessage(from, `Audio adicionado ✅\nVerifique por ${prefix}listaud`, MessageType.text, { quoted: mek })
					break
				case 'getaud':
					namastc = body.slice(8)
					buffer = fs.readFileSync(`./strg/audio/${namastc}.mp3`)
					client.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', quoted: mek })
					break
				case 'listaud':
				case 'audlist':
					if(audionye.length == 0) return reply('Não há imagens salvas no bot 🤔')
					teks = '*Lista de áudios:*\n\n'
					for (let awokwkwk of audionye) {
						teks += `- ${awokwkwk}\n`
					}
					teks += `\n*Total: ${audionye.length}*`
					client.sendMessage(from, teks, text,{quoted: mek})
					break
				case 'rmvaud':
					if (!isBoss) return reply(mess.only.boss)
					svst = body.slice(8)
					if (!svst) return reply('Qual é o nome do audio?')
					ind = audionye.indexOf(svst);
					if(ind == -1) return reply('O nome de audio não existe!')
					audionye.splice(ind, 1)
					fs.writeFileSync('./strg/audio.json', JSON.stringify(audionye))
					fs.unlinkSync(`./strg/audio/${svst}.mp3`)
					reply(`Audio ${svst} removido com sucesso 🙂`)
					break
					//image
				case 'addimagem':
					if (!isBoss) return reply(mess.only.boss)
					if (!isMedia) return reply('Marque/mande a imagem e digite o nome!')
					svst = body.slice(11)
					if (!svst) return reply('Qual é o nome da imagem?')
					boij = isQuotedImage? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
					delb = await client.downloadMediaMessage(boij)
					imagenye.push(`${svst}`)
					fs.writeFileSync(`./strg/image/${svst}.png`, delb)
					fs.writeFileSync('./strg/image.json', JSON.stringify(imagenye))
					client.sendMessage(from, `Imagem adicionado ✅\nVerifique por ${prefix}listimagem`, MessageType.text, { quoted: mek })
					break
				case 'getimagem':
					namastc = body.slice(11)
					buffer = fs.readFileSync(`./strg/image/${namastc}.png`)
					client.sendMessage(from, buffer, image, { quoted: mek, caption: `Resultado para *${namastc}*` })
					break
				case 'imagemlist':
				case 'listimagem':
					if(imagenye.length == 0) return reply('Não há imagens salvas no bot 🤔')
					teks = '*Lista Imagens:*\n\n'
					for (let awokwkwk of imagenye) {
						teks += `- ${awokwkwk}\n`
					}
					teks += `\n*Total: ${imagenye.length}*`
					client.sendMessage(from, teks, text,{quoted: mek})
					break
				case 'rmvimagem':
					if (!isBoss) return reply(mess.only.boss)
					svst = body.slice(11)
					if (!svst) return reply('Qual é o nome da imagem?')
					ind = imagenye.indexOf(svst);
					if(ind == -1) return reply('O nome de imagem não existe!')
					imagenye.splice(ind, 1)
					fs.writeFileSync('./strg/image.json', JSON.stringify(imagenye))
					fs.unlinkSync(`./strg/image/${svst}.png`)
					reply(`Imagem ${svst} removido com sucesso 🙂`)
					break
					//others
				case 'help':
				case 'menu':
					if(args[0] == 'detail'){
						buffer = await getBuffer('https://i.imgur.com/nolbAyw.png')
						client.sendMessage(from, buffer, image, {caption: help(prefix)})
					}else{
						buffer = await getBuffer('https://i.imgur.com/nolbAyw.png')
						client.sendMessage(from, buffer, image, {caption: helpDetail(prefix)})
						reply(`Digite *${prefix}help detail* para detalhes dos comandos`)
					}
					break
				case 'cc':
					reply(cc(prefix))
					break	
				case 'blocklist':
					if(!isOwner) return reply(mess.only.owner)
					teks = 'Esta é a lista de números bloqueados :\n'
					for (let block of blocked) {
						teks += `~> @${block.split('@')[0]}\n`
					}
					teks += `Total : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break
				case 'ocr':
					if ((isImage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						reply(mess.wait)
						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync(media)
							})
					} else {
						reply('Não funcionou...')
					}
					break
				case 'sticker':
					if (isMedia && isImage || isQuotedImage) {
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(media)
							//.input(media)
							.outputOptions([
								`-vcodec`,
								`libwebp`,
								`-vf`,
								`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`
							])
							//.toFormat('webp')
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.save(ran)
						}
						else if (isMedia || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) {
							const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.webp')
							reply(mess.wait)
							await ffmpeg(`./${media}`)
								.inputFormat(media.split('.')[1])
								.on('start', function (cmd) {
									console.log(`Started : ${cmd}`)
								})
								.on('error', function (err) {
									console.log(`Error : ${err}`)
									fs.unlinkSync(media)
									tipe = media.endsWith('.mp4') ? 'video' : 'gif'
									reply(`Falha ao converter ${tipe} para figurinha`)
								})
								.on('end', function () {
									console.log('Finish')
									client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
									fs.unlinkSync(media)
									fs.unlinkSync(ran)
								})
								.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
								.toFormat('webp')
								.save(ran)
							}
					/*exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply(mess.error.stick)
								client.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: mek})
							})
					/*} else if ((isMedia || isQuotedImage) && colors.includes(args[0])) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.on('start', function (cmd) {
								console.log('Started :', cmd)
							})
							.on('error', function (err) {
								fs.unlinkSync(media)
								console.log('Error :', err)
							})
							.on('end', function () {
								console.log('Finish')
								fs.unlinkSync(media)
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=${args[0]}@0.0, split [a][b]; [a] palettegen=reserve_transparent=off; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)*/
					else {
						reply(`Envie fotos com legendas ${prefix}sticker ou tags de imagem que já foram enviadas`)
					}
					break
				case 'stickernobg':
					if (isImage || isQuotedImage) {
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
					const media = await client.downloadAndSaveMediaMessage(encmedia)
					ranw = getRandom('.webp')
					ranp = getRandom('.png')
					reply(mess.wait)
					keyrmbg = 'Q2vdtiAowKWn1cmjH8rRFo39'
					await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg, size: 'auto', type: 'auto', ranp}).then(res => {
						fs.unlinkSync(media)
						let buffer = Buffer.from(res.base64img, 'base64')
						fs.writeFileSync(ranp, buffer, (err) => {
							if (err) return reply('Falha, esta faltando o codigo ai, bote o codigo e novamente')
						})
						ran = getRandom('.webp')
						ffmpeg(ranp)
						.outputOptions([
							`-vcodec`,
							`libwebp`,
							`-vf`,
							`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`
						])
						.on('start', function (cmd) {
							console.log(`Started : ${cmd}`)
						})
						.on('error', function (err) {
							console.log(`Error : ${err}`)
							fs.unlinkSync(ranp)
							reply(mess.error.stick)
						})
						.on('end', function () {
							console.log('Finish')
							client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
							fs.unlinkSync(ranp)
							fs.unlinkSync(ran)
						})
						.save(ran)
					})
				}
					break
				case 'nobg':
					if (isImage || isQuotedImage) {
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
					const media = await client.downloadAndSaveMediaMessage(encmedia)
					ranp = getRandom('.png')
					reply(mess.wait)
					keyrmbg = 'Q2vdtiAowKWn1cmjH8rRFo39'
					await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg, size: 'auto', type: 'auto', ranp}).then(res => {
						fs.unlinkSync(media)
						let buffer = Buffer.from(res.base64img, 'base64')
						fs.writeFileSync(ranp, buffer, (err) => {
							if (err) return reply('Falha, esta faltando o codigo ai, bote o codigo e novamente')
						})
					})
					await sleep(1000)
					buff = await fs.readFileSync(`./${ranp}`)
					client.sendMessage(from, buff, image)
					fs.unlinkSync(`./${ranp}`)
				}
					break
				case 'gtts':
					if (args.length < 1) return client.sendMessage(from, 'Onde está o código do idioma?', text, {quoted: mek})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return client.sendMessage(from, 'Onde está o texto?', text, {quoted: mek})
					dtt = body.slice(9)
					ranm = getRandom('.mp3')
					dtt.length > 600
					? reply('*muito grande 😔 vou lê nãokkk 🙈*')
					: gtts.save(ranm, dtt, function() {
						client.sendMessage(from, fs.readFileSync(ranm), audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
						fs.unlinkSync(ranm)
					})
					break
				case 'meme':
					meme = await kagApi.memes()
					response = await fetch(`https://imgur.com/${meme.hash}.jpg`);
					buffer = await response.buffer();
					fs.writeFile(`./image.png`, buffer, () => 
						console.log('\033[0;34mFinished downloading!\033[0m'));
					await recognize('image.png', {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								anu = teks.trim()
								fs.unlinkSync('./image.png')
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync('./image.png')
							})
					translate(anu, 'pt').then((trad) => client.sendMessage(from, buffer, image, {quoted: mek, caption: `${trad}`}))
					break
				case 'dono':
					teks = 'Credits to MhankBarBar\nUsing @adiwajshing/Baileys\nModified by ᬊ᭄✞𝑲𝑨𝑴𝑰✰𝑺𝑨𝑴𝑨✞𖥨ํ∘̥⃟⸽⃟🌹\nBot Version 2.0.0\nMe wa.me/556192827345\n\n𝗠𝗮𝗱𝗲 𝗪𝗶𝘁𝗵 ❤️'
					buffer = await getBuffer('https://i.imgur.com/nolbAyw.png')
					client.sendMessage(from, buffer, image, {quoted: mek, caption: teks })
					await sleep(2000)
					client.sendMessage(from, {vcard: vcard}, contact, { quoted: mek})
					break
				case 'setprefix':
					if (!isOwner) return reply(mess.only.owner)
					if (args.length < 1) return
					prefix = args[0]
					reply(`*O PREFIXO FOI ALTERADO COM SUCESSO PARA: [${prefix}]*`)
					break
				
				case 'hidetag':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					teks = (args.length >= 1) ? body.slice(9).trim() : ''
                	const group = await client.groupMetadata(from);
            	    member = group['participants']
        	        jids = [];
	                member.map( async adm => { jids.push(adm.id.replace('c.us', 's.whatsapp.net')) })
            	    options = {
        	        	text: teks,
    	            	contextInfo: {mentionedJid: jids},
	                	quoted: mek
                	}
              		client.sendMessage(from, options, text)
					break
				case 'hidetag2':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					quest = (args.length >= 1) ? body.slice(10).trim() : ''
					members_id = []
					for (let mem of groupMembers) {
						members_id.push(mem.jid)
					}
					mentions(quest, members_id)
					break
				case 'marcar':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length >= 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `*~>* @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id)
					break
				case 'limpar':
					if (!isOwner) return reply(mess.only.owner)
					anu = await client.chats.all()
					client.setMaxListeners(25)
					for (let _ of anu) {
						await client.modifyChat (_.jid, ChatModification.delete)
					}
					reply('Excluido todos os chats com sucesso :)')
					break
				case 'ts':
					if (!isOwner) return reply(mess.only.owner)
					if (args.length < 1) return reply('Adicione um texto para ser transmitido 💢')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `[TRANSMISSÃO ]\n\n${body.slice(4)}`})
						}
						reply('Transmissão enviada com sucesso!')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `[TRANSMISSÃO ]\n\n${body.slice(4)}`)
						}
						reply('Transmissão enviada com sucesso ✅')
					}
					break
				case 'infobot':
					if(!isOwner) return reply(mess.only.owner)
					client.updatePresence(from, Presence.composing)
					var os = require('os');
					fre = Math.round(os.freemem()/1024/1024)
					tot = Math.round(os.totalmem()/1024/1024)
					function hhmmss(val) {
						var hours = Math.floor(val / 3600) < 10 ? ("00" + Math.floor(val / 3600)).slice(-2) : Math.floor(val / 3600);
						var minutes = ("00" + Math.floor((val % 3600) / 60)).slice(-2);
						var seconds = ("00" + (val % 3600) % 60).slice(-2);
						return hours + ":" + minutes + ":" + seconds;
					}
					teks = `${client.user.name}\n\nBattery Level: ${bateriA[0]}%\nBrowser Description: ${client.browserDescription}\nWa_version: ${client.user.phone.wa_version}\nAndroid ${client.user.phone.os_version}\nDispositivo ${client.user.phone.device_manufacturer}\n\n-------RAM-------\nTotal:    Usada:    Free:\n${tot}      ${tot-fre}       ${fre}\n\n*Ativo a ${hhmmss(os.uptime())}*`
					reply(teks)
					break
        		case 'promote':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Promovido com sucesso\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(from, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`@${mentioned[0].split('@')[0]} agora é admin 😎`, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
					break
				case 'demote':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = `Rebaixados com sucesso!\nTotal: ${mentioned.length}\n`
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`@${mentioned[0].split('@')[0]} foi rebaixado(a)!`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break
				case 'add':
					//client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('Quem você deseja adicionar?')
					if (args[0].startsWith('+')) return reply('Sem o *+* e sem espaços tbm 😉')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('Falha ao adicionar a pessoa, talvez seja porque é privado')
					}
					break
					case 'softban':
						client.updatePresence(from, Presence.composing)
						if (!isGroup) return reply(mess.only.group)
						if (!isGroupAdmins) return reply(mess.only.admin)
						if (!isBotGroupAdmins) return reply(mess.only.Badmin)
						if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag invalida!')
						mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
						//mentions(`@${mentioned[0].split('@')[0]} foi removido(a) ✅\nQue sirva de exemplo 💢`, mentioned, true)
						client.groupRemove(from, mentioned)
						reply('`Ban temporario aplicado!!')
						//basess = true
						setTimeout(() => {
							client.groupAdd(from, mentioned)
						}, 900000)
					break
				case 'ban':
					client.updatePresence(from, Presence.composing)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag invalida!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					setTimeout( () => {
						if (mentioned.length > 1) {
							teks = 'Pedidos para remoção :\n'
							for (let _ of mentioned) {
								teks += `~> X @${_.split('@')[0]}\n`
							}
							mentions(teks, mentioned, true)
							client.groupRemove(from, mentioned)
							//basess = true
						}else {
							mentions(`⏳ Aguarde, removendo @${mentioned[0].split('@')[0]}`, mentioned, true)
							//mentions(`@${mentioned[0].split('@')[0]} foi removido(a) ✅\nQue sirva de exemplo 💢`, mentioned, true)
							client.groupRemove(from, mentioned)
							//basess = true
						}
					   }, 2000)

					/*setTimeout( () => {
						basess = false
					   }, 7000)*/
					break
				case 'listmods':
					if (!isGroup) return reply(mess.only.group)
					teks = `Lista de mods da *𝑺𝑯𝑼𝑵𝑨❦𝑩𝑶𝑻𖥨ํ∘̥⃟⸽⃟🌸*\nTotal: ${bossNumber.length}\n\n`
					no = 0
					for (let admon of bossNumber) {
						teks += `[${no+1}] @${bossNumber[no].split('@')[0]}\n`
						no += 1
					}
					mentions(teks, bossNumber, true)
					break
				case 'listadmins':
					if (!isGroup) return reply(mess.only.group)
					teks = `Lista de admins do grupo *${groupMetadata.subject}*\nTotal: ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
                case 'linkgroup':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
    	            if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    linkgc = await client.groupInviteCode(from)
            	    reply(`Link de ${groupName}: https://chat.whatsapp.com/`+linkgc)
                    break
                case 'exit':
                    if (!isGroup) return reply(mess.only.group)
                    if (isGroupAdmins || isOwner) {
						client.updatePresence(from, Presence.composing) 
						client.sendMessage(from, 'Tchau Tchau👋', text)
                    	setTimeout( () => {
							client.groupLeave(from)
						}, 5000)
                    } else {
                    	reply(mess.only.admin)
                    }
                    break
				case 'toimg':
					if(!isQuotedSticker) return reply('Marque um sticker!')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					await ffmpeg(media)
						.on('start', function (cmd) {
							console.log(`Started : ${cmd}`)
						})
						.on('error', function (err) {
							console.log(`Error : ${err}`)
							fs.unlinkSync(media)
							reply(`Falha ao converter para imagem...`)
						})
						.on('end', function () {
							console.log('Finish')
							client.sendMessage(from, fs.readFileSync(ran), image, {quoted: mek})
							fs.unlinkSync(media)
							fs.unlinkSync(ran)
						})
						.save(ran)
						break
					case 'tomp3':
						if(isQuotedVideo || content.includes('videoMessage') ){
							reply(mess.wait)
						}else return reply('Marque ou mande um video!')
						encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo: mek
						media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.mp3')
						await ffmpeg(media)
							//.outputOptions('-f image2pipe')
							   //.outputOptions('-vcodec png')
							//.toFormat('png')
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(`Falha ao converter para mp3...`)
							})
							.on('end', function () {
								console.log('Finish')
								client.sendMessage(from, fs.readFileSync(ran), audio, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.save(ran)
						break
				case 'welcome':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply(`Digite *${prefix}welcome 1* para ativar 😉`)
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('O recurso já está ativo 😊')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('❬ SUCESSO ❭ ativado recurso de boas-vindas neste grupo')
					} else if (Number(args[0]) === 0) {
						if (!isWelkom) return reply('O recurso já está desativo 😶')
						ind = welkom.indexOf(from);
						welkom.splice(ind, 1)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('❬ SUCESSO ❭ desativado o recurso boas-vindas neste grupo')
					} else {
						reply('Digite 1 para ativar ou 0 para desativar!')
					}
					break
				case 'getft':
					if(!isGroup) return reply(mess.only.group)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag inválida 😐')
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
							let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
							//esses comandos 
							pp = await client.getProfilePicture(id)
							client.sendMessage(from, {url: pp}, image)
					break
				case 'getnick':
					if(!isGroup) return reply(mess.only.group)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag inválida 😐')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
					getnick = client.contacts[mentioned].notify
					if(mentioned == botNumber){
						reply(client.user.name)
					}else{
						reply(getnick)
					}
					break
				case 'clone':
					if (!isOwner) return reply(mess.only.owner)
					if(isImage || isQuotedImage){
						try{
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							await client.updateProfilePicture(botNumber, media)
							reply('Foto atualizada com sucesso a partir de midia ✅')
						} catch (e){
							reply(`Falhou 😣\nPara colocar uma das fotos padrões do bot digite *${prefix}clone bot*`)
						}
					}else if (args[0] == 'bot'){
						try{
							links = ["https://i.imgur.com/WwnTFpr.jpg", "https://i.imgur.com/Xy7nAXc.jpg", "https://i.imgur.com/i3YvQAp.jpg", "https://i.imgur.com/YfxRZzv.jpg", "https://i.imgur.com/QoWkqj1.jpg", "https://i.imgur.com/HxkV3W6.jpg"]
							ind = Math.floor(Math.random() * links.length);
							buffer = await getBuffer(links[ind])
							client.updateProfilePicture(botNumber, buffer)
							reply('Foi colocada uma das fotos padrões do bot ❤')
						} catch (e){
							reply("Erro (*provavelmente link corrompido*) ❌")
						}
					} else {
						try {
							//esses comandos (3 linhas abaixo) antes ficavam depois de if(args.length < 1)...
							if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag inválida 😐')
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
							let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
							//esses comandos 
							pp = await client.getProfilePicture(id)
							buffer = await getBuffer(pp)
							client.updateProfilePicture(botNumber, buffer)
							mentions(`Foto do perfil atualizada com sucesso, usando a foto do perfil @${id.split('@')[0]}`, [jid], true)
						} catch (e) {
							reply(`Falhou 😣\nO alvo provavelmente está com a foto privada ou sem...\nPara colocar uma das fotos padrões do bot digite *${prefix}clone bot*`)
						}
					}			
					break
				
				case 'wait':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await client.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
						client.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply('Mande ou responda uma _imagem_ com *.wait*')
					}
					break
				default:
					if (body.startsWith(`${prefix}`)) {
						hsl = `        ────────────────\nOi @${sender.split("@")[0]}!!\nO comando: ${prefix}${command} não existe\n\nTem certeza que digitou corretamente?🧙‍♂️\nUse ${prefix}menu para listar meus comandos\n        ────────────────`
		  				client.sendMessage(from, hsl, text, {quoted: mek, contextInfo: {mentionedJid: [sender]}})
						console.log(color('[ERROR]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
						}
					if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					}
					//else {
					//	console.log(color('[ERROR]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					//}
                           }
		} catch (e) {
			//dev
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()
