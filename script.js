
/* =========================================
   PORTFOLIO INTERACTIVE SCRIPTS - SAI KUMAR
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // -------------------------------------------------------------
    // 0. Page Preloader
    // -------------------------------------------------------------
    const preloader = document.getElementById("pagePreloader");

    if (preloader) {
        document.body.classList.add("is-loading");

        const hidePreloader = () => {
            if (!preloader.classList.contains("fade-out")) {
                preloader.classList.add("fade-out");
                document.body.classList.remove("is-loading");

                setTimeout(() => {
                    preloader.style.display = "none";
                }, 650);
            }
        };

        if (document.readyState === "complete") {
            setTimeout(hidePreloader, 700);
        } else {
            window.addEventListener("load", () => {
                setTimeout(hidePreloader, 700);
            });
        }

        // Maximum timeout fallback
        setTimeout(hidePreloader, 2000);
    }

    // -------------------------------------------------------------
    // 1. Dynamic Footer Year
    // -------------------------------------------------------------
    const footerYear = document.getElementById("footerYear");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    // -------------------------------------------------------------
    // 2. Mobile Navigation Menu Toggle
    // -------------------------------------------------------------
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", (e) => {
            e.stopPropagation();

            const isOpen = navLinks.classList.toggle("open");

            menuBtn.setAttribute("aria-expanded", String(isOpen));
            menuBtn.innerHTML = isOpen ? "&times;" : "&#9776;";
        });

        // Close menu when clicking a navigation link
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.innerHTML = "&#9776;";
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (
                !navLinks.contains(e.target) &&
                !menuBtn.contains(e.target)
            ) {
                navLinks.classList.remove("open");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.innerHTML = "&#9776;";
            }
        });
    }

    // -------------------------------------------------------------
    // 3. Dark / Light Theme Toggle
    // -------------------------------------------------------------
    const themeBtn = document.getElementById("themeBtn");
    const savedTheme = localStorage.getItem("portfolio_theme");

    // Initialize saved theme
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");

        if (themeBtn) {
            themeBtn.textContent = "☾";
        }
    } else {
        document.body.classList.remove("light-theme");

        if (themeBtn) {
            themeBtn.textContent = "☼";
        }
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const isLight =
                document.body.classList.toggle("light-theme");

            localStorage.setItem(
                "portfolio_theme",
                isLight ? "light" : "dark"
            );

            themeBtn.textContent = isLight ? "☾" : "☼";
        });
    }

    // -------------------------------------------------------------
    // 4. Active Navigation Link on Scroll
    // -------------------------------------------------------------
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    function updateActiveNav() {
        const scrollPosition = window.pageYOffset + 140;

        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (
                scrollPosition >= top &&
                scrollPosition < top + height
            ) {
                navItems.forEach((link) => {
                    link.classList.remove("active");

                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav, {
        passive: true
    });

    updateActiveNav();

    // -------------------------------------------------------------
    // 5. Scroll Reveal Animation
    // -------------------------------------------------------------
    const revealTargets = document.querySelectorAll(
        ".services-grid, .service-card, .education-item, " +
        ".work-card, .skill-category, .about-container, " +
        ".review-card, .contact-container, .project-showcase-card"
    );

    revealTargets.forEach((el) => {
        el.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealTargets.forEach((el) => {
            revealObserver.observe(el);
        });
    } else {
        revealTargets.forEach((el) => {
            el.classList.add("revealed");
        });
    }

    // -------------------------------------------------------------
    // 6. Technical Skills Animation
    // -------------------------------------------------------------
    const skillsSection = document.getElementById("skills");
    const skillBars = document.querySelectorAll(".skill-progress");
    const skillPercentages = document.querySelectorAll(".skill-pct");

    let skillsAnimated = false;

    function animateSkills() {
        if (skillsAnimated) return;

        skillsAnimated = true;

        // Fill skill progress bars
        skillBars.forEach((bar) => {
            const target = bar.getAttribute("data-progress");

            if (target) {
                bar.style.width = target;
            }
        });

        // Percentage count-up animation
        skillPercentages.forEach((pctEl) => {
            const target =
                parseInt(pctEl.getAttribute("data-target"), 10) || 0;

            const duration = 1400;
            const startTime = performance.now();

            function updateCount(currentTime) {
                const elapsed = currentTime - startTime;

                const progress = Math.min(
                    elapsed / duration,
                    1
                );

                // Ease-out cubic
                const easedProgress =
                    1 - Math.pow(1 - progress, 3);

                const currentVal = Math.floor(
                    easedProgress * target
                );

                pctEl.textContent = `${currentVal}%`;

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    pctEl.textContent = `${target}%`;
                }
            }

            requestAnimationFrame(updateCount);
        });
    }

    if (
        skillsSection &&
        "IntersectionObserver" in window
    ) {
        const skillsObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateSkills();
                        skillsObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.25 }
        );

        skillsObserver.observe(skillsSection);
    } else {
        setTimeout(animateSkills, 500);
    }

    // -------------------------------------------------------------
    // 7. Back-to-Top Button
    // -------------------------------------------------------------
    const backToTopBtn = document.getElementById("backToTop");

    if (backToTopBtn) {
        window.addEventListener(
            "scroll",
            () => {
                if (window.pageYOffset > 400) {
                    backToTopBtn.classList.add("visible");
                } else {
                    backToTopBtn.classList.remove("visible");
                }
            },
            { passive: true }
        );

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // -------------------------------------------------------------
    // 8. Contact Form with EmailJS
    // -------------------------------------------------------------

    // EmailJS Configuration
    const EMAILJS_PUBLIC_KEY = "WH93x8LeFF7M8Ux0q";
    const EMAILJS_SERVICE_ID = "service_e9513xc";
    const EMAILJS_TEMPLATE_ID = "template_q2ohvlb";

    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    const submitBtn =
        document.getElementById("contactSubmitBtn") ||
        contactForm?.querySelector(".contact-submit");

    // Initialize EmailJS
    if (
        window.emailjs &&
        EMAILJS_PUBLIC_KEY
    ) {
        try {
            window.emailjs.init({
                publicKey: EMAILJS_PUBLIC_KEY
            });
        } catch (error) {
            console.warn("EmailJS initialization error:", error);
        }
    }

    // Helper function for status messages
    function showFormStatus(message, color) {
        if (formStatus) {
            formStatus.style.color = color;
            formStatus.textContent = message;
        }
    }

    // Create Gmail fallback link with exact diagnostic message
    function showGmailFallback(name, email, subject, message, reasonText) {
        if (!formStatus) return;

        const gmailSubject =
            subject || "Portfolio Inquiry";

        const gmailBody =
            `Hi Sai Kumar,\n\n${message}\n\n` +
            `From: ${name} (${email})`;

        const mailtoLink =
            `mailto:ampolusaikumar2004@gmail.com` +
            `?subject=${encodeURIComponent(gmailSubject)}` +
            `&body=${encodeURIComponent(gmailBody)}`;

        formStatus.innerHTML = "";

        const container = document.createElement("div");
        container.style.marginTop = "6px";

        if (reasonText) {
            const errDiv = document.createElement("div");
            errDiv.style.color = "#ef4444";
            errDiv.style.fontSize = "13px";
            errDiv.style.marginBottom = "4px";
            errDiv.textContent = reasonText;
            container.appendChild(errDiv);
        }

        const messageText = document.createElement("span");
        messageText.textContent = "Fallback: ";
        messageText.style.color = "#a1a1aa";
        messageText.style.fontSize = "13px";

        const link = document.createElement("a");
        link.href = mailtoLink;
        link.textContent = "Click here to send directly via Gmail / Email →";
        link.style.color = "#ff6426";
        link.style.textDecoration = "underline";
        link.style.fontWeight = "600";
        link.style.fontSize = "13px";

        container.appendChild(messageText);
        container.appendChild(link);
        formStatus.appendChild(container);
    }

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Get form inputs
            const nameInput =
                document.getElementById("contactName");

            const emailInput =
                document.getElementById("contactEmail");

            const subjectInput =
                document.getElementById("contactSubject");

            const messageInput =
                document.getElementById("contactMessage");

            // Read input values
            const name = nameInput
                ? nameInput.value.trim()
                : "";

            const email = emailInput
                ? emailInput.value.trim()
                : "";

            const subject = subjectInput
                ? subjectInput.value.trim()
                : "";

            const message = messageInput
                ? messageInput.value.trim()
                : "";

            // Validate required fields
            if (!name || !email || !message) {
                showFormStatus(
                    "Please fill in all required fields (*).",
                    "#ff6426"
                );
                return;
            }

            // Validate email address
            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                showFormStatus(
                    "Please enter a valid email address.",
                    "#ff6426"
                );
                return;
            }

            // Check EmailJS SDK and configuration
            if (!window.emailjs) {
                showGmailFallback(
                    name,
                    email,
                    subject,
                    message,
                    "Notice: EmailJS library script not loaded (check internet connection or ad-blocker)."
                );
                return;
            }

            const hasKeys =
                Boolean(EMAILJS_PUBLIC_KEY) &&
                Boolean(EMAILJS_SERVICE_ID) &&
                Boolean(EMAILJS_TEMPLATE_ID);

            if (!hasKeys) {
                showGmailFallback(
                    name,
                    email,
                    subject,
                    message,
                    "Notice: EmailJS keys are missing or incomplete."
                );
                return;
            }

            // Save original submit button content
            const originalBtnContent = submitBtn
                ? submitBtn.innerHTML
                : "Send message →";

            // Prevent duplicate submissions
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML =
                    "Sending... <span>→</span>";
            }

            if (formStatus) {
                formStatus.style.color = "#a1a1aa";
                formStatus.textContent =
                    "Sending your message...";
            }

            try {
                // Parameters must match EmailJS template variables
                const templateParams = {
                    name: name,
                    from_name: name,
                    email: email,
                    from_email: email,
                    subject: subject || "New Portfolio Message",
                    message: message,

                    time: new Date().toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short"
                    }),

                    // Used by EmailJS if configured in Reply-To
                    reply_to: email
                };

                // Send contact form using EmailJS
                await window.emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    templateParams,
                    EMAILJS_PUBLIC_KEY
                );

                // Restore submit button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                }

                // Display success message
                showFormStatus(
                    "✓ Thank you! Your message has been sent successfully. I'll get back to you soon!",
                    "#22c55e"
                );

                // Clear the form
                contactForm.reset();

                // Clear status message after seven seconds
                setTimeout(() => {
                    if (formStatus) {
                        formStatus.textContent = "";
                    }
                }, 7000);

            } catch (error) {
                console.error("EmailJS send error:", error);

                // Restore submit button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                }

                const errDetail =
                    error?.text ||
                    error?.message ||
                    (typeof error === "string" ? error : JSON.stringify(error)) ||
                    "Network or service error";

                showGmailFallback(
                    name,
                    email,
                    subject,
                    message,
                    `EmailJS Error: ${errDetail}`
                );
            }
        });
    }
});
