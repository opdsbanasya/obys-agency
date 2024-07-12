

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

tl.to("#loader", {
    opacity: 0,
    duration: 0.2,
    delay: 4,
})
tl.from("#page1",{
    delay:0.2,
    opacity: 0,
    y:1200,
    ease: "power4.out",
})
tl.to("#loader",{
    display: "none",
})