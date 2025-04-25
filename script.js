window.addEventListener('scroll', () => {
    const body = document.body;

    if (window.scrollY > 0) {
        body.classList.add('scrolled-down');
    } else {
        //body.classList.remove('scrolled-down');
    }
});
