const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//-----------------------GİRENE-ROL-VERME----------------------\\     STG

client.on("guildMemberAdd", member => {
  member.roles.add('785523805879009318'); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});

//-----------------------GİRENE-ROL-VERME----------------------\\     STG


//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     STG

client.on("guildMemberAdd", member => {  
    const kanal = member.guild.channels.cache.find(r => r.id === "796425029218730055");
    const register = "<@&796424653529677824>"
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
   
    var kontrol;
  if (kurulus < 1296000000) kontrol = 'Hesap Durumu: Güvenilir Değil'
  if (kurulus > 1296000000) kontrol = 'Hesap Durumu: Güvenilir Gözüküyor'
    moment.locale("tr");
      const strigalog = new Discord.MessageEmbed()
      .setAuthor(member.guild.name)
  .setDescription("**Hoşgeldin! <@" + member + "> Seninle \`" + member.guild.memberCount + "\` Kişiyiz.\n\nMüsait olduğunda Confirmed Odalarından Birine Geçip Kaydını Yaptırabilirsin. \n\n <@&796424653529677824> seninle ilgilenicektir. \n\nHesabın Oluşturulma Tarihi: " + moment(member.user.createdAt).format("`YYYY DD MMMM dddd`") +  "\n\n"  + kontrol + "\n\nTagımızı alarak ` န ` bize destek olabilirsin.**\n")
   .setImage("https://images-ext-1.discordapp.net/external/1meA16wbJL-dfGfDENLoL0GSxWwwWtyBrBVNr5OCliE/https/ariuscdn.suleymanbal.com.tr/resim/gif/5.gif")
   kanal.send(strigalog)   
     kanal.send(register) 
  });
  
//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     STG


//-----------------------OTO-TAG-----------------------\\     STG

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = 'န'
  const sunucu = '793142860471468052'
  const kanal = '796425087175229501'
  const rol = '796424663911235684'

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam ${newUser.username}, Sunucumuzda ${tag} Tagımızı Aldığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Sana Verdim!`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam **${newUser.username}**, Sunucumuzda ${tag} Tagımızı Çıkardığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Senden Aldım!`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});



//Serendia'dan alınıp V12 Çevirilmiştir!


//-----------------------OTO-TAG-----------------------\\     STG

client.on("userUpdate", async (stg, yeni) => {
  var sunucu = client.guilds.cache.get('785523805636132905'); // Buraya Sunucu ID
  var uye = sunucu.members.cache.get(yeni.id);
  var tag = "န"; // Buraya Ekip Tag
  var tagrol = "796424663911235684"; // Buraya Ekip Rolünün ID
  var kanal = "796425087175229501"; // Loglanacağı Kanalın ID

  if (!sunucu.members.has(yeni.id) || yeni.bot || stg.username === yeni.username) return;
  
  if ((yeni.username).includes(tag) && !uye.roles.has(tagrol)) {
    try {
      await uye.roles.add(tagrol);
      await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
      await client.channels.cache.get(kanal).send(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`);
    } catch (err) { console.error(err) };
  };
  
  if (!(yeni.username).includes(tag) && uye.roles.has(tagrol)) {
    try {
      await uye.roles.remove(uye.roles.filter(rol => rol.position >= sunucu.roles.get(tagrol).position));
      await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${tag}**`);
      await client.channels.cache.get(kanal).send(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`);
    } catch(err) { console.error(err) };
  };
});

////--------------BOTA DM ATANLAR BAŞLANGIÇ-------------////

client.on("message", msg => {
  var dm = client.channels.cache.get("785523813977948221");
  if (msg.channel.type === "dm") {
    if (msg.author.id === client.user.id) return;
    const botdm = new Discord.MessageEmbed()
      .setTitle(`${client.user.username} Dm`)
      .setTimestamp()
      .setColor("RANDOM")
      .setThumbnail(`${msg.author.avatarURL()}`)
      .addField("Gönderen", msg.author.tag)
      .addField("Gönderen ID", msg.author.id)
      .addField("Gönderilen Mesaj", msg.content);

    dm.send(botdm);
  }
  if (msg.channel.bot) return;
});
///--------BOTA DM ATANLAR SONU-------------////

///////////////////BOTU ODAYA SOKMA///////////////////////////////////



client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('`Aleykümselam Hoşgeldin` :smiling_face_with_3_hearts: ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 's.a') {
    msg.reply('`Aleykümselam Hoşgeldin` :smiling_face_with_3_hearts: ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Sa') {
    msg.reply('`Aleykümselam Hoşgeldin` :smiling_face_with_3_hearts: ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'SA') {
    msg.reply('`Aleykümselam Hoşgeldin` :smiling_face_with_3_hearts: ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sA') {
    msg.reply('`Aleykümselam Hoşgeldin` :smiling_face_with_3_hearts: ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '.tag') {
    msg.reply('`İşte Buyur Tagımız...` **န** ');
  }
});


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'lordsizes') {
    msg.reply('`Ne İstiyon Lan Yapımcımdan?`');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'ozi') {
    msg.reply(' :crown: Ozi Adamdır :crown:  ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'naber') {
    msg.reply('İyi Senden Krall! :crown:  ');
  }
});

client.on("guildMemberAdd" , member => {
let autoroles = member.guild.roles.cache.get("796424667019477032")
try {
member.roles.add(autoroles)
} catch (oz) {
throw oz
}
});


client.on('message', msg => {
  if (msg.content.toLowerCase() === '@everyone') {
    msg.reply('Ever Atma Kardeşim Atma Atmaa! .D');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '<@797198633580626010>') {
    msg.reply('Buyur Bilader Ben Çalışayım Bişeyler Yapayım Sen Rahatsız Et?!');
  }
});