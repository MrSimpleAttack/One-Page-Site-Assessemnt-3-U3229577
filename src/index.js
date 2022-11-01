const fireImages = [
    '/assets/Fire/FireB.png',
    '/assets/Fire/FireC.png',
    '/assets/Fire/FireD.png',
    '/assets/Fire/FireE.png',
    '/assets/Fire/FireF.png',
    '/assets/Fire/FireG.png',
]

// const blurbStates = {
//     None : "none",
//     Park : "park",
//     Coal : "coal",
//     Koala : "koala",
//     Cunt : "cunt",
//     SC : "sc",
//     MMC : "mmc",
//     Shop : "shop",
//     FFC : "ffc"
// }

const blurbStates = {
    None : -1,
    Park : 0,
    Coal : 1,
    Koala : 2,
    Cunt : 3,
    SC : 4,
    MMC : 5,
    Shop : 6,
    FFC : 7
}

var currentBlurb = -1;

var blurbRef = []

const fadeIn = [
    {opacity: 0},
    {opacity: 1}
]

const fadeInTime = {
    duration: 550,
    iterations: 1,
}

function play() {
    document.getElementById("audio").play()
    document.getElementById("menu").style.display = 'flex';
    document.getElementById("startButtonDiv").style.display = 'none';
    genFire();
    collectBlurbs();
}

function collectBlurbs() {
    var count = 0;
    while(document.getElementById("blurb"+count) != null){
        blurbRef.push(document.getElementById("blurb"+count));
        console.log("got: blurb" + count + ". as: " + blurbRef[count]);
        count++;
    }
}

function genFire() {
    const d = document.getElementById("randomFire");
    d.style.display = 'flex';

    const c = document.getElementById("fireCanvas")
    const ctx = c.getContext("2d");
    fireImages.forEach(element => {
        var rngX = Math.floor((Math.random()*c.width*0.75)+1)
        console.log("x: "+rngX);
        var rngY = Math.floor((Math.random()*c.height*0.5)+1)
        console.log("y: "+rngY);
        var img = new Image;
        img.src = (element);
        img.onload = function() {
            ctx.drawImage(img, rngX, rngY, 50, 50);
            console.log("drew: " + img.src);
        };
    });
}

function setBlurbState(no) {
    if (currentBlurb == no) return;

    document.getElementById("randomFire").style.display = 'none';
    document.getElementById("blurbParent").style.display = 'flex';

    if (currentBlurb >= 0) blurbRef[currentBlurb].style.display = 'none';

    if (no < 0) {
        document.getElementById("blurbParent").style.display = 'none';
        genFire();
        return;
    }

    currentBlurb = no;

    blurbRef[no].style.display = 'flex';
    blurbRef[no].animate(fadeIn, fadeInTime);
}