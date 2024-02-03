const urlDB = '/api'

function getDate(){
    const date = new Date();
    const loginDate = date.toLocaleDateString() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return loginDate 
}

async function updateOltondB(olt_data, olt_id) {
    
    const configRequest = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(olt_data),
    };

    const oltUpdated = await (await fetch(`${urlDB}/olts/${olt_id}`, configRequest)).json();
    window.location.reload();

}

export default { getDate, updateOltondB };