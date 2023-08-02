
import Bard from "bard-ai";

await Bard.init("ZAhjZAxC5W2MRoQux5GfZs1PEu3sNL8ldO29SFQTOTOhhIJl5znJ40-8eiXCOgbb9_mZDg.");

let myConversation = new Bard.Chat();

async function consultaBard(pregu) {

    let respu =  await myConversation.ask(pregu)
    //console.log(respu);
    return respu;
}

//consultaBard("ayudame a mejorar este texto, Utilizando Mi espacio Libre para aprebechar y renovarmi certificado #ccna #cisco #netacad")
export default consultaBard;

