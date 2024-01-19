async function checkPons(oltid, slot) {
    const olt = await (await fetch(`/api/olts/${oltid}`)).json(); //Recebe a OLT contendo IP para exec Commands

    const syncBt = document.getElementById(`sync-${oltid}-${slot}`);
    syncBt.classList.add("rotating","disabled");

    console.log(syncBt);
}

export default { checkPons };