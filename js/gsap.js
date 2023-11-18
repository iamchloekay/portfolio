
function animateFrom(elem, direction) {
    direction = direction || 1;
    var x = 0,
        y = direction * 100;
    if(elem.classList.contains("gs_reveal_fromTop")) {
        x = 0;
        y = -200;
    } else if(elem.classList.contains("gs_reveal_fromLeft")) {
      x = -200;
      y = 0;
    } else if (elem.classList.contains("gs_reveal_fromRight")) {
      x = 200;
      y = 0;
    }
    elem.style.transform = "translate(" + x + "px, " + y + "px)";
    elem.style.opacity = "0";
    gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
      duration: 2, 
      x: 0,
      y: 0, 
      autoAlpha: 1, 
      ease: "expo", 
      overwrite: "auto"
    });
}
  
function hide(elem) {
    gsap.set(elem, {autoAlpha: 0});
}

  
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");
    gsap.registerPlugin(ScrollTrigger);
    

    gsap.utils.toArray("#menu > li").forEach(el => {
        // get just the nested <li> submenu items inside this one
        let items = el.querySelectorAll("ul > li");
        // if any are found, create the animation and mouseover/mouseout listeners
        if (items.length > 0) {
          let animation = gsap.fromTo(items, {opacity: 0, y: 20}, {
              opacity: 1,
              display: "block",
              y: 0,
              stagger: 0.08,
              paused: true
            });
          el.addEventListener("mouseover", () => animation.play());
          el.addEventListener("mouseout", () => animation.reverse());
        }
    });

    gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
        hide(elem);
        
        ScrollTrigger.create({
            trigger: elem,
            markers: true,
            onEnter: function() { animateFrom(elem) }, 
            onEnterBack: function() { animateFrom(elem, -1) },
            onLeave: function() { hide(elem) }
        });
    });

    gsap.to(".filled-text, .outline-text", {
        scrollTrigger:{
            trigger: ".filled-text, .outline-text", 
            start: "top bottom", 
            end: "bottom top", 
            scrub: 1
        },
        x: 200
    })

    gsap.to(".image", {
        scrollTrigger:{
            trigger: ".image",
            start: "top bottom", 
            end: "bottom top", 
            scrub: 1,
            markers: true
        },
        x: -250,

    })

    gsap.to(".i", {
        scrollTrigger:{
            trigger: ".i",
            start: "top bottom", 
            end: "bottom top", 
            scrub: 1,
            markers: true
        },
        x: -250,

    })

    $("[class^='gsap-marker']").remove();
});