export function calculateHeroHeight() {
    const header = document.querySelector('nav');
    const hero = document.querySelector('.heroSection');
    hero.style.height = `calc(100vh - ${header.clientHeight}px - 50px)`;
}