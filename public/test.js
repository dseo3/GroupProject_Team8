let courses = []; 
let currCourse = new Object(); 

//Prefrences Dropdown Bar 
async function main() {
  if (document.querySelector('#tester_option').text === "") {
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

    form.addEventListener("submit", async(event) => {
      event.preventDefault();
      await loadCourses();
      await refreshPage();
    
      const formdata = $(event.target).serializeArray();
      // Grad programs have a name of "grad-program" in this array
      //console.log("department selected: ", formdata);      
    });
}
async function loadCourses(){
  const dept_id_here = document.forms[0].elements[0];
  //No longer Spaghetti code yay!
  const dept_id_for_data = dept_id_here.value.substring(0,4);
  // Just stringing together the API url here before we fetch the data 
  //const pref_api = "https://api.umd.io/v1/courses?dept_id=" + dept_id_for_data
  await fetch('/getCourses/'+ dept_id_for_data, {
    method: 'GET'
  })
  .then((fromServer) => fromServer.json())
  .then((fromServer) => {
    courses = fromServer;
  });
}

async function refreshPage(){
  if (courses.length === 0) {
    const no_courses_message = document.querySelector(".course-rec");
    no_courses_message.innerHTML = `<p class="no_courses" id="no_courses">We're sorry for any inconvienience. This isn't an error. It looks like our API doesn't have courses for that department. We want you to have access to all of our data, so we kept this department in the list. If you want to see if Testudo has more information on whether this department has classes you can go here:</p>
    <a href="https://app.testudo.umd.edu/soc/202101">Link to Testudo's Schedule of Classes</a>`
  }

  const random = Math.floor(Math.random() * courses.length); 
  currCourse = courses[random];  
  const avgGPAitem =  await avgGPA(courses[random].course_id);
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
  <!-- Average Grade -->
    <div class="tile is-parent" >
      <div class="tile is-child box" id="average-grade">
        <p id="avgGrade"><b>Average Grade: </b>
        ${avgGPAitem}
        </p>
      </div>
    </div>`
    
}

async function avgGPA(course_id) {
  //Fetching PlanetTerp API
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const urlTerp = "https://api.planetterp.com/v1/grades?course=" + course_id ; // site that doesn’t send Access-Control-*
  let TotalClassGPA = 0.0;

  await fetch(proxyurl + urlTerp) // https://cors-anywhere.herokuapp.com/https://example.com
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
    return TotalClassGPA.toFixed(2)
    // document.getElementById("avgGrade").innerHTML =
    //   "<b>" + "Average Grade: " + "</b>" + TotalClassGPA.toFixed(2);
  });
}


//Show New Course Recommendation and Save To Bookmarks
function NewRecFromFave(){
  if (!document.getElementById(`${currCourse.course_id}`)){
    const favbutton = document.querySelector("#fav_button");

      //Kennedy's attempt to format the boomarks properly
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
            <div class="learn-more-button">  
            <a href="#" class="learn" onclick="DetailsPage(${currCourse.course_id});return show('details-page','index_page','bookmarks_page');">
              <button class="learn-more">Learn More</button>
            </a> 
          </div>            
          </div>
        </div>
      </li>`;
    }
      refreshPage(); //refresh recommendation 
  };

function DetailsPage(book_item_id){

  // need to get the courseID from book item id to display the desciption and average grade information by grabbing it from whatever array it was in to display it
  // need to do an if statement that limits the number of appends here
  const item_details_page = document.getElementById("item_details");
  
  const specific_fave_deat = document.getElementById(book_item_id);
  item_details_page.append(specific_fave_deat)
  // item_details_page.innerHTML = `
  //   <li id=${currCourse.course_id}>
  //   <!-- Course Code and Title -->
  //   <div id="for_bookmarks">
  //     <div class='course-title-home' > 
  //       <div class="tile is-parent" >
  //         <div class="tile is-child box" id="course-code">
  //           <p class="title" id="courseID">${courses[random].course_id}</p>
  //           <p class="subtitle" id="courseTitle">${courses[random].name}</p>
  //         </div>
  //       </div>
  //     </div>
    
  //   <!-- THIS IS THE TILE I ADDED - ISABEAU  
  //   <div class="tile is-child box" id="saved-course"> -->
  //   <!-- Course Stat Tiles -->
  //       <div class="course-stats">
  //         <div class="tile is-ancestor">
  //           <div class="tile is-parent">
  //             <article class="tile is-child box" id="course-stat">
  //               <p class="title" id="credit">${courses[random].credits}</p>
  //               <p class="subtitle">Credits</p>
  //             </article>
  //           </div>
            
          
  //           <div class="tile is-parent">
  //             <article class="tile is-child box" id="course-stat">
  //               <p class="title" id="gened">${courses[random].gen_ed}</p>
  //               <p class="subtitle">Gen-Ed</p>
  //             </article>
  //           </div>
  //           <div class="tile is-parent">
  //             <article class="tile is-child box" id="course-stat">
  //               <p class="title" id="method">${courses[random].grading_method}</p>
  //               <p class="subtitle">Grading Method</p>
  //             </article>
  //           </div>
  //         </div>
  //       </div>
  //     </div>  
  //   <!-- Course Description -->
  //   <div class='course-description-home' > 
  //     <div class="tile is-parent" >
  //       <div class="tile is-child box" id="home-description">
  //         <p class="title" >Description</p>
  //         <p class="subtitle" id="description">${courses[random].description}</p>
  //         </div>
  //     </div>
  //   </div>
  //   <!-- Average Grade -->
  //     <div class="tile is-parent" >
  //       <div class="tile is-child box" id="average-grade">
  //         <p id="avgGrade"><b>Average Grade: </b>
  //         ${avgGPAitem}
  //         </p>
  //       </div>
  //     </div>
  //       `;
};


function NewRecFromX(){
  refreshPage();

}


function findMatches(wordsToMatch, courses) {
  return courses.filter((course) => {
    const regex = new RegExp(wordsToMatch, "gi");
    return course.name.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, courses);
  // NEED TO MAKE SURE THIS ONLY RUNS if the person has clicked the button 3 times
  if (matchArray.length === 0) {
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
function removeSavedCourse(book_item_id) {
  book_item_id.remove();
}


// REPLACE THIS WITH QUERY SELECTOR
function show(shown, hidden1, hidden2) {
  document.getElementById(shown).style.display='block';
  document.getElementById(hidden1).style.display='none';
  document.getElementById(hidden2).style.display='none';
  if (shown === 'details-page') {
    DetailsPage();
  }
  return false;
};

function loadBookMarks(){
    for(i = 0; i <bookmark.length; i++){
      document.write(JSON.stringify(bookmark[i]));
    };
};


removeSavedCourse;

window.onload = main;
