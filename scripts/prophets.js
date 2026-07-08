
const url = 'https://githubusercontent.com';


const cards = document.querySelector('#cards');


async function getProphetData() {
  try {
    const response = await fetch(url); 
    if (response.ok) {
      const data = await response.json(); 
      

      displayProphets(data.prophets); 
    } else {
      console.error('Error: El servidor no respondió bien.');
    }
  } catch (error) {
    console.error('Error de conexión a internet:', error);
  }
}


const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {

    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let birthDate = document.createElement('p');   
    let birthPlace = document.createElement('p');  
    let portrait = document.createElement('img');

    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
    birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;
    
    
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy'); 
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

  
    card.appendChild(fullName);   
    card.appendChild(birthDate);  
    card.appendChild(birthPlace); 
    card.appendChild(portrait);   


    cards.appendChild(card); 
  });
}


getProphetData();
