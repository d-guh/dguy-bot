const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pings the bot.'),
    async execute(interaction) {
        try {
            const latency = interaction.createdTimestamp - Date.now();
            await interaction.reply(`Pong! :ping_pong: \`${latency}ms\``);
        } catch (error) {
            console.error('Error while executing /ping:', error);
        }
    },
};
