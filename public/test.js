//Prefrences Dropdown Bar 
async function main() {

  //Yomi's function that gets the departments for the dropdown 
  await getDepartments();

  // STUFF ISABEAU ADDED FOR STRING FORMATTING THE URL
  const dept_id_here = document.forms[0].elements[0];
  //No longer Spaghetti code yay!
  const dept_id_for_data = dept_id_here.value.substring(0,4);
  console.log("Selected Department Code:", dept_id_for_data);
  // Just stringing together the API url here before we fetch the data 
  const pref_api = "https://api.umd.io/v1/courses?dept_id=" + dept_id_for_data

  console.log("API url is", pref_api)

  
  const availCourses = await fetch(pref_api); 
  // PREVIOUSLY"https://api.umd.io/v1/courses?semester=202008");
    
  console.log(availCourses, "THIS IS WHERE THE MATCH HAPPENS")
  
  //parses api data into json value
  const courses = await availCourses.json(); 
  console.log("Does this work", courses)
  const searchInput = document.querySelector(".search");  //TBD not being used right now -> will be used for serach page 
  const suggestions = document.querySelector(".suggestions"); //not being used right now
  const favbutton = document.querySelector("#fav_button");
  const form = document.querySelector(".course_select");
  const program = document.querySelector("#program");
  const courseID = document.querySelector("#courseID");
  const courseTitle = document.querySelector("#courseTitle");
  const credit = document.querySelector("#credit");
  const gened = document.querySelector("#gened");
  const method = document.querySelector("#method");
  const description = document.querySelector("#description");


   


  form.addEventListener("submit", (event) => {
    
    event.preventDefault();
    
    console.log("HELLO?");

    //formdata = department names 
    const formdata = $(event.target).serializeArray();
    console.log("djiasjdf")
    console.log(formdata);

     //When user chooses a program, the page gets updated with corresponding data
     const random = Math.floor(Math.random() * courses.length); 
     courseID.innerHTML = courses[random].course_id;
     courseTitle.innerHTML = courses[random].name;
     credit.innerHTML = courses[random].credits;
     gened.innerHTML = courses[random].gen_ed;
     method.innerHTML = courses[random].grading_method;
     description.innerHTML = courses[random].description;
     avgGPA(courses[random].course_id);
    
     NewRecFromFave(courses);
     NewRecFromX(courses);
  


    //list of courses that matches that department 
    /*
    const availCourses = courses.filter(course => {

        console.log(formdata[0].value)
        console.log(course.department)
        console.log(course)
        return course.department === formdata[0].value})

    console.table(availCourses)
    console.log("yooooo");
    console.log(availCourses);
    */
    
  });

  
}

function displayPage() {
  
}
function avgGPA(course_id) {
  //Fetching PlanetTerp API
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const urlTerp = "https://api.planetterp.com/v1/grades?course=" + course_id ; // site that doesn’t send Access-Control-*
  let TotalClassGPA = 0.0;

  fetch(proxyurl + urlTerp) // https://cors-anywhere.herokuapp.com/https://example.com

  .then((response) => response.json())
  .then((data) => { // i know you've done this with data but alex explicitly said it needs to be avail courses
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
}

//Show New Course Recommendation and Save To Bookmarks
function NewRecFromFave(courses){
  
  const favbutton = document.querySelector("#fav_button");
  favbutton.addEventListener("click", (event) => {

    // ISABEAU APPEND TO BOOKMARKS
    // $("#courseTitle").clone().appendTo($("#saves"));
    $("#for_bookmarks").clone().appendTo($("#saves"));
    $("#course-stat").clone().appendTo($("#saves"));
    
    event.preventDefault();
    console.log("Tis my fave");
    const data = $(event.target).serializeArray();

    // send this random course to server.js
    // create new put endpoint 
    // empty array
    //send request

    /* Alternative 
    > Create empty array at top test
    > Send random to that array 
    > Load in bookmarks
    > Might have reviste remove function and delete from aray 
    */
    const random = Math.floor(Math.random() * courses.length); 
    courseID.innerHTML = courses[random].course_id;
    courseTitle.innerHTML = courses[random].name;
    credit.innerHTML = courses[random].credits;
    gened.innerHTML = courses[random].gen_ed;
    method.innerHTML = courses[random].grading_method;
    description.innerHTML = courses[random].description;
    avgGPA(courses[random].course_id);



   
  });
};

function NewRecFromX(availCourses){
  const favbutton = document.querySelector(".float-x");
  favbutton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Don't Like Dis");
    // let coursecode1 = document.getElementById("code");
    const random = Math.floor(Math.random() * availCourses.length); 
    courseID.innerHTML = availCourses[random].course_id;
    courseTitle.innerHTML = availCourses[random].name;
    credit.innerHTML = availCourses[random].credits;
    gened.innerHTML = availCourses[random].gen_ed;
    method.innerHTML = availCourses[random].grading_method;
    description.innerHTML = availCourses[random].description;
    avgGPA(availCourses[random].course_id);
   
  })
}

