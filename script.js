const rootElem = document.getElementById("root");
// the search input
let searchBar = document.forms["Search-episode"].querySelector("input");
// Select episodes
let getSelection = document.getElementById("select-episodes");
// create select shows drop down menu
let getShowSelected = document.getElementById("select-shows");
// addEventListener for the select show drop down menu
getShowSelected.addEventListener("change", fetchingData);

let getMyBtn = document.getElementById("myBtn");
getMyBtn.addEventListener("click", setup);

function setup() {
  let allShows = getAllShows();

  let orderOfShows = allShows.sort((a, b) => a.name.localeCompare(b.name));
  getSelection.style.display = "none";
  displayShows(orderOfShows);
  displayShowsOnScreen(orderOfShows);
  // fetchingData();
}

function displayingNumOfEpisodes(num, total) {
  let getNumOfEpisodes = document.getElementById("myEpisode");
  getNumOfEpisodes.innerHTML = `Display: ${num.length}/ ${total.length} episodes`;
}

function displayingNumOfShow(num, total) {
  let getNumOfEpisodes = document.getElementById("myEpisode");
  getNumOfEpisodes.innerHTML = `Display: ${num.length}/ ${total.length} shows`;
}

function makePageForEpisodes(episodeList) {
  rootElem.innerHTML = "";
  getSelection.style.display = "";
  //Create the parent div
  let TheMainParentDiv = document.createElement("div");
  TheMainParentDiv.className += "parentDiv";

  //loop through the list and display it in to the screen
  episodeList.forEach((Element) => {
    TheChildDiv = document.createElement("div");
    TheChildDiv.className += "TheChildDiv";
    let createH3 = document.createElement("h3");
    createH3.className += "my-h3";
    let createPara = document.createElement("p");
    let createImage = document.createElement("img");
    createImage.className += "image-ul";

    if (Element.image) {
      createImage.src = Element.image.medium;
    } else {
      createImage.src =
        "https://thefittingsource.com/wp-content/uploads/2017/12/temp-inventory-landing.jpg";
    }
    if (Element.summary) {
      createPara.innerHTML = Element.summary;
    } else {
      createPara.innerHTML = "Sorry there is no summer available";
    }

    //Show the number of seasons and episodes eg: Winter is Coming - S01E01
    createH3.textContent = showNameAndEpisodes(
      Element.name,
      Element.season,
      Element.number
    );
    //append all elements into the HTML page
    TheChildDiv.appendChild(createH3);
    TheChildDiv.appendChild(createImage);
    TheChildDiv.appendChild(createPara);
    TheMainParentDiv.appendChild(TheChildDiv);
    rootElem.appendChild(TheMainParentDiv);
  });

  //calling functions from outside
  footerFunc();
  mySearchBox(episodeList);
  displayingNumOfEpisodes(episodeList, episodeList);
}

