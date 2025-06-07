const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pings the bot.'),
    async execute(interaction) {
        try {
            await interaction.reply({ content: 'Pinging...' });
            const sent = await interaction.fetchReply();

            const roundTrip = sent.createdTimestamp - interaction.createdTimestamp;
            const wsPing = interaction.client.ws.ping; // Returns -1 if websocket not established

            await interaction.editReply(`Pong! :ping_pong:\nWebSocket Ping: \`${wsPing}ms\`\nRound-trip Latency: \`${roundTrip}ms\``);
        } catch (error) {
            console.error('Error while executing /ping:', error);
        }
    },
};
