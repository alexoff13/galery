function get_random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function get_connect() {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", `/images`)
    xhr.responseType = "json"
    console.log('asdasd')
    return xhr
}

function get_images() {
    let promise =   new Promise((resolve, reject) => {
        let xhr = get_connect()
        xhr.onloadend = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject(Error(`Error: ${xhr.statusText}`));
            }
        }
        xhr.send();
    })
        .then(data => {
            let items = document.getElementsByClassName("item")
            for (let i = 0; i < items.length; i++) {
                items[i].style.backgroundImage = `url(data:image/jpeg;base64,${data[i]})`
            }
        })
        .catch(xhr => {
            console.log("Errors: " + xhr.statusText);
        })
}

get_images()
document.getElementById("btn").addEventListener("click",()=>{
    get_images()
})