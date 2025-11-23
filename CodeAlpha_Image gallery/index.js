document.addEventListener('cardsLoaded', () => {
	initializeCarousel();
});

function initializeCarousel() {
	const thumbnails = document.querySelectorAll('.service-thumbnail');
	const modal = document.getElementById('lightboxModal');
	const modalImage = document.getElementById('modalImage');
	const closeBtn = document.getElementById('closeBtn');
	const prevBtn = document.getElementById('prevBtn');
	const nextBtn = document.getElementById('nextBtn');
	const scissorSound = new Audio("scissorSound.mp3");
	const paperSound = new Audio("paper.mp3");

	const imageCount = thumbnails.length;
	let currentIndex = 0;

	function updateModalImage(index) {
		// Fade out current image
		modalImage.classList.remove('show-img');

		setTimeout(() => {
			// Handle circular index (0 to imageCount - 1)
			if (index < 0) {
				currentIndex = imageCount - 1;
			} else if (index >= imageCount) {
				currentIndex = 0;
			} else {
				currentIndex = index;
			}

			// Update image source and alt
			const currentThumbnail = thumbnails[currentIndex];
			modalImage.src = currentThumbnail.src;
			modalImage.alt = currentThumbnail.alt;

			// Fade in new image
			modalImage.classList.add('show-img');
		}, 400);
	}

	function closeModal() {
		// Fade out modal and hide it after transition
		modal.classList.remove('is-visible');
		setTimeout(() => { modal.style.display = "none"; }, 300);
	}

	thumbnails.forEach((thumbnail, index) => {
		thumbnail.addEventListener('click', () => {
			paperSound.play();
			currentIndex = index;
			modal.style.display = "block";

			// Allow the display change to register before starting fade-in
			setTimeout(() => { modal.classList.add('is-visible'); }, 10);

			updateModalImage(currentIndex);
		});
	});

	closeBtn.addEventListener('click', closeModal);

	modal.addEventListener('click', (event) => {
		if (event.target === modal) {
			closeModal();
		}
	});


	nextBtn.addEventListener('click', (e) => {
		scissorSound.currentTime = 0;
		scissorSound.play();
		e.stopPropagation();
		updateModalImage(currentIndex + 1);
	});

	prevBtn.addEventListener('click', (e) => {
		scissorSound.currentTime = 0;
		scissorSound.play();
		e.stopPropagation();
		updateModalImage(currentIndex - 1);
	});

	// Keyboard Navigation (Escape, Left, Right)
	document.addEventListener('keydown', (e) => {
		if (modal.classList.contains('is-visible')) {
			if (e.key === 'ArrowRight') {
				updateModalImage(currentIndex + 1);
			} else if (e.key === 'ArrowLeft') {
				updateModalImage(currentIndex - 1);
			} else if (e.key === 'Escape') {
				closeModal();
			}
		}
	});
}

// Initialize carousel on page load
initializeCarousel();


