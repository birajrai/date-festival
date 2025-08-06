const fs = require('fs');
const dayjs = require('dayjs');
const NepaliDate = require('nepali-datetime');

const today = new Date();
const bsDate = new NepaliDate(today);

const bsDateStr = `${bsDate.year}-${String(bsDate.month + 1).padStart(2, '0')}-${String(bsDate.date).padStart(2, '0')}`;

// Dummy festival & event data
function getFestival(bsDateStr) {
  const festivals = {
    "2082-04-21": "Gaijatra",
    "2082-04-22": "Krishna Janmashtami"
  };
  return festivals[bsDateStr] || null;
}

function getEvents(bsDateStr) {
  return ["No major events"];
}

const data = {
  today_date: {
    bs: bsDateStr,
    ad: dayjs(today).format('YYYY-MM-DD')
  },
  today_festival: getFestival(bsDateStr),
  todays_event: getEvents(bsDateStr),
  updated_at: new Date().toISOString()
};

fs.writeFileSync('date.json', JSON.stringify(data, null, 2));
