const fs = require('fs');
const dayjs = require('dayjs');
const { bsToAd, adToBs } = require('nepali-date-converter');
const axios = require('axios');

const today = dayjs().format('YYYY-MM-DD');
const bs = adToBs(today);

async function getFestival(bsDate) {
  // Dummy placeholder or API (replace with any real one)
  // You can use a scraped or static dataset if API not found
  const list = {
    "2082-04-21": "Gaijatra",
    "2082-04-22": "Krishna Janmashtami"
  };
  return list[bsDate] || null;
}

async function getEvents(bsDate) {
  return ["No major events"]; // Use external API or source if needed
}

(async () => {
  const bsDateStr = `${bs.bsYear}-${String(bs.bsMonth).padStart(2, '0')}-${String(bs.bsDay).padStart(2, '0')}`;
  
  const data = {
    today_date: {
      bs: bsDateStr,
      ad: today
    },
    today_festival: await getFestival(bsDateStr),
    todays_event: await getEvents(bsDateStr),
    updated_at: new Date().toISOString()
  };

  fs.writeFileSync('date.json', JSON.stringify(data, null, 2));
})();
