const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const themeBtn = document.getElementById("themeBtn");

// =====================================
// 1. MOBILE NAVIGATION
// =====================================

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuBtn.textContent = isOpen ? "✕" : "☰";
        menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuBtn.textContent = "☰";
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });
}

// =====================================
// 2. DARK / LIGHT THEME
// =====================================

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");

        themeBtn.textContent =
            document.body.classList.contains("light-theme") ? "☾" : "☼";
    });
}

// =====================================
// 3. FOOTER YEAR
// =====================================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// =====================================
// 4. ACTIVE NAVBAR UNDERLINE
// =====================================

const navItems = document.querySelectorAll(
    '.nav-links a[href^="#"]'
);

const pageSections = document.querySelectorAll(
    "main section[id]"
);

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                navItems.forEach((link) => {
                    const isActive =
                        link.getAttribute("href") ===
                        `#${entry.target.id}`;

                    link.classList.toggle("active", isActive);
                });
            });
        },
        {
            rootMargin: "-25% 0px -65% 0px",
            threshold: 0
        }
    );

    pageSections.forEach((section) => {
        sectionObserver.observe(section);
    });
}


const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const sendButton = contactForm.querySelector(".contact-submit");

// Replace these with your EmailJS details
const SERVICE_ID = "service_e9513xc";
const TEMPLATE_ID = "template_ncc5efg";
const PUBLIC_KEY = "WH93x8LeFF7M8Ux0q";

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    sendButton.disabled = true;
    sendButton.textContent = "Sending...";
    formStatus.textContent = "";

    try {
        await emailjs.sendForm(
            SERVICE_ID,
            TEMPLATE_ID,
            contactForm,
            { publicKey: PUBLIC_KEY }
        );

        formStatus.textContent = "Message sent successfully!";
        contactForm.reset();

    } catch (error) {
        console.error("EmailJS error:", error);
        formStatus.textContent =
            "Unable to send your message. Please try again.";
    } finally {
        sendButton.disabled = false;
        sendButton.innerHTML = 'Send message <span>&rarr;</span>';
    }
});


const footerYear = document.getElementById("footerYear");

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}
