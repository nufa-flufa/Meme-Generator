'use strict'

var gElCanvas;
var gCtx;


function onInit() {
    gElCanvas = document.getElementById('meme-canvas');
    gCtx = gElCanvas.getContext('2d');
    addListeners();
    renderImgGallery();
}

function onChangeCanvas(ev) {
    ev.preventDefault();
    renderCanvas();
}

function renderCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    if (!gMeme.selectedImgId) return;
    drawImg();
    setTimeout(drawText, 100);
}

function renderImgGallery() {
    gImgs = loadFromStorage(GALLERY_KEY);
    var strHTMLs = '';
    if (gImgsFilter === 'all') {
        document.querySelector('.search h3').style.display = 'none';
        strHTMLs = gImgs.map((img) => {
            return `<img src=${img.url} data-number=${img.id} class="image-item" onclick="onChangeImg(this)">`
        });
    }
    else {
        var filterredList = [];
        gImgs.filter((img) => {
            for (var i = 0; i < img.keywords.length; i++) {
                var currWord = img.keywords[i];
                if (currWord.substring(0, gImgsFilter.length) === gImgsFilter) filterredList.push(img);
            }
        });
        if (!filterredList.length) {
            filterredList = gImgs;
            document.querySelector('.search h3').style.display = 'block';
        }
        strHTMLs = filterredList.map((img) => {
            return `<img src=${img.url} data-number=${img.id} class="image-item" onclick="onChangeImg(this)">`
        });

    }
    document.querySelector('.imgs-gallery').innerHTML = strHTMLs.join('');
}

function onChangeImg(el) {
    var newImgId = parseInt(el.dataset.number);
    gMeme.selectedImgId = newImgId;
    document.querySelector('.imgs-gallery').style.display = 'none';
    document.querySelector('.search-nav').style.display = 'none';
    document.querySelector('.canvas-container').style.display = 'flex';
    renderCanvas();
}

function onRemoveText() {
    removeLine();
    renderCanvas();
}

function onAddLine() {
    if (gMeme.lines.length === 2) return;
    var elForm = document.querySelector('form');
    var strHTML = `<input class="txt-input" type="text" placeholder="Write your text here" name="txt2" data-trans="txt-input">`;
    elForm.insertAdjacentHTML("beforeend", strHTML);

    gMeme.selectedLineIdx += 1;
    document.querySelector(`input[name=txt2]`).style.border = '3px solid #2e1e31';
    addLineObject();
}

function onChangeFontSize(sign) {
    if (gMeme.lines[gMeme.selectedLineIdx].size < 20) return;
    if (gMeme.lines[gMeme.selectedLineIdx].size > 300) return;

    changeFontSize(sign);
    renderCanvas();
}

function onMoveText(direction) {
    moveText(direction);
    renderCanvas();
}

function onChangeLineFocus() {
    if (gMeme.selectedLineIdx === 1) {
        gMeme.selectedLineIdx = 0;
        document.querySelector(`input[name=txt1]`).style.border = '3px solid #2e1e31';
        document.querySelector(`input[name=txt2]`).style.border = '1px solid #2e1e31';
    }
    else {
        gMeme.selectedLineIdx = 1;
        document.querySelector(`input[name=txt2]`).style.border = '3px solid #2e1e31';
        document.querySelector(`input[name=txt1]`).style.border = '1px solid #2e1e31';

    }
}

function onOpenGalleryModal() {
    document.querySelector('.imgs-gallery').style.display = 'grid';
    document.querySelector('.search-nav').style.display = 'flex';
    document.querySelector('.canvas-container').style.display = 'none';
    document.querySelector('.user-memes').style.display = 'none';
}

function onDownloadCanvas(elLink) {
    downloadCanvas(elLink);
}

function onSaveMeme() {
    gUserMemes.push(gElCanvas.toDataURL());
    saveToStorage(USER_MEMES, gUserMemes);
}

function onLoadSavedMemes() {
    gUserMemes = loadFromStorage(USER_MEMES);
    if (!gUserMemes && !gUserMemes.length) {
        gUserMemes = [];
        return;
    }
    else {
        loadSavedMemes();
    }
}

function onOpenUserMemesGallery() {
    onLoadSavedMemes();
    document.querySelector('.imgs-gallery').style.display = 'none';
    document.querySelector('.canvas-container').style.display = 'flex';
    document.querySelector('.user-memes').style.display = 'grid';
}

function onChangeTextColor(val) {
    changeTextColor(val);
}

function onChangeFont(val) {
    changeFont(val);
    renderCanvas();
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    doTrans();
}

function onSetFilter(filter) {
    setFilter(filter);
    renderImgGallery();
}
// function addMouseListener() {
//     window.addEventListener('mousedown', getPos);
// }

// function getPos(ev) {
//     var pos = {
//         x: ev.clientX,
//         y: ev.clientY
//     };
//     // if (pos.y > 150 && pos.y < 205 && pos.x > 805 && pos.x < 1165) gMeme.selectedLineIdx = 0;
//     // console.log(pos)
// }
