async function main() {
  await getDepartments();
  const data = await fetch("https://api.umd.io/v1/courses");
  const courses = await data.json();
  const searchInput = document.querySelector(".search");
  const suggestions = document.querySelector(".suggestions");
  const button = document.querySelector("#fav_button");
  const form = document.querySelector(".course_select");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("HELLO?");
    const formdata = $(event.target).serializeArray();
    const availCourses = courses
    .filter(course => {
        console.log(formdata[0].value)
        console.log(course.department)
        console.log(course)
        return course.department === formdata[0].value})

    console.table(availCourses)
  });
  //   button.addEventListener("click", (event) => {
  //     favClass(event.target.value)
  //   });
}

function favClass(className) {}

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

// Lil Yomi's Code

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
