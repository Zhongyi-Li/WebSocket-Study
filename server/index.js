const ws = require('ws')
;((WS)=>{
    //ws:localhost:8000
    const server = new WS.Server({port:8000})
    const init = ()=>{
        bindEvent()
    }
    function bindEvent(){
        server.on('open',handleOpen)
        server.on('close',handleClose)
        server.on('error',handleError)
        server.on('connection',handleConnection)
    }
    function handleOpen(){
        console.log('backEnd Open');
    }
    function handleClose(){
        console.log('backEnd Close');
    }
    function handleError(){
        console.log('backEnd Error'); 
    }
    function handleConnection(ws){
        console.log('backEnd Connection');
        ws.on('message',handleMessage)
    }
    function handleMessage(msg){
        console.log('Resolve msg',msg);
    }
    init()
})(ws)