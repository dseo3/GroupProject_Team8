let courses = [];
let book_collection = [];
let currCourse = new Object();
let avgGPAitem = 0.0;

//Prefrences Dropdown Bar
async function main() {
  // Make sure the deparments are only added to the dropdown once
  if (document.querySelector("#tester_option").text === "") {
    //Yomi's function that gets the departments for the dropdown
    getDepartments();
  }
  // STUFF ISABEAU ADDED FOR STRING FORMATTING THE URL
  const favbutton = document.querySelector("#fav_button");
  const form = document.querySelector(".course_select");
  const program = document.querySelector("#program");
  const courseID = document.querySelector("#courseID");
  const courseTitle = document.querySelector("#courseTitle");
  const credit = document.querySelector("#credit");
  const gened = document.querySelector("#gened");
  const method = document.querySelector("#method");
  const description = document.querySelector("#description");

  // DONGYEON ADDED
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await loadCourses();
    await refreshPage();

    const formdata = $(event.target).serializeArray();
  });
}

// Loads courses from the API by getting the course code (e.g. INST, ENGR) and using it to specify the page of the api
async function loadCourses() {
  const dept_id_here = document.forms[0].elements[0];
  const dept_id_for_data = dept_id_here.value.substring(0, 4);

  await fetch("/getCourses/" + dept_id_for_data, {
    method: "GET",
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      courses = fromServer;
    });
}

// Refresh the page function
async function refreshPage() {
  // display message notifying the user that there are no courses for that department that exist in the API
  if (courses.length === 0) {
    const no_courses_message = document.querySelector(".course-rec");
    no_courses_message.innerHTML = `<p class="no_courses" id="no_courses">We're sorry for any inconvienience. This isn't an error. It looks like our API doesn't have courses for that department. We want you to have access to all of our data, so we kept this department in the list. If you want to see if Testudo has more information on whether this department has classes you can go here:</p>
    <a href="https://app.testudo.umd.edu/soc/202101">Link to Testudo's Schedule of Classes</a>`;
  }

  // Function to calculate the average GPA for a given course is called here and a random course is displayed
  const random = Math.floor(Math.random() * courses.length);
  currCourse = courses[random];
  await avgGPA(courses[random].course_id);

  // Code to have the course details pop up once you hit the button
  const course_popup = document.querySelector(".course-rec");
  course_popup.innerHTML = `<!-- Course Code and Title -->
  <div id="for_bookmarks">
    <div class='course-title-home' > 
      <div class="tile is-parent" >
        <div class="tile is-child box" id="course-code">
          <p class="title" id="courseID">${courses[random].course_id}</p>
          <p class="subtitle" id="courseTitle">${courses[random].name}</p>
        </div>
      </div>
    </div>
  

  <!-- Course Stat Tiles -->
      <div class="course-stats">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child box" id="course-stat">
              <p class="title" id="credit">${courses[random].credits}</p>
              <p class="subtitle">Credits</p>
            </article>
          </div>
          
        <!-- GEN-ED -->
          <div class="tile is-parent">
            <article class="tile is-child box" id="course-stat">
              <p class="title" id="gened">${courses[random].gen_ed}</p>
              <p class="subtitle">Gen-Ed</p>
            </article>
          </div>

        <!-- GRADING METHOD -->
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

  <!-- Average Grade -->
    <div class="tile is-parent" >
      <div class="tile is-child box" id="average-grade">
        <p id="avgGrade"><b>Average Grade: </b>
        ${avgGPAitem}
        </p>
      </div>
    </div>`;
}

// Calculate the average GPA function
async function avgGPA(course_id) {
  //Fetching PlanetTerp API
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const urlTerp = "https://api.planetterp.com/v1/grades?course=" + course_id; // site that doesn’t send Access-Control-*
  let TotalClassGPA = 0.0;

  await fetch(proxyurl + urlTerp) // https://cors-anywhere.herokuapp.com/https://example.com
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
      avgGPAitem = TotalClassGPA.toFixed(2);
    });
}

//Show New Course Recommendation and Save current one to Bookmarks page
function NewRecFromFave() {
  // if the course is not already on the bookmarks page, add it
  if (!document.getElementById(`${currCourse.course_id}`)) {
    const favbutton = document.querySelector("#fav_button");

    // ADD THE BOOKMARKED COURSE TO THE ARRAY FOR DISPLAYING ON THE DETAILS PAGE
    book_collection.push(currCourse);
    console.log(book_collection, "Array of the books the user has saved");
    console.log(
      `${currCourse.course_id}`,
      "id of the current course in new rec from fave"
    );

    // Add the details for the course to the bookmarks page
    const saves = document.querySelector(".saves");
    saves.innerHTML += `
      <li id=${currCourse.course_id}>
        <div class="tile is-parent tester_item">
          <div class="tile is-child box" id="saved-course">
            <div id="course-info">      
            
              <p class="title" id="bookmark_item"> <b>${currCourse.course_id}</b> <small>${currCourse.name}</small></p>
            
              <button class="bookmark_button" onclick="removeSavedCourse(${currCourse.course_id})"> <i class="fas fa-bookmark fa-2x"></i> </button>
            </div>
              <div class="course-stats">
              <div class="tile is-ancestor">
                <div class="tile is-parent">
                  <article class="tile is-child box" id="course-stat">
                    <p class="title" id="credit">${currCourse.credits}</p>
                    <p class="subtitle">Credits</p>
                  </article>
                </div>
                <div class="tile is-parent">
                  <article class="tile is-child box" id="course-stat">
                    <p class="title" id="gened">${currCourse.gen_ed}</p>
                    <p class="subtitle">Gen-Ed</p>
                  </article>
                </div>
                <div class="tile is-parent">
                  <article class="tile is-child box" id="course-stat">
                    <p class="title" id="method">${currCourse.grading_method}</p>
                    <p class="subtitle">Grading Method</p>
                  </article>
                </div>
              </div>
            </div>
            <div class="learn-more-button ${currCourse.course_id}">  
            <a href="#" class="learn" onclick="DetailsPage(${currCourse.course_id}, book_collection);return showpage('details-page','index_page','bookmarks_page');">
              <button class="learn-more">Learn More</button>
            </a> 
          </div>            
          </div>
        </div>
      </li>`;
  }

  //Function to refresh the page with new course details
  refreshPage(); //refresh recommendation
}

