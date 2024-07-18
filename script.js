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
    }, "-=1.2")
}
// loadingAnimation();


const cursurAnimation = () => {
    Shery.mouseFollower({
        skew:true,
        ease: "cubic-bezier(0.23,1,0.320,1",
        duration: 1,
    })
    Shery.makeMagnet("#nav-part2 h3");
    Shery.makeMagnet("#logo img");
    const videoCont = document.querySelector("#video-container")
    const video = document.querySelector("#video-container video");
    videoCont.addEventListener("mouseenter",()=>{
        videoCont.addEventListener("mousemove",(dets)=>{
            gsap.to(".mouseFollower",{
                opacity:0,
            })
            gsap.to("#video-crsr",{
                left:dets.x,
                top:dets.y,
            })
        })
    });
    videoCont.addEventListener("mouseleave",()=>{
            gsap.to(".mouseFollower",{
                opacity:1,
            })
            gsap.to("#video-crsr",{
                left:"69.5%",
                top:"15%",
            })
        
    });



    var flag = 0;
    videoCont.addEventListener("click",()=>{
        if(flag == 0){
            video.play();
            video.style.opacity = 1;
            document.querySelector("#video-crsr").innerHTML = '<i class="ri-pause-mini-line"></i>'
            gsap.to("#video-crsr",{
                scale:0.5,
            })
            flag = 1;
        } else{
            video.pause();
            video.style.opacity = 0;
            document.querySelector("#video-crsr").innerHTML = '<i class="ri-play-mini-line"></i>'
            gsap.to("#video-crsr",{
                scale:1,
            })
            flag = 0;
        }
    })
}
cursurAnimation();

const scrollAnimation = () => {
    gsap.from(".underline", {
        x: 100,
        opacity: 0,
        scrollTrigger: {
            trigger: ".underline",
            scroller: "main",
            markers: true,
            start: "top 50%",
            stagger:0.2,
        }    
    });
    gsap.from(".projectBoxUnderline", {
        x: 100,
        opacity: 0,
        scrollTrigger: {
            trigger: ".underline",
            scroller: "main",
            markers: true,
            stagger:0.2,
            start: "top 10%",
        }
    });
};
scrollAnimation();

const sheryAnimation = () => {
    Shery.imageEffect(".image-div", {
        style: 6,
        // debug: true,
        config: { "noiseDetail": { "value": 8.4, "range": [0, 100] }, "distortionAmount": { "value": 3.44, "range": [0, 10] }, "scale": { "value": 36.36, "range": [0, 100] }, "speed": { "value": 1, "range": [0, 1] }, "zindex": { "value": -9996999, "range": [-9999999, 9999999] }, "aspect": { "value": 0.7272695760684946 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": true }, "infiniteGooey": { "value": false }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": false }, "maskVal": { "value": 1.15, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 0 }, "noise_speed": { "value": 0.76, "range": [0, 10] }, "metaball": { "value": 0.41, "range": [0, 2] }, "discard_threshold": { "value": 0.6, "range": [0, 1] }, "antialias_threshold": { "value": 0, "range": [0, 0.1] }, "noise_height": { "value": 0.44, "range": [0, 2] }, "noise_scale": { "value": 16.03, "range": [0, 100] } },
        
        gooey: true,
    });
}
sheryAnimation();

document.addEventListener("mousemove",(dets)=>{
    gsap.to("#flag",{
        x:dets.x,
        y:dets.y,
    })
})
document.querySelector("#hero3").addEventListener("mouseenter",(dets)=>{
    gsap.to("#flag",{
        x:dets.x,
        y:dets.y,
        opacity:1,
    })
})
document.querySelector("#hero3").addEventListener("mouseleave",(dets)=>{
    gsap.to("#flag",{
        x:dets.x,
        y:dets.y,
        opacity:0,
    })
})