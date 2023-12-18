function checkStatus(status){
    if ((status === 1) || (status === true)){
        return 1;
    } else {
        return 0;
    }

}

export default { checkStatus };