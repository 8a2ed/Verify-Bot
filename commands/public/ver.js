const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { promptMessage } = require('../../functions');

module.exports = {
    name: 'ver',
    aliases: [''],
    description: '',
    usage: '',
    timeout: 00,
    nsfw: false,
    admin: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        const user = message.member;

        const role = message.guild.roles.cache.get('ROLE_ID') || message.guild.roles.cache.find(role => role.name === 'k' || role.id === 'ROLE_ID'); // Role id

        if (!role) return;

        if (user.roles.cache.has(role.id)) return message.channel.send(`You are already verified.`);

        const wait = new MessageEmbed()
            .setTitle(`Accept the rules to get the role.`)
            .setDescription(`RULES`) // RULES
            .setColor(`RED`)

        message.channel.send(wait).then(async msg => {

            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if (emoji === "✅") {
                user.roles.add(role).catch(err => console.log(err));

                user.setNickname('NICKNAME').catch(err => console.log(err)); // Nickname

                const embed = new MessageEmbed()
                    .setTitle(`Success: `)
                    .setDescription(`You have been verified.`)
                    .setColor(`GREEN`);

                message.channel.send(embed);
            } else if (emoji === "❌") {
                msg.delete();
                message.reply(`Cancelled.`)
            }
        });
    }
}