'use strict'


function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {

    var reader = new FileReader()
    console.log('hi')
    reader.onload = function (event) {
        console.log('hello')
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
        var newImage = {
            id: (gImgs[gImgs.length - 1].id + 1),
            url: img.src,
            keywords:['personal']
        }

        gImgs.push(newImage);
        _saveImgsToStorage();
        renderImgGallery();
        gMeme.selectedImgId = newImage.id;
    }
    reader.readAsDataURL(ev.target.files[0])
}


function renderImg() {
    renderCanvas()
    document.querySelector('.imgs-gallery').style.display = 'none';
    document.querySelector('.search-nav').style.display = 'none';
    document.querySelector('.canvas-container').style.display = 'flex';
}

// on submit call to this function
function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gElCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log('uploadedImgUrl:', uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}
