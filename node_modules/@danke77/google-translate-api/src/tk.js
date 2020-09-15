const got = require('got');


const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};


/**
 * get raw html from 'https://translate.google.cn/'
 * @param {*} tld 
 */
const getRaw = async url => {
  return await got(url, { timeout: 3000 });
};


/**
 * get the tkk
 * @param {*} tld 
 */
const getTkk = async (tld = 'cn') => {
  const url = `https://translate.google.${tld}`;
  let retry = 3;
  let interval = 3;
  while (retry > 0) {
    const raw = await getRaw(url);
    if (raw && raw.statusCode === 200) {
      const result = raw.body.match(/tkk\:\'(\d+\.\d+)?\'/g);
      if (result && result.length > 0) {
        // tkk:'441029.2118408741'
        return result['0'].split(':')[1].replace(/'/g, '');
      }
    }
    await sleep(interval * 1000);
    interval++;
    retry--;
  }
  throw Error(`can't visit ${url}`);
}


const getTk = async (text, tld = 'cn') => {
  const tkk = await getTkk(tld);

  const b = (a, b) => {
    for (let d = 0; d < b.length - 2; d += 3) {
      let c = b.charAt(d + 2);
      c = 'a' <= c ? c.charCodeAt(0) - 87 : Number(c);
      c = '+' == b.charAt(d + 1) ? a >>> c : a << c;
      a = '+' == b.charAt(d) ? a + c & 4294967295 : a ^ c;
    }
    return a
  }

  const tk = (a, TKK) => {
    let e = TKK.split('.'), h = Number(e[0]) || 0, g = [], d = 0, f = 0;
    for ( ; f < a.length; f++) {
      let c = a.charCodeAt(f);
      128 > c ? g[d++] = c : (2048 > c ? g[d++] = c >> 6 | 192 : (55296 == (c & 64512) && f + 1 < a.length && 56320 == (a.charCodeAt(f + 1) & 64512) ? (c = 65536 + ((c & 1023) << 10) + (a.charCodeAt(++f) & 1023), g[d++] = c >> 18 | 240, g[d++] = c >> 12 & 63 | 128) : g[d++] = c >> 12 | 224, g[d++] = c >> 6 & 63 | 128), g[d++] = c & 63 | 128);
    }
    a = h;
    for (d = 0; d < g.length; d++) a += g[d], a = b(a, '+-a^+6');
    a = b(a, '+-3^+b+-f');
    a ^= Number(e[1]) || 0;
    0 > a && (a = (a & 2147483647) + 2147483648);
    a %= 1E6;
    return a.toString() + '.' + (a ^ h);
  }

  return tk(text, tkk);
}


exports.getTk = getTk;
