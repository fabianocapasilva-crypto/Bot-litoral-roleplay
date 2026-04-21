const { 
  Client, GatewayIntentBits, 
  ModalBuilder, TextInputBuilder, TextInputStyle, 
  ActionRowBuilder, SlashCommandBuilder, 
  EmbedBuilder 
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', () => {
  console.log(`Bot online como ${client.user.tag}`);
});

// ================= COMANDOS =================
client.on('interactionCreate', async (interaction) => {

  // ===== FEEDBACK =====
  if (interaction.isChatInputCommand() && interaction.commandName === 'feedback') {
    const modal = new ModalBuilder()
      .setCustomId('feedbackModal')
      .setTitle('Feedback de Staff');

    const staff = new TextInputBuilder()
      .setCustomId('staff')
      .setLabel('Nick do Staff')
      .setStyle(TextInputStyle.Short);

    const nota = new TextInputBuilder()
      .setCustomId('nota')
      .setLabel('Nota (0 a 10)')
      .setStyle(TextInputStyle.Short);

    const motivo = new TextInputBuilder()
      .setCustomId('motivo')
      .setLabel('Motivo da nota')
      .setStyle(TextInputStyle.Paragraph);

    modal.addComponents(
      new ActionRowBuilder().addComponents(staff),
      new ActionRowBuilder().addComponents(nota),
      new ActionRowBuilder().addComponents(motivo)
    );

    await interaction.showModal(modal);
  }

  // ===== MULTA =====
  if (interaction.isChatInputCommand() && interaction.commandName === 'multa') {
    const modal = new ModalBuilder()
      .setCustomId('multaModal')
      .setTitle('Sistema de Multa');

    const jogador = new TextInputBuilder()
      .setCustomId('jogador')
      .setLabel('Nick do Jogador')
      .setStyle(TextInputStyle.Short);

    const valor = new TextInputBuilder()
      .setCustomId('valor')
      .setLabel('Valor da Multa')
      .setStyle(TextInputStyle.Short);

    const motivo = new TextInputBuilder()
      .setCustomId('motivo')
      .setLabel('Motivo')
      .setStyle(TextInputStyle.Paragraph);

    const prova = new TextInputBuilder()
      .setCustomId('prova')
      .setLabel('Link do print ou clipe')
      .setStyle(TextInputStyle.Short);

    modal.addComponents(
      new ActionRowBuilder().addComponents(jogador),
      new ActionRowBuilder().addComponents(valor),
      new ActionRowBuilder().addComponents(motivo),
      new ActionRowBuilder().addComponents(prova)
    );

    await interaction.showModal(modal);
  }

  // ===== REGISTRO =====
  if (interaction.isChatInputCommand() && interaction.commandName === 'registrar') {
    const modal = new ModalBuilder()
      .setCustomId('registroModal')
      .setTitle('Registro RP');

    const nome = new TextInputBuilder()
      .setCustomId('nome')
      .setLabel('Nome')
      .setStyle(TextInputStyle.Short);

    const id = new TextInputBuilder()
      .setCustomId('id')
      .setLabel('ID')
      .setStyle(TextInputStyle.Short);

    const genero = new TextInputBuilder()
      .setCustomId('genero')
      .setLabel('Gênero')
      .setStyle(TextInputStyle.Short);

    const idade = new TextInputBuilder()
      .setCustomId('idade')
      .setLabel('Idade no RP')
      .setStyle(TextInputStyle.Short);

    const historia = new TextInputBuilder()
      .setCustomId('historia')
      .setLabel('História')
      .setStyle(TextInputStyle.Paragraph);

    modal.addComponents(
      new ActionRowBuilder().addComponents(nome),
      new ActionRowBuilder().addComponents(id),
      new ActionRowBuilder().addComponents(genero),
      new ActionRowBuilder().addComponents(idade),
      new ActionRowBuilder().addComponents(historia)
    );

    await interaction.showModal(modal);
  }

  // ===== RESPOSTAS DOS MODAIS =====
  if (interaction.isModalSubmit()) {

    // Feedback
    if (interaction.customId === 'feedbackModal') {
      const embed = new EmbedBuilder()
        .setTitle('📊 Novo Feedback')
        .addFields(
          { name: '👮 Staff', value: interaction.fields.getTextInputValue('staff') },
          { name: '⭐ Nota', value: interaction.fields.getTextInputValue('nota') },
          { name: '📝 Motivo', value: interaction.fields.getTextInputValue('motivo') }
        )
        .setColor('Blue');

      await interaction.reply({ embeds: [embed] });
    }

    // Multa
    if (interaction.customId === 'multaModal') {
      const embed = new EmbedBuilder()
        .setTitle('💸 Multa Aplicada')
        .addFields(
          { name: '👤 Jogador', value: interaction.fields.getTextInputValue('jogador') },
          { name: '💰 Valor', value: interaction.fields.getTextInputValue('valor') },
          { name: '📄 Motivo', value: interaction.fields.getTextInputValue('motivo') },
          { name: '📎 Prova', value: interaction.fields.getTextInputValue('prova') }
        )
        .setColor('Red');

      await interaction.reply({ embeds: [embed] });
    }

    // Registro
    if (interaction.customId === 'registroModal') {
      const embed = new EmbedBuilder()
        .setTitle('📋 Novo Registro')
        .addFields(
          { name: '👤 Nome', value: interaction.fields.getTextInputValue('nome') },
          { name: '🆔 ID', value: interaction.fields.getTextInputValue('id') },
          { name: '⚧ Gênero', value: interaction.fields.getTextInputValue('genero') },
          { name: '🎂 Idade', value: interaction.fields.getTextInputValue('idade') },
          { name: '📖 História', value: interaction.fields.getTextInputValue('historia') }
        )
        .setColor('Green');

      await interaction.reply({ embeds: [embed] });
    }
  }
});

// LOGIN
client.login('SEU_TOKEN_AQUI');{
  "name": "bot-discord",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "discord.js": "^14.14.1",
    "dotenv": "^16.4.5"
  }
}
