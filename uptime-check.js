const fs = require('fs');
const axios = require('axios');

const sites = [
  "https://www.meropatra.com/",
  "https://bishestamedia.com.np/",
  "https://kalipokhari.com/",
  "https://janaprabhat.edu.np/"
];

async function checkSite(url) {
  try {
    const res = await axios.get(url, { timeout: 5000 });
    const status = res.status;
    return {
      siteurl: url,
      uptime_status: (status >= 200 && status < 400) ? "live" : "down",
      status_code: status,
      last_check: new Date().toISOString()
    };
  } catch (e) {
    return {
      siteurl: url,
      uptime_status: "down",
      status_code: e.response ? e.response.status : null,
      last_check: new Date().toISOString()
    };
  }
}

(async () => {
  const results = await Promise.all(sites.map(checkSite));

  const uptimeData = {
    sites: results,
    updated_at: new Date().toISOString()
  };

  fs.writeFileSync('uptime.json', JSON.stringify(uptimeData, null, 2));
})();
