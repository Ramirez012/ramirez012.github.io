// Самовызывающаяся функция (код отрабатывается сразу при загрузке main.js)
(function () {
    const header = document.querySelector('.header');
    // При скролле страница на 50 пикселей вниз меняется бэкграунд у фиксированного списка (добавляется другое класс)
    // В противнос случае удаляем этот класс
    window.onscroll = () => {
        if (window.pageYOffset > 20) {
            header.classList.add('header_active');
        } else {
            header.classList.remove('header_active');
        }
    };
}());

// Burger Handler (вывод бургера при клике на иконку)

(function() {
    const burgerItem = document.querySelector('.burger');
    const menu = document.querySelector('.header__nav');
    const menuCloseItem = document.querySelector('.header__nav-close');
    const menuLinks = document.querySelectorAll('.header__link')
    burgerItem.addEventListener('click', () => {
        menu.classList.add('header__nav_active');        
    });
    menuCloseItem.addEventListener('click', () => {
        menu.classList.remove('header__nav_active');
    });
    // Убирать меню в мобильной версии после нажатия кнопки
    if (window.innerWidth <= 767) {
        for (let i = 0; i < menuLinks.length; i++) {
            menuLinks[i].addEventListener('click', () => {
                menu.classList.remove('header__nav_active');
            });
        }
    }
}());


// Прокрутка сайта по ссылкам (плавный скролл)
(function() {
    const smoothScroll = function (targetEl, duration) {
        // Высота header (чтобы не было наездов) 
        // Вставляем селектор header
        const headerElHeight = document.querySelector('.header').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;
        // Как именно будет анимироваться скролл
        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
        // Функция анимации
        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);
    };
    // Подвешивание обработчика события на сами ссылки
    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
}());