const { SlashCommandBuilder, MessageFlags } = require('discord.js');

const help = `\`\`\`
D-Guy Bot v1.0.0:
By: d.guy
====================
# COMMANDS:
## Utility:
/help - Displays this menu.
/ping - Tests the bot's response time.
/info <subcommand> - Displays info
/user - Displays information about the user.
/server - Displays information about the server.
/echo - Repeats a message
## Fun:
/flip - Flips a coin!
\`\`\``;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays help info.'),
    async execute(interaction) {
        await interaction.reply({ content: help, flags: MessageFlags.Ephemeral });
    },
};
