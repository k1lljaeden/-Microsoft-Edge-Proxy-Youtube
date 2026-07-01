const proxies = [
  {
    scheme: 'http',
    host: '14.143.222.113',
    port: 57748,
    country: 'Индия'
  },
  {
    scheme: 'http',
    host: '185.200.188.234',
    port: 10001,
    country: 'Россия'
  },
  {
    scheme: 'http',
    host: '71.198.208.169',
    port: 443,
    country: 'США'
  }
];

let currentProxyIndex = 0;

function setProxy(proxy) {
  const config = {
    mode: "fixed_servers",
    rules: {
      singleProxy: {
        scheme: proxy.scheme,
        host: proxy.host,
        port: proxy.port
      },
      bypassList: ["localhost"]
    }
  };
  chrome.proxy.settings.set(
    {value: config, scope: 'regular'},
    () => {
      console.log(`Прокси: ${proxy.host}:${proxy.port} (${proxy.country})`);
    }
  );
}

function cycleProxy() {
  const proxy = proxies[currentProxyIndex];
  setProxy(proxy);
  currentProxyIndex = (currentProxyIndex + 1) % proxies.length;
}

// Переключение каждые 5 минут
setInterval(cycleProxy, 5 * 60 * 1000);
setTimeout(cycleProxy, 1000);