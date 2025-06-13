const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');

// Load config
const { clientId, guildId, token } = require('./config.json');

// Load commands
const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// Parse cmdline args
const args = process.argv.slice(2);
const flags = new Set(args);

// Modes
const isTest = flags.has('--test') || flags.has('-t');
const isGlobal = flags.has('--global') || flags.has('-g');
const isClear = flags.has('--clear') || flags.has('-c');

const fileName = path.basename(process.argv[1]);
const USAGE = `USAGE: node ${fileName} <mode>

Available Modes:
-t, --test    Deploys commands to the specified test server ONLY.
-g, --global  Deploys commands globally. (Clears test server commands before to avoid duplicate definitions.)
-c, --clear   Clears ALL commands globally (USE WITH CAUTION).
`;

if (!isTest && !isGlobal && !isClear) {
    console.error(USAGE);
    process.exit(1);
}

const rest = new REST().setToken(token);

(async () => {
    try {
        let data;

        if (isTest) {
            console.log(`Deploying ${commands.length} commands to test server...`);
            data = await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );
            console.log(`Successfully deployed ${data.length} commands to test server!`);
        } else if (isGlobal) {
            console.log('Cleaning test server commands before deploying globally...'); // Avoid duplicates
            data = await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: [] },
            );
            console.log('Test server commands cleared!');

            console.log(`Deploying ${commands.length} commands globally...`);
            data = await rest.put(
                Routes.applicationCommands(clientId),
                { body: commands },
            );
            console.log(`Successfully deployed ${data.length} commands globally!`);
        } else if (isClear) {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            rl.question(
                '!!! This will clear ALL commands globally, and may take a while to update. Are you sure? (y/N): ',
                async (answer) => {
                    rl.close();
                    if (answer.trim().toLowerCase() === 'y') {
                        console.log('Clearing commands globally...');
                        data = await rest.put(
                            Routes.applicationCommands(clientId),
                            { body: [] },
                        );
                        console.log(`Cleared ${data.length} commands successfully!`);
                    } else {
                        console.log('Cancelled.');
                        process.exit(0);
                    }
                },
            );
        }
    } catch (error) {
        console.error('Error deploying commands:', error);
    }
})();
