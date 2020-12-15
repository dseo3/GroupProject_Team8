// PLEASE NOTE THIS IS NOT A FILE WE ACTUALLY USE FOR ANYTHING ON OUR SITE.

//Prefrences Dropdown Bar 
async function main() {

    //Gets the departments for the dropdown 
    await getDepartments();
  
    // STRING FORMATTING THE URL
    const dept_id_here = document.forms[0].elements[0];
    const dept_id_for_data = dept_id_here.value.substring(0,4);
    console.log("Selected Department Code:", dept_id_for_data);
    const pref_api = "https://api.umd.io/v1/courses?dept_id=" + dept_id_for_data
  
    console.log("API url is", pref_api)
  
    
    const availCourses = await fetch(pref_api); 
     
    console.log(availCourses, "THIS IS WHERE THE MATCH HAPPENS")
    
    //parses api data into json value
    const courses = await availCourses.json(); 
    console.log("Courses within selected department", courses)
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
  
  
     
  
    // Listens for users selected Department and populates those results on the home page
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
      
       //Displays new card when user clicks the heart of X button
       // Look below for details on the function
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
  
  
  //Save To Bookmarks
  function SaveCourse(courses){
    
    const favbutton = document.querySelector("#fav_button");
    favbutton.addEventListener("click", (event) => {

    //Kennedy's attempt to format the boomarks properly
    const saves = document.querySelector(".saves");
    const bookmark = document.createElement('li');
    bookmark.setAttribute("id", "saved_course");
    saves.appendChild(bookmark);
    
    const divElement = document.createElement('div');
    divElement.setAttribute("class", "tile is-parent");
    bookmark.appendChild(divElement);
    console.log(divElement);

    const cdivElement = document.createElement('div');
    cdivElement.setAttribute("class", "tile is-child box");
    divElement.appendChild(cdivElement);
    console.log(cdivElement);

    const gdivElement = document.createElement('div');
    gdivElement.setAttribute("id", "course-info");
    civElement.appendChild(gdivElement);
    console.log(gdivElement);

    document.getElementById("course-info").innerHTML = courses[random].course_id;

  
      // ISABEAU APPEND TO BOOKMARKS 
      // $("#courseTitle").clone().appendTo($("#saves"));
      $("#for_bookmarks").clone().appendTo($("#saves"));
      $("#course-stat").clone().appendTo($("#saves"));
      
     
    });
  };
  

  // Preferences Departments Drop down at top of index/home page
  const dep_api_url = "https://api.umd.io/v1/courses/departments?semester=202101"; 
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
  
  
 
  
  window.onload = main;
