document.querySelectorAll('.shape-card').forEach(card => {
    const comingSoon = card.querySelector('.coming-soon');
    if (comingSoon) {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            alert('This shape module is coming soon! Check back later for updates.');
        });
    }
});