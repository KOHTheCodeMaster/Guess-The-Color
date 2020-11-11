let header;
let strRgbHeader;
let statusMsg;
let colorTiles;
let btnRefreshColors, btnEasy, btnHard; //  Buttons
let correctColor;
let defaultHeaderColor = "#007bff"; //  primary

//  Wait for the html content to be loaded before running the major function
document.addEventListener("DOMContentLoaded", () => {

    major();

})

function major() {

    init();

}

function init() {

    initializeElements();

    initializeEventListeners();

    updateGameGrid(6);
}

function initializeElements() {

    header = $("header");
    strRgbHeader = $("#str-rgb-header");
    statusMsg = $("#status-msg")
    btnRefreshColors = $("#btn-refresh-colors")
    btnEasy = $("#btn-easy")
    btnHard = $("#btn-hard")
    colorTiles = $(".color-tile");

}


function initializeEventListeners() {

    btnRefreshColors.click(function () {

        if (btnEasy.hasClass("active")) updateGameGrid(3);
        else updateGameGrid(6);

    });

    btnEasy.click(function () {
        btnEasy.addClass("active");
        btnHard.removeClass("active");
        updateGameGrid(3);
    });

    btnHard.click(function () {
        btnHard.addClass("active");
        btnEasy.removeClass("active");
        updateGameGrid(6);
    });


    //  Add Event Listener to each color tile
    for (let i = 0; i < colorTiles.length; i++) {

        //  Add event listener & check for Game Over
        let currentTile = colorTiles.eq(i);

        currentTile.click(function () {
            if (currentTile.css("background-color") === correctColor.toLowerCase()) victory();
            else tryAgain(currentTile); //  Fade Effect
        });

    }


}

function updateGameGrid(numOfColors) {

    let colors = [];

    for (let i = 0; i < colorTiles.length; i++) {

        let currentTile = colorTiles.eq(i);
        colors[i] = generateSingleRGBColor();

        //  Hide / Show Color tiles according to the game difficulty
        if (i >= 3 && btnEasy.hasClass("active")) colorTiles.eq(i).hide();
        else currentTile.show();

        //  Update background color for currentTile
        currentTile.css("background-color", colors[i]);

    }

    //  Initialize correctColor among the color tiles
    correctColor = colors[Math.floor(Math.random() * numOfColors)];

    //  Update strRgbHeader with correct color rgb
    strRgbHeader.text(correctColor);

    //  Reset status message to empty
    statusMsg.text("");

    //  Reset bg color of header to default header color i.e. primary
    header.css("background-color", defaultHeaderColor);

    return colors;

}

function generateSingleRGBColor() {

    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    // return "RGB(" + r + ", " + g + ", " + b + ")";
    return `RGB(${r}, ${g}, ${b})`;

}

function victory() {

    //  Update the bg color for the header with correctColor
    header.css("background-color", correctColor);

    //  Make all the tiles visible
    if (btnEasy.hasClass("active")) {
        for (let i = 0; i < 3; i++) {
            colorTiles.eq(i).show();
        }
    } else colorTiles.show();

    //  Update bg color for all the tiles with correctColor
    colorTiles.css("background-color", correctColor);

    //  Update the status msg with CORRECT
    statusMsg.text("Correct..!!");

}

function tryAgain(currentTile) {
    statusMsg.text("Try Again..!!")
    currentTile.fadeOut("slow");
}
