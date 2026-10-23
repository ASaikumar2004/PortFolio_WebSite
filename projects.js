// ============================================================
//  PROJECTS PAGE INTERACTIVE SCRIPT - SAI KUMAR PORTFOLIO
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    // ---------------------------------------------------------
    // 1. Project Category Filtering & Live Search
    // ---------------------------------------------------------
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-showcase-card");
    const searchInput = document.getElementById("projectSearch");
    const clearSearchBtn = document.getElementById("clearSearch");
    const noProjectsNotice = document.getElementById("noProjects");
    const resetFilterBtn = document.getElementById("resetFilterBtn");

    let currentFilter = "all";
    let currentSearchTerm = "";

    function filterProjects() {
        let visibleCount = 0;

        projectCards.forEach((card) => {
            const categories = (card.getAttribute("data-category") || "").toLowerCase().split(" ");
            const searchData = (card.getAttribute("data-title") || "").toLowerCase();
            const cardText = card.textContent.toLowerCase();

            const matchesCategory =
                currentFilter === "all" || categories.includes(currentFilter);
            const matchesSearch =
                !currentSearchTerm ||
                searchData.includes(currentSearchTerm) ||
                cardText.includes(currentSearchTerm);

            if (matchesCategory && matchesSearch) {
                card.style.display = "flex";
                // Trigger reveal animation smoothly
                setTimeout(() => card.classList.add("revealed"), 50);
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        if (noProjectsNotice) {
            noProjectsNotice.style.display = visibleCount === 0 ? "block" : "none";
        }
    }

    // Filter Buttons Click
    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            currentFilter = btn.getAttribute("data-filter") || "all";
            filterProjects();
        });
    });

    // Live Search Input
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            currentSearchTerm = e.target.value.trim().toLowerCase();
            if (clearSearchBtn) {
                clearSearchBtn.style.display = currentSearchTerm ? "block" : "none";
            }
            filterProjects();
        });
    }

    // Clear Search Button
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener("click", () => {
            if (searchInput) {
                searchInput.value = "";
                searchInput.focus();
            }
            currentSearchTerm = "";
            clearSearchBtn.style.display = "none";
            filterProjects();
        });
    }

    // Reset Filters Button (when no results found)
    if (resetFilterBtn) {
        resetFilterBtn.addEventListener("click", () => {
            if (searchInput) {
                searchInput.value = "";
            }
            currentSearchTerm = "";
            currentFilter = "all";
            if (clearSearchBtn) clearSearchBtn.style.display = "none";

            filterButtons.forEach((b) => {
                b.classList.toggle("active", b.getAttribute("data-filter") === "all");
            });

            filterProjects();
        });
    }

    // ---------------------------------------------------------
    // 2. Interactive Modals Data & Logic
    // ---------------------------------------------------------
    const projectModal = document.getElementById("projectModal");
    const modalBackdrop = document.getElementById("modalBackdrop");
    const modalClose = document.getElementById("modalClose");
    const modalBody = document.getElementById("modalBody");

    const modalData = {
        "votenow-modal": {
            badge: "AWS Serverless Cloud",
            title: "VoteNow – Cloud Online Polling Architecture",
            tags: ["Amazon S3", "AWS Lambda", "API Gateway", "DynamoDB", "CloudFront"],
            summary: "A high-concurrency, serverless voting system built on Amazon Web Services to handle live polling without provisioned server overhead.",
            features: [
                "Zero-server management using AWS Lambda functions triggered via Amazon API Gateway.",
                "DynamoDB provides single-digit millisecond latency for vote capture and atomic tally increments.",
                "Frontend hosted with high availability on Amazon S3 static website hosting.",
                "Strict one-vote-per-user enforcement with tokenized session validation and IP rate limiting.",
                "Real-time visual charts rendering instant demographic polling insights."
            ],
            architecture: [
                { step: "1. Client Request", desc: "User opens responsive UI on S3, authenticates and submits a ballot." },
                { step: "2. API Gateway", desc: "Validates the HTTP payload, rate limits, and routes to the appropriate Lambda function." },
                { step: "3. AWS Lambda", desc: "Executes business logic, checks duplicate vote flags, and sanitizes input." },
                { step: "4. DynamoDB", desc: "Performs atomic vote increments (`UpdateItem`) with conditional expressions." },
                { step: "5. Real-Time Result", desc: "Aggregated live counts are broadcast back and displayed on dynamic charts." }
            ],
            githubUrl: "https://github.com/ASaikumar2004",
            demoType: "Cloud Architecture Showcase"
        },
        "library-modal": {
            badge: "Angular & TypeScript",
            title: "Public Library Platform Details",
            tags: ["Angular", "TypeScript", "RxJS", "Component Architecture"],
            summary: "A single-page application built with modern Angular architecture designed for managing public library resources, book searches, and reader reservations.",
            features: [
                "Hierarchical Angular component structure with smart/dumb component separation.",
                "Reactive state and catalog searching using RxJS observables and debounce operators.",
                "Categorized browsing across Fiction, Technology, Science, and Digital Learning media.",
                "Dynamic responsive grid adapting effortlessly from mobile devices to desktop monitors.",
                "Optimized Angular routing with pre-loaded modules for swift navigation."
            ],
            architecture: [
                { step: "Catalog Service", desc: "Centralized Angular service providing mock REST data streams via RxJS." },
                { step: "Search & Filter Pipes", desc: "Real-time client-side book filtering by author, genre, and availability." },
                { step: "Component Tree", desc: "Navbar -> BookGrid -> BookCard -> Modal Details for maximum code reuse." }
            ],
            githubUrl: "https://github.com/ASaikumar2004/PublicLibrary",
            demoType: "Angular SPA"
        },
        "restapi-modal": {
            badge: "Java / Spring Boot",
            title: "CRUD RESTful API Service Architecture",
            tags: ["Spring Boot", "Spring Data JPA", "Hibernate", "MySQL", "Swagger"],
            summary: "Enterprise-grade REST API backend built using Spring Boot, Hibernate ORM, and MySQL following industry-standard multi-layer architecture.",
            features: [
                "Layered architecture: Controller -> Service -> Repository -> Entity for clean separation of concerns.",
                "Comprehensive CRUD endpoints: GET, POST, PUT, DELETE with HTTP status codes (200, 201, 404, 500).",
                "Data Transfer Object (DTO) pattern with model mapping to avoid entity leakage.",
                "Global exception handling using `@RestControllerAdvice` and `@ExceptionHandler`.",
                "Interactive Swagger/OpenAPI documentation for testing endpoints directly."
            ],
            endpoints: [
                { method: "GET", path: "/api/v1/items", desc: "Retrieve paginated list of all records." },
                { method: "GET", path: "/api/v1/items/{id}", desc: "Fetch single entity details by ID." },
                { method: "POST", path: "/api/v1/items", desc: "Create new entity with `@Valid` request body." },
                { method: "PUT", path: "/api/v1/items/{id}", desc: "Update existing entity properties." },
                { method: "DELETE", path: "/api/v1/items/{id}", desc: "Remove record by ID safely." }
            ],
            githubUrl: "https://github.com/ASaikumar2004/RestApi",
            demoType: "Spring Boot Microservice"
        },
        "springmvc-modal": {
            badge: "Spring MVC & Hibernate",
            title: "Spring MVC Web Application Architecture",
            tags: ["Spring MVC", "Hibernate", "JSP", "Servlets", "MySQL"],
            summary: "Full-stack MVC web application demonstrating the core principles of server-side Java web development, form validation, and relational database persistence.",
            features: [
                "DispatcherServlet configuration routing client requests to `@Controller` classes.",
                "Hibernate SessionFactory managing entity transactions with MySQL database.",
                "JSP (JavaServer Pages) with JSTL tags providing clean, dynamic HTML rendering.",
                "Form validation using Hibernate Validator (`@NotEmpty`, `@Size`, `@Email`).",
                "Connection pooling and transaction management with `@Transactional`."
            ],
            githubUrl: "https://github.com/ASaikumar2004/springmvc-",
            demoType: "Full-Stack MVC System"
        },
        "student-modal": {
            badge: "Java / Servlets / JDBC",
            title: "Student Management System (CRUD)",
            tags: ["Java Servlets", "JSP", "JDBC", "MySQL", "MVC Pattern"],
            summary: "Classic Java web application implementing complete student registration, course tracking, grade updates, and reporting using Servlets and JDBC.",
            features: [
                "Direct JDBC database connectivity using `PreparedStatement` to prevent SQL Injection.",
                "Servlet controllers managing GET and POST request lifecycle with forward/redirect flows.",
                "Student record operations: Add, Edit, Delete, View All, and Search by Roll Number.",
                "Clean database schema with student demographics, branch, and academic standing.",
                "Deployed and tested on Apache Tomcat web server."
            ],
            githubUrl: "https://github.com/ASaikumar2004/studentcrud",
            demoType: "Java Web Application"
        },
        "delivery-modal": {
            badge: "Core Java & OOP",
            title: "Package Delivery Tracker Logic & Flow",
            tags: ["Core Java", "OOP Principles", "MySQL Database", "Console UI"],
            summary: "Object-oriented parcel tracking and delivery management system designed to simulate logistics operations with automated billing.",
            features: [
                "Encapsulation, Inheritance, and Polymorphism applied across DeliveryAgent, Customer, and Parcel classes.",
                "Real-time parcel tracking status progression (Booked -> In Transit -> Out for Delivery -> Delivered).",
                "Automated billing calculator factoring in parcel weight, priority class, and delivery distance.",
                "MySQL database integration to persist booking records and delivery timestamps.",
                "Modular console interface with input validation and clear receipt generation."
            ],
            githubUrl: "https://github.com/ASaikumar2004/PackageDeliveryTracker_CoreJava",
            demoType: "Java Console Application"
        },
        "dsa-modal": {
            badge: "Algorithms & Problem Solving",
            title: "Data Structures & Algorithms Repository",
            tags: ["Java", "Data Structures", "Algorithms", "LeetCode Solutions"],
            summary: "A structured, curated collection of 100+ topic-wise algorithmic solutions in Java designed for mastering coding interviews and fundamental computer science.",
            features: [
                "Linear Data Structures: Arrays, Two-Pointer problems, Sliding Window, Linked Lists, Stacks, Queues.",
                "Non-Linear Data Structures: Binary Trees, Binary Search Trees, Tree Traversals, Graphs (BFS/DFS).",
                "Algorithmic Strategies: Recursion, Backtracking, Divide & Conquer, Binary Search, Dynamic Programming.",
                "Clean Java code with documented Time & Space Complexities (`O(N)`, `O(log N)`).",
                "Unit test cases verifying edge cases, null pointers, and boundary conditions."
            ],
            githubUrl: "https://github.com/ASaikumar2004/DSA",
            demoType: "Algorithms Repository"
        },
        "weather-modal": {
            badge: "React & OpenWeather API",
            title: "Real-Time Weather App Details",
            tags: ["React", "JavaScript", "REST API", "Responsive UI"],
            summary: "Interactive weather application built with React, connecting to live OpenWeather API endpoints to fetch current temperatures, weather conditions, and forecast indicators.",
            features: [
                "Instant worldwide city lookup with autocomplete and error handling for invalid cities.",
                "Live weather metrics: Temperature (°C/°F), Humidity, Wind Speed, Atmospheric Pressure.",
                "Dynamic background and icon animations changing in response to weather states (Clear, Rain, Snow, Clouds).",
                "Responsive card UI with smooth state transitions."
            ],
            githubUrl: "https://github.com/ASaikumar2004/weatherapp",
            demoType: "React Web App"
        },
        "watch-modal": {
            badge: "Modern HTML5 & CSS3",
            title: "Luxury Watch Store Showcase",
            tags: ["HTML5", "CSS3", "CSS Grid", "E-Commerce Design"],
            summary: "Modern luxury timepiece showcase designed with CSS Flexbox and Grid, emphasizing typography, dark visual aesthetics, and clean product cards.",
            features: [
                "Dark minimalist luxury color palette highlighting premium watch materials and dials.",
                "Detailed product showcase cards with high-resolution imagery and specifications.",
                "Smooth hover transitions and micro-animations on interactive buttons.",
                "100% responsive layout adapting from mobile screens to ultra-wide displays."
            ],
            githubUrl: "https://github.com/ASaikumar2004/watchwebsite",
            demoType: "Frontend Storefront"
        }
    };

    function openModal(modalId) {
        const data = modalData[modalId];
        if (!data || !modalBody || !projectModal) return;

        let contentHtml = `
            <div class="modal-header">
                <span class="modal-badge">${data.badge}</span>
                <h2>${data.title}</h2>
                <div class="project-tags modal-tags">
                    ${data.tags.map(t => `<span class="tag tag-active">${t}</span>`).join("")}
                </div>
            </div>
            
            <p class="modal-summary">${data.summary}</p>
            
            <div class="modal-section">
                <h4>Key Highlights &amp; Features</h4>
                <ul class="modal-features">
                    ${data.features.map(f => `<li><span class="feat-bullet">✓</span> <span>${f}</span></li>`).join("")}
                </ul>
            </div>
        `;

        if (data.architecture) {
            contentHtml += `
                <div class="modal-section">
                    <h4>Architecture &amp; Data Flow</h4>
                    <div class="modal-arch-grid">
                        ${data.architecture.map(a => `
                            <div class="arch-card">
                                <strong>${a.step}</strong>
                                <p>${a.desc}</p>
                            </div>
                        `).join("")}
                    </div>
                </div>
            `;
        }

        if (data.endpoints) {
            contentHtml += `
                <div class="modal-section">
                    <h4>Sample REST Endpoints</h4>
                    <div class="modal-endpoints">
                        ${data.endpoints.map(e => `
                            <div class="endpoint-row">
                                <span class="endpoint-method method-${e.method.toLowerCase()}">${e.method}</span>
                                <code class="endpoint-path">${e.path}</code>
                                <span class="endpoint-desc">${e.desc}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            `;
        }

        contentHtml += `
            <div class="modal-footer">
                <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-github">
                    <span>View Repository on GitHub</span> ↗
                </a>
            </div>
        `;

        modalBody.innerHTML = contentHtml;
        projectModal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        if (!projectModal) return;
        projectModal.classList.remove("active");
        document.body.style.overflow = "";
    }

    // Modal Trigger Buttons
    document.querySelectorAll("[data-modal]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const modalId = btn.getAttribute("data-modal");
            openModal(modalId);
        });
    });

    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && projectModal && projectModal.classList.contains("active")) {
            closeModal();
        }
    });
});
