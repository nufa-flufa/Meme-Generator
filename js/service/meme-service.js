'use strict'

const GALLERY_KEY = 'imgs gallery'
const USER_MEMES = 'memes'

var gUserMemes = [];
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 40,
            align: 'left',
            color: 'white',
            pos: { x: 250, y: 100 }
        },
    ],
}

function loadSavedMemes() {
    console.log('hello')
    var strHTML = '';
    for (var i = 1; i <= gUserMemes.length; i++) {
        strHTML += `<canvas id="user-meme saved${i}" height="200" width="200" contenteditable=""></canvas>`
    }
    document.querySelector('.user-memes').innerHTML = strHTML;

    var i = 1;
    gUserMemes.map((url) => {
        var canvas = document.getElementById(`user-meme saved${i}`);
        var ctx = canvas.getContext('2d');
        var img = new Image;
        img.src = url;
        img.onload = () => {
            let height = getHeightRatio(canvas.width, img.height, img.width)
            let width = getWidthRatio(canvas.height, img.height, img.width)
            ctx.drawImage(img, 0, 0, height, width)
        }
        i++;
    })
}

function drawImg() {
    const img = new Image();
    var selectedImg = gImgs.find((img) => {
        return gMeme.selectedImgId === img.id
    })
    img.src = selectedImg.url
    var canvasHeight = getHeightRatio(gElCanvas.width, img.height, img.width)
    var canvasWidth = getWidthRatio(gElCanvas.height, img.height, img.width)
    console.log('width:', canvasWidth)
    console.log('height:', canvasHeight)

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, canvasHeight);
    }
}

function drawText() {
    var currInputTxtVal = (gMeme.selectedLineIdx === 1) ? 'input[name=txt2]' : 'input[name=txt1]';
    var currText = document.querySelector(currInputTxtVal).value;
    gMeme.lines[gMeme.selectedLineIdx].txt = currText;

    gMeme.lines.map((line) => {
        var posX = line.pos.x
        var posY = line.pos.y
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = 'black';
        gCtx.fillStyle = 'white';
        gCtx.font = `${line.size}px Impact`;
        gCtx.textAlign = 'center'
        gCtx.fillText(line.txt, posX, posY)
        gCtx.strokeText(line.txt, posX, posY)
    })

}

function moveText(direction) {
    if (direction === 'up') gMeme.lines[gMeme.selectedLineIdx].pos.y -= 20;
    else if (direction === 'down') gMeme.lines[gMeme.selectedLineIdx].pos.y += 20;
}

function changeFontSize(sign) {
    if (sign === '+') gMeme.lines[gMeme.selectedLineIdx].size += 10
    else if (sign === '-') gMeme.lines[gMeme.selectedLineIdx].size -= 10
}

function removeLine() {
    console.log('txt', gMeme.lines[gMeme.selectedLineIdx.txt])
    gMeme.lines[gMeme.selectedLineIdx].txt = '';
    console.log('selectedLineIdx:', gMeme.selectedLineIdx)
    document.querySelector(`input[name=txt${gMeme.selectedLineIdx + 1}]`).value = '';
    console.log('txt after', gMeme.lines[gMeme.selectedLineIdx].txt)
}

function addLineObject() {
    // console.log(gMeme)
    if (gMeme.lines.length === 2) return;
    var newLine = {
        txt: '',
        size: 40,
        align: 'left',
        color: 'white',
        pos: (gMeme.lines.length === 1) ? { x: 250, y: 400 } : { x: 250, y: 250 },
    }
    gMeme.lines.push(newLine);
    console.log(gMeme)
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    // console.log('downloadCanvas -> data', data)
    elLink.href = data
    elLink.download = 'Meme-Generator'
}

function _saveMemeToStorage() {
    saveToStorage(USER_MEMES, gMeme)
}
function _saveImgsToStorage() {
    saveToStorage(GALLERY_KEY, gImgs)
}


// x = gElCanvas.width / 2, y = gElCanvas.height / (gElCanvas.height / 100)
