document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del modal
    const modalImage = document.getElementById('modal-image');
    const modalName = document.getElementById('modal-name');
    const modalPrice = document.getElementById('modal-price');
    const modalRating = document.getElementById('modal-rating');
    const modalDescription = document.getElementById('modal-description');
    const detailsModal = new bootstrap.Modal(document.getElementById('detailsModal'));

    // Función para abrir el modal con la información de la tarjeta
    function openModal(item) {
        modalImage.src = item.image;
        modalName.textContent = item.name;
        modalPrice.textContent = item.price;
        modalRating.textContent = item.rating;
        modalDescription.textContent = item.description;
        detailsModal.show();
    }

    // Función para cargar solo dos destinos populares en viajes.html
    function loadLimitedDestinations() {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                // Mostrar solo dos tarjetas de destinos populares
                const popularDestinationsContainer = document.getElementById('popular-destinations');
                data.popularDestinations.slice(0, 2).forEach(destination => {
                    const card = document.createElement('div');
                    card.className = 'col-6';
                    card.innerHTML = `
                        <div class="destination-card">
                            <img src="${destination.image}" alt="${destination.name}" class="img-fluid rounded">
                            <p class="mt-2 mb-0">${destination.name}</p>
                            <small>${destination.price} ${destination.rating || ''}</small>
                        </div>
                    `;
                    card.addEventListener('click', () => openModal(destination));
                    popularDestinationsContainer.appendChild(card);
                });

                // Mostrar solo dos tarjetas de viajes de aventura
                const adventureTripsContainer = document.getElementById('adventure-trips');
                data.adventureTrips.slice(0, 2).forEach(trip => {
                    const card = document.createElement('div');
                    card.className = 'col-6';
                    card.innerHTML = `
                        <div class="destination-card">
                            <img src="${trip.image}" alt="Adventure Trip" class="img-fluid rounded">
                            <p class="mt-2 mb-0">${trip.name}</p>
                            <small>${trip.price} ${trip.rating || ''}</small>
                        </div>
                    `;
                    card.addEventListener('click', () => openModal(trip));
                    adventureTripsContainer.appendChild(card);
                });
            })
            .catch(error => console.error('Error al cargar los datos:', error));
    }

    // Función para cargar todos los destinos populares en todos_destinos.html
    function loadAllDestinations() {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                const allPopularDestinationsContainer = document.getElementById('all-popular-destinations');
                const allAdventureTripsContainer = document.getElementById('all-adventure-trips');

                // Generar todas las tarjetas de destinos populares
                data.popularDestinations.forEach(destination => {
                    const card = document.createElement('div');
                    card.className = 'col-md-4 mb-4';
                    card.innerHTML = `
                        <div class="destination-card">
                            <img src="${destination.image}" alt="${destination.name}" class="img-fluid rounded">
                            <p class="mt-2 mb-0">${destination.name}</p>
                            <small>${destination.price} ${destination.rating || ''}</small>
                        </div>
                    `;
                    card.addEventListener('click', () => openModal(destination));
                    allPopularDestinationsContainer.appendChild(card);
                });

                // Generar todas las tarjetas de viajes de aventura
                data.adventureTrips.forEach(trip => {
                    const card = document.createElement('div');
                    card.className = 'col-md-4 mb-4';
                    card.innerHTML = `
                        <div class="destination-card">
                            <img src="${trip.image}" alt="Adventure Trip" class="img-fluid rounded">
                            <p class="mt-2 mb-0">${trip.name}</p>
                            <small>${trip.price} ${trip.rating || ''}</small>
                        </div>
                    `;
                    card.addEventListener('click', () => openModal(trip));
                    allAdventureTripsContainer.appendChild(card);
                });
            })
            .catch(error => console.error('Error al cargar los datos:', error));
    }

    // Determinar qué función llamar según la página actual
    if (document.getElementById('popular-destinations') && document.getElementById('adventure-trips')) {
        loadLimitedDestinations();
    } else if (document.getElementById('all-popular-destinations') && document.getElementById('all-adventure-trips')) {
        loadAllDestinations();
    }
});
