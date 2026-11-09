
const langData = {


uz: {

title:"Pixel Art Studio",

theme:"Tungi rejim",

colors:"Ranglar",

grid:"To'r",

brushText:"Qalam hajmi",

pencil:"Qalam",

eraser:"O'chirg'ich",

clear:"Tozalash",

save:"PNG saqlash",

gallery:"Galereya"

},



ru: {

title:"Пиксельная студия",

theme:"Тёмный режим",

colors:"Цвета",

grid:"Сетка",

brushText:"Размер кисти",

pencil:"Карандаш",

eraser:"Ластик",

clear:"Очистить",

save:"Сохранить PNG",

gallery:"Галерея"

},




en: {

title:"Pixel Art Studio",

theme:"Dark Mode",

colors:"Colors",

grid:"Grid",

brushText:"Brush Size",

pencil:"Pencil",

eraser:"Eraser",

clear:"Clear",

save:"Save PNG",

gallery:"Gallery"

}


};





function changeLanguage(lang){


document
.querySelectorAll("[data-lang]")
.forEach(item=>{


let key =
item.dataset.lang;


item.textContent =
langData[lang][key];


});



localStorage.setItem(
"language",
lang
);


}







document.addEventListener(
"DOMContentLoaded",
()=>{


document
.querySelectorAll("[data-language]")
.forEach(btn=>{


btn.onclick=()=>{


changeLanguage(
btn.dataset.language
);


};


});



let saved =
localStorage.getItem("language");


changeLanguage(
saved || "uz"
);



});