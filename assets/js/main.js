inView.offset(50);
inView('[data-inview]')
    .on('enter', el => {
        el.classList.add('inview');
    });
