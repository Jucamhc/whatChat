
import Bard from "bard-ai";

await Bard.init("YwhzXbUdaNr-Bk2xVenjbe80vO2qJFOqMVw9VgmkRGtjiHFl54ldtMoY4eeWZTdOMTqOvA.");

let myConversation = new Bard.Chat();

async function consultaBard(pregu) {

    let respu =  await myConversation.ask(pregu)
    //console.log(respu);
    return respu;
}

//consultaBard("Ayudame haciendo mi carta de vacaciones")
export default consultaBard;

