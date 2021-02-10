'use strict'

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    pos: { x: 250, y: 100 },
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'white'
        },
        {
            txt: 'I never eat Falafel',
            size: 100,
            align: 'left',
            color: 'white'
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
    var txt = gMeme.lines[gMeme.selectedLineIdx].txt
    var size = gMeme.lines[gMeme.selectedLineIdx].size
    console.log(size)
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = gMeme.color;
    gCtx.fillStyle = 'white';
    gCtx.font = `${size}px Impact`;
    gCtx.textAlign = 'center'
    gCtx.fillText(txt, gMeme.pos.x, gMeme.pos.y)
    gCtx.strokeText(txt, gMeme.pos.x, gMeme.pos.y)
}

// x = gElCanvas.width / 2, y = gElCanvas.height / (gElCanvas.height / 100)