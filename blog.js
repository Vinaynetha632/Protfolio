// ================== NAVBAR TOGGLE ==================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
	menuToggle.addEventListener("click", () => {
		navLinks.classList.toggle("show");
	});
}

// ================== ACTIVE LINK HIGHLIGHT ==================
const navItems = document.querySelectorAll(".nav-links li a");
navItems.forEach(link => {
	if (link.href === window.location.href) {
		link.classList.add("active");
	}
});

// ================== DOM READY ==================
document.addEventListener("DOMContentLoaded", () => {

	// --- Contact Form AJAX ---
	const contactForm = document.querySelector(".contact-form");
	if (contactForm) {
		contactForm.addEventListener("submit", async (e) => {
			e.preventDefault();
			const form = e.target;
			const data = new FormData(form);

			try {
				const response = await fetch(form.action, {
					method: form.method,
					body: data,
					headers: { "Accept": "application/json" }
				});

				if (response.ok) {
					alert("✅ Your message has been sent successfully!");
					form.reset();
				} else {
					alert("❌ Oops! Something went wrong. Please try again.");
				}
			} catch (error) {
				console.error("Form submit error:", error);
				alert("⚠️ Network error. Please try again later.");
			}
		});
	}

	// --- Testimonials Slider ---
	const cards = document.querySelectorAll(".testimonial-card");
	const dots = document.querySelectorAll(".dot");
	const prevBtn = document.querySelector(".nav-btn.prev");
	const nextBtn = document.querySelector(".nav-btn.next");
	let index = 0;
	let autoSlide;

	if (cards.length) {

		// Show testimonial at index i
		function showTestimonial(i) {
			cards.forEach((card, idx) => card.classList.toggle("active", idx === i));
			dots.forEach((dot, idx) => dot.classList.toggle("active", idx === i));
		}

		// Next / Previous
		function nextTestimonial() {
			index = (index + 1) % cards.length;
			showTestimonial(index);
		}
		function prevTestimonial() {
			index = (index - 1 + cards.length) % cards.length;
			showTestimonial(index);
		}

		// Manual controls
		if (nextBtn) nextBtn.addEventListener("click", () => { nextTestimonial(); resetAutoSlide(); });
		if (prevBtn) prevBtn.addEventListener("click", () => { prevTestimonial(); resetAutoSlide(); });

		if (dots.length) {
			dots.forEach((dot, i) => {
				dot.addEventListener("click", () => {
					index = i;
					showTestimonial(index);
					resetAutoSlide();
				});
			});
		}

		// Show first testimonial
		showTestimonial(index);

		// Auto-slide every 5 seconds
		function startAutoSlide() {
			autoSlide = setInterval(nextTestimonial, 5000);
		}
		function resetAutoSlide() {
			clearInterval(autoSlide);
			startAutoSlide();
		}
		startAutoSlide();
	}

	// --- Smooth Scroll for Anchor Links ---
	const anchorLinks = document.querySelectorAll('a[href^="#"]');
	anchorLinks.forEach(link => {
		link.addEventListener("click", (e) => {
			e.preventDefault();
			const target = document.querySelector(link.getAttribute("href"));
			if (target) target.scrollIntoView({ behavior: "smooth" });
		});
	});

});
