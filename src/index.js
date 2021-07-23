console.log('%c HI', 'color: firebrick');

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
let breedList;

function fetchImages() {
  return fetch(imgUrl)
  .then(resp => resp.json())
  .then(json => renderImages(json));
};

function renderImages(json) {
  json.message.forEach(url => {
   const img = document.createElement('img');
   img.src = url;
   document.body.appendChild(img)
  })
};

function fetchBreeds() {
  return fetch(breedUrl)
  .then(resp => resp.json())
  .then(json => renderBreeds(json));
};

function renderBreeds(json) {
  const hash = json.message
  
  const breedKeys = Object.keys(hash)
  breedKeys.forEach(breed => {
    console.log(breed);
    breedList = document.getElementById('dog-breeds');
    const li = document.createElement('li');
    li.innerHTML = `<li>${breed}</li>`;
    breedList.appendChild(li);

    li.addEventListener("click", function() {
      li.style.color = "blue";
    })
  });
};

document.addEventListener('DOMContentLoaded', function() {
  fetchImages();
  fetchBreeds();

  const selectEle = document.getElementById("breed-dropdown")
  selectEle.addEventListener('change', handleFilter);
  function handleFilter(e) {

    let selected = e.target.value
    let allBreeds = breedList.querySelectorAll("li");
    for (i = 0; i < allBreeds.length ; i++) {
      let thisLi = allBreeds[i];
      if (selected === "all") {
        thisLi.style.display = "list-item";
      } else if (thisLi.innerText.charAt(0) === selected) {
        thisLi.style.display = "list-item";
      } else {
        thisLi.style.display = "none";
      }
    };
  };
});