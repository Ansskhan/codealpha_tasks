// --- SIMPLIFIED JAVASCRIPT (moved from inline script in index.html) ---

// 1. Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		// Ensure we only smooth scroll internal links
		const targetId = this.getAttribute('href');
		if (targetId && targetId !== '#') {
			e.preventDefault();
			document.querySelector(targetId).scrollIntoView({
				behavior: 'smooth'
			});
		}
	});
});

// 2. Basic Form Validation (Bootstrap Standard)
(function () {
	'use strict'
	const forms = document.querySelectorAll('.needs-validation')
	forms.forEach(form => {
		form.addEventListener('submit', function (event) {
			if (!form.checkValidity()) {
				event.preventDefault()
				event.stopPropagation()
			}
			form.classList.add('was-validated')
		}, false)
	})
})()

