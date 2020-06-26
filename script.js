//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  mySelection(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  let createH3;
  let createImage;
  let TheMainParentDiv;
  let TheChildDiv;
  let createPara;

  //Create the parent div
  TheMainParentDiv = document.createElement("div");
  TheMainParentDiv.className += "parentDiv";

  //loop through the list and display it in to the screen
  episodeList.forEach((Element) => {
    createH3 = document.createElement("h3");
    createH3.className += "my-h3";
    createImage = document.createElement("img");
    createImage.className += "image-ul";
    createImage.src = Element.image.medium;
    createPara = document.createElement("p");
    createPara.className += "summery-class";
    createPara.innerHTML = Element.summary;
    //Create Div Child to append it to the parentDiv
    TheChildDiv = document.createElement("div");
    TheChildDiv.className += "TheChildDiv";

    //Show the number of seasons and episodes eg: Winter is Coming - S01E01
    createH3.textContent = createTitle(
      Element.name,
      Element.season,
      Element.number
    );
    //another solution
    // if (Element.number < 10) {
    //     // Element.name + " S0" + Element.season + "E0" + Element.number;
    // } else {
    //   createH3.textContent =
    //     Element.name + " S0" + Element.season + "E" + Element.number;
    // }

    //append all elements into the HTML page
    TheChildDiv.appendChild(createH3);
    TheChildDiv.appendChild(createImage);
    TheChildDiv.appendChild(createPara);
    TheMainParentDiv.appendChild(TheChildDiv);
    rootElem.appendChild(TheMainParentDiv);
  });

  //create Search input
  let searchBar = document.forms["Search-episode"].querySelector("input");
  let episodes = document.querySelectorAll(".TheChildDiv");
  let newEpisodes = Array.from(episodes);
  //display number of episodes
  let getNumOfEpisodes = document.getElementById("myEpisode");
  getNumOfEpisodes.innerHTML = `Display: ${episodes.length}/ ${episodes.length}`;

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
    getNumOfEpisodes.innerHTML = `Display: ${newArray.length}/ ${episodeList.length}`;
  });

  // Create footer
  let createFooter = document.createElement("footer");
  createFooter.className += "footer-styling";
  let createParaFooter = document.createElement("P");
  createParaFooter.textContent = "This page is originally came from TV Maze";
  createParaFooter.textContent += " and designed by Altom";
  createFooter.appendChild(createParaFooter);
  rootElem.appendChild(createFooter);
}
// Select episodes
let getSelection = document.getElementById("select-episodes");
let episodes = document.querySelectorAll(".TheChildDiv");
//new function for the dropdown menu
function mySelection(episodeList) {
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Select All";
  getSelection.appendChild(defaultOption);
  episodeList.forEach((p) => {
    let createOption = document.createElement("option");
    createOption.textContent = createTitle(p.name, p.season, p.number);
    //another solution
    // if (p.number < 10) {
    //   createOption.textContent = p.name + " S0" + p.season + "E0" + p.number;
    // } else {
    //   createOption.textContent = p.name + " S0" + p.season + "E" + p.number;
    // }
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
    let getNumOfEpisodes = document.getElementById("myEpisode");
    getNumOfEpisodes.innerHTML = `Display: ${newArray.length}/ ${list.length}`;
  });
}
function createTitle(name, season, episode) {
  if (episode < 10) {
    return name + " - S0" + season + "E0" + episode;
  } else {
    return name + " - S0" + season + "E" + episode;
  }
}
window.onload = setup;
