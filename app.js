function Cards(title, price,description, image, id ) {
    this.title=title;
    this.price=price;
    this.description=description;
    this.image=image;
    this.id=id;
  }


let plants=[];


function readData(){
    fetch('https://6784ca2e1ec630ca33a5a644.mockapi.io/cards')
        .then(response =>response.json())
        .then(data => {
            data.forEach(obj => {
            const card = new Cards(obj.title, obj.price, obj.description, obj.image, obj.id);
            plants.push(card);
        })

        renderData(plants);
});      
} //end readData function


function renderData(plants) {
    //create cards
    console.log(plants)
    plants.forEach(plant => {
        
        //Create card
        const card = document.createElement("div");
        card.setAttribute("class","card");

        //create img
        const image = document.createElement("img");
        image.setAttribute("class","img");
        image.setAttribute("src", plant.image);

        //create title
        const title =document.createElement("p");
        title.setAttribute("class","txt1");
        title.textContent= plant.title;

        //create title
        const des =document.createElement("p");
        des.setAttribute("class","txt2");
        des.textContent= plant.description;

        //create price
        const price =document.createElement("p");
        price.setAttribute("class","txt3");
        price.textContent= plant.price;

        const del =document.createElement("div");
        del.setAttribute("class","del");
        del.innerHTML ="<i class='bx bx-message-square-x'></i>"

        const div = document.createElement("div");

        del.onclick=() => deleteCard(plant.id);
        //append created elements 
        container.appendChild(card);
        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(des);
        card.appendChild(div)
        div.appendChild(price);
        div.appendChild(del);
  
    })
    
} //end renderData function

//delete card
function deleteCard(id) {
    url="https://6784ca2e1ec630ca33a5a644.mockapi.io/cards/"+id;
    fetch(url , {
        method:'DELETE'
    })
    console.log(id);
}


//update card 
function updateCard(id){
    url="https://6784ca2e1ec630ca33a5a644.mockapi.io/cards/"+id;
    fetch(url , {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({title: 'Updated plant'})
        })
}


//create new product
function createCard(title,price, description, image, id){

    const newCard = new Cards(title,price, description, image, id);
    fetch('https://6784ca2e1ec630ca33a5a644.mockapi.io/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title:"new",price:"p", description:"d", image:"i"})
      })
  
}

readData();
updateCard(6);
document.getElementById("btn").onclick=() =>  createCard();
