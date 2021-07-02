[![build status](https://travis-ci.org/Tajnymag/spayd-js.svg?branch=master)](https://travis-ci.org/Tajnymag/spayd-js)
[![dependencies](https://david-dm.org/tajnymag/spayd-js.svg)](https://david-dm.org/tajnymag/spayd-js)
[![npm version](https://badge.fury.io/js/spayd.svg)](https://badge.fury.io/js/spayd)

# spayd-js

An implementation of Short-Payment-Descriptor library in JavaScript/TypeScript. Primarily used for generating QR-Payments.

## Installation

```bash
# yarn
yarn add spayd

# npm
npm install spayd --save
```

## Usage

```js
import spayd from 'spayd';

const payment = {
  acc: 'CZ2806000000000168540115',
  am: '450.00',
  cc: 'CZK',
  msg: 'Payment for some stuff',
  xvs: '1234567890'
};

// print just the SPAYD string
console.log(spayd(payment));
```

```js
import qrcode from 'qrcode';
import spayd from 'spayd';

const qrCodeEl = document.getElementById('qr');

const payment = {
  acc: 'CZ2806000000000168540115',
  am: '450.00',
  cc: 'CZK',
  msg: 'Payment for some stuff',
  xvs: '1234567890'
};

const spaydString = spayd(payment);

// generate and assign qr-payment to an image element
qrcode.toDataURL(spaydString)
  .then((url) => {
    qrCodeEl.setAttribute('src', url);
  })
  .catch(console.error);
```

## Options

| Required | Descriptor | Format | Description | Example |
| --- | --- | --- | --- | --- |
| &#9745; | acc | string | account number in IBAN format or IBAN+BIC format | "CZ5855000000001265098001+RZBCCZPP" |
| &#9744; | altAcc | string[] | array of alternative accounts (usage of these accounts depends on the bank app implementation) | [ "CZ5855000000001265098001+RZBCCZPP", "CZ5855000000001265098001" ] |
| &#9745; | am | string | amount of money to transfer in floating point number string | "480.55" |
| &#9744; | cc | string | currency in ISO 4217 format | "CZK" |
| &#9744; | rf | number | payment identifier for the receiver | 1234567890123456 |
| &#9744; | rn | string | receiver's name | "PETR DVORAK"
| &#9744; | dt | Date | due date | new Date(2018, 3, 20) |
| &#9744; | pt | string | payment type | "P2P" |
| &#9744; | msg | string | message for receiver | "Payment for some stuff" |
| &#9744; | crc32 | string | CRC32 hashsum of this SPAYD payment | "1234ABCD" |
| &#9744; | xper | string | number of days to retry the payment | "7" |
| &#9744; | xvs | string | variable symbol | "1234567890" |
| &#9744; | xss | string | specific symbol | "1234567890" |
| &#9744; | xks | string | constant symbol | "1234567890" |
| &#9744; | xid | string | payment identifier for the payer | "ABCDEFGHIJ1234567890" |

For more info about SPAYD descriptors, see:
* [Ofiicial SPAYD website (CZ)](https://qr-platba.cz/pro-vyvojare/specifikace-formatu/)
* [SPAYD on Wikipedia (EN)](https://en.wikipedia.org/wiki/Short_Payment_Descriptor)

## Package variants

As of version >=3.0, the default export is in the UMD format. This enables you to use the package both in the browser and in nodejs. Plus, it allows it to target legacy browsers, like IE11. If you encounter no troubles with the default export, feel free to keep using it.

If you wanted import specifically an ES6 or CommonJS version of spayd, use the "/esm" or "/cjs" subpath respectively.

```js
// pure ES6 version
import spayd from "spayd/esm";

// CommonJS version
const spayd = require("spayd/cjs");
```
