/* =========================================================
   SIXT — SCRIPT.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. ELEMENTOS
       ===================================================== */

    const header = document.querySelector(".header");

    const navLinks = document.querySelectorAll(".nav a");

    const sections = document.querySelectorAll("section[id]");

    const revealElements = document.querySelectorAll(".reveal");

    const catalogItems = document.querySelectorAll(".catalog-item");

    const memberCards = document.querySelectorAll(".member-card");


    /* =====================================================
       02. ANIMAÇÃO DE ENTRADA
       ===================================================== */

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =====================================================
       03. HEADER AO ROLAR
       ===================================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 30) {

            header.style.boxShadow =
                "0 8px 30px rgba(48, 16, 68, 0.07)";

        } else {

            header.style.boxShadow = "none";

        }

    }


    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =====================================================
       04. NAVEGAÇÃO SUAVE
       ===================================================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       05. MENU ATIVO
       ===================================================== */

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                const currentSection = entry.target.id;

                navLinks.forEach((link) => {

                    link.classList.remove("active");

                    const target =
                        link.getAttribute("href");

                    if (target === `#${currentSection}`) {

                        link.classList.add("active");

                    }

                });

            });

        },
        {
            threshold: 0.45
        }
    );


    sections.forEach((section) => {

        sectionObserver.observe(section);

    });


    /* =====================================================
       06. ANIMAÇÃO DO HERO
       ===================================================== */

    const heroLabel =
        document.querySelector(".hero-label");

    const heroTitle =
        document.querySelector(".hero h1");

    const heroText =
        document.querySelector(".hero p");


    function heroAnimation(element, delay, distance) {

        if (!element) return;

        element.style.opacity = "0";

        element.style.transform =
            `translateY(${distance}px)`;


        setTimeout(() => {

            element.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";

            element.style.opacity = "1";

            element.style.transform =
                "translateY(0)";

        }, delay);

    }


    heroAnimation(heroLabel, 150, 15);

    heroAnimation(heroTitle, 300, 25);

    heroAnimation(heroText, 500, 20);


    /* =====================================================
       07. ANIMAÇÃO DO CATÁLOGO
       ===================================================== */

    catalogItems.forEach((item, index) => {

        item.style.opacity = "0";

        item.style.transform = "translateY(25px)";


        const catalogObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) return;


                        setTimeout(() => {

                            entry.target.style.transition =
                                "opacity 0.65s ease, transform 0.65s ease";

                            entry.target.style.opacity = "1";

                            entry.target.style.transform =
                                "translateY(0)";

                        }, index * 100);


                        observer.unobserve(entry.target);

                    });

                },
                {
                    threshold: 0.12
                }
            );


        catalogObserver.observe(item);

    });


    /* =====================================================
       08. INTERAÇÃO DOS ITENS DO CATÁLOGO
       ===================================================== */

    catalogItems.forEach((item) => {

        item.addEventListener("mouseenter", () => {

            item.style.zIndex = "5";

        });


        item.addEventListener("mouseleave", () => {

            item.style.zIndex = "1";

        });

    });


    /* =====================================================
       09. ANIMAÇÃO DA EQUIPE
       ===================================================== */

    memberCards.forEach((card, index) => {

        card.style.opacity = "0";

        card.style.transform = "translateY(25px)";


        const memberObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) return;


                        setTimeout(() => {

                            entry.target.style.transition =
                                "opacity 0.65s ease, transform 0.65s ease";

                            entry.target.style.opacity = "1";

                            entry.target.style.transform =
                                "translateY(0)";

                        }, index * 100);


                        observer.unobserve(entry.target);

                    });

                },
                {
                    threshold: 0.12
                }
            );


        memberObserver.observe(card);

    });


    /* =====================================================
       10. EFEITO PARALLAX DISCRETO NO HERO
       ===================================================== */

    const hero = document.querySelector(".hero");


    if (hero) {

        window.addEventListener("scroll", () => {

            const scroll = window.scrollY;


            if (scroll < window.innerHeight) {

                hero.style.backgroundPosition =
                    `center ${scroll * 0.04}px`;

            }

        });

    }


    /* =====================================================
       11. IMAGENS
       ===================================================== */

    const images = document.querySelectorAll("img");


    images.forEach((image) => {

        image.addEventListener("error", () => {

            console.warn(
                "Imagem não encontrada:",
                image.src
            );

            image.classList.add("image-error");

        });

    });


    /* =====================================================
       12. ANO AUTOMÁTICO DO FOOTER
       ===================================================== */

    const yearElement =
        document.querySelector("[data-year]");


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       13. LOG
       ===================================================== */

    console.log(
        "SIXT — site carregado com sucesso."
    );

});