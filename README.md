# Learning Object Metadata Crowd Tagging BB 

Learning Object Metadata Crowd Tagging is a system for tagging and reviewing learning objects such as videos, courses, and documents using a crowd of individuals. The goal is to make these learning objects more discoverable and searchable by adding relevant keywords, descriptions, reviews and other useful metadata. This process is carried out via the combination of a browser (Chrome) extension and a Learning Record Store (LRS) that allows multiple users to submit review and metadata edit proposals of learning objects. All the reviews and metadata edit proposals are sent in xAPI format and stored in an LRS to ensure data interoperability.

## Design Document
See the design document [here](docs/design-document.md).

## LOMCT extension Installation Guide

### Prerequisites

Before installing the LOMCT extension, ensure you have:

- Chrome browser
- A Learning Record Store (LRS) endpoint URL
- A basic auth url for your LRS

#### Don't have an LRS ?
If you don't have an LRS, you can deploy Docker [LRSC](https://github.com/inokufu/lrsc), which deploys an LRS (Leaning Locker), a PDC and a connector between the two. 

### Running instructions

1. Download the latest release
2. Get into developer mode with Chrome extension management
3. Click on 'Load Unpacked'
4. Select the `release` folder
5. You can pin the extension (or not)

### Configuration
1. Open the extension and fill in the required fields:
    - username
    - e-mail address
    - biography (this can be your job or profession)
    - endpoint of your LRS
    - basic auth of you LRS
2. Add a secondary source managed by Inokufu (content shared in Prometheus-X and moderated)
    - Navigate to `options` of the extension
    - Activate the secondary source
    - Configure the secondary source 

## Usage
As the LOMCT extension is not an API, there is no endpoint for use.
Once installed and configured, the LOMCT extension works in total autonomy.
An individual can consult the reviews and metadata of any resource.
```mermaid

sequenceDiagram
   actor Individual as Individual
   Individual->>LOMCT: Open LOMCT extension
   LOMCT->>LOMCT: Detects the url where the user is located
   LOMCT->>LRS_organization: Request LO metadata
   LOMCT->>LRS_orchestrator: Request LO metadata
   LRS_organization->>LOMCT: Send LO metadata
   LRS_orchestrator->>LOMCT: Send LO metadata
   LOMCT->>LOMCT: Data organization of the 2 LRS
   LOMCT->>Individual: Display the extension with metadata
```

An individual can add a review or an metadata edit proposal to any resource.
```mermaid

sequenceDiagram
   actor Individual as Individual
   Individual->>LOMCT: Open the LOMCT extension and click on the edit button OR on the add review button
   LOMCT->>Individual: Display edit form OR add review form
   Individual->>LOMCT: Fill in and return editing form OR review form
   LOMCT->>LOMCT: Convert edition form OR review form into xAPI
   LOMCT->>LRS_organization: Send trace
   LOMCT->>LRS_orchestrator: Send trace
```

## Testing

The current [test suite](tests/tests) provides good coverage of the extension's core functionality.
All API interactions are verified to use the correct authentication tokens and xAPI statement structure.
The UI components and form validation are thoroughly tested across all screens.

### Setup test environment

This project uses Playwright for end-to-end testing.

1. Go to the `tests` directory and install dependencies:

```bash
cd tests;
npm install;
npx playwright install;
```

Playwright and its browsers are installed as part of the dependencies.

2. Copy the example environment file and configure your extension path:

```bash
cp .env.example .env
```

3. Then edit the .env file to set EXTENSION_PATH to the absolute path of your Chrome extension directory
   (the directory containing the manifest.json file, for example `release` for the pre-built version, or `dist` if
   you've built it yourself).

   Example:

```
EXTENSION_PATH=/Users/username/projects/lomct-extension/release
```

### Run tests

Run all tests with:

```bash
npx playwright test
```

This will show the test results directly in your terminal.

### Test Summary

The test suite verifies the following functionality:

#### Configuration Form

- Form validation for required fields
- Input validation (email format, URL format, token length)
- Successful API integration with LRS

#### Dual Blocs Screen

- Search form validation
- Information and reviews display
- Data parsing and formatting

#### Suggest Edits Form

- Field validation
- Form submission
- Integration with LRS API

#### Add Review Form

- Star rating functionality
- Comment validation
- Form submission
- Integration with LRS API

#### Security Tests

Ensure that the extension correctly sanitises data from the LRS API before displaying it.

- Protection against XSS (Cross-Site Scripting) attacks (script tag injection, javascript: protocol exploitation, HTML
  attributes with event handlers)
- Protection against CSS injections (style-based JavaScript execution, malicious background-image URLs with JavaScript)

## Building

A pre-built version of the extension is available in the `release` directory. You can use this version directly without
building the project yourself.

### Building from source

The extension uses Turbo for build orchestration.
All packages are managed through pnpm workspaces.
If you want to build the extension yourself, follow these instructions.

#### Prerequisites

- Node.js (recommended version in .nvmrc)
- pnpm (package manager)

#### Installation

1. Install pnpm if not already installed:

   ```bash
   npm install -g pnpm
   ```
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up Husky hooks:
   ```bash
   pnpm run prepare
   ```

#### Development Build

To build the extension for development:

   ```bash
   pnpm build
   ```

This will build all packages, including content and background script, popup interface, options page, shared utilities,
etc.
The built extension will be available in the `dist` directory in the root of the project.
