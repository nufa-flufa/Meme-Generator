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

    var currInputTxtVal = (gMeme.selectedLineIdx === 1) ? 'input[name=txt2]' : 'input[name=txt1]';
    var currText = document.querySelector(currInputTxtVal).value;
    gMeme.lines[gMeme.selectedLineIdx].txt = currText;
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

function onRemoveText() {
    removeLine()
    renderCanvas();
}

function onAddLine() {
    if(gMeme.lines.length === 2) return;
    var elForm = document.querySelector('form')
    let newTxtLine = document.createElement('div')
    var strHTML = `<input class="txt-input" type="text" placeholder="Write your text here" name="txt2">`
    elForm.appendChild(newTxtLine).innerHTML = strHTML
    gMeme.selectedLineIdx += 1;
    // console.log('',gMeme.selectedLineIdx)
    // elForm.appendChild(newTxtLine).style.gridRow= '2/3';
    // elForm.appendChild(newTxtLine).style.gridColumn= '8/9';
    addLineObject();
}


function onChangeFontSize(sign) {
    if (gMeme.lines[gMeme.selectedLineIdx].size < 20) return;
    if (gMeme.lines[gMeme.selectedLineIdx].size > 300) return;

    if (sign === '+') gMeme.lines[gMeme.selectedLineIdx].size += 10
    else if (sign === '-') gMeme.lines[gMeme.selectedLineIdx].size -= 10

    renderCanvas();
}

function onMoveText(direction) {
    if (direction === 'up') gMeme.lines[gMeme.selectedLineIdx].pos.y -= 20;
    else if (direction === 'down') gMeme.lines[gMeme.selectedLineIdx].pos.y += 20;

    renderCanvas();
}

function onChangeLineFocus() {
    if (gMeme.selectedLineIdx === 1) {
        gMeme.selectedLineIdx = 0;
        document.querySelector(`input[name=txt1]`).style.border = '3px solid black';
        document.querySelector(`input[name=txt2]`).style.border = 'none';
    }
    else {
        gMeme.selectedLineIdx = 1;
        document.querySelector(`input[name=txt2]`).style.border = '3px solid black';
        document.querySelector(`input[name=txt1]`).style.border = 'none';

    }
}
function addMouseListener() {
    window.addEventListener('mousedown', getPos)
}

function getPos(ev) {
    var pos = {
        x: ev.clientX,
        y: ev.clientY
    }
    // if (pos.y > 150 && pos.y < 205 && pos.x > 805 && pos.x < 1165) gMeme.selectedLineIdx = 0;
        console.log(pos)
}
