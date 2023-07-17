const { spawn } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

audio_a_texto = async (nombreAudioOgg) => {
  return new Promise((resolve, reject) => {
    const inputFilePath = path.resolve(__dirname, "audios", "ogg", `${nombreAudioOgg}.ogg`);
    const outputFilePath = path.resolve(__dirname, "audios", "mp3", `${nombreAudioOgg}.mp3`);

    convertToMp3(inputFilePath, outputFilePath)
      .then(() => audioText(nombreAudioOgg))
      .then((result) => {
        console.log(result);
        resolve(result);
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
    const pythonProcess = spawn("python", ["./tras.py"]);
    let pythonResponse = "";

    pythonProcess.stdout.on("data", function (data) {
      pythonResponse += data.toString();
    });

    pythonProcess.stdout.on("end", function () {
      pythonResponse = pythonResponse.trim(); // Eliminar espacios al principio y al final
      resolve(pythonResponse);
    });

    pythonProcess.stdin.write(`${nombreAudioOgg}.mp3`);
    pythonProcess.stdin.end();
  });
}
module.exports = { audio_a_texto };

//audio_a_texto("audioPrueba").catch((error) => console.error(error));

//export default audio_a_texto;