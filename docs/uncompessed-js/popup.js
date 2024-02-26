const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

const hamburgerWrapper = document.querySelector('.hamburger-wrapper');

//кнопка закрытия попап уведомления об отправке формы
const popupWrapperCloseBtn = document.querySelector('.popup-wrapper__close-btn');


let unlock = true;

//время действия анимации, которая указана в transition. Они должны быть одинаковые
const timeout = 100;
//if здесь проверяет есть ли такие ссылки на странице
if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            //запрет перезагрузки страницы при нажатии на ссылку
            e.preventDefault();
        });
    }
}

//Закрытие попапа по нажатию на кнопку с классом close-popup
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            // closest при клике отправляет в функцию попап клоуз объект, который ближайший объект нажатой ссылки с классом popup
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}
//в блоке есть код, для работы с ссылкой на попап в попапе
function popupOpen(curentPopup) {
    //сразу закрываем этот попап
    // провяет есть ли переменная unlock у объекта curentPopup
    if (curentPopup && unlock) {
        //получаем попап с классом опен, если он существует то закрываем его. Если такого нет, то блокируем скрол боди
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        //после этой процедуры на проверки попапов в попапе открываем попап
        //сразу вешается событие при клике по попапу
        curentPopup.classList.add('open');
        curentPopup.addEventListener("click", function (e) {
            //это улосивие отсикает все клики на всё, кроме тёмной области
            //если у нажатого объекта нет в родителях класса content, то мы закрываем попап. А его нет в родителях только у тёмной области как раз
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnlock();
        }
    }
}

function bodyLock() {
    //класс wrapper нужен ещё на весь сайт, чтобы работало высчитывание размера скроллбара


    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
            /* hamburgerWrapper.style.marginRight = lockPaddingValue; */
        }
    }
    //body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnlock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
                /* hamburgerWrapper.style.marginRight = '0px'; */
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}
//закрытие попапа по esc кнопке на клаве
document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});
//две функции полифилы
(function () {
    //проверяем поддержку
    if (!Element.prototype.closest) {
        //реализуем
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();
(function () {
    //проверяем поддержку
    if (!Element.prototype.matches) {
        //определяем свойство
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelectorv ||
            Element.prototype.msMatchesSelector;
    }
})();



//закрытие попап уведомления об отправке по клике на кнопку закрыть
popupWrapperCloseBtn.addEventListener('click', function (e) {
    // closest при клике отправляет в функцию попап клоуз объект, который ближайший объект нажатой ссылки с классом popup
    popupClose(popupWrapperCloseBtn.closest('.popup'));
    e.preventDefault();
});
