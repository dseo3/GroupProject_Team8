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

function pageRedirectHome() {
  window.location.href = "home.html";
}

function pageRedirectCourse() {
    window.location.href = "course.html";
}

function pageRedirectBookmarks() {
    window.location.href = "bookmarks.html";
}

function pageRedirectPreferences() {
    window.location.href = "preferences.html";
}

function pageRedirectIndex() {
    window.location.href = "index.html";
}
    
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('input', displayMatches);

/*
var dropdown = document.querySelector('dropdown');
dropdown.addEventListener('click', function(event) {
event.stopPropagation();
dropdown.classList.toggle('is-active');
});
*/

/*
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
});

*/

/*
function dropDownSelect() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
*/

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */


/*function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
*/
/*
var dropdown = document.querySelector('.dropdown');
dropdown.classList.toggle('is-active');



  var $dropdowns = getAll('.dropdown is-active');

  if ($dropdowns.length > 0) {
    $dropdowns.forEach(function ($el) {
      $el.addEventListener('click', function (event) {
        event.stopPropagation();
        $el.classList.toggle('is-active');
      });
    });

    document.addEventListener('click', function (event) {
      closeDropdowns();
    });
  }

  function closeDropdowns() {
    $dropdowns.forEach(function ($el) {
      $el.classList.remove('is-active');
    });
  }
*/