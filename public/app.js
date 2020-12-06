
//window.onload = function testFunction() {
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
    })
//}


