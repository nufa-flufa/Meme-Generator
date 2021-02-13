'use strict'
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gStartPos;

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)

    gElCanvas.addEventListener('mousedown', onDown)

    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)

    gElCanvas.addEventListener('touchstart', onDown)

    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isTextClicked(pos)) return
    gMeme.lines[gMeme.selectedLineIdx].isDragging = true
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    var currLine = gMeme.lines[gMeme.selectedLineIdx]
    if (currLine.isDragging) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y

        currLine.pos.x += dx
        currLine.pos.y += dy

        gStartPos = pos
        renderCanvas()
    }
}

function onUp() {
    gMeme.lines[gMeme.selectedLineIdx].isDragging = false
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    };
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function isTextClicked(clickedPos) {
    console.log(clickedPos)
    const { pos } = gMeme.lines[gMeme.selectedLineIdx]
    console.log(pos)
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <=  gMeme.lines[gMeme.selectedLineIdx].size
    
}