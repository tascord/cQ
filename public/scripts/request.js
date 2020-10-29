function request(url, options, callback = null) {

    let xhr = new XMLHttpRequest();
    let fd = new FormData();

    let data = options.data || [];
    let method = options.method || 'POST';

    for(let field in data) fd.append(field.title, field.data);
    
    xhr.open(method, url, true);
    xhr.send(fd);

    if(callback) xhr.onload = (data) => callback({ status: data.target.status, data: data.target.response });

}