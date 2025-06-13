const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName('info')
    .setDescription('Get info about a user or server.')
    .addSubcommand(subcommand =>
        subcommand
            .setName('user')
            .setDescription('Info about a user')
            .addUserOption(option => option.setName('target').setDescription('The user'))) // TODO: Fix logging for this one, shows as undefined in options
    .addSubcommand(subcommand =>
        subcommand
            .setName('server')
            .setDescription('Info about the server'));

module.exports = {
    data,
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand == 'user') {
            const user = interaction.options.getUser('target') || interaction.user;
            const member = interaction.guild.members.cache.get(user.id);
            const joinedAt = member?.joinedAt ? member.joinedAt.toDateString() : 'Unknown';

            await interaction.reply(`\`${user.username}\` joined on \`${joinedAt}\``);
        } else if (subcommand == 'server') {
            await interaction.reply(`This server is **${interaction.guild.name}** and has **${interaction.guild.memberCount}** members.`);
        }
    },
};