function mySearchBox(search) {
  let episodes = document.querySelectorAll(".TheChildDiv");
  let newEpisodes = Array.from(episodes);
  //display number of episodes
  searchBar.addEventListener("keyup", function (e) {
    let searchTerm = e.target.value.toLowerCase();

    newEpisodes.forEach(function (item) {
      let getTheTextFromDiv = item.innerText;
      if (getTheTextFromDiv.toLowerCase().indexOf(searchTerm) !== -1) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
    //redisplay number of filtered episodes from the searchBar
    let newArray = newEpisodes.filter((val) => val.style.display === "block");
    displayingNumOfEpisodes(newArray, newEpisodes);
  });
}

//new function for the dropdown menu
function selection(episodeList) {
  // to make list empty and replace it with the new selection
  getSelection.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Select All";
  getSelection.appendChild(defaultOption);
  episodeList.forEach((p) => {
    let createOption = document.createElement("option");
    createOption.textContent = showNameAndEpisodes(p.name, p.season, p.number);
    getSelection.appendChild(createOption);
  });
  //add eventListener for dropdown menu
  getSelection.addEventListener("change", function (event) {
    let choose = event.target.value;
    let episodes2 = document.querySelectorAll(".TheChildDiv");
    Array.from(episodes2).forEach((p) => {
      let myEl = p.firstElementChild.textContent;
      if (myEl === choose || choose === "Select All") {
        p.style.display = "block";
      } else {
        p.style.display = "none";
      }
    });
    let list = Array.from(episodes2);
    let newArray = list.filter((val) => val.style.display === "block");
    displayingNumOfEpisodes(newArray, list);
  });
}

//footer function
function footerFunc() {
  let createFooter = document.createElement("footer");
  createFooter.className += "footer-styling";
  let createParaFooter = document.createElement("P");
  createParaFooter.textContent = "This page is originally came from TV Maze";
  createParaFooter.textContent += " and designed by Altom";
  createFooter.appendChild(createParaFooter);
  rootElem.appendChild(createFooter);
}
// This function displaying the header eg: winter is coming S01E01
function showNameAndEpisodes(name, season, episode) {
  if (episode < 10) {
    return name + " - S0" + season + "E0" + episode;
  } else {
    return name + " - S0" + season + "E" + episode;
  }
}

function displayShows(shows) {
  shows.forEach((show) => {
    let createOption = document.createElement("option");
    createOption.innerText = show.name;
    createOption.value = show.id;
    getShowSelected.appendChild(createOption);
  });
}
//Fetching data
function fetchingData() {
  let source = `https://api.tvmaze.com/shows/${getShowSelected.value}/episodes`;
  fetch(source)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      makePageForEpisodes(data);
      selection(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// level 500
function displayShowsOnScreen(showOnScreen) {
  let createParenDiv = document.createElement("div");
  showOnScreen.forEach((show) => {
    let createChildDiv = document.createElement("div");
    createChildDiv.id = "showProfile";
    let createSpanDiv = document.createElement("div");
    createSpanDiv.className = "span-style";
    let contentDiv = document.createElement("div");
    contentDiv.id = "style-content";
    let createH1 = document.createElement("h1");
    createH1.className = "style-head";
    let createImage = document.createElement("img");
    createImage.className = "style-image";
    let summery = document.createElement("p");
    summery.className = "summer-style";
    let rated = document.createElement("p");
    let genres = document.createElement("p");
    let status = document.createElement("p");
    let runTime = document.createElement("p");
    createH1.innerText = show.name;
    summery.innerHTML = show.summary;
    if (show.image) {
      createImage.src = show.image.medium;
    } else {
      createImage.src =
        "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg";
    }
    rated.innerText = `Rated: ${show.rating.average} `;
    genres.innerHTML = `Genres: ${show.genres.toString().replace(/,/g, "|")} `;
    status.innerText = `Status: ${show.status} `;
    runTime.innerText = `RunningTime: ${show.runtime} `;
    createChildDiv.appendChild(createH1);
    // createChildDiv.appendChild(createImage);
    // createChildDiv.appendChild(summery);
    contentDiv.appendChild(createImage);
    contentDiv.appendChild(summery);
    createSpanDiv.appendChild(rated);
    createSpanDiv.appendChild(genres);
    createSpanDiv.appendChild(status);
    createSpanDiv.appendChild(runTime);
    // createChildDiv.appendChild(createSpanDiv);
    contentDiv.appendChild(createSpanDiv);
    createChildDiv.appendChild(contentDiv);
    console.log(contentDiv);
    createParenDiv.appendChild(createChildDiv);
    rootElem.appendChild(createParenDiv);
  });

  inputSearch();
  displayingNumOfShow(showOnScreen, showOnScreen);
}
function inputSearch() {
  let mainDiv = document.querySelectorAll("#showProfile");
  let array = Array.from(mainDiv);
  searchBar.addEventListener("keyup", function (e) {
    let searchTerm = e.target.value.toLowerCase();

    array.forEach(function (item) {
      let getTheTextFromDiv = item.innerText;
      if (getTheTextFromDiv.toLowerCase().indexOf(searchTerm) !== -1) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
    // display number of filtered episodes from the searchBar
    let newArray = array.filter((val) => val.style.display === "block");
    displayingNumOfEpisodes(newArray, array);
  });
}

window.onload = setup;
