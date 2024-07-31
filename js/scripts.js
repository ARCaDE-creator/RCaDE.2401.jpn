document.addEventListener('DOMContentLoaded', function() {
    fetch('data/works.json')
        .then(response => response.json())
        .then(data => {
            const currentPage = window.location.pathname.split('/').pop();
            if (currentPage === 'works.html' || currentPage === 'works_en.html') {
                displayWorks(data, currentPage);
            } else if (currentPage.startsWith('RCaDE')) {
                displayWorkDetails(data);
            } else {
                displayNewWorks(data, currentPage);
            }
        });

    function displayWorks(works, currentPage) {
        const worksGallery = document.querySelector('.works-gallery');
        const mainWorkSection = document.querySelector('.main-work-section');

        if (!worksGallery || !mainWorkSection) return;

        const shuffledWorks = works.sort(() => Math.random() - 0.5);
        const urlParams = new URLSearchParams(window.location.search);
        const mainWorkId = urlParams.get('main');
        const mainWork = shuffledWorks.find(work => work.id === mainWorkId) || shuffledWorks[0];

        const lang = currentPage === 'works.html' ? 'ja' : 'en';

        mainWorkSection.innerHTML = `
            <div class="featured-work">
                <div class="work-details">
                    <p>${mainWork[`title_${lang}`]}</p>
                </div>
                <div class="featured-content">
                    <img src="images/${mainWork.id}/${mainWork[`image_${lang}`]}" alt="${mainWork[`title_${lang}`]}">
                    <a href="${mainWork.id}${lang === 'en' ? '_en' : ''}.html" class="button">${lang === 'ja' ? 'もっと<br>詳しく' : 'More<br>details'}</a>
                </div>
            </div>
        `;

        shuffledWorks.forEach(work => {
            if (work.id !== mainWork.id) {
                const workItem = document.createElement('a');
                workItem.classList.add('work-item');
                workItem.href = `${work.id}${lang === 'en' ? '_en' : ''}.html`;
                workItem.innerHTML = `
                    <div class="work-details">
                        <p><strong>${work[`title_${lang}`]}</strong></p>
                    </div>
                    <img src="images/${work.id}/${work[`image_${lang}`]}" alt="${work[`title_${lang}`]}">
                `;
                worksGallery.appendChild(workItem);
            }
        });
    }

    function displayNewWorks(works, currentPage) {
        const newWorksGallery = document.querySelector('.new-works-section .works-gallery');
        if (!newWorksGallery) return;

        const sortedWorks = works.sort((a, b) => new Date(b.date) - new Date(a.date));
        const lang = currentPage === 'index.html' ? 'ja' : 'en';

        sortedWorks.forEach(work => {
            const workItem = document.createElement('a');
            workItem.classList.add('work-item');
            workItem.href = `${work.id}${lang === 'en' ? '_en' : ''}.html`;
            workItem.innerHTML = `
                <img src="images/${work.id}/${work[`image_${lang}`]}" alt="${work[`title_${lang}`]}">
                <div class="work-details">
                    <p><strong>${work[`title_${lang}`]}</strong></p>
                    <p class="datedoi">${lang === 'ja' ? '日付' : 'Date'}: ${work.date}</p>
                    <p class="datedoi">DOI: ${work.work_doi}</p>
                </div>
            `;
            newWorksGallery.appendChild(workItem);
        });
    }

    function displayWorkDetails(works) {
        const workId = window.location.pathname.split('/').pop().replace('.html', '');
        const work = works.find(work => work.id === workId);

        if (!work) return;

        const lang = document.documentElement.lang === 'ja' ? 'ja' : 'en';
        document.getElementById('work-title').textContent = work[`title_${lang}`];
        document.getElementById('work-doi').textContent = `DOI: ${work.work_doi}`;
        document.getElementById('work-date').textContent = `${lang === 'ja' ? '投稿日' : 'Date'}: ${work.date}`;
        document.getElementById('work-image').src = `images/${work.id}/${work[`image_${lang}`]}`;
        document.getElementById('work-description').innerHTML = work[`description_${lang}`];
        document.getElementById('work-doi-link').href = `https://doi.org/${work.paper_doi}`;
        if (lang === 'en') {
            document.getElementById('annotation').textContent = 'This illustration was created under the supervision of the researcher who conducted this study.';
            document.getElementById('doi-link-text').textContent = 'The original Article is here.';
        }
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
});
