window.dataLayer = window.dataLayer || [];

function pushEvent(eventName, payload) {
    window.dataLayer.push({
        event: eventName,
        ...payload,
    });
}

document.addEventListener('DOMContentLoaded', function () {
    var pageName = document.body.dataset.page || 'unknown';

    pushEvent('pageReady', {
        pageName: pageName,
        pageTitle: document.title,
    });

    var navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(function (link) {
        if (link.getAttribute('href') === location.pathname.split('/').pop() || (location.pathname.endsWith('/') && link.getAttribute('href') === 'index.html')) {
            link.classList.add('is-current');
        }
    });

    var ctas = document.querySelectorAll('.js-track-cta');
    ctas.forEach(function (cta) {
        cta.addEventListener('click', function () {
            pushEvent('ctaClick', {
                pageName: pageName,
                ctaName: cta.dataset.ctaName || cta.textContent.trim(),
            });
        });
    });

    var form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var formData = new FormData(form);

            pushEvent('formSubmit', {
                pageName: pageName,
                formName: 'contactForm',
                inquiryType: formData.get('inquiryType') || 'none',
            });

            setTimeout(function () {
                location.href = 'thanks.html?from=contact';
            }, 150);
        });
    }

    if (pageName === 'thanks') {
        var params = new URLSearchParams(location.search);
        pushEvent('formSubmissionSuccess', {
            fromContactPage: params.get('from') === 'contact',
        });
    }
});
