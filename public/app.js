
//window.onload = function testFunction() {
    fetch('/api')
    .then((response) => {return response.json()})
    .then((response) => {
        console.log(response[1].dept_id)
        const target = document.querySelector(".target")
const ul = document.createElement('ul')
let li = response.map((dept)=> `<li>
<span class="dept_id">${dept.dept_id}</span><br>
<span class="category">${dept.department}</span>
</li>`)
    
ul.innerHTML = li
const Element = document.querySelector('.Element');

target.appendChild(ul)
    })
//}

