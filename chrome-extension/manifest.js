import fs from 'node:fs';

const packageJson = JSON.parse(fs.readFileSync('../package.json', 'utf8'));

// const isFirefox = process.env.__FIREFOX__ === 'true';

// const sidePanelConfig = {
//   side_panel: {
//     default_path: 'side-panel/index.html',
//   },
//   permissions: !isFirefox ? ['sidePanel'] : [],
// };

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = Object.assign(
  {
    manifest_version: 3,
    default_locale: 'en',
    /**
     * if you want to support multiple languages, you can use the following reference
     * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
     */
    name: 'LOMCT',
    version: packageJson.version,
    description:
      'Learning Object Metadata Crowd Tagging (LOMCT) is a browser extension that allows individuals to collaboratively tag and review digital learning resources like videos, courses, and documents. This enhances their discoverability by adding keywords, descriptions, and reviews. It enables multiple users to submit review and metadata edit proposals in xAPI format, which are then stored in the LRS. This service is particularly useful for organizations seeking to collect and manage feedback from teachers and course designers',
    // permissions: ['storage'].concat(sidePanelConfig.permissions),
    // cccccccccccccc
    permissions: ['storage', 'clipboardRead', 'tabs'],
    options_page: 'options/index.html',
    background: {
      service_worker: 'background.iife.js',
      type: 'module',
    },
    action: {
      default_popup: 'popup/index.html',
      default_icon: 'favicon_34x34.png',
    },
    // chrome_url_overrides: {
    //   newtab: 'new-tab/index.html',
    // },
    icons: {
      128: 'favicon_128x128.png',
    },
    content_scripts: [
      {
        matches: ['http://*/*', 'https://*/*', '<all_urls>'],
        js: ['content/index.iife.js'],
      },
    ],
    web_accessible_resources: [
      {
        resources: ['*.js', '*.css', '*.svg', 'favicon_128x128.png', 'favicon_34x34.png'],
        matches: ['*://*/*'],
      },
    ],
  },
  // !isFirefox && { side_panel: { ...sidePanelConfig.side_panel } },
);

export default manifest;
