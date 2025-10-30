const form = document.getElementById('currency-form');
const result = document.getElementById('currency-result');
const API_KEY = "d8b9d0b46e2f4ba01a0931346c0bac5d"

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;

    if (!amount) {
        result.textContent = 'Введите корректную сумму';
        return;
    }

    result.textContent = 'Загрузка...';

    try {
        const response = await fetch(`https://api.exchangerate.host/convert?access_key=${API_KEY}&from=${from}&to=${to}&amount=${amount}`);
        const data = await response.json();

        if (!data.result && data.result !== 0) {
            result.textContent = 'Ошибка при конвертации. Проверьте валюты';
            return;
        }

        result.innerHTML = `
      <p>${amount} ${from} = <strong>${data.result.toFixed(2)} ${to}</strong></p>
      <p>Курс: 1 ${from} = ${data.info.quote.toFixed(2)} ${to}</p>
    `;
    } catch (err) {
        console.error(err);
        result.textContent = 'Произошла ошибка при запросе';
    }
});
