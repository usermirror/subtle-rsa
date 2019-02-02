<br/>
<p align="center">
  <strong><code>🤫 subtle-rsa</code></strong>
</p>

<p align="center">
  Simple wrapper around <br/>
  SubtleCrypto RSA implementation.
</p>
<br/>

<p align="center">
  <a href="https://unpkg.com/subtle-rsa@^0.1/lib/index.js"><img src="https://img.badgesize.io/https://unpkg.com/subtle-rsa@^0.1/lib/index.js?compression=gzip&amp;label=subtle--rsa"></a>
  <a href="https://www.npmjs.com/package/subtle-rsa"><img src="https://img.shields.io/npm/v/subtle-rsa.svg?maxAge=3600&label=subtle-rsa&colorB=007ec6"></a>
</p>
<br/>

```javascript
import SubtleRSA from 'subtle-rsa'

let rsa = new SubtleRSA()

let encryptedValue = await rsa.encrypt('value')

if ('value' === (await rsa.decrypt(encryptedValue))) {
  // success!
}
```

#### Installation

Install with npm:

```console
npm install --save subtle-rsa
```

Or yarn:

```console
yarn add subtle-rsa
```

Or using a script tag:

```html
<script
  src="https://unpkg.com/subtle-rsa@^0.1/lib/index.umd.js"
  crossorigin="anonymous"
></script>
```
