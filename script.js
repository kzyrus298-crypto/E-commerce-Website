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

var music = document.getElementById('bgMusic');
var musicToggleBtn = document.getElementById('musicToggleBtn');

document.addEventListener('click', function() {
    if (music && music.paused) {
        music.play().then(function() {
            if (musicToggleBtn) musicToggleBtn.textContent = "🔊 Music: Pause";
        }).catch(function() {});
    }
}, { once: true });

if (musicToggleBtn && music) {
    musicToggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (music.paused) {
            music.play();
            musicToggleBtn.textContent = "🔊 Music: Pause";
        } else {
            music.pause();
            musicToggleBtn.textContent = "🔇 Music: Play";
        }
    });
}

// Modal handling
var checkoutModal = document.getElementById('checkoutModal');
var closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
var pdfModal = document.getElementById('pdfModal');
var openPdfBtn = document.getElementById('openPdfBtn');
var closePdfBtn = document.getElementById('closePdfBtn');

function openCheckoutModal(modelValue, modelTitle, imgSrc, colorName) {
    if (!checkoutModal) return;

    var modelSelect = document.getElementById('modelSelect');
    var previewTitle = document.getElementById('checkoutPreviewTitle');
    var previewImg = document.getElementById('checkoutPreviewImg');
    var previewColor = document.getElementById('checkoutPreviewColor');

    if (modelValue && modelSelect) {
        modelSelect.value = modelValue;
    }

    if (modelTitle && previewTitle) {
        previewTitle.textContent = modelTitle;
    }

    if (imgSrc && previewImg) {
        previewImg.src = imgSrc;
    }

    if (colorName && previewColor) {
        previewColor.textContent = colorName;
    }

    calculateOrderTotal();
    checkoutModal.classList.add('active');
}

function closeCheckout() {
    if (checkoutModal) {
        checkoutModal.classList.remove('active');
    }
}

if (closeCheckoutBtn) {
    closeCheckoutBtn.addEventListener('click', closeCheckout);
}

if (checkoutModal) {
    checkoutModal.addEventListener('click', function(e) {
        if (e.target === checkoutModal) {
            closeCheckout();
        }
    });
}

// Buy Now buttons on product cards
document.querySelectorAll('.buy-now-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var card = btn.closest('.product-card');
        var modelVal = btn.dataset.modelVal || "13999";
        var modelName = btn.dataset.modelName || (card ? card.querySelector('h3').textContent.trim() : "iPhone 16");
        var imgEl = card ? card.querySelector('.product-img') : null;
        var colorEl = card ? card.querySelector('.color-name') : null;

        var imgSrc = imgEl ? imgEl.src : "Images/bluenga.png";
        var colorName = colorEl ? colorEl.textContent.trim() : "Default";

        openCheckoutModal(modelVal, modelName, imgSrc, colorName);
    });
});

// Navigation "Order Now" & Footer Order link
var orderNowNav = document.getElementById('orderNowNav');
if (orderNowNav) {
    orderNowNav.addEventListener('click', function(e) {
        e.preventDefault();
        openCheckoutModal("13999", "iPhone 16", "Images/bluenga.png", "Blue");
    });
}

var footerOrderLink = document.getElementById('footerOrderLink');
if (footerOrderLink) {
    footerOrderLink.addEventListener('click', function(e) {
        e.preventDefault();
        openCheckoutModal("13999", "iPhone 16", "Images/bluenga.png", "Blue");
    });
}

var cartBtn = document.getElementById('cartBtn');
if (cartBtn) {
    cartBtn.addEventListener('click', function() {
        openCheckoutModal("13999", "iPhone 16", "Images/bluenga.png", "Blue");
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'y' || e.key === 'Y') {
        alert("🎉 Secret Key 'Y' Pressed!\nSpecial Teacher Discount Unlocked: 10% OFF with code BANANAYELLOW!");
    } else if (e.key === 'Escape') {
        if (pdfModal) pdfModal.classList.remove('active');
        if (checkoutModal) checkoutModal.classList.remove('active');
    }
});

// Voucher Reveal
var revealBtn = document.getElementById('revealVoucherBtn');
var voucherBox = document.getElementById('voucherBox');
if (revealBtn && voucherBox) {
    revealBtn.addEventListener('click', function() {
        voucherBox.classList.toggle('reveal');
    });
}

// PDF Modal
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

// Swatches
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

// Order Calculation
function multiplication(unitPrice, quantity) {
    return unitPrice * quantity;
}

