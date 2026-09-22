window.addEventListener('scroll', function() {
    var scrolled = window.scrollY;

    document.querySelector('.phone-1').style.transform =
    'translateY(' + (scrolled * 0.15) + 'px) rotate(-8deg)';
    
    document.querySelector('.phone-2').style.transform =
    'translateY(' + (scrolled * -0.1) + 'px) rotate(8deg)';

})

document.addEventListener('click', function(){
    document.getElementById('bgMusic').play();
}, {once: true}) ;

document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            alert("Hala bakit?");
        }
    });