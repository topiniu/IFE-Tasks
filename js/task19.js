/**
 * Created by Administrator on 2017/1/6 0006.
 */

function test() {
    for(var i=0;i<60;i++){
        var m = Math.random() * 90 + 10;
        createDiv(0,m);
    }
}
var flag = 0;
function createDiv(i,m){
    var inputBox = document.getElementById('inputBox');
    var contentBox = document.getElementById('contentBox');
    // if(!val()){
    //     alert('wrong input');
    //     inputBox.value = '';
    //     return;
    // }else if(contentBox.childNodes.length>60){
    //     alert('stack full');
    //     return;
    // }

    flag+=1;
    // var value = inputBox.value;
    var value = m;
    var mt = 200 - value;
    var div = document.createElement('div');
    // div.innerHTML = value;
    div.style.backgroundColor = 'red';
    // div.style.position = 'absolute';
    div.style.bottom = '0px';
    div.style.float = 'left';
    div.style.marginTop = mt + 'px';
    div.style.color = '#FFF';
    div.style.width = '20px';
    div.style.height = value + 'px';
    div.style.marginRight = '2px';
    div.style.transition = 'height 2s,margin-top 2s';
    // div.style.textAlign = 'center';
    div.setAttribute('onclick','delItem(this)');
    if(i===0)
        contentBox.insertBefore(div,contentBox.childNodes[0]);
    else
        contentBox.appendChild(div);
}

function sort(){
    var contentBox = document.getElementById('contentBox');
    var nodes = contentBox.children;
    for(var i=0;i<nodes.length;i++){
        var mnode = nodes[i];
        mnode.style.backgroundColor = 'green';
        for(var j=i;j<nodes.length;j++){
            var snode = nodes[j];
            snode.style.backgroundColor = 'blue';
            if(mnode.style.height > snode.style.height){
                changePosition(mnode,snode);
            }
                snode.style.backgroundColor = 'red';

        }
            mnode.style.backgroundColor = 'red';
    }
}
function changePosition(i,j){
    // j.style.backgroundColor = 'green';
    var height = i.style.height;
    var mt = i.style.marginTop;

    i.style.height = j.style.height;
    i.style.marginTop = j.style.marginTop;
    // setTimeout(function(){},1000);

    j.style.height = height;
    j.style.marginTop = mt;
}
function leftIn(){
    createDiv(0);
}
function rightIn(){
    createDiv(1);
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
    if(req.test(value) || value<10 || value>100)
        return false;

    return true;

}

function init() {
    var leftInBtn = document.getElementById('leftIn');
    var rightInBtn = document.getElementById('rightIn');
    var leftOutBtn = document.getElementById('leftOut');
    var rightOutBtn = document.getElementById('rightOut');
    var sortBtn = document.getElementById('sort');

    leftInBtn.onclick = leftIn;
    rightInBtn.onclick = rightIn;
    leftOutBtn.onclick = leftOut;
    rightOutBtn.onclick = rightOut;
    sortBtn.onclick = sort;
}

init();
test();