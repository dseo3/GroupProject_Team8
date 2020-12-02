//Fetching PlanetTerp API
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const urlTerp = "https://api.planetterp.com/v1/grades?course=INST612"; // site that doesn’t send Access-Control-*
let TotalClassGPA = 0.0;

fetch(proxyurl + urlTerp) // https://cors-anywhere.herokuapp.com/https://example.com
  .then((response) => response.json())
  .then((data) => { 
    data.forEach(item => {
     
      let total = item['A+'] * 4.0 + item['A'] * 4.0 + item['A-'] * 3.7 +
       item['B+'] * 3.3 + item['B'] * 3.0 + item['B-'] * 2.7
       + item['C+'] * 2.3 + item['C'] * 2.0 + item['C-'] * 1.7 + 
       item['D+'] * 1.3 + item['D'] * 1.0 + item['D-'] * 0.7;

      let numStudents = item['A+'] + item['A'] + item['A-'] + 
      item['B+'] + item['B'] + item['B-'] +
      item['C+'] + item['C'] + item['C-'] +
      item['D+'] + item['D'] + item['D-'] + 
      item['F'] 

      TotalClassGPA += (total/numStudents);
     
    });

    TotalClassGPA /= data.length;
    console.log(TotalClassGPA.toFixed(2));
    avgGrade.innerHTML = "<b>" + "Average Grade: " + "</b>" + TotalClassGPA.toFixed(2);

  });
  
/* this is assignment 2 js
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
*/



//preferences dropdown bar

let dropdown = $('#grad-program');

dropdown.empty();

dropdown.append('<option selected="true" disabled>Choose Your Program</option>');
dropdown.prop('selectedIndex', 0);

const url = 'https://api.umd.io/v1/courses';

// Populate dropdown majors
$.getJSON(url, function (data) {
  $.each(data, function (key, courses) {
    dropdown.append($('<option></option>').attr('value', courses.dept_id).text(courses.department));
  })
});


//fetching for department data
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const dep_api_url = 'https://api.planetterp.com/v1/courses?department=MATH&limit=1' ;

              fetch('https://api.planetterp.com/v1/courses?department=MATH&limit=1',
        {
          method: 'GET'

        })
        .then(function(res) {
            return res.json();
        }).then(function(body) {
            console.log(body);
        });


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


