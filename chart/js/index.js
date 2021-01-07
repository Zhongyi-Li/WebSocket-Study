; ((doc) => {
    const oList = doc.querySelector('#list')
    const oMessage = doc.querySelector('#message')
    const oSend = doc.querySelector('#send')
    const ws = new WebSocket('ws:localhost:8000')
    let username = ''
    const init = () => {
        bindEvent()
    }
    function bindEvent() {
        oSend.addEventListener('click', handleSendClick, false)
        ws.addEventListener('open', wsOpen, false)
        ws.addEventListener('close', wsClose, false)
        ws.addEventListener('error', wsError, false)
        ws.addEventListener('message', wsMessage, false)
    }
    function wsOpen() {
        username = localStorage.getItem('username')
        if (!username) {
            location.href = 'entry.html'
            return
        }
        console.log('wsOpen', username);
    }
    function wsClose() {
        console.log('wsClose');

    }
    function wsError() {
        console.log('wsError');
    }
    function wsMessage(e) {
        const msgData = JSON.parse( e.data)
        oList.appendChild(creatMsg(msgData))
        console.log('wsMessage', msgData);
    }
    function creatMsg(data){
        const {user,dateTime,message} = data
        const oItem = doc.createElement('li')
        oItem.innerHTML= `<p>
          <span>${user}</span>
          <i>${new Date(dateTime)}</i>
        </p>
        <p>${message}</p>
        `
        return oItem
    }
    function handleSendClick() {
        const msg = oMessage.value
        if (!msg.trim().length) {
            return
        }

        ws.send(JSON.stringify({
            user: username,
            dateTime: new Date().getTime(),
            message: msg
        }))
        oMessage.value =''
        console.log('发送了消息',msg);
    }
    init();
})(document, localStorage, location)