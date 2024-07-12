const loadingAnimation = () => {
    let tl = gsap.timeline()
    tl.from(".line h1", {
        y: 150,
        stagger: 0.2,
        duration: 0.6,
        delay: 0.5,
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
        delay: 4, // 4 krna h
    })
    tl.from("#page1", {
        delay: 0.2,
        opacity: 0,
        y: 1200,
        ease: "power4.out",
    })
    tl.to("#loader", {
        display: "none",
    })
    tl.from("nav",{
        opacity:0
    })
    tl.from("#hero1 h1, #hero2 h1, #hero3 h1, #hero4 h1",{
        y:120,
        stagger:0.2,
    })
}
loadingAnimation();


const cursurAnimation = () => {
    document.addEventListener("mousemove",(dets)=>{
        gsap.to("#crsr",{
            left:dets.x,
            top:dets.y,
    
        })
    })
    Shery.makeMagnet("#nav-part2 h3");
}
cursurAnimation();