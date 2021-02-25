////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const { canModifyQueue } = require("../util/MilratoUtil");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed");
const { PREFIX } = require(`../config.json`);
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  name: "skip",
  aliases: ["s"],
  description: "(s)Skip the currently playing song",
  cooldown: 5,
  edesc: `Type the Command, to skip to current listening song.\nUsage: ${PREFIX}skip`,

execute(message) {
    //if not in a guild retunr
    if (!message.guild) return;
    //react with approve emoji
    message.react("<:emoji_48:814468558871461938>").catch(console.error);
    //get the queue
    const queue = message.client.queue.get(message.guild.id);
    //if no Queue return error
    if (!queue)
      return attentionembed(message, "There is nothing you can skip!").catch(console.error);
    //if not in the same channel return
    if (!canModifyQueue(message.member)) return;
    //set playing to true
    queue.playing = true;
    //end current song
    queue.connection.dispatcher.end();
    //send approve message
    queue.textChannel.send(
      new MessageEmbed().setColor("83c0ff").setAuthor(`${message.author.username} skipped the song.`, "")
    ).catch(console.error);
  }
};
