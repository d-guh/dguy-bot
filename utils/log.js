const fs = require('node:fs');
const { DEBUG, LOGGING } = require('../config.json');

function logInteraction(interaction) {
    if (!DEBUG && !LOGGING) return;

    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
    const commandName = interaction.commandName || 'Unknown';
    const user = interaction.user;
    const guildName = interaction.guild?.name ?? 'DM';
    const guildId = interaction.guild?.id ?? 'N/A';
    const channelName = interaction.channel?.name ?? 'DM';
    const channelId = interaction.channel?.id ?? 'N/A';

    const options =
    interaction.options.data.length > 0
        ? interaction.options.data.map(opt => `${opt.name}=${opt.value}`).join(', ')
        : 'No Options';

    const logMessage = `[${timestamp}] [INTERACTION] Command: ${commandName} | User: ${user.tag} (${user.id}) | Guild: ${guildName} (${guildId}) | Channel: ${channelName} (${channelId}) | Options: ${options}`;

    if (DEBUG) console.log(logMessage);
    if (LOGGING) fs.appendFileSync('dguy-bot.log', logMessage + '\n');
}

function logError(interaction, error) {
    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
    const commandName = interaction.commandName || 'Unknown';
    const user = interaction.user;

    const logMessage = `[${timestamp}] [ERROR] Command: ${commandName} | User: ${user.tag} (${user.id}) | Message: ${error.message || error}`;

    if (DEBUG) console.error(logMessage);
    if (LOGGING) fs.appendFileSync('dguy-bot.log', logMessage + '\n');
}

module.exports = { logInteraction, logError };
