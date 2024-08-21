const currentDate = new Date();
let day = currentDate.getDate() - 1;
let month = currentDate.getMonth() + 1;
let year = currentDate.getFullYear();
// console.log(day);

const selectElement = document.querySelector("#countries");
const selectElementCity = document.querySelector("#cities");

document.addEventListener("DOMContentLoaded", () => {
    const selectDrop = document.querySelector("#countries");

    axios
        .get(`https://countriesnow.space/api/v0.1/countries/positions`)
        .then(function (response) {
            // handle success
            let countries = response.data.data;
            // console.log(countries);
            let output = "";
            countries.forEach((country) => {
                output += `

            <option value="${country.name}">${country.name}</option>`;
            });

            selectDrop.innerHTML = output;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
});

let country;
selectElement.addEventListener("change", (event) => {
    countrySelected = event.target.value;
    // console.log(event.target.value);
    const selectDropCity = document.querySelector("#cities");
    axios
        .get(
            `https://countriesnow.space/api/v0.1/countries
    `
        )
        .then(function (response) {
            // handle success
            let countries = response.data.data;

            let outputCity = "";
            countries.forEach((country) => {
                if (country.country == countrySelected) {
                    // console.log(country.cities);
                    cities = country.cities;
                    cities.forEach((city) => {
                        outputCity += `
                        <option value="${city}">${city}</option>`;
                        // console.log(city);
                    });

                    selectDropCity.innerHTML = outputCity;
                }
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
});
let theCity;
selectElementCity.addEventListener("change", (event) => {
    // console.log(event.target.value);
    theCity = event.target.value;
    console.log(countrySelected);
    console.log(theCity);
    axios
        .get(
            `http://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${theCity}&country=${countrySelected}&method=2`
        )
        .then(function (response) {
            // handle success
            let timings = response.data.data[day].timings;

            let fajr = document.getElementById("fajr-time");
            fajr.innerHTML = `${timings.Fajr}`;
            let sunrise = document.getElementById("sunrise-time");
            sunrise.innerHTML = `${timings.Sunrise}`;
            let dhur = document.getElementById("dhur-time");
            dhur.innerHTML = `${timings.Dhuhr}`;
            let asr = document.getElementById("asr-time");
            asr.innerHTML = `${timings.Asr}`;
            let maghrib = document.getElementById("maghrib-time");
            maghrib.innerHTML = `${timings.Maghrib}`;
            let isha = document.getElementById("Isha-time");
            isha.innerHTML = `${timings.Isha}`;
            // console.log(response.data.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
});
const date = new Date();
document.getElementById("date").innerHTML = date.toUTCString();
console.log(date);
