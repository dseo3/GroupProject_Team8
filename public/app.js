
    fetch('/api')
    .then((response) => {return response.json()})
    .then((response) => {
        console.log(response[1].dept_id)
        const target = document.querySelector(".search")
const ul = document.createElement('ul')
let li = response.map((dept)=> `<li>
                <div class="tile is-parent" >
                    <div class="tile is-child box" id="department-name">
                        <p class="title"> <b>${dept.dept_id}</b> <small>${dept.department}</small></p>
                    </div>
                </div>
            </li>`)

ul.innerHTML = li

target.appendChild(ul)
    });
    
     // Get the modal
     var modal = document.getElementById("myModal");

     // Get the button that opens the modal
     var btn = document.getElementById("myBtn");

     // Get the <span> element that closes the modal
     var span = document.getElementsByClassName("close")[0];

     // When the user clicks the button, open the modal 
     btn.onclick = function() {
     modal.style.display = "block";
     }

     // When the user clicks on <span> (x), close the modal
     span.onclick = function() {
     modal.style.display = "none";
     }

     const umd_courses= "https://api.umd.io/v0/courses/list?semester=202008";

     fetch(umd_courses) 
         .then((response) => response.json())
         .then((data) => {

             var select = document.getElementById("course");
             for (var i in data) {
                 var option1 = document.createElement("option");
                 option1.text = option1.value = data[i].course_id;
                 select.add(option1);
             }

     });
     
     const umd_io = "https://api.umd.io/v1/courses/sections?semester=202008"
     
     fetch(umd_io) 
         .then((response) => response.json())
         .then((data) => {

             var select = document.getElementById("section");
             for (var i in data[0]) {
                 var option = document.createElement("option");
                 option.text = option.value = data[0][i].section_id;
                 select.add(option);
             }


     });
//}


