
const Discord = require('discord.js');

const client = new Discord.Client();

const config = require('./config.json');

const Enmap = require("enmap");

client.points = new Enmap({name: "points"});

const randomPuppy = require('random-puppy');

const bibleverses = require('bibleverses');

const hook = new Discord.WebhookClient('675128236342247424', 'ZUlLue0sOEARc_hMA3Ro_prn3npSnHFHGGmlT9nDzblbfHNMqwjiafZLgd-tczaJCwxY');

const Util = require('discord.js');

const YouTube = require('simple-youtube-api');

const youtube = new YouTube("AIzaSyA0OPujnm-xlGHN_EPTsJG8y6tqRUq0a4A");

const queue = new Map();
var weather = require('weather-js');
const ytdl = require('ytdl-core');
const fs = require("fs"); // Gets the fs Package

client.once('ready', () => {
  hook.send('I am now alive!');

    console.log('Ready!');

    client.user.setActivity('!help', { type: 'PLAYING'})});

var prefix = '!';

const hexcolor = '#e23e60'

var gis = require('g-image-search');

	var download = require('download');

	var glitch = require('glitch');
var guildConf = require('./guildConf.json');


client.on('message', async msg =>{











	if (msg.author.bot) return undefined;

    if (!msg.content.startsWith(prefix)) return undefined;

    

    let args = msg.content.split(' ');



	let command = msg.content.toLowerCase().split(" ")[0];

	command = command.slice(prefix.length)



    if(command === `avatar`){

	if(msg.channel.type === 'dm') return msg.channel.send("Nope Nope!! u can't use avatar command in DMs (:")

        let mentions = msg.mentions.members.first()

        if(!mentions) {

          let sicon = msg.author.avatarURL

          let embed = new Discord.RichEmbed()

          .setImage(msg.author.avatarURL)

          .setColor(hexcolor)

          msg.channel.send({embed})

        } else {

          let sicon = mentions.user.avatarURL

          let embed = new Discord.RichEmbed()

          .setColor(hexcolor)

          .setImage(sicon)

          msg.channel.send({embed})

        }

    };

});


