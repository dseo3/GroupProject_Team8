// Creates and empty array for users fav course
mybookmarks = []; 
/* for each item in mybookmarks 
      add a card to the bookmarks page
      populate with API data

*/


//Main function does all the important stuff on load
async function main() {

  //Calling the Departments for the dropdown
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
    
  console.log(availCourses, "THIS IS WHERE THE MATCH HAPPENS")
  
  //parses api data into json value
  const courses = await availCourses.json(); 
  console.log("Courses in selected department", courses)
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


   

// Choose Button this confirms users program preference 
  form.addEventListener("submit", (event) => {
    
    event.preventDefault();
    
    console.log("HELLO?");

    //formdata = department names that the user selected
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

// Yomi's Code: for Preferences Departments Drop down at top of index/home page
const dep_api_url = "https://api.umd.io/v1/courses/departments?semester=202101";

async function getDepartments() {
  //get department data from api
  const response = await fetch(dep_api_url);
  const json = await response.json();

  console.log(json);

  //create a list of lists of departments
  var departments = json;
  //create a list of departments names
  var dep_list = [];

  //populates list of depatartment names
  for (var i = 0; i < departments.length; i++) {
    dep_list.push(departments[i].department);
  }

  //add department list to drop down menu
  var select = document.getElementById("grad-program");
  for (var i in dep_list) {
    var option = document.createElement("option");
    option.text = option.value = dep_list[i];
    select.add(option);
  }

  console.log("Dept_name_list", dep_list);

  var dep_code = []
  //populates list of depatartment ids
  for (var i = 0; i < departments.length; i++) {
    dep_code.push(departments[i].dept_id);
  
  /*
    // Isabeaus's Pagination attempts
    for (var i = 0; i < dep_code.length;) {  
      if (dep_code[i] === formdata[0].value) 
      {    return dep_code[i];  }}
  
  // Kennedy's Pagination psuedo for paginiation  
  var choosen_dep = [];
  for i in dep_code:
    if choosen_dep is in dep_code:
      const course_by_dept = "https://api.umd.io/v1/courses?dept_id="+choosen_dep;

  */



  }
  console.log("department ids", dep_code)


  
  //document.getElementById('grad-program').innerHTML = dep_list ;
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
    console.log("Class Average Grade:", TotalClassGPA.toFixed(2));
    document.getElementById("avgGrade").innerHTML =
      "<b>" + "Average Grade: " + "</b>" + TotalClassGPA.toFixed(2);
  });
}

//Show New Course Recommendation and Save To Bookmarks
function NewRecFromFave(courses){
  const favbutton = document.querySelector("#fav_button");
  favbutton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Tis my fave");
    const data = $(event.target).serializeArray();


    const randomfave = Math.floor(Math.random() * courses.length);
    console.log("saved course:", randomfave)

    courseID.innerHTML = courses[randomfave].course_id;
    courseTitle.innerHTML = courses[randomfave].name;
    credit.innerHTML = courses[randomfave].credits;
    gened.innerHTML = courses[randomfave].gen_ed;
    method.innerHTML = courses[randomfave].grading_method;
    description.innerHTML = courses[randomfave].description;
    avgGPA(courses[randomfave].course_id);

    // send random course to server.js
    // create new put endpoint 
    // empty array
    //send request

    /* Alternative Gabe's suggestion
    > Create empty array at top test.js
    > Send randomfave to that array 
    > Load in bookmarks
    > Might have reviste remove function and delete from aray 
    */

    //Each time you click fave button send that course to 
    //the mybookmarks array
    mybookmarks.push(randomfave);
    console.log("bookmarks:", mybookmarks);

    // bookmark_item.innerHTML = courses[randomfave].course_id;
    // bookmark_title.innerHTML = courses[randomfave].name;
    

  });
};

//Testing if the next 7 line this will pop in bookmarks
/*
mybookmarks.forEach(favecourse => {
  const target = document.querySelector(".saves") 
  let li = availCourses.map((s-course) => `<li id="saved_couse">
  <div class="tile is-parent" >
      <div class="tile is-child box" id="saved-course">
        <div id="course-info">
          <p class="title" id="bookmark_item"> <b>${s-course.course_id}</b> <small id="bookmark-title">${s-course.name}</small></p>
          <button class="bookmark_button" onclick="removeSavedCourse()"> <i class="fas fa-bookmark fa-2x"></i> </button>
        </div>
          <div class="course-stats">
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child box" id="course-stat">
                <p class="title" id="credit">${s-course.credits}</p>
                <p class="subtitle">Credits</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box" id="course-stat">
                <p class="title" id="gened">${s-course.gen_ed}</p>
                <p class="subtitle">Gen-Ed</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box" id="course-stat">
                <p class="title" id="method">${s-course.grading_method}</p>
                <p class="subtitle">Grading Method</p>
              </article>
            </div>
          </div>
        </div>
        <div class="learn-more-button">  
          <a href="course.html" class="learn">
            <button class="learn-more">Learn More</button>
          </a> 
        </div>              
      </div>
    </div>
</li>`);

}); 
*/


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


window.onload = main;


