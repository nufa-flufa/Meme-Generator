'use strict'

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 20,
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

function drawText(){
    var txt = gMeme.lines[gMeme.selectedLineIdx].txt
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = gMeme.color;
    gCtx.fillStyle =  'white';
    gCtx.font = '50px Impact';
    gCtx.textAlign = 'center'
    gCtx.fillText(txt,250, 100)
    gCtx.strokeText(txt, 250, 100)
}