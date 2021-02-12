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
    console.log(gCtx)
    setTimeout(drawText, 100);
}

function renderImgGallery() {
    gImgs = loadFromStorage(GALLERY_KEY)
    console.log(gImgs)
    var strHTMLs = gImgs.map((img) => {
        return `<img src=${img.url} data-number=${img.id} class="image-item" onclick="onChangeImg(this)">`
    })
    document.querySelector('.imgs-gallery').innerHTML = strHTMLs.join('');
}

function onChangeImg(el) {
    var newImgId = parseInt(el.dataset.number)
    gMeme.selectedImgId = newImgId;
    document.querySelector('.imgs-gallery').style.display = 'none'
    document.querySelector('.canvas-container').style.display = 'flex'
    renderCanvas();
}

function onRemoveText() {
    removeLine()
    renderCanvas();
}

function onAddLine() {
    if (gMeme.lines.length === 2) return;
    var elForm = document.querySelector('form')
    let newTxtLine = document.createElement('div')
    var strHTML = `<input class="txt-input" type="text" placeholder="Write your text here" name="txt2">`
    elForm.appendChild(newTxtLine).innerHTML = strHTML
    gMeme.selectedLineIdx += 1;
    // elForm.appendChild(newTxtLine).style.grid = ''

    addLineObject();
}

function onChangeFontSize(sign) {
    if (gMeme.lines[gMeme.selectedLineIdx].size < 20) return;
    if (gMeme.lines[gMeme.selectedLineIdx].size > 300) return;

    changeFontSize(sign)

    renderCanvas();
}

function onMoveText(direction) {
    moveText(direction)
    renderCanvas();
}

function onChangeLineFocus() {
    if (gMeme.selectedLineIdx === 1) {
        gMeme.selectedLineIdx = 0;
        document.querySelector(`input[name=txt1]`).style.border = '2px solid #2e1e31';
        document.querySelector(`input[name=txt2]`).style.border = 'none';
    }
    else {
        gMeme.selectedLineIdx = 1;
        document.querySelector(`input[name=txt2]`).style.border = '2px solid #2e1e31';
        document.querySelector(`input[name=txt1]`).style.border = 'none';

    }
}

function onOpenGalleryModal() {
    document.querySelector('.imgs-gallery').style.display = 'grid'
    document.querySelector('.canvas-container').style.display = 'none'
}

function onDownloadCanvas(elLink) {
    console.log(elLink)
    downloadCanvas(elLink)
}
function onSaveMeme() {
    gUserMemes.push(gElCanvas.toDataURL())
    saveToStorage(USER_MEMES, gUserMemes)
}
function onLoadPicture() {
    gUserMemes = loadFromStorage(USER_MEMES)
    if(!gUserMemes && !gUserMemes.length) {
        console.log('empty')
        return;
    }
    else {
    //    gUserMemes = savedMemes
        loadSavedMemes()
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
    // console.log(pos)
}
