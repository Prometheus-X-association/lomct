import {expect, test} from "./fixtures";
import {EXPECTED_API_URL, goToExtensionPopup, setupApiMock, setupStorage} from "./utils/setup";
import {mockApi} from "./utils/api";
import {v4 as uuidv4} from "uuid";

const SELECTORS = {
    searchInput: 'input[name="statementId"]',
    submitButton: 'button[type="submit"]',
    reviewsCard: ".information-card-subtracted + div",
};

const TEST_LOCATIONS = {
    username: "username",
    biography: "biography",
    review: "review"
};

const setupMaliciousApiMock = async (page, field, value) => {
    const statement = {
        context: {
            extensions: {
                "http://schema.prometheus-x.org/extension/username": (field === TEST_LOCATIONS.username ? value : "default-username"),
                "http://schema.prometheus-x.org/extension/biography": (field === TEST_LOCATIONS.biography ? value : "default-biography")
            },
            language: "en"
        },
        actor: {
            objectType: "Agent",
            mbox: `mailto:toto@example.com`
        },
        verb: {
            id: "http://id.tincanapi.com/verb/reviewed",
            display: {
                "en-US": "reviewed"
            }
        },
        result: {
            score: {
                raw: 5
            },
            response: (field === TEST_LOCATIONS.review ? value : "default-review")
        },
        stored: "2025-02-20T14:30:00.000Z",
        id: uuidv4(),
        timestamp: "2025-02-20T14:30:00.000Z",
    }

    const searchValue = "https://inokufu.com";
    const endpoint = `${EXPECTED_API_URL}?activity=${encodeURIComponent(searchValue)}`;
    const waitForRequest = await mockApi(page, endpoint, {
            more: "",
            statements: [statement]
        }
    );
    waitForRequest();

    // Submit form
    await page.locator(SELECTORS.searchInput).fill(searchValue);
    await page.click(SELECTORS.submitButton);

    await page.locator(SELECTORS.reviewsCard).waitFor();
}

test.describe("LOMCT Security Tests (OWASP)", () => {
    let alertShown;

    test.beforeEach(async ({context, page, extensionId}) => {
        await setupStorage(context);
        await goToExtensionPopup(page, extensionId);
        await setupApiMock(page);
        await page.waitForSelector(SELECTORS.searchInput);

        // Alert detection
        alertShown = false;
        page.on("dialog", async (dialog) => {
            alertShown = true;
            await dialog.dismiss();
        });
    });

    test.afterEach(async ({page}) => {
        // Check if alert detection works correctly
        alertShown = false;
        await page.evaluate(() => alert("Test alert"));
        await expect(alertShown).toBe(true);
    });

    test("should protect against XSS injections", async ({page}) => {
        const maliciousPayloads = [
            "<script>alert('XSS')</script>",
            "javascript:alert('XSS')",
            "<img src='x' onerror='alert(\"XSS\")' />",
        ];

        for (const payload of maliciousPayloads) {
            for (const location of Object.values(TEST_LOCATIONS)) {
                alertShown = false;
                await setupMaliciousApiMock(page, location, payload);
                await expect(alertShown).toBeFalsy();
            }
        }
    });

    test("should protect against CSS injections", async ({page}) => {
        const maliciousPayloads = [
            "<style>body {background-image: url('javascript:alert(\"CSS\")');}</style>",
            "<div style=\"background-image: url('javascript:alert(\"CSS\")');\">Test</div>",
        ];

        for (const payload of maliciousPayloads) {
            for (const location of Object.values(TEST_LOCATIONS)) {
                alertShown = false;
                await setupMaliciousApiMock(page, location, payload);
                await expect(alertShown).toBeFalsy();
            }
        }
    });
});