const search = document.querySelector('.dropdown');


search.addEventListener('click', async (e) => {
  e.preventDefault();
  const form = $(e.target).serializeArray();
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
    
      console.log(fromServer)
})
.catch((err) => console.log(err));
});



