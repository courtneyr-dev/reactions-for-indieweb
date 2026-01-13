# WordPress Playground Blueprints

This directory contains WordPress Playground blueprints for testing and demonstrating Post Kinds for IndieWeb.

## Quick Start

Try the plugin instantly in your browser:

[![Open in WordPress Playground](https://img.shields.io/badge/Open%20in-WordPress%20Playground-blue?logo=wordpress)](https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/courtneyr-dev/post-kinds-for-indieweb/main/blueprints/blueprint.json)

## Available Blueprints

### `blueprint.json` - Default Demo

The main demo blueprint that:
- Installs WordPress 6.7 with PHP 8.2
- Installs Post Kinds for IndieWeb from the main branch
- Installs IndieBlocks for complementary functionality
- Pre-configures permalink structure
- Registers all kind taxonomy terms
- Opens directly to the new post screen

**Use this for:**
- Quick demos
- Testing new features
- Bug reproduction
- Screenshot generation

## Using Blueprints

### Via URL

```
https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/courtneyr-dev/post-kinds-for-indieweb/main/blueprints/blueprint.json
```

### Via Embed

```html
<iframe
  src="https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/courtneyr-dev/post-kinds-for-indieweb/main/blueprints/blueprint.json"
  style="width: 100%; height: 600px; border: 1px solid #ccc;"
></iframe>
```

### Programmatically

```javascript
import { startPlaygroundWeb } from '@wp-playground/client';

const client = await startPlaygroundWeb({
  iframe: document.getElementById('wp'),
  remoteUrl: 'https://playground.wordpress.net/remote.html',
  blueprint: {
    // ... blueprint contents
  }
});
```

## Creating Custom Blueprints

See the [WordPress Playground Blueprint documentation](https://wordpress.github.io/wordpress-playground/blueprints-api/index) for full reference.

### Blueprint Schema

```json
{
  "$schema": "https://playground.wordpress.net/blueprint-schema.json",
  "landingPage": "/wp-admin/",
  "preferredVersions": {
    "php": "8.2",
    "wp": "6.7"
  },
  "steps": [
    // ... installation and configuration steps
  ]
}
```

## Automated Screenshots

For documentation, you can automate screenshot generation using Playwright with Playground:

```javascript
const { chromium } = require('@playwright/test');

async function captureScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://playground.wordpress.net/?blueprint-url=...');
  await page.waitForSelector('.wp-block-editor');
  await page.screenshot({ path: 'screenshots/editor.png' });

  await browser.close();
}
```

## Contributing

When adding new blueprints:

1. Test the blueprint works in WordPress Playground
2. Document what the blueprint does
3. Update this README with the new blueprint
4. Consider adding automated tests
