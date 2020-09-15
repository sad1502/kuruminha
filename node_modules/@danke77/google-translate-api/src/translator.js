const querystring = require('querystring');
const got = require('got');
const languages = require('./languages');
const { getTk } = require('./tk');


class Translator {

  constructor(opts = {}, updateTime = 1000) {
    let e;
    [opts.from, opts.to].forEach(lang => {
      if (lang && !languages.isSupported(lang)) {
        e = new Error();
        e.code = 400;
        e.message = `The language '${lang}' is not supported`;
      }
    });
    if (e) {
      throw e;
    }

    opts.from = opts.from || 'auto';
    opts.to = opts.to || 'zh-CN';
    opts.tld = opts.tld || 'cn';

    opts.from = languages.getCode(opts.from);
    opts.to = languages.getCode(opts.to);

    this._opts = opts;
    this._url = `https://translate.google.${opts.tld}/translate_a/single`;
    this._headers = {
      'Host': 'translate.google.cn',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Referer': 'https://translate.google.cn/',
      'Cookie': 'NID=101=pkAnwSBvDm2ACj2lEVnWO7YEPUoWCTges7B7z2jJNyrNwAZ2OL9FFOQLpdethA_20gCVqukiHnVm1hUbMGZc_ItQFdP5AHoq5XoMeEORaeidU196NDVRsrAu_zT0Yfsd; _ga=GA1.3.1338395464.1492313906',
      // 'Cookie': 'NID=198=uZbXCppavSWScCpUxiHGM44OvdUS_xdikVCqpSDsNZ0MMkbKCwSRl7M_oBHYI0RKvSplSJrbbQfWt86OmQD_Xv0gU1GyLb1AlTHp-o8RiViqBWUkHm7LIWyD2rGB1XTAn0IXEOSNyBTCeJzXW1fSjBSsmE0aZiEqcktuIgRJSRw; _ga=GA1.3.565632586.1582509175; _gid=GA1.3.1298714253.1587707890; 1P_JAR=2020-4-24-5', 
      'Connection': 'keep-alive',
      'Cache-Control': 'max-age=0',
    };
    this._data = {
      client: opts.client || 'gtx', // t
      sl: opts.from,
      tl: opts.to,
      hl: opts.to,
      dt: [ 'at', 'bd', 'ex', 'ld', 'md', 'qca', 'rw', 'rm', 'ss', 't' ],
      ie: 'UTF-8',
      oe: 'UTF-8',
      source: 'bh',
      otf: 1,
      ssel: 0,
      tsel: 0,
      kc: 7,
    };

    this._updateTime = updateTime;
    this._nextUpdateTime = 0;
    this._tk = '';
  }


  _parse(body) {
    const result = {
      text: '',
      pronunciation: '',
      from: {
        language: {
          didYouMean: false,
          iso: ''
        },
        text: {
          autoCorrected: false,
          value: '',
          didYouMean: false
        }
      },
      raw: '',
    };

    if (this._opts.raw) {
      result.raw = body;
    }

    const data = JSON.parse(body);
    data[0].forEach(obj => {
      if (obj[0]) {
        result.text += obj[0];
      }
      if (obj[2]) {
        result.pronunciation += obj[2];
      }
    });

    if (data[2] === data[8][0][0]) {
      result.from.language.iso = data[2];
    } else {
      result.from.language.didYouMean = true;
      result.from.language.iso = data[8][0][0];
    }

    if (data[7] && data[7][0]) {
      let str = data[7][0];

      str = str.replace(/<b><i>/g, '[');
      str = str.replace(/<\/i><\/b>/g, ']');

      result.from.text.value = str;

      if (data[7][5] === true) {
        result.from.text.autoCorrected = true;
      } else {
        result.from.text.didYouMean = true;
      }
    }

    return result;
  }


  async translate(text) {
    if (new Date().getTime() > this._nextUpdateTime) {
      this._tk = await getTk(text, this._opts.tld);
      this._nextUpdateTime = new Date().getTime() + this._updateTime;
    }

    const data = {
      ...this._data,
      q: text,
      tk: this._tk,
    };
    let url = `${this._url}?${querystring.stringify(data)}`;

    let requestOptions;
    if (url.length > 2048) {
      delete data.q;
      url = `${this._url}?${querystring.stringify(data)}`;
      requestOptions = [
        url,
        {
          headers: this._headers,
          method: 'POST',
          form: true,
          body: {
            q: text,
          },
        },
      ];
    } else {
      requestOptions = [
        url,
        {
          headers: this._headers,
        },
      ];
    }
    const res = await got(...requestOptions).catch(err => {
      err.message += `\nUrl: ${url}`;
      if (err.statusCode !== undefined && err.statusCode !== 200) {
        err.code = 'BAD_REQUEST';
      } else {
        err.code = 'BAD_NETWORK';
      }
      throw err;
    });

    return this._parse(res.body);
  }
}


module.exports = Translator;
