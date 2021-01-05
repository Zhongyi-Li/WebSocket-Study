;((doc,Storage,Loction)=>{
    const oUsername = doc.querySelector('#username')
    const oEnterBtn = doc.querySelector('#btn')
    const init = ()=>{
        bindEvent()
    }
    function bindEvent(){
        oEnterBtn.addEventListener('click',handleEnterBtnClick,false)
    }
    function handleEnterBtnClick(){
        const username = oUsername.value.trim()
        if(username.length<6){
            alert('用户名长度太短')
            return
        }
        Storage.setItem('username',JSON.stringify(username))
        Loction.href = 'index.html'
    }
    init()
})(document,localStorage,location);