function calculateOrderTotal() {
    var modelSelect = document.getElementById('modelSelect');
    var qtyInput = document.getElementById('qtyInput');
    var warrantyCheck = document.getElementById('warrantyCheck');
    var computedTotalEl = document.getElementById('computedTotal');

    if (!modelSelect || !qtyInput || !computedTotalEl) return;

    var unitPrice = parseInt(modelSelect.value) || 0;
    var quantity = parseInt(qtyInput.value) || 1;

    var subtotal = multiplication(unitPrice, quantity);

    var costStack = [];
    costStack.push(subtotal);

    if (warrantyCheck && warrantyCheck.checked) {
        costStack.push(multiplication(999, quantity));
    }

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

// Also update preview title when model is selected inside the modal
var modelSelectEl = document.getElementById('modelSelect');
if (modelSelectEl) {
    modelSelectEl.addEventListener('change', function() {
        var previewTitle = document.getElementById('checkoutPreviewTitle');
        if (previewTitle && this.selectedIndex >= 0) {
            var selectedText = this.options[this.selectedIndex].text;
            if (selectedText.includes('iPhone 16')) {
                previewTitle.textContent = selectedText.split('(')[0].trim();
            } else if (selectedText.includes('iPhone 15')) {
                previewTitle.textContent = selectedText.split('(')[0].trim();
            }
        }
    });
}

// Payment Methods
var paymentMethodSelect = document.getElementById('paymentMethod');
var paymentInstructions = document.getElementById('paymentInstructions');
var cardFields = document.getElementById('cardFields');
var receiptGroup = document.getElementById('receiptGroup');

if (paymentMethodSelect) {
    paymentMethodSelect.addEventListener('change', function() {
        var selected = this.value;

        if (cardFields) cardFields.style.display = 'none';
        if (receiptGroup) receiptGroup.style.display = 'block';

        var infoHtml = '';

        switch(selected) {
            case 'gcash':
                infoHtml = `
                    <div class="pay-info-card">
                        <span class="pay-badge gcash">GCash</span>
                        <p><strong>Account Name:</strong> Banana Gadgets Official</p>
                        <p><strong>GCash Number:</strong> <code>0917-882-2980</code></p>
                        <small>💡 Mag-send ng exact amount at i-upload ang screenshot sa ibaba.</small>
                    </div>`;
                break;
            case 'maya':
                infoHtml = `
                    <div class="pay-info-card">
                        <span class="pay-badge maya">Maya</span>
                        <p><strong>Account Name:</strong> Banana Store Laguna</p>
                        <p><strong>Maya Mobile:</strong> <code>0918-944-2262</code></p>
                        <small>💡 I-send ang payment via Maya QR / Number at i-save ang resibo.</small>
                    </div>`;
                break;
            case 'bdo':
                infoHtml = `
                    <div class="pay-info-card">
                        <span class="pay-badge bdo">BDO Unibank</span>
                        <p><strong>Account Name:</strong> Banana Retail Philippines Inc.</p>
                        <p><strong>Savings Account:</strong> <code>0041-8890-2134</code></p>
                        <small>💡 Bank transfer via InstaPay/PESONet. Upload deposit slip or receipt.</small>
                    </div>`;
                break;
            case 'bpi':
                infoHtml = `
                    <div class="pay-info-card">
                        <span class="pay-badge bpi">BPI</span>
                        <p><strong>Account Name:</strong> Banana Retail Philippines Inc.</p>
                        <p><strong>Account Number:</strong> <code>2489-1102-34</code></p>
                        <small>💡 Bank transfer via BPI Online / Mobile app. Upload transfer slip.</small>
                    </div>`;
                break;
            case 'unionbank':
                infoHtml = `
                    <div class="pay-info-card">
                        <span class="pay-badge unionbank">UnionBank</span>
                        <p><strong>Account Name:</strong> Karl Zyrus - Banana Hub</p>
                        <p><strong>Account Number:</strong> <code>1094-5521-8890</code></p>
                        <small>💡 Real-time transfer supported via InstaPay.</small>
                    </div>`;
                break;
            case 'metrobank':
                infoHtml = `
                    <div class="pay-info-card">
                        <span class="pay-badge metrobank">Metrobank</span>
                        <p><strong>Account Name:</strong> Banana Retail PH</p>
                        <p><strong>Account Number:</strong> <code>2190-3341-9912</code></p>
                        <small>💡 Attach proof of transfer below.</small>
                    </div>`;
                break;
            case 'card':
                infoHtml = `
                    <div class="pay-info-card">
                        <span class="pay-badge card">Visa / Mastercard</span>
                        <p>Secure 256-bit encrypted card checkout.</p>
                        <small>Pakilagay ang iyong card details sa ibaba.</small>
                    </div>`;
                if (cardFields) cardFields.style.display = 'block';
                if (receiptGroup) receiptGroup.style.display = 'none';
                break;
            case 'cod':
                infoHtml = `
                    <div class="pay-info-card cod">
                        <span class="pay-badge cod-badge">Cash on Delivery</span>
                        <p>Bayaran ang order pagdating ng courier sa iyong bahay o branch.</p>
                        <small>⚠️ Applicable for Metro Manila, Calamba, and Laguna areas only.</small>
                    </div>`;
                if (receiptGroup) receiptGroup.style.display = 'none';
                break;
            default:
                infoHtml = '<em>Pumili ng Payment Method sa itaas para makita ang detalye ng pagbabayad.</em>';
        }

        if (paymentInstructions) {
            paymentInstructions.innerHTML = infoHtml;
        }
    });
}

// Order Form Submit
var calcForm = document.getElementById('calcForm');
if (calcForm) {
    calcForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var total = document.getElementById('computedTotal').textContent;
        var payMethod = document.getElementById('paymentMethod');
        var payMethodText = payMethod && payMethod.selectedIndex > 0 ? payMethod.options[payMethod.selectedIndex].text : 'None';
        var modelSelect = document.getElementById('modelSelect');
        var qtyInput = document.getElementById('qtyInput');
        var qty = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;

        // Deduct stock based on model
        if (modelSelect && modelSelect.value) {
            var val = modelSelect.value;
            if (val === "13999" || val === "16999") {
                var stock16 = document.getElementById('stock-16');
                if (stock16) {
                    var currentStock = parseInt(stock16.textContent) || 0;
                    stock16.textContent = Math.max(0, currentStock - qty);
                }
            } else {
                var stock15 = document.getElementById('stock-15');
                if (stock15) {
                    var currentStock = parseInt(stock15.textContent) || 0;
                    stock15.textContent = Math.max(0, currentStock - qty);
                }
            }
        }

        alert("🎉 Order Received!\n\n" +
              "Total Amount: " + total + "\n" +
              "Payment Method: " + payMethodText + "\n\n" +
              "Salamat sa tiwala sa Banana! Your order is being processed.");

        closeCheckout();
    });
}

// Add to Cart Buttons
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

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var item = btn.closest('.faq-item');
        item.classList.toggle('active');
    });
});

// Newsletter
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

// Slideshow
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