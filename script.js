// Cargar datos desde el archivo JSON y generar tarjetas dinámicamente
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const destinationsContainer = document.getElementById('destinations');
    
    data.destinations.forEach(destination => {
      const card = document.createElement('div');
      card.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mb-4', 'd-flex', 'justify-content-center');

      card.innerHTML = `
        <div class="card destination-card">
          <img src="${destination.image}" class="card-img-top" alt="${destination.name}">
          <div class="card-body">
            <h5 class="card-title">${destination.name}</h5>
            <p class="card-text">$${destination.price.toFixed(1)}</p>
            <p class="card-description">${destination.description}</p>
          </div>
        </div>
      `;

      destinationsContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error al cargar los datos:', error));
