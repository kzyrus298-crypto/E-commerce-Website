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
// ===== FAQ accordion =====
document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var item = btn.closest('.faq-item');
        var wasActive = item.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(function(el) {
            el.classList.remove('active');
        });

        if (!wasActive) {
            item.classList.add('active');
        }
    });
});

// ===== Newsletter form =====
var newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var email = document.getElementById('newsletterEmail').value;
        document.getElementById('newsletterMsg').textContent =
            "Salamat! We'll notify " + email + " about new drops.";
        newsletterForm.reset();
    });
}

// ===== Ad slideshow (peek carousel) =====
var track = document.querySelector('.slides-track');
var slides = document.querySelectorAll('.slides-track .slide');
var currentSlide = 0;

function goToSlide(index) {
    var slideWidth = slides[0].getBoundingClientRect().width;
    var gap = 16;
    track.style.transform = 'translateX(-' + (index * (slideWidth + gap)) + 'px)';
}

if (slides.length > 0) {
    setInterval(function() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }, 4000);
}

document.querySelectorAll('.color-swatches').forEach(function(group) {
    group.querySelectorAll('.swatch').forEach(function(swatch) {
        swatch.addEventListener('click', function() {
            var card = group.closest('.product-card');
            var img = card.querySelector('.product-img');

            img.src = swatch.dataset.img;

            group.querySelectorAll('.swatch').forEach(function(s) {
                s.classList.remove('selected');
            });
            swatch.classList.add('selected');
        });
    });
});