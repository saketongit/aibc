async function loadTokenPrice() {

    try {

        const response =
            await fetch('./data/prices.json');

        const data = await response.json();

        document.querySelector('#token_price')
            .innerText =
            data.tokenPrice.toFixed(12) + ' USD';

        console.log(data);

    } catch(error) {

        console.error(error);

        document.querySelector('#token_price')
            .innerText = 'Unable to load';
    }
}

loadTokenPrice();
