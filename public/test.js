//Prefrences Dropdown Bar 
async function main() {
  await getDepartments();
  //selects api
  const data = await fetch("https://api.umd.io/v1/courses");
  //parses api data into json value
  const courses = await data.json(); 
  const searchInput = document.querySelector(".search");  //TBD not being used right now -> will be used for serach page 
  const suggestions = document.querySelector(".suggestions"); //not being used right now
  const favbutton = document.querySelector("#fav_button");
  const form = document.querySelector(".course_select");
  const program = document.querySelector("#program");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("HELLO?");
    //formdata = department names 
    const formdata = $(event.target).serializeArray();
    console.log(formdata);
    //creating a new constant 
    const availCourses = courses
    //
    .filter(course => {
        console.log(formdata[0].value)
        console.log(course.department)
        console.log(course)
        return course.department === formdata[0].value})

    console.table(availCourses)
   
  });
}

    /* -> Still need to pull data from the API 
    //Added for the purpose of demo
    program.addEventListener("click", (event) => {
      event.preventDefault();
      console.log("InfoSci or Die");
      // let coursecode1 = document.getElementById("code");
      
      return document.body.innerHTML = document.body.innerHTML.replace('INST612', 'INST702'),
            document.body.innerHTML = document.body.innerHTML.replace('Nature, structure, development and application of information policy. Interactions of social objectives, stakeholders, technology and other forces that shape policy decisions.', 'Usability testing methods -- how to design and implement them both for desktop and mobile sites. Students will learn the complex process of facilitating usability testing and how to synthesize test data into a report.'),
            document.body.innerHTML = document.body.innerHTML.replace('Regular, Audit','Regular, Audit, Sat-Fail'), 
            document.body.innerHTML = document.body.innerHTML.replace('B-','A-);

  //   button.addEventListener("click", (event) => {
  //     favClass(event.target.value)
   */
  // });



//Show New Course Recommendation and Save To Bookmarks
function NewRecFromFave(){
  const favbutton = document.querySelector("#fav_button");
  favbutton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Tis my fave");
    // let coursecode1 = document.getElementById("code");
    
    //Added for the purpose of demo because can't pull from the API
    return document.body.innerHTML = document.body.innerHTML.replace('INST612', 'INST702'),
          document.body.innerHTML = document.body.innerHTML.replace('Nature, structure, development and application of information policy. Interactions of social objectives, stakeholders, technology and other forces that shape policy decisions.', 'Usability testing methods -- how to design and implement them both for desktop and mobile sites. Students will learn the complex process of facilitating usability testing and how to synthesize test data into a report.'),
          document.body.innerHTML = document.body.innerHTML.replace('Regular, Audit','Regular, Audit, Sat-Fail'), 
          document.body.innerHTML = document.body.innerHTML.replace('B-','A-')
  })
}

NewRecFromFave(); 

function NewRecFromX(){
  const favbutton = document.querySelector(".float-x");
  favbutton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Don't Like Dis");
    // let coursecode1 = document.getElementById("code");
    
    //Added for the purpose of demo because can't pull from the API
    return document.body.innerHTML = document.body.innerHTML.replace('INST702', 'AMST856'),          
    document.body.innerHTML = document.body.innerHTML.replace('Usability testing methods -- how to design and implement them both for desktop and mobile sites. Students will learn the complex process of facilitating usability testing and how to synthesize test data into a report.', 'A research seminar focusing on the practice and presentation of cultural and historical scholarship in museums and historical sites. Students will complete an original research project on the challenges and opportunities of public exhibition and interpretation of cultural and historical research.'),
    document.body.innerHTML = document.body.innerHTML.replace('Regular, Audit'),           
    document.body.innerHTML = document.body.innerHTML.replace('B-','A-')
  })
}

NewRecFromX(); 

function favClass(className) {
    
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
    select.add(option, 0);
  }

  console.log(dep_list);
  //document.getElementById('grad-program').innerHTML = dep_list ;
}


window.onload = main;
