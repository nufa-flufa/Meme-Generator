'use strict'

function getHeightRatio(CW, IH, IW) {
    return (CW * IH) / IW;
}
function getWidthRatio(CH, IH, IW) {
    return (CH * IH) / IW;
}

function createImgURLObject(id, url) {
   var imgObject = {
        id,
        url,
    };
    gSavedMemsURLs.push(imgObject);
}