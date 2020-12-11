//Prefrences Dropdown Bar 
async function main() {

  //Yomi's function that gets the departments for the dropdown 
  await getDepartments();


  const page = 147;
  const data = await fetch("https://api.umd.io/v1/courses?semester=202008");
  //parses api data into json value
  const courses = await data.json(); 
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
    //creating a new constant 

    //list of courses that matches that department 
    const availCourses = courses
    
    // math.random look at lab 2 
    .filter(course => {

        console.log(formdata[0].value)
        console.log(course.department)
        console.log(course)
        return course.department === formdata[0].value})

    console.table(availCourses)
    console.log("yooooo");
    console.log(availCourses);
    
    //When user chooses a program, the page gets updated with corresponding data
    const random = Math.floor(Math.random() * availCourses.length); 
    courseID.innerHTML = availCourses[random].course_id;
    courseTitle.innerHTML = availCourses[random].name;
    credit.innerHTML = availCourses[random].credits;
    gened.innerHTML = availCourses[random].gen_ed;
    method.innerHTML = availCourses[random].grading_method;
    description.innerHTML = availCourses[random].description;
    avgGPA(availCourses[random].course_id);
   
    NewRecFromFave(availCourses);
    NewRecFromX(availCourses);
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
function NewRecFromFave(availCourses){
  const favbutton = document.querySelector("#fav_button");
  favbutton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Tis my fave");
    const data = $(event.target).serializeArray();

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
const dep_api_url = "https://api.umd.io/v1/courses/departments?semester=202008";

async function getDepartments() {
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
    select.add(option);
  }

  console.log(dep_list);
  //document.getElementById('grad-program').innerHTML = dep_list ;
}


window.onload = main;
