'use strict'

const GALLERY_KEY = 'imgs gallery'
const USER_MEMES = 'memes'

var gUserMemes = [];
var gSavedMemsURLs = [];

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 40,
            align: 'left',
            color: 'white',
            font: 'impact',
            pos: { x: 250, y: 100 }
        },
    ],
}

function loadSavedMemes() {
    console.log('hello')
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
        var savedImgInfo = createImgURLObject(i, url);
        gSavedMemsURLs.push(savedImgInfo);
        img.onload = () => {
            let height = getHeightRatio(canvas.width, img.height, img.width)
            canvas.height = height
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        }
        i++;
    })
}

function onUploadSavedMeme(id) {
    const img = new Image();
    var chosenMemeImg = gSavedMemsURLs.find((meme)=>{
        return meme.id === id
    });
    img.src = chosenMemeImg.url;
    var canvasHeight = getHeightRatio(gElCanvas.width, img.height, img.width)
    gElCanvas.height = canvasHeight
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, canvasHeight);
    }
    
}

function drawImg() {
    const img = new Image();
    var selectedImg = gImgs.find((img) => {
        return gMeme.selectedImgId === img.id
    })
    img.src = selectedImg.url
    var canvasHeight = getHeightRatio(gElCanvas.width, img.height, img.width)
    // var canvasWidth = getWidthRatio(gElCanvas.height, img.height, img.width)
    gElCanvas.height = canvasHeight
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, canvasHeight);
    }
}

function drawText() {
    var currInputTxtVal = (gMeme.selectedLineIdx === 1) ? 'input[name=txt2]' : 'input[name=txt1]';
    var currText = document.querySelector(currInputTxtVal).value;

    gMeme.lines[gMeme.selectedLineIdx].txt = currText;
    console.log(gMeme.lines[gMeme.selectedLineIdx])
    gMeme.lines.map((line) => {
        var posX = line.pos.x
        var posY = line.pos.y
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = 'black';
        gCtx.fillStyle = `${line.color}`;
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.textAlign = 'center'
        gCtx.fillText(line.txt, posX, posY)
        gCtx.strokeText(line.txt, posX, posY)
    })
    console.log(gMeme.lines[1].txt)
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
    gMeme.lines[gMeme.selectedLineIdx].txt = '';
    document.querySelector(`input[name=txt${gMeme.selectedLineIdx + 1}]`).value = '';
}

function addLineObject() {
    if (gMeme.lines.length === 2) return;
    var newLine = {
        txt: '',
        size: 40,
        align: 'left',
        color: 'white',
        font: 'impact',
        pos: (gMeme.lines.length === 1) ? { x: 250, y: 400 } : { x: 250, y: 250 },
    }
    gMeme.lines.push(newLine);
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'Meme-Generator'
}

function changeTextColor(val) {
    gMeme.lines[gMeme.selectedLineIdx].color = val
}

function changeFont(val) {
    gMeme.lines[gMeme.selectedLineIdx].font = val;
}

function _saveMemeToStorage() {
    saveToStorage(USER_MEMES, gMeme)
}
function _saveImgsToStorage() {
    saveToStorage(GALLERY_KEY, gImgs)
}


// x = gElCanvas.width / 2, y = gElCanvas.height / (gElCanvas.height / 100)
