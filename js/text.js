document.addEventListener('DOMContentLoaded', () => {
    const adress_btn = document.getElementById('adress');
    const delivery_btn = document.getElementById('delivery');
    const pay_btn = document.getElementById('pay');
    const contacts_btn = document.getElementById('contacts');



    const adress_block = document.querySelector('.show-info-adress');
    const adress_h1 = document.querySelector('.show-info-adress-h1');
    const adress_p = document.querySelector('.show-info-adress-p');
    const adress_wrapper = document.querySelector('.info_wrapper');
    const overlay = document.querySelector('.overlay');


    adress_btn.addEventListener('click', () => {
        adress_h1.innerHTML = 'Адрес'
        adress_p.innerHTML = 'Актобе, 11 мкр, БЦ Асан, ул. Аз Наурыз, 17'
        adress_wrapper.style.display = 'flex'; // Показываем родительский контейнер
        setTimeout(() => {
            overlay.classList.add('show'); // Показываем затемнение
            adress_block.classList.add('show'); // Показываем блок адреса
        }, 10); // Небольшая задержка для обеспечения правильного отображения
    });

    delivery_btn.addEventListener('click', () => {
        adress_h1.innerHTML = 'Доставка'
        adress_p.innerHTML = 'Бесплатная доставка за 1 час от 10 000 тг.'
        adress_wrapper.style.display = 'flex'; // Показываем родительский контейнер
        setTimeout(() => {
            overlay.classList.add('show'); // Показываем затемнение
            adress_block.classList.add('show'); // Показываем блок адреса
        }, 10); // Небольшая задержка для обеспечения правильного отображения
    });

    pay_btn.addEventListener('click', () => {
        adress_h1.innerHTML = 'Оплата'
        adress_p.innerHTML = 'Наличными или QR Kaspi Red'
        adress_wrapper.style.display = 'flex'; // Показываем родительский контейнер
        setTimeout(() => {
            overlay.classList.add('show'); // Показываем затемнение
            adress_block.classList.add('show'); // Показываем блок адреса
        }, 10); // Небольшая задержка для обеспечения правильного отображения
    });


    contacts_btn.addEventListener('click', () => {
        adress_h1.innerHTML = 'Контакты'
        adress_p.innerHTML = '+7 (708) 471-03-00, +7 (708) 471-03-03'
        adress_wrapper.style.display = 'flex'; // Показываем родительский контейнер
        setTimeout(() => {
            overlay.classList.add('show'); // Показываем затемнение
            adress_block.classList.add('show'); // Показываем блок адреса
        }, 10); // Небольшая задержка для обеспечения правильного отображения
    });






    overlay.addEventListener('click', () => {
        overlay.classList.remove('show');
        adress_block.classList.remove('show');
        setTimeout(() => {
            adress_wrapper.style.display = 'none';
        }, 400);
    });
});