$(document).ready(function () {
    var subject = document.querySelector('#navbar');
    var target = document.querySelector('#about');

    var lastScrollY = window.scrollY;
    var ticking = false;

    function onScroll() {
        lastScrollY = window.scrollY;
        requestTick();
    }

    function onResize() {
        requestTick();
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(update);
        }
        ticking = true;
    }

    function update() {
        if (target.getBoundingClientRect().bottom < 100) {
            subject.classList.add('bg-white');
            subject.classList.add('border-bottom');
            subject.classList.add('shadow-sm');
        } else {
            subject.classList.remove('bg-white');
            subject.classList.remove('border-bottom');
            subject.classList.remove('shadow-sm');
        }


        ticking = false;
    }

    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onResize, false);

    update();
});

function smoothScroll(elt, evnt) {
    var e = $(elt);
    $("html, body").stop().animate({
        scrollTop: $(e.attr("href")).offset().top - 70
    }, 500)
    evnt.preventDefault()
}
