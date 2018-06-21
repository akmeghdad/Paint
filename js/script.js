// https://www.script-tutorials.com/html5-color-picker-canvas/
// https://www.webdesignerdepot.com/2013/03/how-to-create-a-color-picker-with-html5-canvas/

var context, cadr, color, epai;

$(function () {
    cadr = $("#js_cadr_wihte");
    cadr.on('mousemove', inCadrMouse);
    cadr.on('mousedown', inMmouseClick);
    cadr.on('mouseup', inMouseUp);
    cadr.on('mouseout', inMouseUp);

    $("#eraser").on('click', clearCanvas);
    $(".color").on('click', changeColor);
    $(".list_button").on('click', changeEpai);
    $("#dropper").on('click', showPickColor);
    $("#js_bord_color").on('click', pickColor);

    var ee = document.getElementById('save');
    ee.addEventListener('click', saveImage);
    // $("#save").on('click', saveImage);

    fillCanvas();
});

function inMouseUp() {
    console.log('32332');
    context = null;
}

function inMmouseClick(event) {
    var c = document.getElementById('js_cadr_wihte');
    context = c.getContext('2d');

    var cXn = event.offsetX;
    var cYn = event.offsetY;
    context.moveTo(cXn, cYn);
    context.beginPath();

}

function inCadrMouse(event) {
    var cX = event.offsetX;
    var cY = event.offsetY;

    if (context != null) {

        context.lineWidth = epai;
        context.strokeStyle = color;
        context.lineTo(cX, cY);
        context.stroke();

    }
}

function clearCanvas() {
    var cadr = document.getElementById("js_cadr_wihte");
    context = cadr.getContext('2d');

    context.clearRect(0, 0, cadr.width, cadr.height);
    context.beginPath();
    context = null;
}

function changeColor() {
    color = $(this).css('background-color');
}

function changeEpai() {
    epai = $(this).val();
}


function showPickColor() {
    $("#js_bord_color").toggle();
}

function fillCanvas() {

    /* */
    for (let i = 0; i <= 255; i ++) {
        for (let k = 0; k <= 255; k ++) {
            var c = document.getElementById('js_bord_color');
            var context__ = c.getContext('2d');

            context__.beginPath();
            context__.lineWidth = 1;
            context__.strokeStyle = 'rgb(50, '+i+', '+k+')';
            // context__.moveTo(i, k);
            
            context__.lineTo(i, k-10);
            context__.lineTo(i, k);
            // context__.stroke(); 
            context__ = null; 



        }
    }

    var c = document.getElementById('js_bord_color');
    var context__11 = c.getContext('2d');

    var image = new Image();
    image.onload = function () {
        context__11.drawImage(image, 0, 0, image.width, image.height); // draw the image on the canvas
    }

    var cav = document.getElementById('js_bord_color');
    var cxx = cav.getContext('2d');

    var ak;
    ak = cxx.createLinearGradient(0, 0, cav.width, 0);
    ak.addColorStop(0, 'rgb(255,   0,   0)');
    ak.addColorStop(0.15, 'rgb(255,   0, 255)');
    ak.addColorStop(0.32, 'rgb(0,     0, 255)');
    ak.addColorStop(0.49, 'rgb(0,   255, 255)');
    ak.addColorStop(0.66, 'rgb(0,   255,   0)');
    ak.addColorStop(0.83, 'rgb(255, 255,   0)');
    ak.addColorStop(1, 'rgb(255,   0,   0)');
    cxx.fillStyle = ak;
    cxx.fillRect(0, 0, cav.width, cav.height);
    ak = cxx.createLinearGradient(0, 0, 0, cav.height);
    ak.addColorStop(0, 'rgba(255, 255, 255, 1)');
    ak.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
    ak.addColorStop(0.5, 'rgba(0,     0,   0, 0)');
    ak.addColorStop(1, 'rgba(0,     0,   0, 1)');
    cxx.fillStyle = ak;
    cxx.fillRect(0, 0, cav.width, cav.height)




    
}

function pickColor(event) {
    var cX = event.offsetX;
    var cY = event.offsetY;

    var c = document.getElementById('js_bord_color');
    var context__ = c.getContext('2d');

    var dataimg = context__.getImageData(cX, cY, 1, 1).data;
    color = 'rgb('+dataimg[0]+', '+dataimg[1]+', '+dataimg[2]+')';

    // console.log(dataimg[0]+'--'+dataimg[1]+'--'+dataimg[2]+'--')
    console.log(color);
    $(this).toggle();
}


function saveImage (){
    //   https://stackoverflow.com/posts/7952401/revisions
    
    var cx = document.getElementById('js_cadr_wihte');
    var myImage = cx.toDataURL();

    $.post("saveimage.php", {
            data: myImage,
        },
        function (data, textStatus, jqXHR) {
            console.log(data);
            button.src = data;
        }
    );

    // save with script  https://github.com/eligrey/FileSaver.js
    cx.toBlob(function(blob) {
        saveAs(blob, "pretty image.png");
    });
}