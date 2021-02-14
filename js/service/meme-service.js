'use strict'

const GALLERY_KEY = 'imgs gallery'
const USER_MEMES = 'memes'

var gUserMemes = [];
var gSavedMemsURLs = [];
var gImgsFilter = 'all';

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            isDragging: false,
            txt: '',
            size: 40,
            align: 'left',
            color: 'white',
            font: 'impact',
            pos: { x: 250, y: 100 }
        },
    ],
}

function loadToDOMSavedMemes() {
    var strHTML = '';
    for (var i = 1; i <= gUserMemes.length; i++) {
        strHTML += `<canvas id="user-meme saved${i}" height="200" width="200" onclick="onUploadSavedMeme(${i})"></canvas>`
    }
    document.querySelector('.user-memes').innerHTML = strHTML;

    var i = 1;
    gUserMemes.map((url) => {
        var canvas = document.getElementById(`user-meme saved${i}`);
        var ctx = canvas.getContext('2d');
        var img = new Image;
        img.src = url;
        createImgURLObject(i, url);
        img.onload = () => {
            let height = getHeightRatio(canvas.width, img.height, img.width);
            canvas.height = height;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
        i++;
    })
}

function uploadSavedMeme(id) {
    const img = new Image();
    var chosenMemeImg = gSavedMemsURLs.find((meme) => {
        return meme.id === id;
    });
    img.src = chosenMemeImg.url;
    var canvasHeight = getHeightRatio(gElCanvas.width, img.height, img.width);
    gElCanvas.height = canvasHeight;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, canvasHeight);
    }

}

function drawImg() {
    const img = new Image();
    var selectedImg = gImgs.find((img) => {
        return gMeme.selectedImgId === img.id;
    })
    img.src = selectedImg.url;
    img.onload = () => {
        var canvasHeight = getHeightRatio(gElCanvas.width, img.height, img.width);
        gElCanvas.height = canvasHeight;
        gCtx.drawImage(img, 0, 0, gElCanvas.width, canvasHeight);
        drawText();
    }
}

function drawText() {
    var currInputTxtVal = (gMeme.selectedLineIdx === 1) ? 'input[name=txt2]' : 'input[name=txt1]';
    var currText = document.querySelector(currInputTxtVal).value;

    gMeme.lines[gMeme.selectedLineIdx].txt = currText;

    gMeme.lines.map((line) => {
        var posX = line.pos.x;
        var posY = line.pos.y;
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = 'black';
        gCtx.fillStyle = `${line.color}`;
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.textAlign = 'center';
        gCtx.fillText(line.txt, posX, posY);
        gCtx.strokeText(line.txt, posX, posY);
    });
}

function moveText(direction) {
    if (direction === 'up') gMeme.lines[gMeme.selectedLineIdx].pos.y -= 20;
    else if (direction === 'down') gMeme.lines[gMeme.selectedLineIdx].pos.y += 20;
}

function changeFontSize(sign) {
    if (sign === '+') gMeme.lines[gMeme.selectedLineIdx].size += 10;
    else if (sign === '-') gMeme.lines[gMeme.selectedLineIdx].size -= 10;
}

function removeLine() {
    gMeme.lines[gMeme.selectedLineIdx].txt = '';
    document.querySelector(`input[name=txt${gMeme.selectedLineIdx + 1}]`).value = '';
}

function addLineObject() {
    if (gMeme.lines.length === 2) return;
    var newLine = {
        isDragging: false,
        txt: '',
        size: 40,
        align: 'left',
        color: 'white',
        font: 'impact',
        pos: (gElCanvas.height === 300) ? { x: 250, y: 400 } : { x: 250, y: 290 },
    };
    gMeme.lines.push(newLine);
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'Meme-Generator';
}

function changeTextColor(val) {
    gMeme.lines[gMeme.selectedLineIdx].color = val;
    drawText()
}

function changeFont(val) {
    gMeme.lines[gMeme.selectedLineIdx].font = val;
    drawText()
}

function setFilter(filter) {
    if (!filter) gImgsFilter = 'all';
    else gImgsFilter = filter;
}

function _saveMemeToStorage() {
    saveToStorage(USER_MEMES, gMeme);
}
function _saveImgsToStorage() {
    saveToStorage(GALLERY_KEY, gImgs);
}


// x = gElCanvas.width / 2, y = gElCanvas.height / (gElCanvas.height / 100)
