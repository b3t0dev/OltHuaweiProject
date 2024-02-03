import globalFunctions from "../../../js/globalFunctions";


async function checkPons(oltid, slot) { 
    const syncBt = document.getElementById(`sync-${oltid}-${slot}`);
    syncBt.classList.add("rotating","disabledIcon");
    
    const olt = await (await fetch(`/api/olts/${oltid}`)).json(); //Recebe a OLT contendo IP para exec Commands
    console.log(olt);
}

async function checkOlt(oltid, oltip){

    const syncBt = document.getElementById(`sync-${oltid}-${oltip}`);
    syncBt.classList.add("rotating","disabledIcon");

    const olt = await ( await fetch(`/api/olts/${oltid}`) ).json();
    
    let dateNow = globalFunctions.getDate()
    dateNow = { lastUpdate:dateNow }
    globalFunctions.updateOltondB(dateNow, oltid);
}

export default { checkPons, checkOlt };