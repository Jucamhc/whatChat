
import Bard from "bard-ai";

let myConversation = new Bard("ZwhjZIK8-b8LLZ9S8lZ05q0WYY4CYBqcmGJo7aGoBIHm0iZXW7u7pyvE_oLR-VIdE2nBpw.");

async function consultaBard(pregu) {

    let respu =  await myConversation.ask(pregu)
    //console.log(respu);
    return respu;
}

//consultaBard("ayudame a mejorar este texto, Utilizando Mi espacio Libre para aprebechar y renovarmi certificado #ccna #cisco #netacad")
export default consultaBard;