client.on('message', async msg => { 

	if (msg.author.bot) return undefined;

    if (!msg.content.startsWith(prefix)) return undefined;

    

    const args = msg.content.split(' ');

	const searchString = args.slice(1).join(' ');

    

	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';

	const serverQueue = queue.get(msg.guild.id);



	let command = msg.content.toLowerCase().split(" ")[0];

	command = command.slice(prefix.length)



	if (command === `play`) {

		const voiceChannel = msg.member.voiceChannel;

        

        if (!voiceChannel) return msg.channel.send("I can't find you in any voice channel!");

        

        const permissions = voiceChannel.permissionsFor(msg.client.user);

        

        if (!permissions.has('CONNECT')) {



			return msg.channel.send("I don't have enough permissions to join your voice channel!");

        }

        

		if (!permissions.has('SPEAK')) {



			return msg.channel.send("I don't have enough permissions to speak in your voice channel!");

		}



		if (!permissions.has('EMBED_LINKS')) {



			return msg.channel.sendMessage("I don't have enough permissions to insert a URLs!")

		}



		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {



			const playlist = await youtube.getPlaylist(url);

            const videos = await playlist.getVideos();

            



			for (const video of Object.values(videos)) {

                

                const video2 = await youtube.getVideoByID(video.id); 

                await handleVideo(video2, msg, voiceChannel, true); 

            }

			return msg.channel.send(`**${playlist.title}**, Just added to the queue!`);

		} else {



			try {



                var video = await youtube.getVideo(url);

                

			} catch (error) {

				try {



					var videos = await youtube.searchVideos(searchString, 5);

					let index = 0;

                    const embed1 = new Discord.RichEmbed()

                    .setTitle(":mag_right:  YouTube Search Results :")

                    .setDescription(`

                    ${videos.map(video2 => `${++index}. **${video2.title}**`).join('\n')}`)

                    

					.setColor(hexcolor)

					msg.channel.sendEmbed(embed1)

					

/////////////////					

					try {



						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {

							maxMatches: 1,

							time: 15000,

							errors: ['time']

						});

					} catch (err) {

						console.error(err);

						return msg.channel.send('No one responded with a number!!');

                    }

                    

					const videoIndex = parseInt(response.first().content);

                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);

                    

				} catch (err) {



					console.error(err);

					return msg.channel.send("I didn't find any results!");

				}

			}



            return handleVideo(video, msg, voiceChannel);

            

        }

        

	} else if (command === `skip`) {



		if (!msg.member.voiceChannel) return msg.channel.send("You Must be in a Voice channel to Run the Music commands!");

        if (!serverQueue) return msg.channel.send("There is no Queue to skip!!");



		serverQueue.connection.dispatcher.end('Ok, skipped!');

        return undefined;

        

	} else if (command === `stop`) {



		if (!msg.member.voiceChannel) return msg.channel.send("You Must be in a Voice channel to Run the Music commands!");

        if (!serverQueue) return msg.channel.send("There is no Queue to stop!!");

        

		serverQueue.songs = [];

		serverQueue.connection.dispatcher.end('Ok, stopped & disconnected from your Voice channel');

        return undefined;

        

	} else if (command === `vol`) {



		if (!msg.member.voiceChannel) return msg.channel.send("You Must be in a Voice channel to Run the Music commands!");

		if (!serverQueue) return msg.channel.send('You only can use this command while music is playing!');

        if (!args[1]) return msg.channel.send(`The bot volume is **${serverQueue.volume}**`);

        

		serverQueue.volume = args[1];

        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 50);

        

        return msg.channel.send(`Volume Now is **${args[1]}**`);



  }
   

	

	 else if (command === `np`) {



		if (!serverQueue) return msg.channel.send('There is no Queue!');

		const embedNP = new Discord.RichEmbed()

	    .setDescription(`Now playing **${serverQueue.songs[0].title}**`)

        return msg.channel.sendEmbed(embedNP);

        

	} else if (command === `queue`) {

		

		if (!serverQueue) return msg.channel.send('There is no queue! Do '+prefix+'play to add songs!');

		let index = 0;

//	//	//

		const embedqu = new Discord.RichEmbed()

        .setTitle("Queued Songs:")

        .setDescription(`

        ${serverQueue.songs.map(song => `${++index}. **${song.title}**`).join('\n')}

**Now playing :** **${serverQueue.songs[0].title}**`)

        .setColor(hexcolor)

		return msg.channel.sendEmbed(embedqu);

	} else if (command === `pause`) {

		if (serverQueue && serverQueue.playing) {

			serverQueue.playing = false;

			serverQueue.connection.dispatcher.pause();

			return msg.channel.send('Ok, paused');

		}

		return msg.channel.send('There is no Queue to Pause!');

	} else if (command === "resume") {



		if (serverQueue && !serverQueue.playing) {

			serverQueue.playing = true;

			serverQueue.connection.dispatcher.resume();

            return msg.channel.send('Ok, resumed!');

            

		}

		return msg.channel.send('Queue is empty!');

	}



	return undefined;

});



async function handleVideo(video, msg, voiceChannel, playlist = false) {

	const serverQueue = queue.get(msg.guild.id);

	console.log(video);

	



	const song = {

		id: video.id,

		title: Util.escapeMarkdown(video.title),

		url: `https://www.youtube.com/watch?v=${video.id}`

	};

	if (!serverQueue) {

		const queueConstruct = {

			textChannel: msg.channel,

			voiceChannel: voiceChannel,

			connection: null,

			songs: [],

			volume: 5,

			playing: true

		};

		queue.set(msg.guild.id, queueConstruct);



		queueConstruct.songs.push(song);



		try {

			var connection = await voiceChannel.join();

			queueConstruct.connection = connection;

			play(msg.guild, queueConstruct.songs[0]);

		} catch (error) {

			console.error(`I could not join the voice channel: ${error}!`);

			queue.delete(msg.guild.id);

			return msg.channel.send(`Can't join this channel: ${error}!`);

		}

	} else {

		serverQueue.songs.push(song);

		console.log(serverQueue.songs);

		if (playlist) return undefined;

		else return msg.channel.send(`**${song.title}**, just added to the queue! `);

	} 

	return undefined;

}

