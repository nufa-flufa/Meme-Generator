'use strict'


var gElCanvas;
var gCtx;

function onInit() {
    gElCanvas = document.getElementById('meme-canvas');
    gCtx = gElCanvas.getContext('2d');
    console.log(gCtx);
    addMouseListener();
    onDrawImg();
}

function onDrawImg() {
    drawImg();
}


function onDrawText(ev) {
    ev.preventDefault();
    var currText = document.querySelector('input[name=txt1]').value;
    gMeme.lines[0].txt = currText;
    drawText();
    currText = '';
}

function addMouseListener(){
    gElCanvas.addEventListener('mousedown', getPos)
}

function getPos(ev){
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    console.log(pos)
    onDrawText()
}