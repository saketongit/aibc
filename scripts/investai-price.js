// ===== CONFIG =====

const TOTAL_SUPPLY = 1_000_000_000_000;

const MUON_INVESTED = 100;
const TSMON_INVESTED = 50;

// Replace with your real buy prices
const MUON_BUY_PRICE = 672.32;
const TSMON_BUY_PRICE = 392.87;

// NASDAQ PE
const NASDAQ_PE = 35;
const ADJUSTED_PE = NASDAQ_PE - 10;


// ===== HELPERS =====

async function fetchLatestPrice(symbol) {

    const response = await fetch(
        `https://app.ondo.finance/api/v2/assets/${symbol}/history?range=10min`
    );

    const data = await response.json();

    return data.primaryMarketPrice.at(-1).value;
}


// ===== MAIN =====

async function calculateInvestAIPrice() {

    try {

        // Fetch latest prices
        const latestMuonPrice =
            await fetchLatestPrice('muon');

        const latestTSMonPrice =
            await fetchLatestPrice('tsmon');


        // Calculate units purchased
        const muonUnits =
            MUON_INVESTED / MUON_BUY_PRICE;

        const tsmonUnits =
            TSMON_INVESTED / TSMON_BUY_PRICE;


        // Current holding values
        const currentMuonValue =
            latestMuonPrice * muonUnits;

        const currentTSMonValue =
            latestTSMonPrice * tsmonUnits;


        // Portfolio value
        const portfolioValue =
            currentMuonValue + currentTSMonValue;


        // Profit
        const investedAmount =
            MUON_INVESTED + TSMON_INVESTED;

        const profit =
            portfolioValue - investedAmount;


        // Valuation
        const valuation =
            Math.max(0, profit * ADJUSTED_PE);


        // Token price
        const tokenPrice =
            valuation / TOTAL_SUPPLY;


        // ===== UPDATE UI =====

        const tokenPriceElement =
            document.querySelector('#token_price');

        tokenPriceElement.innerText =
            tokenPrice.toFixed(12);


        // OPTIONAL:
        // Update MUon/TSMon values in statistics table

        console.log({
            latestMuonPrice,
            latestTSMonPrice,
            portfolioValue,
            profit,
            valuation,
            tokenPrice
        });

    } catch(error) {

        console.error(error);

        document.querySelector('#token_price')
            .innerText = 'Unable to load';
    }
}


// RUN
calculateInvestAIPrice();