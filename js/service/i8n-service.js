'use strict'

var gCurrLang = 'en';

var gTrans = {
    gallery:{
        en: 'Gallery',
        he: 'גלריה',
    },
    'my-memes':{
        en:'My Memes',
        he:'המימז שלי',
    },
    about:{
        en:'About',
        he:'קצת עלינו',
    },
    rights:{
        en: 'All Rights Reserved',
        he:'כל הזכויות שמורות',
    },
    save:{
        en:'Save',
        he:'שמור',
    },
    download:{
        en:'Download',
        he:'הורד',
    },
    submit:{
        en:'Submit',
        he:'אישור',
    },
    'txt-input':{
        en:'Write your text here',
        he:'הכנס טקסט כאן',
    },
    funny:{
        en: 'funny',
        he:'מצחיק',
    },
    movie:{
        en:'movie',
        he:'סרט',
    },
    politics:{
        en:'politics',
        he:'פוליטיקה',
    },
    friendship:{
        en:'friendship',
        he:'חברות',
    },
    laugh:{
        en:'laugh',
        he:'צוחק',
    },
    baby:{
        en:'baby',
        he:'תינוק',
    },
    trump:{
        en:'trump',
        he:'טראמפ',
    },
    putin:{
        en:'putin',
        he:'פוטין',
    },
    sleep:{
        en:'sleep',
        he:'שינה',
    },
    work:{
        en:'work',
        he:'עבודה',
    },
    cute:{
        en:'cute',
        he:'חמוד',
    },
    puppy:{
        en:'puppy',
        he:'גור',
    },
    cat:{
        en:'cat',
        he:'חתול',
    },
    animal:{
        en:'animal',
        he:'חיה',
    },
    

}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    els.forEach(function (el) {
        var transKey = el.dataset.trans;
        var txt = getTrans(transKey);

        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    })
}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';
    var txt = keyTrans[gCurrLang];

    if (!txt) txt = keyTrans['en'];
    return txt;
}

function setLang(lang) {
    gCurrLang = lang;
}