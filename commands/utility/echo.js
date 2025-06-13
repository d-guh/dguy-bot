const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Echo\'s your message back to you!')
    .addStringOption(option =>
        option.setName('input')
            .setDescription('The message to echo back')
            .setRequired(true));

module.exports = {
    data,
    async execute(interaction) {
        const input = interaction.options.getString('input');
        await interaction.reply(input);
    },
};
