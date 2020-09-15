# google-translate-api

[![NPM version](https://img.shields.io/npm/v/@danke77/google-translate-api.svg)](https://www.npmjs.com/package/@danke77/google-translate-api)

A **free** and **unlimited** API for Google Translate :dollar::no_entry_sign: for Node.js.

## Features

- Auto language detection
- Spelling correction
- Language correction
- Fast and reliable – it uses the same servers that [translate.google.com](https://translate.google.com) uses

## Why this fork?

This fork of original [matheuss/google-translate-api](https://github.com/matheuss/google-translate-api) contains several improvements:

- New option `client="t|gtx"`. Setting `client="gtx"` seems to work even with outdated token, see [this discussion](https://github.com/matheuss/google-translate-api/issues/79#issuecomment-425679193) for details
- Fixed extraction of TKK ceed from current `https://translate.google.com` sources (via [@vitalets/google-translate-token](https://github.com/vitalets/google-translate-token))
- Removed unsecure `unsafe-eval` dependency (See [#2](https://github.com/vitalets/google-translate-api/pull/2))
- Added support for custom `tld` (especially to support `translate.google.cn`, see [#7](https://github.com/vitalets/google-translate-api/pull/7))
- Added support for outputting pronunciation (see [#17](https://github.com/vitalets/google-translate-api/pull/17))
- Added support for language extensions from outside of the API (See [#18](https://github.com/vitalets/google-translate-api/pull/18))

## Install

```
npm install @danke77/google-translate-api
```

## Usage

From automatic language detection to English:

```js
const Translator = require('@danke77/google-translate-api');

const translator = new Translator({
    from: 'auto',
    to: 'en',
    raw: false,
    client: 'gtx', // t
    tld: 'cn',
});

const res = await translator.translate('Ik spreek Engels')
    .catch(err => {
        console.error(err);
    });
console.log(res.text); // I speak English
console.log(res.from.language.iso); // nl
```

From English to Dutch with a typo:

```js
const Translator = require('@danke77/google-translate-api');

const translator = new Translator({
    from: 'en',
    to: 'nl',
    raw: false,
    client: 'gtx', // t
    tld: 'cn',
});

const res = await translator.translate('I spea Dutch!')
    .catch(err => {
        console.error(err);
    });
console.log(res.text); // Ik spreek Nederlands!
console.log(res.from.text.autoCorrected); // true
console.log(res.from.text.value); // I [speak] Dutch!
console.log(res.from.text.didYouMean); // false
```

You can also add languages in the code and use them in the translation:

``` js
const Translator = require('@danke77/google-translate-api');

Translator.languages['sr-Latn'] = 'Serbian Latin';
const translator = new Translator({
    from: 'en',
    to: 'sr-Latn',
    raw: false,
    client: 'gtx', // t
    tld: 'cn',
});
```

## Does it work from web page context?

No. `https://translate.google.com` does not provide [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) http headers allowing access from other domains.

## API

### new Translator([options])

#### options

Type: `object`

##### from

Type: `string` Default: `auto`

The `text` language. Must be `auto` or one of the codes/names (not case sensitive) contained in [languages.js](https://github.com/danke77/google-translate-api/blob/master/src/languages.js)

##### to

Type: `string` Default: `zh-CN`

The language in which the text should be translated. Must be one of the codes/names (case sensitive!) contained in [languages.js](https://github.com/danke77/google-translate-api/blob/master/src/languages.js).

##### raw

Type: `boolean` Default: `false`

If `true`, the returned object will have a `raw` property with the raw response (`string`) from Google Translate.

##### client

Type: `string` Default: `"gtx"`

Query parameter `client` used in API calls. Can be `t|gtx`.

##### tld

Type: `string` Default: `"cn"`

TLD for Google translate host to be used in API calls: `https://translate.google.{tld}`.

### translate(text)

#### text

Type: `string`

The text to be translated

### Returns an `object`:

- `text` *(string)* – The translated text.
- `from` *(object)*
  - `language` *(object)*
    - `didYouMean` *(boolean)* - `true` if the API suggest a correction in the source language
    - `iso` *(string)* - The [code of the language](https://github.com/danke77/google-translate-api/blob/master/src/languages.js) that the API has recognized in the `text`
  - `text` *(object)*
    - `autoCorrected` *(boolean)* – `true` if the API has auto corrected the `text`
    - `value` *(string)* – The auto corrected `text` or the `text` with suggested corrections
    - `didYouMean` *(boolean)* – `true` if the API has suggested corrections to the `text`
- `raw` *(string)* - If `options.raw` is true, the raw response from Google Translate servers. Otherwise, `''`.

Note that `res.from.text` will only be returned if `from.text.autoCorrected` or `from.text.didYouMean` equals to `true`. In this case, it will have the corrections delimited with brackets (`[ ]`):

```js
const res = await translator.translate('I spea Dutch!')
    .catch(err => {
        console.error(err);
    });
console.log(res.from.text.value); // I [speak] Dutch!
```

Otherwise, it will be an empty `string` (`''`).

## License

MIT
