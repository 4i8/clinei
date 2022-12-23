# Your First CLI Program

## **First steps**

### #1 ADD bin to package.json

```json
{
  "name": "cli-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "bin": {
    "cli-test": "index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "clinei": "^0.0.1"
  }
}
```

### #2 ADD !/usr/bin/env node to index.js on top

```js
#!/usr/bin/env node
//...
```

### #3 publish to npm

## Warn this is a publish **`public`** package

```bash
npm publish --access public
```

### #4 Install

```bash
npm install -g cli-test
```

### #5 Run with clinei

```bash
cli-test help
```

## Enjoy it! your Arth Friend
