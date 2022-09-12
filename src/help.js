const {str_data, str_hora, str_dia, relo} = require('./timeKami')
const help = (prefix) => {
	return `*╔╦══•𝑺𝑯𝑼𝑵𝑨❦︎𝑩𝑶𝑻𖥨ํ∘̥⃟⸽⃟🌸•══╦╗*
📆 ${str_dia}, ${str_data}
${relo} ${str_hora}

➸ Prefix:  *「 ${prefix} 」*
➸ Status: *「On ✅」*
➸ Comandos: *100+ 😋*

    • ──── ✾ ──── •
    PARA MEMBROS【✔】
    • ──── ✾ ──── •

➸ Comando: *${prefix}wait*
➸ Útil em: procurar nome de anime a partir de midias
➸ Uso: responda/mande video/imagem com o comando

➸ Comando: *${prefix}getnick* @pessoa
➸ Útil em: receber nick das pessoas

➸ Comando: *${prefix}getft* @pessoa
➸ Útil em: receber foto de perfil das pessoas

➸ Comando: *${prefix}tomp3*
➸ Útil em: transformar videos em audio
➸ Uso: responda/mande video com o comando

➸ Comando: *${prefix}toimg*
➸ Útil em: transformar sticker em imagem 
➸ Uso: responda o sticker com o comando

➸ Comando: *${prefix}listadmins*
➸ Útil em: lista os admins do grupo atual

➸ Comando: *${prefix}listmods*
➸ Útil em: lista os mods do bot

➸ Comando: *${prefix}dono*
➸ Útil em: dados sobre o criador do bot

➸ Comando: *${prefix}meme*
➸ Útil em: envia um meme(em inglês, mas na legenda há a tradução)

➸ Comando: *${prefix}gtts* _cc seu texto_
➸ Útil em: converter texto em audio, consulte em ${prefix}cc 
➸ Uso: ${prefix}gtts ja Onii-chan

➸ Comando: *${prefix}cc*
➸ Útil em: listas as linguagens suportadas pelo comando ${prefix}gtts

➸ Comando: *${prefix}sticker*
➸ Útil em: transformar imagens/videos/gif em sticker
➸ Uso: marque/mande video/gif/imagem com o comando

➸ Comando: *${prefix}ocr*
➸ Útil em: lê textos na imagem e volta em texto (foi feito para ler em inglês...)
➸ Uso: marque/mande imagem com o comando

➸ Comando: *${prefix}plaq* _seu texto | tamanho da fonte_ 
➸ Útil em: manda plaquinha 
➸ Uso: ${prefix}plaq KamiSama | 22 

➸ Comando: *${prefix}play* _nome da musica_
➸ Útil em: encontra musica a partir do nome

➸ Comando: *${prefix}kiss* @pessoa

➸ Comando: *${prefix}wallpaper*
➸ Útil em: envia um wallpaper aleatorio, evite usar em grupo!

➸ Comando: *${prefix}meow*
➸ Útil em: just try :)

➸ Comando: *${prefix}timer* _tempo un_
➸ Útil em: cronometro, PS: un = *seg* ou *min* ou *h*
➸ Uso: ${prefix}timer 1 min

➸ Comando: *${prefix}sendsfw* _tipo_
➸ Útil em: envia fotos anime safe for work, consulte _tipo_ em ${prefix}sfwmenu
➸ Uso: ${prefix}sendsfw waifu

➸ Comando: *${prefix}sfwmenu*
➸ Útil em: envia os tipos de sfw disponiveis

➸ Comando: *${prefix}sendnsfw* _tipo_
➸ Útil em: envia fotos anime NOT safe for work, consulte _tipo_ em ${prefix}nsfwmenu
➸ Uso: ${prefix}sendnsfw neko

➸ Comando: *${prefix}nsfwmenu*
➸ Útil em: envia os tipos de nsfw disponíveis

➸ Comando: *${prefix}nekos* _tipo_
➸ Útil em: envia fotos anime *maioria* nsfw, consulte _tipo_ em ${prefix}nekosmenu
➸ Uso: ${prefix}nekos erok

➸ Comando: *${prefix}nekosmenu*
➸ Útil em: envia as opções disponíveis para o comando ${prefix}nekos

➸ Comando: *${prefix}loli*
➸ Útil em: foto aleatória de uma loli

➸ Comando: *${prefix}nsfwloli*
➸ Útil em: o mesmo que ${prefix}loli, só que em NOT safe for work

➸ Comando: *${prefix}shota*
➸ Útil em: foto aleatória de um shota

➸ Comando: *${prefix}wame*
➸ Útil em: manda seu link wa.me

➸ Comando: *${prefix}getstts* @pessoa
➸ Útil em: te manda o recado da pessoa mecionada

➸ Comando: *${prefix}me*
➸ Útil em: manda suas informações

➸ Comando: *${prefix}infogp*
➸ Útil em: manda informações do grupo atual

➸ Comando: *${prefix}qrcode* _sua url_
➸ Útil em: envia um QR CODE a partir do seu link

➸ Comando: *${prefix}abraco* @pessoa
➸ Útil em: just try

➸ Comando: *${prefix}meanime*
➸ Útil em: manda você em uma suposta versão anime

➸ Comando: *${prefix}prev* _sua cidade_
➸ Útil em: previsão do clima de sua cidade para o dia de hoje e amanhã
➸ Uso: ${prefix}clima Brasília

➸ Comando: *${prefix}clima* _sua cidade_
➸ Útil em: informações do clima em sua cidade
➸ Uso: ${prefix}clima Brasília

➸ Comando: *${prefix}atris*
➸ Útil em: envia packs

➸ Comando: *${prefix}roleta*
➸ Útil em: gira uma roleta aleatória, just try too

➸ Comando: *${prefix}shipp*
➸ Útil em: pode ser utilizado de várias maneiras
➸ Usos: [1] ${prefix}shipp (retorna shipp de 2 pessoas aleatórias)
[2] ${prefix}shipp @pessoa (retorna shipp seu com a pessoa mencionada)
[3] ${prefix}shipp @pessoa1 @pessoa2 (retorna shipp das duas pessoas mencionadas)

➸ Comando: *${prefix}bug* _sua mensagem_
➸ Útil em: você pode relatar um bug
PS: Se quiser, pode mencionar/mandar imagem com o comando (assim a foto também será reportada)

➸ Comando: *${prefix}sn* _sua pergunta_
➸ Útil em: a bot responde uma pergunta com *sim* ou *não*
➸ Uso: ${prefix}sn 2+2=5?

➸ Comando: *${prefix}gado*
➸ Útil em: calcula o quão gado um individuo é
➸ Uso: [1] ${prefix}gado @pessoa (retorna o valor dela)
[2] ${prefix}gado (retorna o seu valor)

➸ Comando: *${prefix}ppt* _sua jogada_
➸ Útil em: joga *pedra, papel ou tesoura* com a bot
➸ Uso: ${prefix}ppt pedra

➸ Comando: *${prefix}chance*
➸ Útil em: retorna as chances de determinado evento acontecer
➸ Uso: ${prefix}chance de eu ter o Death Note

➸ Comando: *${prefix}dado*
➸ Útil em: apenas joga um dado

➸ Comando: *${prefix}oppai*
➸ Útil em: retorna um oppai

➸ Comando: *${prefix}upimagem*
➸ Útil em: upa sua imagem e te manda o link dela
➸ Uso: marque/mande imagem com o comando na legenda

➸ Comando: *${prefix}nightcore*
➸ Útil em: converte seu audio em nightcore
➸ Uso: marque um audio com o comando

➸ Comando: *${prefix}bass*
➸ Útil em: coloca grave na sua música
➸ Uso: marque um audio com o comando

➸ Comando: *${prefix}piada*
➸ Útil em: retorna uma piada em inglês, mas com tradução

➸ Comando: *${prefix}attp*
➸ Útil em: manda uma figurinha com o texto digitado
➸ Uso: ${prefix}attp 😈 capetinha roxo
PS: Maioria dos emojis podem ser usados também

    • ──── ✾ ──── •
        MIDIA【✔】
    • ──── ✾ ──── •

PS: Necessita cargo de modder do bot!
➪ type: video/imagem/aud/sticker

➪ Comando : *${prefix}add(type)*
➪ útil em : adicionar video/imagem/audio a base do bot
➪ uso : *${prefix}addvideo* nome da midia

➪ Comando : *${prefix}get(type)*
➪ útil em : obter midia da base do bot
➪ uso : *${prefix}getvideo* nome da midia

➪ Comando : *${prefix}list(type)* ou *${prefix}(type)list*
➪ útil em : obter midia que foi adicionada a base do bot
➪ uso : *${prefix}listvideo*

➪ Comando : *${prefix}rmv(type)*
➪ útil em : remover midia que foi adicionada a base do bot
➪ uso : *${prefix}rmvideo*

    • ──── ✾ ──── •
       GRUPO【✔】
    • ──── ✾ ──── •
    
➸ Comando : *${prefix}exit*
➸ útil em : Fazer o bot sair do grupo
➸ uso : Você precisa ser administrador do grupo
   
➸ Comando : *${prefix}linkgroup*
➸ útil em : enviar o link do grupo
➸ uso : basta enviar o comando

➸ Comando : *${prefix}marcar* _sua mensagem_
➸ útil em : marcar todos os membros do grupo
➸ uso : basta enviar o comando
➸ Nota : Você precisa ser administrador do grupo

➸ Comando : *${prefix}hidetag* _sua mensagem_
➸ útil em : marcar todos os membros do grupo, mas com a tag oculta
➸ Nota : Você precisa ser administrador do grupo

➸ Comando : *${prefix}hidetag2* _sua mensagem_
➸ útil em : similar ao hidetag, mas o método é diferente
➸ Nota : Você precisa ser administrador do grupo

➸ Comando : *${prefix}add*
➸ útil em : adicionar membros ao grupo
➸ uso : *${prefix}add 5585xxxxx*
➸ Nota : Você precisa ser admin e o bot também

➸ Comando : *${prefix}ban*
➸ útil em : remover membros do grupo
➸ uso : *${prefix}ban e o @ da pessoa*
➸ Nota : Você precisa ser admin e o bot também

➸ Comando : *${prefix}softban*
➸ útil em : remover membros por 15 min
➸ uso : *${prefix}ban* @pessoa
➸ Nota : Você precisa ser admin e o bot também

➸ Comando : *${prefix}promote*
➸ útil em : tornar membro do grupo um administrador
➸ uso : *${prefix}promote* @pessoa
➸ Nota : Você precisa ser admin e o bot também

➸ Comando : *${prefix}demote*
➸ útil em : tornar o administrador um membro comum
➸ uso : *${prefix}demote* e o @ da pessoa
➸ Nota : Você precisa ser admin e o bot também

➸ Comando : *${prefix}welcome*
➸ útil em : ativa uma mensagem de boas vindas ao grupo
➸ uso : *${prefix}welcome 1* ... 1 para ativar, 0 pra desativar 
➸ Nota : Usado somente em grupos 

➸ Comando : *${prefix}nsfw*
➸ útil em : ativa ou desativa comandos nsfw no grupo
➸ uso : *${prefix}nsfw 1* ... 1 para ativar, 0 pra desativar 
➸ Nota : Usado somente em grupos 

➸ Comando : *${prefix}setfoto*
➸ útil em : muda a foto do grupo
➸ uso : marque/mande uma imagem e o comando *${prefix}setfoto*
➸ Nota : Usado somente em grupose precisa ser adm

➸ Comando : *${prefix}setsubject* _novo nome_
➸ útil em : muda o nome do grupo 
➸ Nota : Usado somente em grupos

➸ Comando : *${prefix}setdesc* _novo nome_
➸ útil em : muda o a descrição grupo 
➸ Nota : Usado somente em grupos

➸ Comando : *${prefix}grupo*
➸ útil em : muda quem pode enviar mensagens no grupo
➸ Uso: *${prefix}grupo* open ... *open* para abrir, *close* para fechar

➸ Comando : *${prefix}grupodados*
➸ útil em : altera quem pode mudar dados do grupo
➸ Uso: *${prefix}grupodados* todos ... *todos* ou *adms*

➸ Comando : *${prefix}revoke*
➸ útil em : revoga o link do grupo

➸ Comando : *${prefix}del*
➸ útil em : delete a mensagem
➸ Uso: marque a mensagem e digite o comando *${prefix}del*

➸ Comando : *${prefix}sorteio* _quantidade_
➸ útil em : sorteia participantes
➸ Uso: *${prefix}sorteio* 10 (sorteia 10 membros)

➸ Comando : *${prefix}grupo*
➸ útil em : muda quem pode enviar mensagens no grupo
➸ Uso: *${prefix}grupo* open... *open* para abrir, *close* para fechar

    • ──── ✾ ──── •
     ONLY DONO【✔】
    • ──── ✾ ──── •

➸ Comando : *${prefix}clone*
➸ útil em : muda a foto do grupo
➸ Usos: [1] marque/mande uma imagem e *${prefix}clone*
[2] *${prefix}clone* bot (fotos padrões do bot)
[3] *${prefix}clone* @pessoa

➸ Comando : *${prefix}ts*
➸ útil em : transmissão para todos chats do bot
➸ Uso: *${prefix}ts* _mensagem_
➸ Nota: se marcar/mandar uma imagem ele transmite ela também

➸ Comando : *${prefix}limpar*
➸ útil em : apaga todos chats do bot

➸ Comando : *${prefix}setprefix* _novo prefixo_
➸ útil em : muda o prefix do bot
➸ Uso: *${prefix}setprefix* /

➸ Comando : *${prefix}blocklist*
➸ útil em : lista de números bloqueados

➸ Comando : *${prefix}block* @pessoa
➸ útil em : bot bloqueia pessoa

➸ Comando : *${prefix}unblock* @pessoa
➸ útil em : bot desbloqueia pessoa

➸ Comando : *${prefix}setname* _novo nome_
➸ útil em : muda o nome do bot

➸ Comando : *${prefix}setstts* _novo recado_
➸ útil em : muda o recado do bot

➸ Comando : *${prefix}ts*
➸ útil em : manda uma mensagem em transmissão
➸ uso : *${prefix}ts [text]*\nexemplo : *${prefix}ts 𝑺𝑯𝑼𝑵𝑨❦︎𝑩𝑶𝑻𖥨ํ∘̥⃟⸽⃟🌸*\n

➸ Comando : *${prefix}acceptin*
➸ útil em : faz o bot aceitar um convite de grupo de whatsapp
➸ uso : *${prefix}acceptin* _link_
    
╔╦════════✾════════╦╗
        𝑺𝑯𝑼𝑵𝑨❦︎𝑩𝑶𝑻𖥨ํ∘̥⃟⸽⃟🌸
        DUVIDAS? 👇
    wa.me/5561992827345
╚╩════════✾════════╩╝
Fale comigo antes de usar o bot!✨`
}

