// localização

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    console.log("Geolocalização não é suportada por este navegador");
  }
}

function showPosition(position) {
  sessionStorage.setItem("lon", position.coords.longitude)
  sessionStorage.setItem("lat", position.coords.latitude)
}

getLocation();

// busca e renderizacao dos produtos

const root = document.getElementById('root');

const prodURL = "https://v2-api.sheety.co/fb4178391bf957b00e2366c59a397b7c/dbTanamao/products?finalizado=false";

async function getProducts() {
  let response = await fetch(prodURL).then(res => res.json());
  let products = await response.products;

  for (let val of products) {
      const { cpf, endereco, gorjeta, pedido, id } = val;

      const AccountURL = `https://v2-api.sheety.co/fb4178391bf957b00e2366c59a397b7c/dbTanamao/accounts?cpf=${cpf}`;

      let userData = await fetch(AccountURL).then(res => res.json());
      let nome = userData.accounts[0].nome;

      let distancia = await getDistance(endereco);

      let pedidosArr = pedido.split('/');
      let pedidosStr = `<div class="order-description">`;

      for (let i = 1; i < pedidosArr.length; i += 2) {
          pedidosStr += `<span class="order-item">` + pedidosArr[i - 1] + ` | Qnt. ` + pedidosArr[i] + `</span>`;

          if (i !== pedidosArr.length - 1) {
              pedidosStr += `<hr />`
          }
      }

      pedidosStr += `</div>`;
      
      root.insertAdjacentHTML('beforeend', 
          `<div class="order-container">
              <a href="../5.5 Confirmação/confirmacao.html?id=${id}">
              <div class="order-box">
                  <div class="order-info">
                      <h2 class="order-user">${nome}</h2>
                  </div>` 
                  
                  + pedidosStr + ` 
                  <div class="order-location">
                      <img src="../assets/icon/icons8-encomenda-enviada-100.png" alt="Encomenda enviada">
                      <span>Distância: ${distancia}</span>
                      <img src="../assets/icon/icons8-pilha-de-dinheiro-100.png" alt="Gorjeta">
                      <span>Gorjeta: R$: ${gorjeta},00</span>
                  </div>
              </div>
              </a>
          </div>`
      )        
  }
}

getProducts();

// fim da busca e renderização dos produtos

// calculo distância

async function getDistance(address) {
  let lat1 = Number(sessionStorage.getItem("lat"));
  let lon1 = Number(sessionStorage.getItem("lon"));

  const API_KEY = "9d626913ff1d4a52afaebbfe4a78f78a";

  const addressURL = encodeURI(`https://api.opencagedata.com/geocode/v1/json?key=${API_KEY}&q=${address}&pretty=1`);
  
  let response = await fetch(addressURL).then(res => res.json());
  let results = (response.results[0].annotations.DMS);

  let { lat, lng } = results;

  let lat2 = toDD(lat);
  let lon2 = toDD(lng);
  
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI/180; // φ, λ in radians
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  let distancia = R * c;

  if (distancia > 1000) {
      distancia = Math.ceil(distancia / 1000) + " KM"
  } else {
      distancia = Math.ceil(distancia) + " M"
  }

  return distancia
}



// converte de DMS para decimal

function toDD(item) {
  let temp = item.replace(' ', '').replace(' ', '').replace(' ', '').replace('°', "'").substring(0, item.length - 6);

  let arr = temp.split("'");

  let minutes = arr[1] / 60;

  let seconds = arr[2] / 3600;

  let res = Number(arr[0]) + minutes + seconds ;

  if (item.indexOf('S') != -1 || item.indexOf('W') != -1) {
      res *= -1;
  }

  return res; 
}