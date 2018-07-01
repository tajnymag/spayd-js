# spayd-js

An implementation of Short-Payment-Descriptor library in JavaScript/TypeScipt

## Installation

```bash
# yarn
yarn add spayd-js

# npm
npm install spayd-js --save
```

# Usage

```js
import spayd from 'spayd-js';

const payment = {
  acc: 'CZ2806000000000168540115',
  am: '450.00',
  cc: 'CZK',
  msg: 'PLATBA ZA ZBOZI',
  xvs: '1234567890'
};

console.log(spayd(payment));
```
