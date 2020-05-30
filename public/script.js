window.onload = function () {
  // global selector
  let cityData = document.querySelector(".city-data");
  let search = document.querySelector(".search");
  let display = document.querySelector(".display");
  // asynchronous function for sending city name.
  async function postData(place) {
    const data = {
      place: place,
    };
    const object = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch("/api", object);
    const resData = await response.json();
    if (resData.cod == "404") {
      alert("Enter valid city name");
      return;
    }
    //    console.log(resData);
    display.style.display = "block";
    let iconImg = document.querySelector(".icon-img");
    let dataDescription = document.querySelector(".data-description");
    let maxTemp = document.querySelector(".max-temp");
    let minTemp = document.querySelector(".min-temp");
    let mainTempData = document.querySelector(".main-temp-data");
    let placeData = document.querySelector(".place-data");
    let feelsLike = document.querySelector(".feels-like");
    let iconcode = resData.weather[0].icon;
    // adding data on client side
    iconImg.src = `http://openweathermap.org/img/wn/${iconcode}.png`;
    dataDescription.innerHTML = resData.weather[0].description;
    maxTemp.innerHTML = resData.main.temp_max;
    minTemp.innerHTML = resData.main.temp_min;
    mainTempData.innerHTML = resData.main.temp;
    feelsLike.innerHTML = resData.main.feels_like;
    //    let upperCasePlace = place.toUppercase()
    placeData.innerHTML = resData.name;
    // console.log(resData);
  }
  // adding listener on search box
  search.addEventListener("click", (e) => {
    e.preventDefault();
    if (cityData.value.trim().length > 0) {
      postData(cityData.value);
      cityData.value = "";
    } else {
      alert("Enter city name");
    }
  });
};

// if ("geolocation" in navigator) {
//   console.log("geolocation is available");
//   navigator.geolocation.getCurrentPosition(async (position) => {
//     const lat = position.coords.latitude;
//     const log = position.coords.longitude;
//     const data = { lat, log };
//     const object = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     };
//     const response = await fetch("/api", object);
//     const resData = await response.json();
//     console.log(resData);
//     console.log(resData.main.temp);
//   });
// } else {
//   console.log("geolocation not available");
// }
