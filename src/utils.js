export function calculateHeroHeight() {
    const header = document.querySelector('nav');
    const hero = document.querySelector('.heroSection');
    hero.style.height = `calc(100vh - ${header.clientHeight}px - 50px)`;
}

export function convertDate(date) {
    return date.split('-')[0];;
}

export function formatRuntime(minutes, variant) {
    const min = minutes % 60;
    return variant === "details" 
        ? `${Math.floor(minutes / 60)}h ${min}min`
        : `${Math.floor(minutes / 60)}:${min < 10 ? `0${min}` : min}`;
}