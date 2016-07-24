# with-timeout

Promisified, boilerplate-free setTimeout

[![Build Status](https://travis-ci.org/danne931/with-timeout.svg?branch=master)](https://travis-ci.org/danne931/with-timeout)
[![npm version](https://img.shields.io/npm/v/with-timeout.svg?style=flat-square)](https://www.npmjs.com/package/with-timeout)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
![](https://img.shields.io/badge/license-MIT-blue.svg)

## Install

```
$ npm install --save with-timeout
```

Not using Node or a module bundler? Use a UMD build via the `<script>` tag.
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
