const fs = require('fs');
const path = require('path');
const ffmpeg = require("fluent-ffmpeg");
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();
const consultaBard = (...args) => import('./IA_bard/consultaBard.mjs').then(({ default: consultaBard }) => consultaBard(...args));
const { spawn } = require("child_process");


client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
  console.log("Cliente logueado");

});

client.on('message', async (message) => {

  //console.log(message);

  if (message.body === 'Hola') {
    const respuesta = '¡Hola! Soy un bot de WhatsApp.';
    client.sendMessage(message.from, respuesta);
  }

  if (message.type === 'ptt') {
    // Descargar el archivo de audio
    const audioData = await message.downloadMedia();

    // Crear la carpeta "audios" si no existe
    const audiosFolderPath = path.join(__dirname, 'IA_whisper', 'audios', 'ogg');

    if (!fs.existsSync(audiosFolderPath)) {
      fs.mkdirSync(audiosFolderPath);
    }

    // Generar un nombre único para el archivo de audio
    const timestamp = new Date().getTime();
    const fileName = `audio_${timestamp}`;


    // Guardar el archivo de audio en la carpeta "audios"
    const filePath = path.join(audiosFolderPath, `${fileName}.ogg`);
    fs.writeFileSync(filePath, audioData.data, 'base64');

    console.log(`Archivo de audio guardado en: ${filePath}`);


    try {
      client.sendMessage(message.from, "Inicia Procedo de Audio a Texto IA");
      // Ejecutar la transcripción de audio y esperar la respuesta
      const texto = await audio_a_texto(fileName);
      client.sendMessage(message.from, "Listo, Ahora Consultado Bard IA");
      try {
        // Ejecutar GOOGLE BARD
        let resp = await consultaBard(`${texto}`);
        client.sendMessage(message.from, resp);
      } catch (error) {
        console.error('Error al consultar a Bard:', error);
        client.sendMessage(message.from, 'Se produjo un error al consultar a Bard');
      }

    } catch (error) {
      console.error("Error:", error);
    }

  } else {

    try {
      let resp = await consultaBard(`${message.body}`)
      client.sendMessage(message.from, resp);
    } catch (error) {
      console.error('Error al consultar a Bard:', error);
      client.sendMessage(message.from, 'Se produjo un error al consultar a Bard. Por favor, intenta nuevamente más tarde.');
    }

  }


})

client.initialize();


audio_a_texto = async (nombreAudioOgg) => {
  return new Promise((resolve, reject) => {
    const inputFilePath = path.resolve(__dirname, "IA_whisper", "audios", "ogg", `${nombreAudioOgg}.ogg`);
    const outputFilePath = path.resolve(__dirname, "IA_whisper", "audios", "mp3", `${nombreAudioOgg}.mp3`);

    convertToMp3(inputFilePath, outputFilePath)
      .then(() => audioText(nombreAudioOgg))
      .then((result) => {
        console.log(result);
        resolve(result);

        fs.unlink(inputFilePath, (error) => {
          if (error) {
            console.error('Error al eliminar el archivo de entrada:', error);
          }
        });

        fs.unlink(outputFilePath, (error) => {
          if (error) {
            console.error('Error al eliminar el archivo de salida:', error);
          }
        });

      })
      .catch((error) => reject(error.message));
  });
}

function convertToMp3(inputFilePath, outputFilePath) {
  console.log("convertToMp3");
  return new Promise((resolve, reject) => {
    ffmpeg(inputFilePath)
      .toFormat("mp3")
      .save(outputFilePath)
      .on("end", () => resolve())
      .on("error", (error) => reject(error.message));
  });
}

function audioText(nombreAudioOgg) {
  console.log("audioText");
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", ["./IA_whisper/tras.py"]);
    let pythonResponse = "";

    pythonProcess.stdout.on("data", function (data) {
      pythonResponse += data.toString();
    });

    const endPromise = new Promise((resolveEnd) => {
      pythonProcess.stdout.on("end", function () {
        pythonResponse = pythonResponse.trim(); // Eliminar espacios al principio y al final
        resolveEnd();

      });
    });

    pythonProcess.stdin.write(`${nombreAudioOgg}.mp3`);
    pythonProcess.stdin.end();

    // Esperar a que se complete el evento "end" antes de resolver la promesa principal
    endPromise.then(() => resolve(pythonResponse));
  });
}
