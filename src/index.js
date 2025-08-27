
var root = document.getElementsByTagName('body')[0];
var cardlist = document.getElementsByClassName('cards')[0];
var imagemap = new Map();

data.forEach(card => {
    var newcard = document.getElementById('card-template').content.cloneNode(true);
    var newcardElement = newcard.querySelector('.card');
    newcard.querySelector('.card--title').textContent = card.name;
    var cardimg = newcard.querySelector('.card--img').src = card.sprites.other["official-artwork"].front_default
    var text = newcard.querySelector('.card--text')
    text.children[0].textContent = `HP: ${card.stats[0].base_stat}`;
    text.children[1].textContent = `ATTACK: ${card.stats[1].base_stat}`;
    text.children[2].textContent = `DEFENSE: ${card.stats[2].base_stat}`;
    text.children[3].textContent = `SPECIAL-ATTACK: ${card.stats[3].base_stat}`;
    text.children[4].textContent = `SPECIAL-DEFENSE: ${card.stats[4].base_stat}`;
    text.children[5].textContent = `SPEED: ${card.stats[5].base_stat}`; 

    var gameslist = text.querySelector('.games');

    var games = card.game_indices;
    
    games.forEach(game => {
        var listitem = document.createElement('li');
        listitem.textContent = game.version.name;
        gameslist.appendChild(listitem);
    })

    var images = getImages(card.sprites);
    imagemap.set(card.name, images);
    newcardElement.dataset.name = card.name;

    cardlist.appendChild(newcard);
});

Array.from(document.getElementsByClassName('card')).forEach(card => {
    var cardimg = card.querySelector('.card--img');
    cardimg.dataset.index = 0;
    card.addEventListener('click', event => {
        if(event.target.className !== 'previous-image' && event.target.className !== 'next-image') {
            return;
        }
        var cardimg = card.querySelector('.card--img');
        var images = imagemap.get(card.dataset.name);
        cardimg.src = images[cardimg.dataset.index];
        if(event.target.className === 'next-image') {
            cardimg.dataset.index++;
            if(cardimg.dataset.index >= images.length) {
                cardimg.dataset.index = 0;
            }
        } else if(event.target.className === 'previous-image') {
            cardimg.dataset.index--;
            if(cardimg.dataset.index < 0) {
                cardimg.dataset.index = images.length - 1;
            }
        }
    });
})

function getImages (imagesdirectory) {
    
    var images = [];
    images.push(imagesdirectory.other["official-artwork"].front_default);
    for (var key in imagesdirectory) {
        if(imagesdirectory[key] && typeof imagesdirectory[key] === 'string') {
            images.push(imagesdirectory[key]);
        }
    }
    return images;
}