function findMatches(wordsToMatch, courses) {
  return courses.filter((course) => {
    const regex = new RegExp(wordsToMatch, "gi");
    return course.name.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, courses);
  if (matchArray.length === 0) {
    console.log("no matches");
    return [];
  }
  const HTMLmatches = matchArray.map((course) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.className = "name";
    span.innerText = course.name;
    li.append(span);
    return li;
  });

  return HTMLmatches;
}

// Yomi's Code: for Preferences Departments Drop down at top of index/home page
const dep_api_url = "https://api.umd.io/v1/courses/departments?semester=202101"; // I ALSO CHANGED THE SEMESTER HERE - ISABEAU

async function getDepartments() {
  //get department data from api
  const response = await fetch(dep_api_url);
  const json = await response.json();

  console.log(json);


  //create a list of departments
  var departments = json;
  var dep_list = [];
  for (var i = 0; i < departments.length; i++) {
    dep_list.push([departments[i].dept_id + " - " + departments[i].department]); // I ALSO CHANGED THIS HERE! - ISABEAU
  }

  //add department list to drop down menu
  var select = document.getElementById("grad-program");
  for (var i in dep_list) {
    var option = document.createElement("option");
    option.text = option.value = dep_list[i];
    select.add(option);
  }

  console.log(dep_list);
  //document.getElementById('grad-program').innerHTML = dep_list ;
}

//Removing saved course when you click the bookmark button
function removeSavedCourse() {
  console.log("removing course warning");
  // BOOKMARKS REMOVE BUTTON -ISABEAU
  const savedcourse = document.getElementsById("#for_bookmarks");
  savedcourse.remove();
}

// REPLACE THIS WITH QUERY SELECTOR
function show(shown, hidden) {
  document.getElementById(shown).style.display='block';
  document.getElementById(hidden).style.display='none';
  return false;
}

// favbutton.addEventListener("click", (event) => {
  // function copybook() {

    // THIS IS THE ORIGINAL BUTTON FOR TESTING IT WILL NEED TO GO INTO 
    // <a href="#" onclick="copybook()">
    // <button> CLICK ME! </button> 
    // </a>

    // $("#for_bookmarks").clone().appendTo($("#saves"));

    // $(".learn").clone().appendTo($("#saves"));
    // const bookmark_button = document.createElement("button");

    // const span = document.createElement("span");
    // span.className = "name";
    // span.innerText = course.name;
    // li.append(span);
    // return li;

    // <button class="bookmark_button" onclick="removeSavedCourse()"> <i class="fas fa-bookmark fa-2x"></i> </button>

  

  // PUTTING HTML ON THE PAGE
  //let bookmark_item = []
  //   bookmark_item = bookmarksfromDongyeon.map((favorite_item) => `  
  //   <div class="tile is-parent">
  //     <article class="tile is-child box" id="course-stat">
  //       <p class="title" id="gened">N/A</p>
  //       <p class="subtitle">${favorite_item.name}</p>
  //     </article>
  //   </div>
  //  `).join("");

  //   bookmarks_card.innerHTML = bookmark_item; 
  //   console.log(bookmark_item)   
  //   const bookmarks_card = document.querySelector('.saves');
  // }


removeSavedCourse;

window.onload = main;