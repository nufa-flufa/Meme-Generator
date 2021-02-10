'use strict'

var gElCanvas;
var gCtx;


function onInit() {
    gElCanvas = document.getElementById('meme-canvas');
    gCtx = gElCanvas.getContext('2d');
    addMouseListener();
    renderImgGallery()
}

function onChangeCanvas(ev) {
    ev.preventDefault();
    renderCanvas();
}

function renderCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    if (!gMeme.selectedImgId) return;
    drawImg();
    var currText = document.querySelector('input[name=txt1]').value;
    gMeme.lines[0].txt = currText;
    setTimeout(drawText, 100);
}


function renderImgGallery() {
    var strHTMLs = gImgs.map((img) => {
        return `<img src=${img.url} data-number=${img.id} class="image-item" onclick="onChangeImg(this)">`
    })
    document.querySelector('.imgs-gallery').innerHTML = strHTMLs.join('');
}

function onChangeImg(el) {
    var newImgId = parseInt(el.dataset.number)
    gMeme.selectedImgId = newImgId;
    renderCanvas();
}

function onChangeFontSize(sign) {
    if (gMeme.lines[gMeme.selectedLineIdx].size < 20) return;
    if (gMeme.lines[gMeme.selectedLineIdx].size > 300) return;

    if (sign === '+') gMeme.lines[gMeme.selectedLineIdx].size += 10
    else if (sign === '-') gMeme.lines[gMeme.selectedLineIdx].size -= 10

    renderCanvas();
}

function onMoveText(direction) {
    
    if (direction === 'up') gMeme.pos.y -= 20;
    else if (direction === 'down') gMeme.pos.y += 20

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
