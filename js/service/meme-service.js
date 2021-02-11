'use strict'

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

function drawImg() {
    const img = new Image();
    var selectedImg = gImgs.find((img) => {
        return gMeme.selectedImgId === img.id
    })
    img.src = selectedImg.url

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
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

function changeFontSize(sign){
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

function downloadCanvas(elLink){
    const data = gElCanvas.toDataURL()
    // console.log('downloadCanvas -> data', data)
    elLink.href = data
    elLink.download = 'Meme-Generator'
}
// x = gElCanvas.width / 2, y = gElCanvas.height / (gElCanvas.height / 100)
// function getPos(ev) {
//     var pos = {
//         x: ev.offsetX,
//         y: ev.offsetY
//     }
//     // console.log(pos)
// }

// function setNewGridSetting(){

// }