document.addEventListener("DOMContentLoaded", function () {
    const typingText = "耳になったイルカのアゴ肉。";
    const typingElement = document.getElementById("typing-text");
    let index = 0;

    function type() {
        if (index < typingText.length) {
            typingElement.textContent += typingText.charAt(index);
            index++;
            setTimeout(type, 150);
        } else {
            setTimeout(() => {
                const mainContentHeight = document.querySelector('main').offsetHeight;
                const headerHeight = document.querySelector('header').offsetHeight;
                const scrollToPosition = mainContentHeight;
                window.scrollBy({
                    top: scrollToPosition,
                    behavior: 'smooth'
                });
            }, 1500);
        }
    }

    type();

    const card = document.getElementById("card");
    const moreBtn = document.getElementById("more-btn");
    const returnBtn = document.getElementById("return-btn");
    const scrollIndicator = document.getElementById("scroll-indicator");
    const otherCards = document.querySelectorAll(".card-container:not(.first-card)");

    moreBtn.addEventListener("click", () => {
        card.classList.add("is-flipped");
        moreBtn.style.display = "none";
        returnBtn.style.display = "block";
        scrollIndicator.style.display = "flex";
        otherCards.forEach(card => card.style.display = "block");
    });

    returnBtn.addEventListener("click", () => {
        card.classList.remove("is-flipped");
        returnBtn.style.display = "none";
        moreBtn.style.display = "block";
        scrollIndicator.style.display = "none";
        otherCards.forEach(card => card.style.display = "none");
        const mainContentHeight = document.querySelector('main').offsetHeight;
        const scrollToPosition = mainContentHeight;
        window.scrollTo({
            top: scrollToPosition,
            behavior: 'smooth'
        });
    });

    // Intersection Observer to show cards on scroll
    const cardContainers = document.querySelectorAll('.card-container');

    const observerOptions = {
        threshold: 0.5 // 50% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    cardContainers.forEach(container => {
        observer.observe(container);
    });

    scrollIndicator.style.display = "none";

    otherCards.forEach(card => card.style.display = "none");

    // Top button functionality
    const topBtn = document.getElementById("top-btn");

    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
