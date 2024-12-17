document.addEventListener("DOMContentLoaded", () => {
    const orderContainer = document.querySelector(".order-container");
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    const waLink = document.getElementById("whatsappLink"); // Ссылка для WhatsApp
    const userNameInput = document.getElementById("user__name");
    const userPhoneInput = document.getElementById("phone");
    const userAddressInput = document.getElementById("adress");

    if (Object.keys(cart).length === 0) {
        orderContainer.innerHTML = "<p class='total__cost'>Корзина пуста. Вернитесь к покупкам!</p>";
        return;
    }

    let orderHTML = "";
    let totalPrice = 0;

    // Отображение товаров в корзине
    for (const productId in cart) {
        const item = cart[productId];
        totalPrice += item.price * item.quantity;

        orderHTML += `
            <div class="order-item">
                <div class="order__item_one">
                    <div class="card__image">
                        <img src="${item.img}" alt="${item.name}" style="object-fit: cover">
                    </div>
                    <p class="order__name"><strong>${item.name}</strong></p>
                </div>
                <p class="order__amount">Количество: 
                    <button class="quantity-minus" data-id="${productId}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-plus" data-id="${productId}">+</button>
                </p>
                <p class="amount">${item.price * item.quantity} тг</p>
            </div>
        `;
    }

    orderHTML += `<p class="total__cost"><strong>Общая сумма: ${totalPrice} тг</strong></p>`;
    orderContainer.innerHTML = orderHTML;

    // Обработчики для кнопок плюс и минус
    document.querySelectorAll('.quantity-plus').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.id;
            updateQuantity(productId, 1); // Увеличиваем количество на 1
        });
    });

    document.querySelectorAll('.quantity-minus').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.id;
            updateQuantity(productId, -1); // Уменьшаем количество на 1
        });
    });

    // Функция для обновления количества товара в корзине
    const updateQuantity = (productId, change) => {
        if (cart[productId]) {
            cart[productId].quantity += change;
            if (cart[productId].quantity <= 0) {
                delete cart[productId]; // Удаляем товар из корзины, если количество 0
            }
        }

        localStorage.setItem("cart", JSON.stringify(cart)); // Сохраняем обновленную корзину
        displayUpdatedCart(); // Обновляем отображение корзины
        generateWhatsAppLink(); // Обновляем ссылку на WhatsApp
    };

    // Функция для перерисовки корзины
    const displayUpdatedCart = () => {
        let orderHTML = "";
        let totalPrice = 0;

        for (const productId in cart) {
            const item = cart[productId];
            totalPrice += item.price * item.quantity;

            orderHTML += `
                <div class="order-item">
                    <div class="order__item_one">
                        <div class="card__image">
                            <img src="${item.img}" alt="${item.name}" style="object-fit: cover">
                        </div>
                        <p class="order__name"><strong>${item.name}</strong></p>
                    </div>
                    <p class="order__amount">Количество: 
                        <button class="quantity-minus" data-id="${productId}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-plus" data-id="${productId}">+</button>
                    </p>
                    <p class="amount">${item.price * item.quantity} тг</p>
                </div>
            `;
        }

        orderHTML += `<p class="total__cost"><strong>Общая сумма: ${totalPrice} тг</strong></p>`;
        orderContainer.innerHTML = orderHTML;

        // Обновляем обработчики на новые кнопки
        document.querySelectorAll('.quantity-plus').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                updateQuantity(productId, 1); // Увеличиваем количество на 1
            });
        });

        document.querySelectorAll('.quantity-minus').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                updateQuantity(productId, -1); // Уменьшаем количество на 1
            });
        });
    };

    // Генерация ссылки для WhatsApp с актуальной корзиной
    const generateWhatsAppLink = () => {
        let message = "Здравствуйте! Я хочу заказать следующие товары:\n\n";
        let hasItems = false;
        let total = 0;

        for (const productId in cart) {
            if (cart[productId].quantity > 0) {
                const itemTotal = cart[productId].price * cart[productId].quantity;
                message += `${cart[productId].name} - ${cart[productId].quantity} шт., Сумма: ${itemTotal} тг\n`;
                total += itemTotal;
                hasItems = true;
            }
        }

        if (!hasItems) {
            message += "Корзина пуста.";
        } else {
            message += `\nОбщая сумма: ${total} тг`;
            message += `\nИмя: ${userNameInput.value}`;
            message += `\nТелефон: ${userPhoneInput.value}`;
            message += `\nАдрес: ${userAddressInput.value}`;
        }

        // Обновление ссылки на WhatsApp
        waLink.href = `https://wa.me/77084710300?text=${encodeURIComponent(message)}`;
    };

    // Добавляем обработчики на изменения в полях ввода
    userNameInput.addEventListener("input", generateWhatsAppLink);
    userPhoneInput.addEventListener("input", generateWhatsAppLink);
    userAddressInput.addEventListener("input", generateWhatsAppLink);


    clearCartButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (confirm("Вы уверены, что хотите очистить корзину?")) {
            localStorage.removeItem("cart"); // Удаляем корзину из localStorage
            location.reload(); // Перезагружаем страницу для обновления интерфейса
        }
    });

    // Инициализация
    generateWhatsAppLink(); // Генерация начальной ссылки
});
