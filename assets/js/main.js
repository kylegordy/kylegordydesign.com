// InView animation
inView.offset(50);
inView("[data-inview]").on('enter', function (el) {
    el.classList.add("inview");
});
