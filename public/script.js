//Fetching PlanetTerp API
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const urlTerp = "https://api.planetterp.com/v1/grades?course=INST612"; // site that doesn’t send Access-Control-*
let TotalClassGPA = 0.0;

fetch(proxyurl + urlTerp) // https://cors-anywhere.herokuapp.com/https://example.com
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => {
      let total =
        item["A+"] * 4.0 +
        item["A"] * 4.0 +
        item["A-"] * 3.7 +
        item["B+"] * 3.3 +
        item["B"] * 3.0 +
        item["B-"] * 2.7 +
        item["C+"] * 2.3 +
        item["C"] * 2.0 +
        item["C-"] * 1.7 +
        item["D+"] * 1.3 +
        item["D"] * 1.0 +
        item["D-"] * 0.7;

      let numStudents =
        item["A+"] +
        item["A"] +
        item["A-"] +
        item["B+"] +
        item["B"] +
        item["B-"] +
        item["C+"] +
        item["C"] +
        item["C-"] +
        item["D+"] +
        item["D"] +
        item["D-"] +
        item["F"];

      TotalClassGPA += total / numStudents;
    });

    TotalClassGPA /= data.length;
    console.log(TotalClassGPA.toFixed(2));
    document.getElementById("avgGrade").innerHTML =
      "<b>" + "Average Grade: " + "</b>" + TotalClassGPA.toFixed(2);
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

/*
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
*/

//PREFERENCES JAVASCRIPT

const dep_api_url = "https://api.umd.io/v1/courses/departments?semester=202008";

window.onload = async function getDepartments() {
  //get department data from api
  const response = await fetch(dep_api_url);
  const json = await response.json();

  console.log(json);

  //create a list of departments
  var departments = json;
  var dep_list = [];
  for (var i = 0; i < departments.length; i++) {
    dep_list.push(departments[i].department);
  }

  //add department list to drop down menu
  var select = document.getElementById("grad-program");
  for (var i in dep_list) {
    var option = document.createElement("option");
    option.text = option.value = dep_list[i];
    select.add(option, 0);
  }

  console.log(dep_list);
  //document.getElementById('grad-program').innerHTML = dep_list ;
};
/// PREFERENCES END

// THIS IS THE SEARCH FILTERS JS DROP DOWNS
const sec_api_url = "https://api.umd.io/v1/courses/departments?semester=202008" // "https://api.umd.io/v1/courses"; // this will need to be several endpoints to allow for multiple

window.onload = async function getCourses() {
  //get department data from api
  const response = await fetch(cor_api_url);
  const json = await response.json();

  console.log(json);

  //create a list of departments
  var courses = json;
  var cor_list = [];
  for (var i = 0; i < courses.length; i++) {
    cor_list.push(courses[i].course);
  }

  //add department list to drop down menu
  var select = document.getElementById("section");
  for (var i in cor_list) {
    var option = document.createElement("option");
    option.text = option.value = cor_list[i];
    select.add(option, 0);
  }

  console.log(cor_list);
  //document.getElementById('grad-program').innerHTML = dep_list ;
};
// THIS IS THE SEARCH FILTERS JS DROP DOWNS



// THIS IS THE SEARCH FILTERS JS search bars
const course_endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
//"https://api.umd.io/v1/courses/departments?semester=202008";

const courses = [];

fetch(course_endpoint)
  .then(blob => blob.json())
  .then(data => courses.push(...data));

  /*
const instructor_endpoint = "https://api.umd.io/v1/courses"
const courses = [];
fetch(instructor_endpoint)
.then(blob => blob.json())
.then(data => section.push(...data));
*/

function findMatches(wordsToMatch, courses) {
    return courses.filter(course => {
        const regex = new RegExp(wordsToMatch, 'gi');
        return course.name.match(regex)
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value, courses);
    let HTMLmatches = []
    if (this.value.length == 0) { 
        HTMLmatches = [];
    } 
    else {HTMLmatches = matchArray.map((course) => `
        
    <li>
        <span class="name">${course.name}</span><br>
        </li>

    </li>`).join('');
    }
    suggestions.innerHTML = HTMLmatches;       
}
   
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('input', displayMatches);

// END SEARCH FILTERS JS search bars




// FUNCTIONS FOR REDIRECTING TO DIFFERENT PAGES
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
// END OF THE REDIRECTION SECTION


//getDepartments();

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
