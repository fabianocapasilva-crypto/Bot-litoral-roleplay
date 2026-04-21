const { REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

const TOKEN = process.env.TOKEN;

// 🔧 COLOQUE SEUS IDS AQUI
const CLIENT_ID = 'SEU_CLIENT_ID';
const GUILD_ID = 'SEU_SERVIDOR_ID';

const commands = [
  new SlashCommandBuilder()
    .setName('feedback')
    .setDescription('Enviar feedback de staff'),

  new SlashCommandBuilder()
    .setName('multa')
    .setDescription('Aplicar uma multa'),

  new SlashCommandBuilder()
    .setName('registrar')
    .setDescription('Fazer registro RP')
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('🔄 Registrando comandos...');

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );

    console.log('✅ Comandos registrados com sucesso!');
  } catch (error) {
    console.error(error);
  }
})();
