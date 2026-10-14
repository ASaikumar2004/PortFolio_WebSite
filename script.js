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

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject =
            document.getElementById("contactSubject").value.trim() ||
            "Portfolio inquiry";

        const message = document
            .getElementById("contactMessage")
            .value.trim();

        const recipient = "your-email@example.com";

        const body =
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}`;

        const mailtoLink =
            `mailto:${recipient}` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;

        formStatus.textContent =
            "Opening your email application...";

        window.location.href = mailtoLink;
    });
}



const footerYear = document.getElementById("footerYear");

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}
