'use strict'

console.log('utils connected')

function getHeightRatio(CW, IH, IW) {
    return (CW * IH) / IW
}
function getWidthRatio(CH, IH, IW) {
    return (CH * IH) / IW
}