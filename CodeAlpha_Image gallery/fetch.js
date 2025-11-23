let parentCont = document.getElementById('service-gallery');

fetch('data.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        data.galleryCards.forEach(rawData => {
            parentCont.innerHTML += `
                <div class="service-card" data-index="${rawData.indexNo}">
                    <img src="${rawData.img}" class="service-thumbnail" alt="${rawData.alt}">
                    <div class="card-overlay">
                        <h3>${rawData.heading}</h3>
                        <p>${rawData.text}</p>
                    </div>
                </div>
            `
        });

        document.dispatchEvent(new Event('cardsLoaded'));
    })
    .catch(error => {
        console.log("data fetch nh ho raha " + error);
    });