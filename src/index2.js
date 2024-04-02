import { preloadFonts } from './utils';
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";

const wrapElements = (elems, wrapType, wrapClass) => {
    elems.forEach(char => {
        const wrapEl = document.createElement(wrapType);
        wrapEl.classList = wrapClass;
        char.parentNode.appendChild(wrapEl);
        wrapEl.appendChild(char);
    });
}

Splitting();

const fx1Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect1]')];
const fx8Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect8]')];


// Lenis smooth scrolling
let lenis;

// Initialize Lenis smooth scrolling
const initSmoothScrolling = () => {

    lenis = new Lenis({
        lerp: 0.2,
        smooth: true
    });

    lenis.on('scroll', () => ScrollTrigger.update());

    const scrollFn = (time) => {
        lenis.raf(time);
        requestAnimationFrame(scrollFn);
    };

    requestAnimationFrame(scrollFn);

};

// GSAP Scroll Triggers
const scroll = () => {

    fx1Titles.forEach(title => {

        const chars = title.querySelectorAll('.char');

        gsap.fromTo(chars, {
            'will-change': 'opacity, transform',
            opacity: 0,
            scale: 0.6,
            rotationZ: () => gsap.utils.random(-20, 20)
        },
            {
                ease: 'power4',
                opacity: 1,
                scale: 1,
                rotation: 0,
                stagger: 0.4,
                scrollTrigger: {
                    trigger: title,
                    start: 'center+=20% bottom',
                    end: '+=50%',
                    scrub: true
                },
            });

    });

    const lettersAndSymbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '+', '=', ';', ':', '<', '>', ','];
    fx8Titles.forEach(title => {

        const chars = title.querySelectorAll('.char');

        chars.forEach((char, position) => {
            let initialHTML = char.innerHTML;

            gsap.fromTo(char, {
                opacity: 0
            },
                {
                    duration: 0.01,
                    innerHTML: () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
                    repeat: 1,
                    repeatRefresh: true,
                    opacity: 1,
                    repeatDelay: 0.01,
                    delay: (position + 1) * 0.02,
                    onComplete: () => gsap.set(char, { innerHTML: initialHTML, delay: 0.03 }),
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 100%',
                        end: 'bottom 0%',
                        toggleActions: "play resume resume reset",
                        onEnter: () => gsap.set(char, { opacity: 0 })
                    }
                });

        });

    });
};

// Preload images and fonts
preloadFonts('cvn8slu').then(() => {
    // Remove loader (loading class)
    document.body.classList.remove('loading');
    // Lenis (smooth scrolling)
    initSmoothScrolling();
    // GSAP Scroll Triggers
    scroll();
});