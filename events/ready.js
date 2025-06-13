const { Events, ActivityType } = require('discord.js');
const { DEBUG, LOGGING } = require('../config.json');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag} (${client.user.id})`);
        console.log('Bot is ready!');
        console.log('-------------');
        console.log(`DEBUG is ${DEBUG ? 'ENABLED' : 'DISABLED'}`);
        console.log(`LOGGING is ${LOGGING ? 'ENABLED' : 'DISABLED'}`);
        console.log('=============');

        client.user.setPresence({
            status: 'online',
            activities: [{
                name: 'Guh??',
                type: ActivityType.Playing,
            }],
        });
    },
};
