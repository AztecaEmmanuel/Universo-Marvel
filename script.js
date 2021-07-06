// Datos de api
const apyKey = '6931a7eebd4bf44aa9d971719963df28';
const hash = 'baca6824821272c2d0cb648cb39e8be4';
const urlStatic = `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=${apyKey}&hash=${hash}`;


// Datos del DOM
const draw = document.querySelector('#entrada');
const list = document.querySelector('#list');
const inicio = document.querySelector('#inicio');


// Tipo de respuesta
const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_NOT_FOUND = 404;

// Tamaño de imagenes
// Relación de aspecto vertical
const portrait_small = 'portrait_small',
 portrait_medium = 'portrait_medium',
 portrait_xlarge = 'portrait_xlarge',
 portrait_fantastic = 'portrait_fantastic',
 portrait_uncanny = 'portrait_uncanny',
 portrait_incredible = 'portrait_incredible';

// Relación de aspecto estándar (cuadrada)
const standard_small = 'standard_small',
 standard_medium = 'standard_medium',
 standard_large = 'standard_large',
 standard_xlarge = 'standard_xlarge',
 standard_fantastic = 'standard_fantastic',
 standard_amazing = 'standard_amazing';


const entrada = async(api) => {

    draw.innerHTML = '';
    const peticion = await fetch(api);

    switch(peticion.status) {
        case STATUS_OK:
                const respuesta = await peticion.json();
                const resultado = await respuesta.data.results;
                let fragment = document.createDocumentFragment();

                await resultado.forEach( element => {

                    const card = document.createElement('div');
                    const containerImg = document.createElement('div');
                    const img = document.createElement('img');
                    const h2 = document.createElement('h2');
                    const p = document.createElement('p');

                    card.className = 'card';
                    img.className = 'img'
                    containerImg.className = 'img-container';
                    h2.className = 'name';
                    p.className = 'description';

                    img.src = `${element.thumbnail.path}/${portrait_incredible}.${element.thumbnail.extension}`;
                    h2.textContent = element.name;
                    p.textContent = element.description;

                    containerImg.appendChild(img);
                    card.appendChild(containerImg);
                    card.appendChild(h2);
                    card.appendChild(p);

                    fragment.appendChild(card);
                });
                draw.appendChild(fragment);
            break;
    }
}

const menu = (event) => {

    let llave = '';
    let urlApy = '';

    if(event.target.id === 'creadores')
    {
        llave = 'creators';
    }
    else if(event.target.id === 'personajes')
    {
        llave = 'characters';
    }
    else
    {
        llave = 'comics';
    }

    urlApy = `http://gateway.marvel.com/v1/public/${llave}?ts=1&apikey=${apyKey}&hash=${hash}`;

    entrada(urlApy)

}

addEventListener('DOMContentLoaded', () => {entrada(urlStatic)});
list.addEventListener('click',menu);
inicio.addEventListener('click', () => {entrada(urlStatic)});