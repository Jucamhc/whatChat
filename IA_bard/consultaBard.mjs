import Bard from "./cordBard-IA.mjs";

let myConversation = new Bard.Chat(process.env.OPENAI_API_KEY);
await Bard.init();

async function consultaBard(pregu) {

    let respu =  await myConversation.ask(pregu)
    //console.log(respu);
    return respu;
}

//consultaBard("Ayudame haciendo mi carta de vacaciones")

export default consultaBard;
