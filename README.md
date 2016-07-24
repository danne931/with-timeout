# with-timeout

`with-timeout`: Promisified, boilerplate-free setTimeout.

## Install

```
$ npm install --save with-timeout
```

If you do not use a module bundler you may use the provided UMD builds via the `<script>` tag.
- [https://npmcdn.com/with-timeout/dist/with-timeout.js](https://npmcdn.com/with-timeout/dist/with-timeout.js)  
- [https://npmcdn.com/with-timeout/dist/with-timeout.min.js](https://npmcdn.com/with-timeout/dist/with-timeout.min.js)

## Usage

```javascript
import withTimeout from 'with-timeout'

const fn = (firstName = 'Agent', lastName = 'Smith') =>
  `Hello ${firstName} ${lastName}`

// After 500ms - 'Hello Agent Smith'
withTimeout(fn).then(console.log)

// After 1000ms - 'Hello Daniel Eisenbarger'
withTimeout(fn, 1000, 'Daniel', 'Eisenbarger').then(console.log)
```
