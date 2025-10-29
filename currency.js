// currency.js
const form = document.getElementById('convert-form');
const result = document.getElementById('convert-result');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = +document.getElementById('amount').value;
    const from = document.getElementById('from').value.toUpperCase();
    const to = document.getElementById('to').value.toUpperCase();

    const res = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
    const data = await res.json();

    result.textContent = `${amount} ${from} = ${data.result} ${to}`;
});
