const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('flip')
        .setDescription('Flips a coin!'),
    async execute(interaction) {
        try {
            const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
            await interaction.reply(`The coin landed on: **${result}**!`);
        } catch (error) {
            console.error('Error while executing /flip:', error);
        }
    },
};
