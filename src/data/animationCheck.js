const animationCheck = (
    element,
    animation,
    optionRoot = '0px',
    optionThres = 0
) => {
    const animated = document.querySelectorAll(element);

    let options = {
        rootMargin: optionRoot,
        threshold: optionThres,
    };
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                load(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, options);

    function load(item) {
        item.classList.add(animation);
    }

    animated.forEach((item) => {
        observer.observe(item);
    });

    return () => observer.disconnect();
};

export default animationCheck;
