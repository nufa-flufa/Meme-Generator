'use strict'

var gElCanvas;
var gCtx;


function onInit() {
    gElCanvas = document.getElementById('meme-canvas');
    gCtx = gElCanvas.getContext('2d');
    addMouseListener();
    renderImgGallery()
}

function onChangeCanvas(ev){
    ev.preventDefault();
    renderCanvas();
}

function renderCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    if(!gMeme.selectedImgId) return;
    drawImg();
    var currText = document.querySelector('input[name=txt1]').value;
    gMeme.lines[0].txt = currText;
    setTimeout(drawText, 100);
}

function onDrawImg() {
    drawImg();
}

// function onDrawText() {
//     drawText();
// }

function renderImgGallery(){
    var strHTMLs = gImgs.map((img) => {
        return `<img src=${img.url} data-number=${img.id} class="image-item" onclick="onChangeImg(this)">`
    })
    document.querySelector('.imgs-gallery').innerHTML = strHTMLs.join('');
}

function onChangeImg(el){
    var newImgId = parseInt(el.dataset.number)
    gMeme.selectedImgId = newImgId;
    renderCanvas();
}

function addMouseListener() {
    gElCanvas.addEventListener('mousedown', getPos)
}

function getPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    console.log(pos)
}
