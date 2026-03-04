const axios = require('axios');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Try 2-3 different sources
    const sources = [
        'https://odds.o99exch.com/ws/getMarketDataNew',
        'https://api.allorigins.win/raw?url=https://odds.o99exch.com/ws/getMarketDataNew'
    ];

    for (let url of sources) {
        try {
            const response = await axios.get(url, { timeout: 5000 });
            if (response.data) {
                return res.status(200).json(response.data);
            }
        } catch (e) {
            continue; // Agla source try karo
        }
    }
    res.status(500).json({ error: "All Sources Down" });
};
