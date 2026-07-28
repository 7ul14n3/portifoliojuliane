/* =====================================================================
   Juliane Conceição — interações responsivas e acessíveis
   ===================================================================== */
(function () {
    'use strict';

    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id], header[id]');
    const reveals = document.querySelectorAll('.reveal');
    const mobileBreakpoint = 920;

    function setMenu(open) {
        if (!navToggle || !navMenu) return;
        navMenu.classList.toggle('open', open);
        navToggle.classList.toggle('open', open);
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
        document.body.classList.toggle('menu-open', open);
    }

    function isSamePageLink(link) {
        try {
            const url = new URL(link.href, window.location.href);
            return url.pathname.replace(/\/$/, '') === window.location.pathname.replace(/\/$/, '');
        } catch (_) {
            return false;
        }
    }

    function updateActiveLink() {
        const pos = window.scrollY + 100;
        let currentId = '';

        sections.forEach(function (section) {
            if (pos >= section.offsetTop && pos < section.offsetTop + section.offsetHeight) {
                currentId = section.id;
            }
        });

        navLinks.forEach(function (link) {
            const url = new URL(link.href, window.location.href);
            const hasLocalSection = isSamePageLink(link) && url.hash;
            const isCurrentSection = hasLocalSection && url.hash === '#' + currentId;
            const isCurrentPage = !url.hash && isSamePageLink(link);
            link.classList.toggle('active', Boolean(isCurrentSection || isCurrentPage));
            if (isCurrentSection || isCurrentPage) {
                link.setAttribute('aria-current', hasLocalSection ? 'location' : 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    function onScroll() {
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);
        updateActiveLink();
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            setMenu(!navMenu.classList.contains('open'));
        });

        navMenu.addEventListener('click', function (event) {
            if (event.target.closest('.nav-link')) setMenu(false);
        });

        document.addEventListener('click', function (event) {
            if (!navMenu.classList.contains('open')) return;
            if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) setMenu(false);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && navMenu.classList.contains('open')) {
                setMenu(false);
                navToggle.focus();
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > mobileBreakpoint) setMenu(false);
        }, { passive: true });
    }

    document.querySelectorAll('a[href*="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (event) {
            const url = new URL(anchor.href, window.location.href);
            if (!url.hash || !isSamePageLink(anchor)) return;
            const target = document.querySelector(url.hash);
            if (!target) return;
            event.preventDefault();
            const navHeight = nav ? nav.offsetHeight : 0;
            const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
            window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
            history.replaceState(null, '', url.hash);
        });
    });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion && 'IntersectionObserver' in window && reveals.length) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });

        reveals.forEach(function (element, index) {
            element.style.transitionDelay = (Math.min(index % 5, 4) * 0.05) + 's';
            observer.observe(element);
        });
    } else {
        reveals.forEach(function (element) { element.classList.add('visible'); });
    }

    document.querySelectorAll('.carousel').forEach(function (carousel) {
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const previous = carousel.querySelector('.carousel-btn.prev');
        const next = carousel.querySelector('.carousel-btn.next');
        const dotsWrap = carousel.querySelector('.carousel-dots');
        if (!track || slides.length === 0) return;

        let index = 0;
        let timer = null;
        let startX = 0;

        carousel.setAttribute('tabindex', '0');

        if (dotsWrap) {
            dotsWrap.innerHTML = '';
            slides.forEach(function (_, dotIndex) {
                const button = document.createElement('button');
                button.type = 'button';
                button.setAttribute('aria-label', 'Ir para imagem ' + (dotIndex + 1));
                button.addEventListener('click', function () {
                    go(dotIndex);
                    restart();
                });
                dotsWrap.appendChild(button);
            });
        }

        function render() {
            track.style.transform = 'translate3d(' + (-index * 100) + '%, 0, 0)';
            slides.forEach(function (slide, slideIndex) {
                slide.setAttribute('aria-hidden', String(slideIndex !== index));
            });
            if (dotsWrap) {
                dotsWrap.querySelectorAll('button').forEach(function (dot, dotIndex) {
                    dot.classList.toggle('active', dotIndex === index);
                    dot.setAttribute('aria-current', dotIndex === index ? 'true' : 'false');
                });
            }
        }

        function go(nextIndex) {
            index = (nextIndex + slides.length) % slides.length;
            render();
        }

        function nextSlide() { go(index + 1); }
        function previousSlide() { go(index - 1); }

        function stop() {
            if (timer) window.clearInterval(timer);
            timer = null;
        }

        function start() {
            if (reduceMotion || document.hidden || timer) return;
            timer = window.setInterval(nextSlide, 4500);
        }

        function restart() {
            stop();
            start();
        }

        if (next) next.addEventListener('click', function () { nextSlide(); restart(); });
        if (previous) previous.addEventListener('click', function () { previousSlide(); restart(); });

        carousel.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowRight') { nextSlide(); restart(); }
            if (event.key === 'ArrowLeft') { previousSlide(); restart(); }
        });

        carousel.addEventListener('touchstart', function (event) {
            startX = event.touches[0].clientX;
        }, { passive: true });

        carousel.addEventListener('touchend', function (event) {
            const distance = event.changedTouches[0].clientX - startX;
            if (Math.abs(distance) > 40) {
                distance < 0 ? nextSlide() : previousSlide();
                restart();
            }
        }, { passive: true });

        carousel.addEventListener('mouseenter', stop);
        carousel.addEventListener('mouseleave', start);
        carousel.addEventListener('focusin', stop);
        carousel.addEventListener('focusout', start);
        document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });

        render();
        start();
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* Camada de dissuasão mantida conforme o projeto original. */
    document.addEventListener('contextmenu', function (event) { event.preventDefault(); });
    ['copy', 'cut'].forEach(function (type) {
        document.addEventListener(type, function (event) {
            const target = event.target;
            if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
            event.preventDefault();
        });
    });
    document.addEventListener('dragstart', function (event) { event.preventDefault(); });
})();
