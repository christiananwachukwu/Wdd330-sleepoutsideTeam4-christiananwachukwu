import confetti from "https://cdn.skypack.dev/canvas-confetti";

/** Show modal only on first visit */
document.addEventListener("DOMContentLoaded", () => {
    const hasRegistered = localStorage.getItem("registeredUser");
    const modal = document.querySelector("#register-modal");

    if (!hasRegistered) {
        modal.classList.remove("hidden");
    }

    const registerForm = document.querySelector("#register-form");

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const emailInput = document.querySelector("#reg-email").value.trim();

        // Email validation
        if (!validateEmail(emailInput)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Save in localStorage so modal doesn't show again
        localStorage.setItem("registeredUser", emailInput);

        // Hide modal
        modal.classList.add("hidden");

        // Trigger confetti animation 🎉
        launchConfetti();

        alert("🎉 Registration successful! Good luck in the giveaway!");
    });
});

/** Email Validation */
function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

/** Confetti Animation */
function launchConfetti() {
    confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 }
    });
}