function play(guild, song) {

	const serverQueue = queue.get(guild.id);



	if (!song) {

		serverQueue.voiceChannel.leave();

		queue.delete(guild.id);

		return;

	}

	console.log(serverQueue.songs);



	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))

		.on('end', reason => {

			if (reason === 'Stream is not generating quickly enough.') console.log('Stream is not genetating quickly enough. Song ended.');

			else console.log(reason);

			serverQueue.songs.shift();

			play(guild, serverQueue.songs[0]);

		})

		.on('error', error => console.error(error));

	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);



	serverQueue.textChannel.send(`**${song.title}**, is now playing!`);

}




  




client.on('message', async message => {






if(message.content.startsWith(prefix+'webhook')){
  const channel = client.channels.get('677981199704129554');
	try {
		const webhooks = await channel.fetchWebhooks();
		const webhook = webhooks.first();

		await webhook.send('Webhook test', {
			username: message.author.displayName,
			avatarURL: message.author.avatarURL,
			embeds: [embed],
		});
	} catch (error) {
		console.error('Error trying to send: ', error);
}
}







if ((message.content.split(' ')[0] == prefix + "forecast")) {

  loc = message.content.substring(prefix + 9)

  if (!loc) {

    message.channel.send("You need to supply a City!")

    return

  }

  weather.find({

    search: loc,

    degreeType: 'F'

  }, function(err, result) {

    if (err) {

      message.channel.send(err)

    };

    message.channel.send("Weather forecast for: " + result[0].location.name + "\n`" + result[0].forecast[1].day + "`\nLow: " + result[0].forecast[1].low + "°F\nHigh: " + result[0].forecast[1].high + "°F\n" + result[0].forecast[1].skytextday + "\n\n`" + result[0].forecast[2].day + "`\nLow: " + result[0].forecast[2].low + "°F\nHigh: " + result[0].forecast[2].high + "°F\n" + result[0].forecast[2].skytextday + "\n\n`" + result[0].forecast[3].day + "`\nLow: " + result[0].forecast[3].low + "°F\nHigh: " + result[0].forecast[3].high + "°F\n" + result[0].forecast[3].skytextday + "\n\n`" + result[0].forecast[4].day + "`\nLow: " + result[0].forecast[4].low + "°F\nHigh: " + result[0].forecast[4].high + "°F\n" + result[0].forecast[4].skytextday)

  })

}


if(message.content.startsWith(prefix+'userphone')){

const channel1 = message.channel
const channel2 = message
if(message.channel.send){

message.channel.send('**'+message.author.tag+'** ' + message.content)



}

}



if ((message.content.split(' ')[0] == prefix + "weather")) {

  loc = message.content.substring(prefix + 8)

  if (!loc) {

    message.channel.send("You need to supply a City!")

    return

  }

  weather.find({

    search: loc,

    degreeType: 'F'

  }, function(err, result) {

    if (err) {

      message.channel.send(err)

    };






    const exampleEmbed = new Discord.RichEmbed()
    .setColor(hexcolor)
.setTitle("Weather for: " + result[0].location.name)
.addField('Tempature', result[0].current.temperature + '°F')
.addField('Feels Like', result[0].current.feelslike + "°F")
.addField('Humidity', result[0].current.humidity+'%')
.addField('Wind Speed', result[0].current.winddisplay)
    //message.channel.send("Weather for: " + result[0].location.name + "\nTemperature: " + result[0].current.temperature + "°F\nFeels like: " + result[0].current.feelslike + "°F\n" + result[0].current.skytext + "\n" + result[0].current.humidity + "% Humidity \nWind Speed: " + result[0].current.winddisplay)
message.channel.send(exampleEmbed)
  });

}



  if (message.content.toLowerCase().startsWith((prefix + 'lyrics'))){	
    let content = message.content
  content = content.replace(prefix+'lyrics ', '')
 
  content1 = content.replace(prefix+'lyrics ', '')
  let helpEmbed = new Discord.RichEmbed()

  .addField(`Lyrics for ${song.title}`, `[Click here](https://www.google.com/search?sxsrf=ACYBGNS9_1wyMw6Uu7XXcKsoPytLjrfI2Q%3A1581447317675&source=hp&ei=lfhCXoezJoSk_QbYoLyoBw&q=${song.title}+lyrics&oq=${song.title}+lyrics&gs_l=psy-ab.3..0i10l9.1345.5247..5443...2.0..0.651.2294.11j6j5-1......0....1..gws-wiz.....6..0i362i308i154i357j0j0i131.xtOWUjA7aG0&ved=0ahUKEwjH0eSslsrnAhUEUt8KHVgQD3UQ4dUDCAc&uact=5)`)

  message.channel.send(helpEmbed);
  }


 if (message.content.startsWith(prefix + 'new')) {
    if (message.author.bot) return;
    var server = message.guild;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const user = message.mentions.users.first() || client.users.get(args[0]);
    if (message.member.hasPermission("ADMINISTRATOR")) 
       if(!user) return message.reply("You must mention a user!");
    let member = message.mentions.members.first();
    message.guild.createChannel(user.tag, { type: "text" }).then(
      (chan) => {
      chan.overwritePermissions(message.guild.roles.find('name', '@everyone'), {
         'VIEW_CHANNEL': false
         
      })   
      chan.permissionsFor(message.guild.user('name',user), {
        'VIEW_CHANNEL': true
        
     })   
      })}
    

    if (message.content.startsWith(prefix + 'close')) {
 if (message.member.hasPermission("MANAGE_CHANNELS"))    
   if (message.author.bot) return;
      message.channel.delete()
      
      .catch(console.error);
     
      console.log('close') }

      

    if(message.content.startsWith(prefix + 'flip')) {
        let options = ["Heads", "Tails"];
        let random = Math.floor(Math.random() * options.length);
        let HT;
    if(random === 1){HT = '**Its heads!**'}
    else {HT = '**Its tails!**'}
        message.channel.send(HT)
        console.log('flip') 
        }
  
        if(message.content.toLowerCase().startsWith(`${prefix}roll`)){
            let random = Math.floor(Math.random() * 5)  + 1
            message.channel.send(`**You rolled a ${random}!**`)
            console.log('roll')
        }
            
        if (message.content.toLowerCase().startsWith((prefix + 'status'))){	
            let content = message.content
            if(message.author.id !== config.ownerID) return;

        content = content.replace(prefix + 'status ', '')
        client.user.setActivity(content)
        .then(console.log)
        .catch(console.error);
        message.channel.send('Successfully changed the status to `' +content + '`')
        console.log('status')
           }   
           const args1 = message.content.split(" ").slice(1);
 

           const clean = text => {
            if (typeof(text) === "string")
              return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
          }
       
          if (message.content.startsWith((prefix + 'lookup'))){	
            let content = message.content
           
        content = content.replace(prefix + 'lookup ', '')
        bibleverses.retrievePassage(`${content}`)
        .then(response => {
            message.channel.send(response)
        })
        .catch(err => {
            console.log(err)
        });
  
       
        }



        if(message.content.startsWith(prefix+"ping")) {
        
          message.channel.send(`Your ping is **${client.ping} ms**!`);        
  }

  
  
  if(message.content=== 'test'){
        bibleverses.retrievePassage('John 1:1-3', 'eng-KJV')
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
  
  
      }
        if (message.content.startsWith(prefix + "eval")) {
    if(message.author.id !== config.ownerID) return;
    
    try {
      const code = args1.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
  

        if (message.content.toLowerCase().startsWith((prefix + 'say'))){	
            message.delete(1);
            let content = message.content
        content = content.replace(prefix+'say', '')
        message.channel.send(content)
        console.log('say')
        }

       
        if (message.content.toLowerCase().startsWith((prefix + 'clear'))){	
            let content = message.content
            if (message.member.hasPermission("MANAGE_MESSAGES"))

            
        content = content.replace(prefix+'clear ', '')
        message.channel.bulkDelete(content);
        message.channel.send('successfully deleted** '+content+'** messages.')
        .then(sentMessage => {
            sentMessage.delete(5000);}
        )}


        if (message.content.startsWith(prefix + 'hack')) {
            if (message.author.bot) return;
            const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
            const user = message.mentions.users.first() || client.users.get(args[0]);
            if(!user) return message.reply("You must mention a user!");
            let member = message.mentions.members.first();
            message.channel.send("hacking **" + member.displayName +"**");
            message.channel.send( "getting **" + member.displayName + "'s** IP" );
            message.channel.send( "Injecting malware into **" + member.displayName + "'s** account" );
            message.channel.send( "Found **" + member.displayName + "'s** IP" );
            message.channel.send( "Shutting down **" + member.displayName + "'s** account" );
            message.channel.send( "successfully hacked **" + member.displayName + "**" );
            console.log('hack') }
            

        if (message.content.startsWith(prefix + "kick")) {
            const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
            const user = message.mentions.users.first() || client.users.get(args[0]);
            if (message.member.hasPermission("ADMINISTRATOR"))
            if(!user) return message.reply("You must mention someone to kick!");
            // Easy way to get member object though mentions.
            var member= message.mentions.members.first();
            // Kick
            member.kick().then((member) => {
                // Successmessage
                message.channel.send(":wave: " + member.displayName + " has been successfully kicked.");
            }).catch(() => {
                 // Failmessage
                message.channel.send("Access Denied");
            });
        }
        
  
        if (message.content.startsWith(prefix+"ban")) {
            const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
            const user = message.mentions.users.first() || client.users.get(args[0]);
            if (message.member.hasPermission("ADMINISTRATOR"))
            if(!user) return message.reply("You must mention someone to ban!");
            // Easy way to get member object though mentions.
            var member= message.mentions.members.first();
            // ban
            member.ban().then((member) => {
                // Successmessage
                message.channel.send(":wave: " + member.displayName + " has been successfully banned.");
            }).catch(() => {
                 // Failmessage
                message.channel.send("Access Denied");
            });
        }


killmsg = ['brutally murdered', 'blown up', 'smitten', 'yeeted on', 'shot', 'impaled', 'ripped to shreds', 'run over']

        if (message.content.startsWith(prefix+"kill")) {
            const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
            const user = message.mentions.users.first() || client.users.get(args[0]);
            killed = killmsg[Math.floor(Math.random() * killmsg.length)]
            if(!user) return message.reply("You must mention someone to kill!");
           message.channel.send('**'+ user+ '** has been ' +killed+ ' by **'+  message.author + '**')
            };
        



            if (message.content.startsWith(prefix+"whois")) {

                const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

                const user = message.mentions.users.first() || client.users.get(args[0]);

                let memberToFind = message.mentions.members.first(); 

                if(!user) return message.reply("You must mention someone!");

                const exampleEmbed = new Discord.RichEmbed()

            
             .setColor(hexcolor)
.setAuthor(memberToFind.user.tag, memberToFind.user.avatarURL)
                .setDescription('Here is some info on '+user+'\n\nTheir ID: **' + user.id + '**\n\nTheir username with discriminator: **'+user.tag +'**\n\n'+'Account Created: **'+ memberToFind.user.createdAt +  '**\n\n'+ 'Joined Server At: **'+ message.guild.members.find('id', memberToFind.id).joinedAt + '**')

            .setFooter('Searched User') 
            .setTimestamp()
             message.channel.send(exampleEmbed)
                };
              
            if (message.content.startsWith(prefix+'warn ')) {
              const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

              var missingPermissionsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
              .setColor(hexcolor)
              .setAuthor(message.author.username, message.author.avatarURL)
              .setTitle('Insufficient Permissions!')
              .setDescription('You need the `MANAGE_MESSAGES` permission to use this command!')
              .setTimestamp();
          var missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
              .setColor('RANDOM')
              .setAuthor(message.author.username, message.author.avatarURL)
              .setTitle('Missing Arguments!')
              .setDescription('Usage: warn [@User] [Reason]')
              .setTimestamp();
          if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(missingPermissionsEmbed); // Checks if the user has the permission
          let mentioned = message.mentions.users.first(); // Gets the user mentioned!
          if(!mentioned) return message.channel.send(missingArgsEmbed); // Triggers if the user donsn't tag a user in the message
          let reason = args.slice(1).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word
          if(!reason) return message.channe.send(missingArgsEmbed); // Triggers if the user dosn't provide a reason for the warning
       
          var warningEmbed = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
              .setColor(hexcolor)
              .setAuthor(message.author.username, message.author.avatarURL)
              .setTitle(`You've been warned in ${message.guild.name}`)
              .addField('Warned by', message.author.tag)
              .addField('Reason', reason)
              .setTimestamp();
          mentioned.send(warningEmbed); // DMs the user the above embed!
          var warnSuccessfulEmbed = new Discord.RichEmbed() // Creates the embed thats returned to the person warning if its sent.
              .setColor(hexcolor)
              .setTitle('User Successfully Warned!');
          message.channel.send(warnSuccessfulEmbed); // Sends the warn successful embed
          message.delete(); // Deletes the command
      } ;
            

    
           if(message.content === prefix+'meme'){
                randomPuppy('dankmemes')
                .then(url => {
                    const exampleEmbed = new Discord.RichEmbed()
                    .setColor(hexcolor)
                       .setImage(url)
                       .setTitle(url)
                    message.channel.send(exampleEmbed)
                })
            }


          
        if (message.content === ((prefix + 'help'))){	
        
            const exampleEmbed = new Discord.RichEmbed()
            .setColor(hexcolor)
               
               .setTitle("")
               .setDescription(`
              ** Fun Commands**

               ${prefix}meme: sends a random meme from r/dankmemes.
               ${prefix}flip: Heads or tails?
               ${prefix}roll: Rolls a die, gives a number between 1 and 6.
               ${prefix}points: Shows how many points you have.
               ${prefix}leaderboard: Shows the top 10 point leaders in the server.
              
               **Music Commands**
               ${prefix}play [song]: Plays a song that you tell it too.
               ${prefix}pause: Pauses the music if there is a song playing.
               ${prefix}queue: Shows the songs that have been added to the queue.
               ${prefix}np: Shows the song that is playing.
               ${prefix}vol [1-100]: changes the volume to what you would like.

               ** Moderation Commands**

               ${prefix}ban [@user]: Bans the mentioned user.
               ${prefix}kick [@user]: kicks the mentioned user.
               ${prefix}whois [@user]: gets info on the mentioned user.
               ${prefix}clear [max 100]: clears the number of messages you tell it too.
               `)
            message.channel.send(exampleEmbed)
            
        
        }

    

if (message.content === prefix + 'help memes'){	
          if (message.member.hasPermission("MANAGE_MESSAGES"))


          
          var embed1 = new Discord.RichEmbed()
          .setColor(hexcolor)
         
             .setTitle('Memes')
             .addField('Usage\n\n ',`**${prefix}meme**: Returns a random meme from r/dankmemes`)
          message.channel.send(embed1)
          
      
      }
      if (message.content === prefix + 'help meme'){	
        if (message.member.hasPermission("MANAGE_MESSAGES"))


        
        var embed1 = new Discord.RichEmbed()
        .setColor(hexcolor)
       
           .setTitle('Memes')
           .addField('Usage\n\n ',`**${prefix}meme**: Returns a random meme from r/dankmemes`)
        message.channel.send(embed1)
        
    
    }


               
        if (message.content === ((prefix + 'vote'))){	
        
            const exampleEmbed = new Discord.RichEmbed()
            .setColor(hexcolor)
               
               .setTitle("Vote for Hydrogen here!")
               .setDescription(`https://top.gg/bot/664868103326269461`)
            message.channel.send(exampleEmbed)
            
        
        }
     


        if (message.author.bot) return;
        
        // If this is not in a DM, execute the points code.
        if (message.guild) {
          // We'll use the key often enough that simplifying it is worth the trouble.
          const key = `${message.guild.id}-${message.author.id}`;
          // Triggers on new users we haven't seen before.
          client.points.ensure(`${message.guild.id}-${message.author.id}`, {
            user: message.author.id,
            guild: message.guild.id,
            points: 0,
            level: 1,
            
          });
          
          client.points.inc(key, "points",  Math.floor(Math.random() * 50) + 1);
          
          // Calculate the user's current level
          const curLevel = Math.floor(0.1 * Math.sqrt(client.points.get(key, "points")));
          
          // Act upon level up by sending a message and updating the user's level in enmap.
          if (client.points.get(key, "level") < curLevel) {
    
            message.reply(`You've leveled up to level **${curLevel}**!`);
            client.points.set(key, curLevel, "level");
          }
        }
        // Rest of message handler
      

          

        if (message.author.bot) return;
        if (message.guild) { /* Points Code Here */ }
        if (message.content.indexOf(config.prefix) !== 0) return;
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        // Command-specific code here!
        if (command === "points") {
            const key = `${message.guild.id}-${message.author.id}`;
            return message.channel.send(`You currently have ${client.points.get(key, "points")} points, and are at level ${client.points.get(key, "level")}!`);
          }
          if(command === "leaderboard") {
            // Get a filtered list (for this guild only), and convert to an array while we're at it.
            const filtered = client.points.filter( p => p.guild === message.guild.id ).array()
            // Sort it to get the top results... well... at the top. Y'know.
            const sorted = filtered.sort((a, b) => b.points - a.points);
            // Slice it, dice it, get the top 10 of it!
            const top10 = sorted.splice(0, 10);
            // Now shake it and show it! (as a nice embed, too!)
            const embed = new Discord.RichEmbed()
              .setTitle("Leaderboard")
              .setAuthor(client.user.username, client.user.avatarURL)
              .setDescription("Our top 10 points leaders!")
              .setColor(hexcolor);
            for(const data of top10) {
              embed.addField(client.users.get(data.user).tag, `${data.points} points (level ${data.level})`);
            }
            return message.channel.send({embed});
          }  
          if(command === "give") {
            if(message.author.id !== message.guild.ownerID) 
              return message.reply("You're not the boss of me, you can't do that!");
            const user = message.mentions.users.first() || client.users.get(args[0]);
            if(!user) return message.reply("You must mention someone or give their ID!");
            const pointsToAdd = parseInt(args[1], 10);
            if(!pointsToAdd) 
              return message.reply("You didn't tell me how many points to give...")
            client.points.ensure(`${message.guild.id}-${user.id}`, {
              user: message.author.id,
              guild: message.guild.id,
              points: 0,
              level: 1
            });
            // Get their current points.
            let userPoints = client.points.get(`${message.guild.id}-${user.id}`, "points");
            userPoints += pointsToAdd;
            
            // And we save it!
            client.points.set(`${message.guild.id}-${user.id}`, userPoints, "points")
            message.channel.send(`${user.tag} has received ${pointsToAdd} points and now stands at ${userPoints} points.`);
          }
          if(command === "cleanup") {
            
            const filtered = client.points.filter( p => p.guild === message.guild.id );
           
            const rightNow = new Date();
            const toRemove = filtered.filter(data => {
              return !message.guild.members.has(data.user) || rightNow -  1> data.lastSeen;
            });
            toRemove.forEach(data => {
              client.points.delete(`${message.guild.id}-${data.user}`);
            })
            message.channel.send(`I've cleaned up ${toRemove.size} old farts.`);
          }
     

        })


        
 
        client.login('NjY0ODY4MTAzMzI2MjY5NDYx.XhdVig.JpaCCxiO4hZXlEInA9hMbLw6GiE');