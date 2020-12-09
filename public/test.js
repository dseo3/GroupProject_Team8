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






// Yomi's Code

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





//Fetching PlanetTerp API
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const urlTerp = "https://api.planetterp.com/v1/grades?course=INST612"; // site that doesn’t send Access-Control-*
let TotalClassGPA = 0.0;

fetch(proxyurl + urlTerp) // https://cors-anywhere.herokuapp.com/https://example.com


  .then((response) => response.json())
  .then((data) => {
    availCourses.forEach((item) => { //don't remember what availCourses is supposed to be, but alex added it, so I need to go back and figure it out again. - Isabeau
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






    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    btn.onclick = function () {
      modal.style.display = "block";
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    };



    /// THESE THREE NEED TO BE FIXED STILL PER ALEXS CHANGES - ISABEAU
    const umd_io2 = "https://api.umd.io/v0/courses/list?semester=202008";
    fetch(umd_io2)
      .then((response) => response.json())
      .then((data) => {
        var select = document.getElementById("term");
        for (var i in data) {
          var option = document.createElement("option");
          option.text = option.value = data[i].name;
          select.add(option);
        }
      });

    const umd_io3 = "https://api.umd.io/v1/professors?semester=202008";
    fetch(umd_io3)
      .then((response) => response.json())
      .then((data) => {
        var select = document.getElementById("greaterorless");
        for (var i in data) {
          var option = document.createElement("option");
          option.text = option.value = data[i].name;
          select.add(option);
        }
      });

    const umd_io = "https://api.umd.io/v1/courses/sections?semester=202008";

    fetch(umd_io)
      .then((response) => response.json())
      .then((data) => {
        var select = document.getElementById("section");
        for (var i in data[0]) {
          var option = document.createElement("option");
          option.text = option.value = data[0][i].section_id;
          select.add(option);
        }

        var select = document.getElementById("course");
        for (var i in data[0]) {
          var option1 = document.createElement("option");
          option1.text = option1.value = data[0][i].course;
          select.add(option1);
        }
      });
  </script>



window.onload = main;
