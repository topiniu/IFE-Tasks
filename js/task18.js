/**
 * Created by Administrator on 2017/1/5 0005.
 */
function leftIn(){
    var inputBox = document.getElementById('inputBox');
    if(!val()){
        alert('wrong input');
        inputBox.value = '';
        return;
    }
    var value = inputBox.value;
    var contentBox = document.getElementById('contentBox');
    var div = document.createElement('div');
    div.innerHTML = value;
    div.style.backgroundColor = 'red';
    div.style.float = 'left';
    div.style.color = '#FFF';
    div.style.width = '30px';
    div.style.height = '30px';
    div.style.marginRight = '5px';
    div.style.textAlign = 'center';
    div.setAttribute('onclick','delItem(this)');
    contentBox.insertBefore(div,contentBox.childNodes[0]);
}
function rightIn(){
    var inputBox = document.getElementById('inputBox');
    if(!val()){
        alert('wrong input');
        inputBox.value = '';
        return;
    }
    var value = inputBox.value;
    var contentBox = document.getElementById('contentBox');
    var div = document.createElement('div');
    div.innerHTML = value;
    div.style.backgroundColor = 'red';
    div.style.float = 'left';
    div.style.color = '#FFF';
    div.style.width = '30px';
    div.style.height = '30px';
    div.style.marginRight = '5px';
    div.style.textAlign = 'center';
    div.setAttribute('onclick','delItem(this)');
    contentBox.appendChild(div);
}
function leftOut(){
    var contentBox = document.getElementById('contentBox');
    contentBox.removeChild(contentBox.childNodes[0]);
}
function rightOut(){
    var contentBox = document.getElementById('contentBox');
    contentBox.removeChild(contentBox.childNodes[contentBox.childNodes.length-1]);
}
function delItem(item){
    var contentBox = document.getElementById('contentBox');
    contentBox.removeChild(item);
}

function val(){
    var inputBox = document.getElementById('inputBox');
    var value = inputBox.value;

    var req = /\D/g;
    if(req.test(value))return false;
    else return true;

}

function init() {
    var leftInBtn = document.getElementById('leftIn');
    var rightInBtn = document.getElementById('rightIn');
    var leftOutBtn = document.getElementById('leftOut');
    var rightOutBtn = document.getElementById('rightOut');

    leftInBtn.onclick = leftIn;
    rightInBtn.onclick = rightIn;
    leftOutBtn.onclick = leftOut;
    rightOutBtn.onclick = rightOut;

}

init();