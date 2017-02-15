// ==UserScript==
// @name         Fill the register form
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      http*://*.sjob-*.ru/registration.html*
// @include      http*://*.0sjob*.ru/registration.html*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    (function($){
        $(function(){
            var $btn = $('<button class="sj_btn m_blue">Заполнить форму</button>');

            $btn.css({
                position: 'fixed',
                top: '100px',
                left: '20px',
                opacity: 0.7
            });

            $btn.on('click', fillForm);

            $(document.body).append($btn);

            function fillForm() {
                function getRandomInt(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);

                    return Math.floor(Math.random() * (max - min)) + min;
                }

                function getRandomVal(arr) {
                    return arr[getRandomInt(0, arr.length - 1)];
                }

                var scope = $('[ng-controller="SingleStepController"]').scope(),
                    hrModel = scope.hrModel,
                    companyModel = scope.companyModel;

                var firstNames = ['Иван', 'Михаил', 'Евгений', 'Максим', 'Дмитрий', 'Поликарп', 'Евпатий', 'Константин', 'Петр', 'Фома', 'Сергей'];
                var lastNames = ['Иванов', 'Михайлов', 'Баженов', 'Максимов', 'Донской', 'Поликарпов', 'Константинопольский', 'Бывшев', 'Петров', 'Филатов', 'Цукерман'];
                var positions = ['Менеджер', 'Директор', 'Хозяин', 'Барин', 'CEO', 'CTO', 'Mr. Vice President', 'Швец', 'Жнец', 'На дуде игрец', 'Артист больших и малых театров'];
                var domains = ['example.com', 'yandex.ru', 'gmail.com', 'mail.ru', 'yahoo.com', 'live.com', 'bash.im', 'bk.ru', 'inbox.ru', 'stackoverflow.com', 'bing.com'];
                var comapnies = ['Рога и Копыта', 'Главснабсбытпром', 'ACME Inc.', 'Коламбия Пикчерз', 'Гугл', 'Хали-Гали Индастрис', 'ИП Аганесян'];
                var phonePrefixes = ['999', '926', '985', '903', '905', '980', '950', '940', '930'];

                hrModel.firstname = getRandomVal(firstNames);
                hrModel.lastname = getRandomVal(lastNames);
                hrModel.position = getRandomVal(positions);
                hrModel.email =  ('user' + ((Math.random() * 10) + '').replace('.', '')) +  '@' + getRandomVal(domains);
                hrModel.phones[0].number = '+7 ' + getRandomVal(phonePrefixes) + ' 123-45-67';

                companyModel.name = getRandomVal(comapnies);
                companyModel.site = 'http://' + getRandomVal(domains);

                // Hack for our broken validation
                $('.EmployerFullRegistration_phone input').eq(0).trigger('blur');

                scope.$apply();
            }
        });
    })(window.jQuery);
})();