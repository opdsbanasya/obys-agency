const locomotiveAnimation = () => {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("main"),
        smooth: true
    });

    // Each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // Tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // We don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all!
        // So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile.
        // We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
    });

    // Each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // After everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
locomotiveAnimation();

const loadingAnimation = () => {
    let tl = gsap.timeline()
    tl.from(".line h1", {
        y: 150,
        stagger: 0.2,
        duration: 0.6,
        delay: 0, // 0.5
    })
    tl.from("#line1-part1, .line h2", {
        opacity: 0,
        onStart: function () {
            let h5timer = document.querySelector(".line h5");
            var count = 0;
            setInterval(() => {
                if (count < 100) {
                    h5timer.innerHTML = count++;
                } else {
                    h5timer.innerHTML = count;
                }
            }, 35)
        }
    })
    tl.to(".line h2", {
        animationName: "now",
        opacity: 1,
    })
    tl.to("#loader", {
        opacity: 0,
        duration: 0.2,
        delay: 0, // 4 krna h
    })
    tl.from("#page1", {
        delay: 0.2, // 0.2
        opacity: 0,
        y: 1200,
        ease: "power4.out",
    })
    tl.to("#loader", {
        display: "none",
    })
    tl.from("nav", {
        opacity: 0
    })
    tl.from("#hero1 h1, #hero2 h1, #hero3 h1, #hero4 h1", {
        y: 120,
        stagger: 0.2,
    })
    tl.from("#hero1, page2", {
        opacity: 0,
    },"-=1.2")
}
loadingAnimation();


const cursurAnimation = () => {
    document.addEventListener("mousemove", (dets) => {
        gsap.to("#crsr", {
            left: dets.x,
            top: dets.y,

        })
    })
    Shery.makeMagnet("#nav-part2 h3");
    Shery.makeMagnet("#logo img");
}
cursurAnimation();

gsap.from(".underline", {
    x: 100,
    opacity: 0,
    scrollTrigger: {
        trigger: ".underline",
        start: "top 90%",
    }
})
