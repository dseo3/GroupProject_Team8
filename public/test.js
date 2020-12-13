let courses = []; //ADDED DONGYEON
let bookmark = []; // ADDDED DONGYEON
let currCourse = new Object(); //ADDED DONGYEON


//Prefrences Dropdown Bar 
async function main() {
  if (document.querySelector('#tester_option').text === "") {
  //Yomi's function that gets the departments for the dropdown 
  await getDepartments();
  console.log(document.querySelector('#tester_option').text);
  }  
  // }

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
    console.log("Courses within selected department", courses)
    
    const favbutton = document.querySelector("#fav_button");
    const form = document.querySelector(".course_select");
    const program = document.querySelector("#program");
    const courseID = document.querySelector("#courseID");
    const courseTitle = document.querySelector("#courseTitle");
    const credit = document.querySelector("#credit");
    const gened = document.querySelector("#gened");
    const method = document.querySelector("#method");
    const description = document.querySelector("#description");
    const random = Math.floor(Math.random() * courses.length); 


    


    form.addEventListener("submit", (event) => {
      
      event.preventDefault();
      
      console.log("HELLO?");
      const avgGPAitem = avgGPA(courses[random].course_id)
      console.log(avgGPAitem)
        const course_popup = document.querySelector(".course-rec");
        course_popup.innerHTML = 
        `<!-- Course Code and Title -->
      <div id="for_bookmarks">
        <div class='course-title-home' > 
          <div class="tile is-parent" >
            <div class="tile is-child box" id="course-code">
              <p class="title" id="courseID">${courses[random].course_id}</p>
              <p class="subtitle" id="courseTitle">${courses[random].name}</p>
            </div>
          </div>
        </div>
      
      <!-- THIS IS THE TILE I ADDED - ISABEAU  
      <div class="tile is-child box" id="saved-course"> -->
      <!-- Course Stat Tiles -->
          <div class="course-stats">
            <div class="tile is-ancestor">
              <div class="tile is-parent">
                <article class="tile is-child box" id="course-stat">
                  <p class="title" id="credit">${courses[random].credits}</p>
                  <p class="subtitle">Credits</p>
                </article>
              </div>
              
            
              <div class="tile is-parent">
                <article class="tile is-child box" id="course-stat">
                  <p class="title" id="gened">${courses[random].gen_ed}</p>
                  <p class="subtitle">Gen-Ed</p>
                </article>
              </div>
              <div class="tile is-parent">
                <article class="tile is-child box" id="course-stat">
                  <p class="title" id="method">${courses[random].grading_method}</p>
                  <p class="subtitle">Grading Method</p>
                </article>
              </div>
            </div>
          </div>
        </div>  

      <!-- Course Description -->
      <div class='course-description-home' > 
        <div class="tile is-parent" >
          <div class="tile is-child box" id="home-description">
            <p class="title" >Description</p>
            <p class="subtitle" id="description">${courses[random].description}</p>
            </div>
        </div>
      </div>

  console.log(availCourses, "THIS IS WHERE THE MATCH HAPPENS")
  
  //parses api data into json value
  const courses = await availCourses.json(); 
  console.log("Courses within selected department", courses);

  const favbutton = document.querySelector("#fav_button");
  const form = document.querySelector(".course_select");
  const program = document.querySelector("#program");
  const courseID = document.querySelector("#courseID");
  const courseTitle = document.querySelector("#courseTitle");
  const credit = document.querySelector("#credit");
  const gened = document.querySelector("#gened");
  const method = document.querySelector("#method");
  const description = document.querySelector("#description");
  const random = Math.floor(Math.random() * courses.length); 


   


  form.addEventListener("submit", (event) => {
    
    event.preventDefault();
    
    console.log("HELLO?");

    //formdata = department names 
    const formdata = $(event.target).serializeArray();
    // Grad programs have a name of "grad-program" in this array
    console.log("department selected: ", formdata);

     //When user chooses a program, the page gets updated with corresponding data
     //const random = Math.floor(Math.random() * courses.length); 
     console.log("random course: ", random);
     currCourse = courses[random]; //ADDED DONGYEON 
     courseID.innerHTML = courses[random].course_id;
     courseTitle.innerHTML = courses[random].name;
     credit.innerHTML = courses[random].credits;
     gened.innerHTML = courses[random].gen_ed;
     method.innerHTML = courses[random].grading_method;
     description.innerHTML = courses[random].description;
     avgGPA(courses[random].course_id);
    
    
    
  });


      <!-- Average Grade -->
        <div class="tile is-parent" >
          <div class="tile is-child box" id="average-grade">
            <p id="avgGrade"><b>Average Grade: </b>
            ${avgGPAitem}
            </p>
          </div>
        </div>`
        
      //formdata = department names 
      const formdata = $(event.target).serializeArray();
      // Grad programs have a name of "grad-program" in this array
      console.log("department selected: ", formdata);

      //When user chooses a program, the page gets updated with corresponding data
      //const random = Math.floor(Math.random() * courses.length); 
      
      // ISABEAU PUT THIS IN THE HTML ABOVE
      // console.log("random course: ", random);
      // currCourse = courses[random]; //ADDED DONGYEON 
      // courseID.innerHTML = courses[random].course_id;
      // courseTitle.innerHTML = courses[random].name;
      // credit.innerHTML = courses[random].credits;
      // gened.innerHTML = courses[random].gen_ed;
      // method.innerHTML = courses[random].grading_method;
      // description.innerHTML = courses[random].description;
      // avgGPA(courses[random].course_id);
      
      
      
    });

    NewRecFromFave(courses, random);
    NewRecFromX(courses);
  
  
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
    return TotalClassGPA.toFixed(2)
    // document.getElementById("avgGrade").innerHTML =
    //   "<b>" + "Average Grade: " + "</b>" + TotalClassGPA.toFixed(2);
  });
}

