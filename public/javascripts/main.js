 function ready() {
    const video = document.getElementById('video');
     video.play();
     video.autoplay = true;
     video.load();

    // video.addEventListener('click', function () {
    //     this.play();
    // });
    //
    // video.click();
}

const getId = () => {
    let id = localStorage.getItem('userId')
    if(id){
        return id;
    }
    id = Date.now()
    localStorage.setItem('userId', `${id}`);
    return id
}



window.onload = function () {
    ready();
    const id = getId()
    const startTime = new Date()

    const icons = document.querySelectorAll('.product-block__icon');
    const honorButton = document.getElementById("btn-Honor");
    const xiaomiButton = document.getElementById("btn-Xiaomi")
    const checker = {userId: id, iconsClick: {}}

    const clickIcon = (iconId) => {
            if(checker.iconsClick[iconId]){
                checker.iconsClick[iconId] = checker.iconsClick[iconId] + 1
            }else{
                checker.iconsClick[iconId] = 1
            }
    }

    icons.forEach(icon => {
        icon.addEventListener('click', function (e) {
            const iconId = e.currentTarget.id
            clickIcon(iconId)
        })
    })

    honorButton.addEventListener('click', (e) => onClick(e))
    xiaomiButton.addEventListener('click', (e) => onClick(e))



    function onClick(e){
        const buttonId = e.currentTarget.id
        const time = new Date() - startTime;
        checker['clickedButton'] = buttonId
        checker['timeBeforeAction'] = formatTime(time)
        sendResult(checker)
    }


};

const formatTime = (time) => {
    const normalTime = time / 1000
    const minutes = Math.floor(normalTime / 60) % 60;
    const seconds = normalTime % 60;
    if(minutes){
        return {
            minutes,
            seconds,
        }
    }
    return {
        seconds
    }


}

const sendResult = async (body) => {
    const url = '/users'
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(body) // body data type must match "Content-Type" header
    });
    // const response = await fetch(url)
    return await response.json();
}




