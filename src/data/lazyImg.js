const lazyImgCall = () => {
    let options = {
        rootMargin: '-30px',
        threshold: 0,
    };

    function load(img) {
        const url = img.getAttribute('lazysrc');
        img.setAttribute('src', url);
    }

    const lazyImgs = document.querySelectorAll('[lazysrc]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                load(entry.target);
            }
        });
    }, options);

    lazyImgs.forEach((img) => {
        observer.observe(img);
    });

    return () => observer.disconnect();
};

export default lazyImgCall;
