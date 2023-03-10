let cityArr =  [];

let maxCityCount = 10;

fetchDataStorage();


function getInfo () {
    let newCityName = document.getElementById("cityInput");
    let a = 0;

    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + newCityName.value + '&appid=16bf99a8ab616d1c4cda345fcef86dbf')
    .then(response => response.json())
    .then(data => {

        for(i = 0, a = 0; i < 40 && a < 5; i += 8, a++) {
            document.getElementById('day' + (a+1) + 'Min').innerHTML = 'Min: ' + Math.round(data.list[i].main.temp_min - 273.15) + "°";
        }
        for(i = 0, a = 0; i < 40 && a < 5; i += 8, a++) {
            document.getElementById('day' + (a+1) + 'Max').innerHTML = 'Max: ' + Math.round(data.list[i].main.temp_max - 273.15) + "°";
        }

        for(i = 0, a = 0; i < 40 && a < 5; i += 8, a++) {
            document.getElementById('img' + (a+1)).src = "http://openweathermap.org/img/wn/" +
            data.list[i].weather[0].icon + '.png'  ;

        }
        for(i = 0, c = 0; i < 40 && c < 5; i += 8, c++) {
            document.getElementById('descr' +(c+1)).innerHTML = (data.list[i].weather[0].main)
        }
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1920x1080/?" + newCityName.value + "')";

        cityArr.unshift(newCityName.value);

        updateDataStorage();

        console.log(data);
        // console.log(cityArr);
        popup.classList.remove('popup_open');
    }).catch(err => alert("Something Went Wrong: Try Checking Your Internet Connection"))
}

function defaultScreen() {
    document.getElementById("cityInput").defaultValue = "Hrodna";
    getInfo();
}

let d = new Date();
let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

// checkday
function checkDay(day) {
    if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}

    for (b = 0; b < 5; b++) {
        document.getElementById("day" + (b+1)).innerHTML = weekday[checkDay(b)];
    }
// press enter
    document.getElementById("cityInput")
        .addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                getInfo();
                popup.classList.remove('popup_open');
            }
        })


// localStorage logic
function showLastSearch () {
    let ex = "";
    for (let i = 0; i < Math.min(maxCityCount, cityArr.length); i++) {
        ex += cityArr[i] + " ";
    }
}

function updateDataStorage() {
    for (let i = 0; i < Math.min(maxCityCount, cityArr.length); i++) {
        localStorage.setItem("city" + i, cityArr[i]);
    }

    document.querySelector(".popup_text").innerHTML =
        localStorage.getItem("city0") + ' ' +
        localStorage.getItem("city1") + ' ' +
        localStorage.getItem("city2") + ' ' +
        localStorage.getItem("city3") + ' ' +
        localStorage.getItem("city4") + ' ' +
        localStorage.getItem("city5") + ' ' +
        localStorage.getItem("city6") + ' ' +
        localStorage.getItem("city7") + ' ' +
        localStorage.getItem("city8") + ' ' +
        localStorage.getItem("city9")
}

function fetchDataStorage() {
    let size = localStorage.getItem("cityCount");
    if (size == null) {
        size = 0;
    }
    for (let i = 0; i < size; i++) {
        cityArr[i] = localStorage.getItem("city" + i)
    }
    for(let i = 0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        console.log(`${key}: ${localStorage.getItem(key)}`);
    }
}
// popup
const listenerforCartButton = document.getElementById('localStorageButton')
const popup = document.getElementById('popup');
const findPopupCloseButton = document.getElementById('closeButton');

listenerforCartButton.addEventListener('click', (event) => {
    event.preventDefault();
    popup.classList.add('popup_open');
})
findPopupCloseButton.onclick = function () {
    popup.classList.remove('popup_open');
}