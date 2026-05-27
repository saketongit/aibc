async function loadTokenPrice() {

    try {

        const response =
            await fetch('./data/prices.json');

        const data = await response.json();

        // Big valuation number
        document.querySelector('#valuation_display')
            .innerText =
            Math.round(data.valuation);

        // Exact token price
        document.querySelector('#token_price')
            .innerText =
            'Exact token price: ' +
            data.tokenPrice.toFixed(12) +
            ' USD';

        console.log(data);

    } catch(error) {

        console.error(error);

        document.querySelector('#token_price')
            .innerText = 'Unable to load';
    }
}

loadTokenPrice();
