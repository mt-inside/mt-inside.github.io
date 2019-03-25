$(document).ready(function () {
    var subject = document.querySelector('#navbar');
    var title = subject.querySelector("#title");
    var target = document.querySelector('#about');

    $('a.nav-link', subject).each(function () {
        /* Find if this link is an anchor to the current page. TODO: more general, less hacky */
        var anchor = $(this).attr("href").replace('./', '');

        if (anchor[0] == '#') {
            /* Remove (current) path from URL, so that scrollspy works.
             * FIXME: scrollspy does not work. */
            this.setAttribute("href", anchor);

            /* Set up smooth scroll event handler */
            $(this).click(smoothScroll);
        }
    });

    /* Set up header fade in and out */
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

            title.classList.remove('invisible');
        } else {
            subject.classList.remove('bg-white');
            subject.classList.remove('border-bottom');
            subject.classList.remove('shadow-sm');

            title.classList.add('invisible');
        }

        ticking = false;
    }

    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onResize, false);

    update();
});

function smoothScroll(evnt) {
    /* Because we use jQuery to add the event listener, we're in jQuery
     * land here; the args are jQuery objects not DOM ones, so the API is
     * different. */
    $("html, body").stop().animate({
        /* Link target is a (prefix-less) anchor, which is conveniently
         * also the CSS selector for that element. Evaluate as a selector
         * to get the link's target element, and manually scroll there */
        scrollTop: $(evnt.currentTarget.attributes["href"].value).offset().top - 70
    }, 500)

    // If defaults aren't prevented, with it being a relative anchor (ie
    // not "/#foo", there's no reload, so the browser jumps direct to the
    // HREF for a microsecond, then back to the original position and
    // scrolls as expected. The glitch is near-imperceptible.
    evnt.preventDefault();
}