const helpDetail = (prefix) => {
	return `*╔╦══•𝑺𝑯𝑼𝑵𝑨❦︎𝑩𝑶𝑻𖥨ํ∘̥⃟⸽⃟🌸•══╦╗*
📆 ${str_dia}, ${str_data}
${relo} ${str_hora}

➸ Prefix:  *「 ${prefix} 」*
➸ Status: *「On ✅」*
➸ Comandos: *100+ 😋*

    • ──── ✾ ──── •
    PARA MEMBROS【✔】
    • ──── ✾ ──── •

➸ *${prefix}wait*
➸ *${prefix}getnick* @pessoa
➸ *${prefix}getft* @pessoa
➸ *${prefix}tomp3*
➸ *${prefix}toimg*
➸ *${prefix}listadmins*
➸ *${prefix}listmods*
➸ *${prefix}dono*
➸ *${prefix}meme*
➸ *${prefix}gtts* _cc seu texto_
➸ *${prefix}cc*
➸ *${prefix}sticker*
➸ *${prefix}ocr*
➸ *${prefix}plaq* _seu texto | tamanho da fonte_ 
➸ *${prefix}play* _nome da musica_
➸ *${prefix}kiss* @pessoa
➸ *${prefix}wallpaper*
➸ *${prefix}meow*
➸ *${prefix}timer* 10 min
➸ *${prefix}sendsfw* _tipo_
➸ *${prefix}sfwmenu*
➸ *${prefix}sendnsfw* _tipo_
➸ *${prefix}nsfwmenu*
➸ *${prefix}nekos* _tipo_
➸ *${prefix}nekosmenu*
➸ *${prefix}loli*
➸ *${prefix}nsfwloli*
➸ *${prefix}shota*
➸ *${prefix}wame*
➸ *${prefix}getstts* @pessoa
➸ *${prefix}me*
➸ *${prefix}infogp*
➸ *${prefix}qrcode* _sua url_
➸ *${prefix}abraco* @pessoa
➸ *${prefix}meanime*
➸ *${prefix}prev* _sua cidade_
➸ *${prefix}clima* _sua cidade_
➸ *${prefix}atris*
➸ *${prefix}roleta*
➸ *${prefix}shipp*
➸ *${prefix}bug* _sua mensagem_
➸ *${prefix}sn* _sua pergunta_
➸ *${prefix}gado*
➸ *${prefix}ppt* _pedra/papel/tesoura_
➸ *${prefix}chance*
➸ *${prefix}dado*
➸ *${prefix}oppai*
➸ *${prefix}upimagem*
➸ *${prefix}nightcore*
➸ *${prefix}bass*
➸ *${prefix}piada*
➸ *${prefix}attp*

    • ──── ✾ ──── •
        MIDIA【✔】
    • ──── ✾ ──── •

PS: Necessita cargo de modder do bot!
➪ type: video/imagem/aud/sticker

➪ *${prefix}add(type)*

➪ *${prefix}get(type)*

➪ *${prefix}list(type)* ou *${prefix}(type)list*

➪ *${prefix}rmv(type)*

    • ──── ✾ ──── •
       GRUPO【✔】
    • ──── ✾ ──── •
    
➸ *${prefix}exit* 
➸ *${prefix}linkgroup*
➸ *${prefix}marcar* _sua mensagem_
➸ *${prefix}hidetag* _sua mensagem_
➸ *${prefix}hidetag2* _sua mensagem_
➸ *${prefix}add*
➸ *${prefix}ban*
➸ *${prefix}softban*
➸ *${prefix}promote*
➸ *${prefix}demote*
➸ *${prefix}welcome*
➸ *${prefix}nsfw*
➸ *${prefix}setfoto*
➸ *${prefix}setsubject* _novo nome_
➸ *${prefix}setdesc* _novo nome_
➸ *${prefix}grupo*
➸ *${prefix}grupodados*
➸ *${prefix}revoke*
➸ *${prefix}del*
➸ *${prefix}sorteio* _quantidade_
➸ *${prefix}grupo*

    • ──── ✾ ──── •
     ONLY DONO【✔】
    • ──── ✾ ──── •

➸ *${prefix}clone*
➸ *${prefix}ts*
➸ *${prefix}limpar*
➸ *${prefix}setprefix* _novo prefixo_
➸ *${prefix}blocklist*
➸ *${prefix}block* @pessoa
➸ *${prefix}unblock* @pessoa
➸ *${prefix}setname* _novo nome_
➸ *${prefix}setstts* _novo recado_
➸ *${prefix}acceptin*
➸ *${prefix}ts*

╔╦════════✾════════╦╗
        𝑺𝑯𝑼𝑵𝑨❦︎𝑩𝑶𝑻𖥨ํ∘̥⃟⸽⃟🌸
        DUVIDAS? 👇
    wa.me/5561992827345
╚╩════════✾════════╩╝
Fale comigo antes de usar o bot!✨`
}

module.exports = {help, helpDetail }
