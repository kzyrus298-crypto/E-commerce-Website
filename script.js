window.addEventListener('scroll', function() {
    var scrolled = window.scrollY;
    var phone1 = document.querySelector('.phone-1');
    var phone2 = document.querySelector('.phone-2');

    if (phone1) {
        phone1.style.transform = 'translateY(' + (scrolled * 0.12) + 'px) rotate(-8deg)';
    }
    if (phone2) {
        phone2.style.transform = 'translateY(' + (scrolled * -0.08) + 'px) rotate(8deg)';
    }
});


document.addEventListener('click', function() {
    var music = document.getElementById('bgMusic');
    if (music) {
        music.play().catch(function() {
            
        });
    }
}, { once: true });


document.addEventListener('keydown', function(e) {
    if (e.key === 'y' || e.key === 'Y') {
        alert("🎉 Secret Key 'Y' Pressed!\nSpecial Teacher Discount Unlocked: 10% OFF with code BANANAYELLOW!");
    } else if (e.key === 'Escape') {
        var pdfModal = document.getElementById('pdfModal');
        if (pdfModal) {
            pdfModal.classList.remove('active');
        }
    }
});


var revealBtn = document.getElementById('revealVoucherBtn');
var voucherBox = document.getElementById('voucherBox');
if (revealBtn && voucherBox) {
    revealBtn.addEventListener('click', function() {
        
        voucherBox.classList.toggle('reveal');
    });
}


var openPdfBtn = document.getElementById('openPdfBtn');
var closePdfBtn = document.getElementById('closePdfBtn');
var pdfModal = document.getElementById('pdfModal');

if (openPdfBtn && pdfModal) {
    openPdfBtn.addEventListener('click', function() {
        pdfModal.classList.add('active');
    });
}
if (closePdfBtn && pdfModal) {
    closePdfBtn.addEventListener('click', function() {
        pdfModal.classList.remove('active');
    });
}
if (pdfModal) {
    pdfModal.addEventListener('click', function(e) {
        if (e.target === pdfModal) {
            pdfModal.classList.remove('active');
        }
    });
}


document.querySelectorAll('.color-swatches').forEach(function(group) {
    group.querySelectorAll('.swatch').forEach(function(swatch) {
        swatch.addEventListener('click', function() {
            var card = group.closest('.product-card');
            var img = card.querySelector('.product-img');
            var colorName = card.querySelector('.color-name');

            if (swatch.dataset.img) {
                img.src = swatch.dataset.img;
            }

            if (colorName && swatch.dataset.color) {
                colorName.textContent = swatch.dataset.color;
            }

            group.querySelectorAll('.swatch').forEach(function(s) {
                s.classList.remove('selected');
            });
            swatch.classList.add('selected');
        });
    });
});


function calculateOrderTotal() {
    var modelSelect = document.getElementById('modelSelect');
    var qtyInput = document.getElementById('qtyInput');
    var warrantyCheck = document.getElementById('warrantyCheck');
    var computedTotalEl = document.getElementById('computedTotal');

    if (!modelSelect || !qtyInput || !computedTotalEl) return;

    var unitPrice = parseInt(modelSelect.value) || 0;
    var quantity = parseInt(qtyInput.value) || 1;

  
    var subtotal = unitPrice * quantity;

   
    var costStack = [];
    costStack.push(subtotal);

    if (warrantyCheck && warrantyCheck.checked) {
        costStack.push(999 * quantity);
    }

    // Compute total from stack
    var finalTotal = costStack.reduce(function(acc, val) {
        return acc + val;
    }, 0);

    computedTotalEl.textContent = '₱' + finalTotal.toLocaleString();
}


['modelSelect', 'qtyInput', 'warrantyCheck'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) {
        el.addEventListener('change', calculateOrderTotal);
        el.addEventListener('input', calculateOrderTotal);
    }
});

var computeBtn = document.getElementById('computeBtn');
if (computeBtn) {
    computeBtn.addEventListener('click', function() {
        calculateOrderTotal();
        alert("Computation updated based on current selection!");
    });
}


var cartCount = 0;
var cartCountEl = document.getElementById('cartCount');

document.querySelectorAll('.add-cart-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        cartCount++;
        if (cartCountEl) {
            cartCountEl.textContent = cartCount;
        }

        var origText = btn.textContent;
        btn.textContent = "Added! ✓";
        btn.classList.add('added');

        setTimeout(function() {
            btn.textContent = origText;
            btn.classList.remove('added');
        }, 1500);
    });
});


document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var item = btn.closest('.faq-item');
        // Toggle active class
        item.classList.toggle('active');
    });
});


var newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var email = document.getElementById('newsletterEmail').value;
        var msg = document.getElementById('newsletterMsg');
        if (msg) {
            msg.textContent = "Salamat! We'll notify " + email + " about new drops.";
        }
        newsletterForm.reset();
    });
}


var track = document.querySelector('.slides-track');
var slides = document.querySelectorAll('.slides-track .slide');
var dotsContainer = document.getElementById('slideshowDots');
var currentSlide = 0;

if (slides.length > 0 && dotsContainer) {
    slides.forEach(function(_, idx) {
        var dot = document.createElement('span');
        dot.classList.add('dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', function() {
            currentSlide = idx;
            goToSlide(currentSlide);
        });
        dotsContainer.appendChild(dot);
    });
}

function goToSlide(index) {
    if (!slides.length || !track) return;
    var slideWidth = slides[0].getBoundingClientRect().width;
    var gap = 16;
    track.style.transform = 'translateX(-' + (index * (slideWidth + gap)) + 'px)';

    if (dotsContainer) {
        dotsContainer.querySelectorAll('.dot').forEach(function(dot, idx) {
            dot.classList.toggle('active', idx === index);
        });
    }
}

if (slides.length > 0) {
    setInterval(function() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }, 4500);
}