const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'verify',
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
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You can't use this command.`);

        if (!args[0]) return message.channel.send(`Mention user.`);

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!user) return message.channel.send(`I can't find this user.`);

        const role = message.guild.roles.cache.get('ROLE_ID') || message.guild.roles.cache.find(role => role.name === 'k' || role.id === 'ROLE_ID'); // Role id

        if (!role) return;

        if (user.roles.cache.has(role.id)) return message.channel.send(`This user is already verified.`);

        user.roles.add(role).catch(err => console.log(err));

        user.setNickname('NICKNAME').catch(err => console.log(err)); // Nickname

        const embed = new MessageEmbed()
            .setTitle(`Success: `)
            .setDescription(`${user.user.username}, has been verified.`)
            .setColor(`GREEN`);

        message.channel.send(embed);
    }
}