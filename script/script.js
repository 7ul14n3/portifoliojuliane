/* =====================================================================
   Juliane Conceição — interações do site
   - Nav: estado "scrolled" + link ativo + menu mobile
   - Smooth scroll para âncoras internas
   - Animações de entrada (reveal)
   - Carrossel "Quem sou"
   - Proteção de conteúdo (anti inspeção / cópia) — ver nota no final
   ===================================================================== */
(function () {
    'use strict';

    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id], header[id]');
    const reveals = document.querySelectorAll('.reveal');

    /* ---------- NAV ---------- */
    function onScroll() {
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);
        const pos = window.scrollY + 90;
        let currentId = '';
        sections.forEach(function (sec) {
            if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
                currentId = sec.getAttribute('id');
            }
        });
        navLinks.forEach(function (link) {
            const href = link.getAttribute('href') || '';
            link.classList.toggle('active', href === '#' + currentId);
        });
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            const open = navMenu.classList.toggle('open');
            navToggle.classList.toggle('open', open);
            navToggle.setAttribute('aria-expanded', String(open));
        });
        navMenu.addEventListener('click', function (e) {
            if (e.target.classList.contains('nav-link')) {
                navMenu.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ---------- Smooth scroll ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = anchor.getAttribute('href');
            if (href === '#' || href.length < 2) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - 70;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    /* ---------- Reveal ---------- */
    if ('IntersectionObserver' in window && reveals.length) {
        const io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
        reveals.forEach(function (el, i) {
            el.style.transitionDelay = (Math.min(i % 6, 5) * 0.06) + 's';
            io.observe(el);
        });
    } else {
        reveals.forEach(function (el) { el.classList.add('visible'); });
    }

    /* ---------- Carrossel ---------- */
    document.querySelectorAll('.carousel').forEach(function (carousel) {
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prev = carousel.querySelector('.carousel-btn.prev');
        const next = carousel.querySelector('.carousel-btn.next');
        const dotsWrap = carousel.querySelector('.carousel-dots');
        if (!track || slides.length === 0) return;

        let index = 0;
        let timer = null;

        if (dotsWrap) {
            slides.forEach(function (_, i) {
                const b = document.createElement('button');
                b.setAttribute('aria-label', 'Ir para imagem ' + (i + 1));
                b.addEventListener('click', function () { go(i); restart(); });
                dotsWrap.appendChild(b);
            });
        }

        function render() {
            track.style.transform = 'translateX(' + (-index * 100) + '%)';
            if (dotsWrap) {
                dotsWrap.querySelectorAll('button').forEach(function (d, i) {
                    d.classList.toggle('active', i === index);
                });
            }
        }
        function go(i) { index = (i + slides.length) % slides.length; render(); }
        function nextSlide() { go(index + 1); }
        function prevSlide() { go(index - 1); }
        function start() { timer = setInterval(nextSlide, 4500); }
        function restart() { clearInterval(timer); start(); }

        if (next) next.addEventListener('click', function () { nextSlide(); restart(); });
        if (prev) prev.addEventListener('click', function () { prevSlide(); restart(); });

        let startX = 0;
        carousel.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
        carousel.addEventListener('touchend', function (e) {
            const dx = e.changedTouches[0].clientX - startX;
            if (Math.abs(dx) > 40) { dx < 0 ? nextSlide() : prevSlide(); restart(); }
        }, { passive: true });

        carousel.addEventListener('mouseenter', function () { clearInterval(timer); });
        carousel.addEventListener('mouseleave', start);

        render();
        start();
    });

    /* ---------- Init nav ---------- */
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* =================================================================
       PROTEÇÃO DE CONTEÚDO
       Observação honesta: estas medidas DESENCORAJAM a cópia casual,
       mas não tornam o site "inviolável" — todo conteúdo enviado ao
       navegador pode, em última instância, ser acessado por quem tem
       conhecimento técnico. Servem como camada de dissuasão.
       ================================================================= */
    document.addEventListener('contextmenu', function (e) { e.preventDefault(); });

    ['copy', 'cut'].forEach(function (evt) {
        document.addEventListener(evt, function (e) {
            const t = e.target;
            if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
            e.preventDefault();
        });
    });
    document.addEventListener('dragstart', function (e) { e.preventDefault(); });

    document.addEventListener('keydown', function (e) {
        const k = (e.key || '').toLowerCase();
        const inField = e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA');
        if (
            k === 'f12' ||
            (e.ctrlKey && e.shiftKey && (k === 'i' || k === 'j' || k === 'c')) ||
            (e.ctrlKey && k === 'u') ||
            (e.ctrlKey && k === 's') ||
            (e.ctrlKey && !inField && (k === 'c' || k === 'x' || k === 'a'))
        ) {
            e.preventDefault();
            return false;
        }
    });
})();
