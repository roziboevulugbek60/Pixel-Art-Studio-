
const canvas = document.getElementById("canvas");

const colorPicker = document.getElementById("colorPicker");
const gridSize = document.getElementById("gridSize");

const brushSize = document.getElementById("brushSize");

const pencilBtn = document.getElementById("pencilBtn");
const eraserBtn = document.getElementById("eraserBtn");

const undoBtn = document.getElementById("undoBtn");
const redoBtn = document.getElementById("redoBtn");

const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");

const zoomIn = document.getElementById("zoomIn");
const zoomOut = document.getElementById("zoomOut");

const themeBtn = document.getElementById("themeBtn");

const galleryBtn = document.getElementById("galleryBtn");
const galleryList = document.getElementById("galleryList");



let size = 32;

let color = "#000000";

let tool = "pencil";

let brush = 1;

let zoom = 1;

let drawing = false;



let history = [];
let redoHistory = [];





// ======================
// CREATE GRID
// ======================


function createGrid(){


    canvas.innerHTML="";


    canvas.style.gridTemplateColumns =
    `repeat(${size},20px)`;


    for(let i=0;i<size*size;i++){


        let pixel=document.createElement("div");


        pixel.className="pixel grid";


        pixel.dataset.index=i;



        pixel.addEventListener(
            "mousedown",
            ()=>{

                drawing=true;

                saveHistory();

                paint(pixel);

            }
        );



        pixel.addEventListener(
            "mouseenter",
            ()=>{

                if(drawing){

                    paint(pixel);

                }

            }
        );



        pixel.addEventListener(
            "touchstart",
            e=>{

                e.preventDefault();

                paint(pixel);

            }
        );



        canvas.appendChild(pixel);

    }


    loadArt();

}





document.addEventListener(
"mouseup",
()=>{

drawing=false;

});





// ======================
// PAINT
// ======================


function paint(pixel){



    let pixels =
    [...document.querySelectorAll(".pixel")];



    let index =
    pixels.indexOf(pixel);



    let row =
    Math.floor(index/size);



    let col =
    index%size;




    for(let y=-brush+1;y<brush;y++){

        for(let x=-brush+1;x<brush;x++){


            let r=row+y;

            let c=col+x;



            if(
            r>=0 &&
            c>=0 &&
            r<size &&
            c<size
            ){


                let p=
                pixels[r*size+c];


                if(tool==="eraser"){

                    p.style.background="white";

                }
                else{

                    p.style.background=color;

                }


            }

        }

    }


}






// ======================
// COLORS
// ======================


colorPicker.oninput=()=>{

color=colorPicker.value;

};



document
.querySelectorAll(".palette button")
.forEach(btn=>{


btn.onclick=()=>{


color=
btn.style.backgroundColor;


colorPicker.value=color;


};


});






// ======================
// TOOLS
// ======================


pencilBtn.onclick=()=>{

tool="pencil";

};



eraserBtn.onclick=()=>{

tool="eraser";

};






// ======================
// BRUSH
// ======================


brushSize.oninput=()=>{

brush=
Number(brushSize.value);

};







// ======================
// GRID SIZE
// ======================


gridSize.onchange=()=>{


size=
Number(gridSize.value);


createGrid();


};







// ======================
// HISTORY
// ======================


function saveHistory(){


let data=[];


document
.querySelectorAll(".pixel")
.forEach(p=>{

data.push(p.style.background);

});


history.push(data);


redoHistory=[];


}





undoBtn.onclick=()=>{


if(history.length===0)
return;



let current=[];


document
.querySelectorAll(".pixel")
.forEach(p=>{

current.push(p.style.background);

});



redoHistory.push(current);



let old=
history.pop();



document
.querySelectorAll(".pixel")
.forEach((p,i)=>{

p.style.background=
old[i];

});


};







redoBtn.onclick=()=>{


if(redoHistory.length===0)
return;



let data=
redoHistory.pop();



document
.querySelectorAll(".pixel")
.forEach((p,i)=>{

p.style.background=
data[i];

});



};








// ======================
// CLEAR
// ======================


clearBtn.onclick=()=>{


saveHistory();



document
.querySelectorAll(".pixel")
.forEach(p=>{

p.style.background="white";

});


};







// ======================
// ZOOM
// ======================


zoomIn.onclick=()=>{

zoom+=0.1;

canvas.style.transform=
`scale(${zoom})`;

};



zoomOut.onclick=()=>{


if(zoom>0.5)
zoom-=0.1;


canvas.style.transform=
`scale(${zoom})`;

};








// ======================
// PNG SAVE
// ======================


saveBtn.onclick=()=>{


let img=document.createElement("canvas");


img.width=size;

img.height=size;


let ctx=
img.getContext("2d");



document
.querySelectorAll(".pixel")
.forEach((p,i)=>{


ctx.fillStyle=
p.style.background || "white";


ctx.fillRect(
i%size,
Math.floor(i/size),
1,
1
);


});



let a=document.createElement("a");


a.download="pixel-art.png";


a.href=
img.toDataURL();


a.click();



saveGallery();


};








// ======================
// DARK LIGHT
// ======================


themeBtn.onclick=()=>{


document.body.classList.toggle("light");


};








// ======================
// GALLERY
// ======================


function saveGallery(){


let arts=
JSON.parse(
localStorage.getItem("gallery")
||"[]"
);



let data=[];


document
.querySelectorAll(".pixel")
.forEach(p=>{


data.push(
p.style.background
);


});



arts.push(data);



localStorage.setItem(
"gallery",
JSON.stringify(arts)
);



showGallery();


}






function showGallery(){


galleryList.innerHTML="";



let arts=
JSON.parse(
localStorage.getItem("gallery")
||"[]"
);



arts.forEach((art,index)=>{


let box=
document.createElement("div");


box.className=
"gallery-item";



box.onclick=()=>{


document
.querySelectorAll(".pixel")
.forEach((p,i)=>{


p.style.background=
art[i];


});


};



galleryList.appendChild(box);



});


}







// ======================
// MOBILE TOUCH
// ======================


canvas.addEventListener(
"touchmove",
e=>{


let touch=e.touches[0];


let el=
document.elementFromPoint(
touch.clientX,
touch.clientY
);



if(
el &&
el.classList.contains("pixel")
){

paint(el);

}


},
{
passive:false
}

);







// START


createGrid();

showGallery();

