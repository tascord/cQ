function request(url, data, callback = null) {

    let xhr = new XMLHttpRequest();
    
    xhr.open('POST', url, true);
    xhr.send(data);

    if(callback) xhr.onload = (data) => callback({ status: data.target.status, data: data.target.response });

}