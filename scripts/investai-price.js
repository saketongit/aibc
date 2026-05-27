async function loadTokenPrice() {

    try {

        const response =
            await fetch('./data/prices.json');

        const data = await response.json();

        // Big valuation number
        document.querySelector('#valuation_display')
            .innerText =
            data.valuation.toFixed(2) + ' USDT';

        // Exact token price
        document.querySelector('#token_price')
            .innerText =
            'Exact token price: ' +
            data.tokenPrice.toFixed(12) +
            ' USD';

        // Update statistics table

        document.querySelector('#muon_current')
            .innerText =
            data.currentMuonValue.toFixed(2);

        document.querySelector('#tsmon_current')
            .innerText =
            data.currentTSMonValue.toFixed(2);

        document.querySelector('#googlon_current')
            .innerText =
            data.currentGOOGLonValue.toFixed(2);    

        console.log(data);

    } catch(error) {

        console.error(error);

        document.querySelector('#token_price')
            .innerText = 'Unable to load';
    }
}

loadTokenPrice();
