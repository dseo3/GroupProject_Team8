const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const restaurants = [];
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => restaurants.push(...data));

function findMatches(wordsToMatch, restaurants) {
    return restaurants.filter(place => {
        const regex = new RegExp(wordsToMatch, 'gi');
        return place.name.match(regex) || place.zip.match(regex)
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value, restaurants);
    let placesHTML = []
    if (this.value.length == 0) { 
        placesHTML = [];
    } 
    else {placesHTML = matchArray.map((place) => `
        
    <li>
        <span class="name">${place.name}</span><br>
        <span class="category">${place.category}</span>
        <address>${place.address_line_1}<br>
        ${place.city}<br>
        ${place.zip}<address>
        </li>

    </li>`).join('');
    }
    suggestions.innerHTML = placesHTML;       
}
    
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('input', displayMatches);


const search = document.querySelector('.dropdown');

search.addEventListener('click', async (e) => {
  e.preventDefault();
  const form = $(e.target).serializeArray();
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
    
      console.log(fromServer)
})
.catch((err) => console.log(err));
<<<<<<< HEAD
});
=======
});
>>>>>>> b86b43c3bfc1857660e5da740d4e4117dadc98d8
