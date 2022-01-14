var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => {
    // binding
    const $skewCon = document.querySelector('.items')

    // variable
    let scrollY = 0;
    let clientH = document.body.clientHeight;
    let viewportH = window.innerHeight;

    // scroll speed
    const scrollSpeed = ((options) => {

        let lastPos,
            newPos,
            speed,
            max = 40;

        return function () {
            newPos = window.scrollY;
            speed = newPos - lastPos;
            lastPos = newPos;

            // Check Max Limit
            if (max < Math.abs(speed)) {
                speed = (speed < 0) ? max * -1 : max;
            }
            return speed;
        }
    })();

    document.querySelector('.btn-common-back').addEventListener('click', () => {
        document.location.href = '/#/play';
    })

    // Update Viewport Height
    window.addEventListener('resize', () => {
        clientH = document.body.clientHeight;
        viewportH = window.innerHeight;
    })

    // Add Scroll Event
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const speed = scrollSpeed({
            max: 40
        });

        if (scrollY > 10 &&
            clientH - viewportH > scrollY) {
            $skewCon.style.transform = `skewY(${speed}deg)`
        } else {
            $skewCon.style.transform = `skewY(${0}deg)`
        }
    })

    // Fixed skew 0
    setInterval(() => {
        if (scrollY !== window.scrollY) {
            scrollY = window.scrollY;
        } else {
            $skewCon.style.transform = `skewY(${0}deg)`
        }
    }, 500)
});