document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.querySelector(".product__cards");
    const navButtons = document.querySelectorAll(".main__nav_btn");
    const cart = JSON.parse(localStorage.getItem('cart')) || {}; // Загружаем корзину из localStorage, если она есть

    // Прокрутка к категории
    navButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const category = button.dataset.type; // Получаем категорию из data-type кнопки
            const product = productsContainer.querySelector(`.product__card[data-product-type="${category}"]`); // Находим первую карточку с соответствующей категорией

            if (product) {
                product.scrollIntoView({ behavior: "smooth", block: "start" }, 50); // Прокрутка к элементу
            }
        });
    });

    // Функция для создания карточки товара
    const createProductCard = (product) => {
        const discount = product.discount;

        const card = document.createElement("div");
        card.className = "product__card";
        card.dataset.productId = product.id; // Сохраняем ID товара
        card.dataset.productType = product.product__type; // Сохраняем категорию товара из JSON

        card.innerHTML = `
            <div class="card__image">
                <img src="${product.img}" alt="${product.name}">
            </div>
            <div class="card__content">
                <div class="card__price">${product.price} тг <span class="discount">${discount !== product.price ? discount + " тг" : ""}</span></div>
                <div class="card__product_name">
                    <p class="product_name_item">${product.name}</p>
                </div>
                <div class="card__product_disc">
                    <p class="product_disc_item">${product.description}</p>
                </div>
                <div class="card__disc_button">
                    <a href="#" class="disc__button_item">Подробнее</a>
                </div>
                <div class="card__bottom_btns">
                    <div class="card__counter">
                        <div class="card__counter_block">
                            <button class="counter__btn counter-minus"><img src="images/icons8-минус-24.png" alt="минус"></button>
                        </div>
                        <div class="card__counter_block">
                            <p class="counter_nums">0</p>
                        </div>
                        <div class="card__counter_block">
                            <button class="counter__btn counter-plus"><img src="images/icons8-плюс-24.png" alt="плюс"></button>
                        </div>
                    </div>
                    <div class="card__bottom_button">
                        <a href="#" class="add-to-cart bottom__button_item">В корзину</a>
                    </div>
                </div>
            </div>
        `;
        console.log(card.outerHTML);
        return card;
    };

    // Загрузка данных из JSON
    fetch("data/products.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Не удалось загрузить данные");
            }
            return response.json();
        })
        .then((products) => {
            // Генерация карточек и добавление их в контейнер
            products.forEach((product) => {
                const productCard = createProductCard(product);
                productsContainer.appendChild(productCard);
            });
        })
        .catch((error) => {
            console.error("Ошибка загрузки данных:", error);
        });

    // Обработчик событий для работы с карточками
    productsContainer.addEventListener("click", (event) => {
        const target = event.target;

        // Увеличение количества
        if (target.closest(".counter-plus")) {
            const counter = target.closest(".card__counter").querySelector(".counter_nums");
            let count = parseInt(counter.textContent);
            counter.textContent = count + 1;
        }

        // Уменьшение количества
        if (target.closest(".counter-minus")) {
            const counter = target.closest(".card__counter").querySelector(".counter_nums");
            let count = parseInt(counter.textContent);
            if (count > 0) counter.textContent = count - 1;
        }

        // Добавление в корзину
        if (target.closest(".add-to-cart")) {
            event.preventDefault(); // Останавливаем стандартное поведение ссылки

            const card = target.closest(".product__card");
            const productId = card.dataset.productId;
            const productName = card.querySelector(".product_name_item").textContent;
            const productPriceText = card.querySelector(".card__price").childNodes[0].textContent;
            const counter = parseInt(card.querySelector(".counter_nums").textContent);

            // Преобразуем цену в число
            const productPrice = parseFloat(productPriceText.replace(/\s/g, '').replace('тг', ''));

            // Если цена или количество undefined, то пропускаем товар
            if (!productPrice || counter <= 0) {
                alert("Пожалуйста, проверьте цену и количество товара.");
                return;
            }

            // Добавление товара в корзину
            if (cart[productId]) {
                cart[productId].quantity += counter; // Увеличиваем количество, если товар уже есть в корзине
            } else {
                cart[productId] = {
                    name: productName,
                    price: productPrice,
                    quantity: counter,
                };
            }

            // Сбрасываем счётчик
            card.querySelector(".counter_nums").textContent = "0";

            // Сохраняем корзину в localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Обновляем корзину на странице
            updateCart();
        }
    });

    // Функция для обновления корзины
    const updateCart = () => {
        console.log("Корзина:", cart); // Для тестирования: выводим содержимое корзины в консоль
        let totalItems = 0;
        let totalPrice = 0;

        // Подсчёт общей суммы и количества
        for (const productId in cart) {
            if (cart[productId].price && cart[productId].quantity) {
                totalItems += cart[productId].quantity;
                totalPrice += cart[productId].price * cart[productId].quantity;
            }
        }

        // Обновление UI корзины
        const cartSummary = document.querySelector(".cart-summary");
        if (cartSummary) {
            cartSummary.textContent = `Товаров: ${totalItems}, Сумма: ${totalPrice} тг`;
        }

        // Отображение всех товаров в корзине (если нужно)
        const cartDetails = document.querySelector(".cart-details");
        if (cartDetails) {
            cartDetails.innerHTML = ''; // Очищаем предыдущие данные
            for (const productId in cart) {
                const product = cart[productId];
                const item = document.createElement("div");
                item.className = "cart-item";
                item.innerHTML = `
                    <div>${product.name}</div>
                    <div>Цена: ${product.price} тг</div>
                    <div>Количество: ${product.quantity}</div>
                    <div>Итого: ${product.price * product.quantity} тг</div>
                `;
                cartDetails.appendChild(item);
            }
        }
    };

    // Инициализация корзины на старте страницы
    updateCart();
});