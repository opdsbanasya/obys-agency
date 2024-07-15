gsap.from("h1",{
    opacity:0,
    delay:0.5,
    duration:1,
    onStart: ()=>{
        $('h1').textillate({ in: { effect: 'fadeIn' } });
    }
})