//Show New Course Recommendation and Save To Bookmarks
function NewRecFromFave(courses, random){
  bookmark.push(currCourse); //ADDED DONGYEON
  console.log(bookmark) //ADDED DONGYEON 

  const favbutton = document.querySelector("#fav_button");
  favbutton.addEventListener("click", (event) => {

    
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
    
    //const random = Math.floor(Math.random() * courses.length); 
    let id = courseID.innerHTML = courses[random].course_id;
    let ctitle = courseTitle.innerHTML = courses[random].name;
    let cred = credit.innerHTML = courses[random].credits;
    let ge = gened.innerHTML = courses[random].gen_ed;
    let gm = method.innerHTML = courses[random].grading_method;
    description.innerHTML = courses[random].description;
    avgGPA(courses[random].course_id);

    //Kennedy's attempt to format the boomarks properly
    const saves = document.querySelector(".saves");
    saves.innerHTML += `
    <li id="saved_course">
      <div class="tile is-parent" >
        <div class="tile is-child box" id="saved-course">
          <div id="course-info">      
            <p class="title" id="bookmark_item"> <b>${id}</b> <small>${ctitle}</small></p>
            <button class="bookmark_button" onclick="removeSavedCourse()"> <i class="fas fa-bookmark fa-2x"></i> </button>
          </div>
            <div class="course-stats">
            <div class="tile is-ancestor">
              <div class="tile is-parent">
                <article class="tile is-child box" id="course-stat">
                  <p class="title" id="credit">${cred}</p>
                  <p class="subtitle">Credits</p>
                </article>
              </div>
              <div class="tile is-parent">
                <article class="tile is-child box" id="course-stat">
                  <p class="title" id="gened">${ge}</p>
                  <p class="subtitle">Gen-Ed</p>
                </article>
              </div>
              <div class="tile is-parent">
                <article class="tile is-child box" id="course-stat">
                  <p class="title" id="method">${gm}</p>
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
    </li>`;
   
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

  const change_tester = document.querySelector('#tester_option');
  change_tester.innerText = "Select Your Program"
  console.log(dep_list);
  //document.getElementById('grad-program').innerHTML = dep_list ;
}
//Removing saved course when you click the bookmark button
function removeSavedCourse() {
  console.log("removing course warning");
  // BOOKMARKS REMOVE BUTTON -ISABEAU
  const savedcourse = document.getElementById("saved_course");
  savedcourse.remove();
}
// REPLACE THIS WITH QUERY SELECTOR
function show(shown, hidden) {
  document.getElementById(shown).style.display='block';
  document.getElementById(hidden).style.display='none';
  return false;
};

function loadBookMarks(){
  console.log("bookmarks page ----")
    for(i = 0; i <bookmark.length; i++){
      document.write(JSON.stringify(bookmark[i]));
    };
};


removeSavedCourse;

window.onload = main;