// FUNCTION TO DISPLAY SINGLE COURSE CONTENT ON THE LEARN MORE PAGE
function DetailsPage(book_item_id, book_collection) {
  // Remove what's on that page to prep for what will be added
  const detailcontent = document.querySelector("#item_details");

  console.log(
    document.querySelector("#item_details"),
    "Where details are going"
  );

  console.log(book_collection, "course code to find bookmark item");

  // Add the course details to the page
  for (i = 0; i < book_collection.length; i++) {
    console.log(i);
    if (book_item_id.id === book_collection[i].course_id) {
      console.log(
        book_collection[i].course_id,
        "this is items id in the collection of saved bookmarks"
      );

      const coursedetail = book_collection[i];

      console.log(coursedetail);

      detailcontent.innerHTML = "";

      detailcontent.innerHTML += `
      <div id="for_bookmarks">
        <div class='course-title-home' > 
          <div class="tile is-parent" >
            <div class="tile is-child box" id="course-code">
              <p class="title" id="courseID">${coursedetail.course_id}</p>
              <p class="subtitle" id="courseTitle">${coursedetail.name}</p>
            </div>
          </div>
        </div>
      
      <!-- Course Stat Tiles -->
          <div class="course-stats">
            <div class="tile is-ancestor">
              <div class="tile is-parent">
                <article class="tile is-child box" id="course-stat">
                  <p class="title" id="credit">${coursedetail.credits}</p>
                  <p class="subtitle">Credits</p>
                </article>
              </div>
              
            
              <div class="tile is-parent">
                <article class="tile is-child box" id="course-stat">
                  <p class="title" id="gened">${coursedetail.gen_ed}</p>
                  <p class="subtitle">Gen-Ed</p>
                </article>
              </div>
              <div class="tile is-parent">
                <article class="tile is-child box" id="course-stat">
                  <p class="title" id="method">${
                    coursedetail.grading_method
                  }</p>
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
            <p class="subtitle" id="description">${coursedetail.description}</p>
            </div>
        </div>
      </div>
      <!-- Average Grade -->
        <div class="tile is-parent" >
          <div class="tile is-child box" id="average-grade">
            <p id="avgGrade"><b>Average Grade: </b>
            ${avgGPA(coursedetail.course_id)}
            </p>
          </div>
        </div> `;
    }
  }
}

// DISPLAY A NEW RECOMMENDATION BUT DO NOT SAVE IT TO BOOKMARKS
function NewRecFromX() {
  refreshPage();
}

// GET THE DEPARTMENTS TO DISPLAY THEM ON THE DROPDOWN
const dep_api_url = "https://api.umd.io/v1/courses/departments?semester=202101";

async function getDepartments() {
  //get department data from api
  const response = await fetch(dep_api_url);
  const json = await response.json();

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

  const change_tester = document.querySelector("#tester_option");
  change_tester.innerText = "Select Your Program";
  console.log(dep_list);
  //document.getElementById('grad-program').innerHTML = dep_list ;
}

// REMOVE SAVED COURSE WHEN YOU CLICK REMOVE BOOKMARKS BUTTON
function removeSavedCourse(book_item_id) {
  book_item_id.remove();
}

// SHOW ONLY A SINGLE PAGE AT A TIME FUNCTION
function showpage(shown, hidden1, hidden2, hidden3) {
  document.getElementById(shown).style.display = "block";
  document.getElementById(hidden1).style.display = "none";
  document.getElementById(hidden2).style.display = "none";
  document.getElementById(hidden3).style.display = "none";
  if (shown === "details-page") {
    DetailsPage();
  }
  return false;
}

//Pop up for bookmarks
function snackBar() {
  if (document.getElementById(saves) === null) {
    const snackbar = document.createElement("div");
    const snackbarText = document.createTextNode(
      "Please favorite courses from the home page to have them added to your bookmarks! Click to remove"
    );
    snackbar.appendChild(snackbarText);
    snackbar.setAttribute("id", "snackbar");
    snackbar.setAttribute("onclick", "snackbar.remove()");
    const testvar = document.getElementById("saved-list");
    testvar.appendChild(snackbar);
    //return snackbar;
  }
}

console.log(snackBar());

removeSavedCourse;

window.onload = main;
