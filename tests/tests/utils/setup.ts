export const DEFAULT_USER_DATA = {
    isLogged: true,
    primarySourceLink: "https://example.com",
    primarySourceBasicAuth: "Lorem ipsum",
};
export const EXPECTED_API_ENDPOINT = "/statements";
export const EXPECTED_API_URL = DEFAULT_USER_DATA.primarySourceLink + EXPECTED_API_ENDPOINT;
export const EXPECTED_API_HEADERS = {
    "x-experience-api-version": "1.0.3",
    "content-type": "application/json",
};

const STORAGE_KEY = "user-storage-key";

// Put fake data to extension storage in order to avoid the first configuration screen
export async function setupStorage(context: any, key = STORAGE_KEY, userData = DEFAULT_USER_DATA) {
    // Get service worker
    let [background] = context.serviceWorkers();
    if (!background) {
        background = await context.waitForEvent("serviceworker");
    }

    await background.evaluate(([key, data]) => {
        return new Promise((resolve) => {
            chrome.storage.local.set({[key]: data}, resolve);
        });
    }, [key, userData]);
}

// Mock the /statements API call in order to go to the screens after the first one
export async function setupApiMock(page: any) {
    await page.route(`**${EXPECTED_API_ENDPOINT}**`, async (route: any) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                statements: [],
            }),
        });
    });
}

export async function goToExtensionPopup(page: any, extensionId: string) {
    await page.goto(`chrome-extension://${extensionId}/popup/index.html`);
    await page.waitForLoadState("load");
}
