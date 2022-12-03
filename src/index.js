let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector('.add-toy-form')
  const toysDiv = document.getElementById('toy-collection')
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  //POST METHOD
  function getFormData(){
    const name = form.name.value
    const image = form.image.value
    return {name, image}
  }
  
  //Working on submit form
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const {name, image} = getFormData()
    addTheData(name, image, (likes=0))


  })

  function addTheData(name, image, likes) {
    fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({name, image, likes}) 
    })
  }
 
  //ADDING A TOY
  function getData() {
    return fetch('http://localhost:3000/toys')
    .then((response) => response.json())
    .then((toys) => {
      return toys
    })
  }
  //creating DOM to incorporate Toy
  function creatingToy(toy) {
    const div2 = document.createElement('div')
    div2.setAttribute('class', 'card')

    let h2 = document.createElement('h2')
    h2.textContent = toy.name

    let img = document.createElement('img')
    img.setAttribute('src', toy.image)
    img.classList.add('toy-avatar')

    let p = document.createElement('p') 
    p.textContent = toy.likes

    let btn = document.createElement('button')
    btn.setAttribute('id', toy.id)
    btn.setAttribute('class', 'like-btn')
    btn.textContent = 'Like'

    btn.addEventListener('click', (e) => {
      e.preventDefault()
      let likes = parseInt(e.target.previousElementSibling.textContent)
      likes += 1
      e.target.previousElementSibling.textContent = likes

      //Patch Method
      fetch(`http://localhost:3000/toys/${e.target.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          "likes": likes
        }),
        headers:{
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }   
      })
      


    })
    
    div2.appendChild(h2)
    div2.appendChild(img)
    div2.appendChild(p)
    div2.appendChild(btn)
    toysDiv.appendChild(div2)
  }
  function displayData() {
    getData().then((toys) => {
      toys.forEach((toy) => {
        creatingToy(toy)
      })
    })
  }


  displayData()
});
