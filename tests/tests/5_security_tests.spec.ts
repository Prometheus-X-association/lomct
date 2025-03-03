import {expect, test} from "./fixtures";
import {EXPECTED_API_URL, goToExtensionPopup, setupApiMock, setupStorage} from "./utils/setup";
import {mockApi} from "./utils/api";
import {v4 as uuidv4} from "uuid";

const SELECTORS = {
    searchInput: 'input[name="statementId"]',
    submitButton: 'button[type="submit"]',
    reviewsCard: ".information-card-subtracted + div",
};

test.describe("LOMCT Security Tests (OWASP)", () => {
    test.beforeEach(async ({context, page, extensionId}) => {
        await setupStorage(context);
        await goToExtensionPopup(page, extensionId);
        await setupApiMock(page);
        await page.waitForSelector(SELECTORS.searchInput);
    });

    test("should sanitize malicious content", async ({page}) => {
        const maliciousPayloads = [
            "<script>alert('XSS')</script>",
            "javascript:alert('XSS')",
            "<img src='x' onerror='alert(\"XSS\")' />",
            "<style>body {background-image: url('javascript:alert(\"CSS\")');}</style> OK",
        ];

        let alertShown = false;
        page.on('dialog', async (dialog) => {
            alertShown = true;
            await dialog.dismiss();
        });

        const searchValue = "https://inokufu.com";
        const endpoint = `${EXPECTED_API_URL}?activity=${encodeURIComponent(searchValue)}`;
        const waitForRequest = await mockApi(page, endpoint, {
                more: "",
                statements: [{
                    context: {
                        extensions: {
                            "http://schema.prometheus-x.org/extension/username": maliciousPayloads[0],
                            "http://schema.prometheus-x.org/extension/biography": maliciousPayloads[1]
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
                        response: maliciousPayloads[2] + maliciousPayloads[3]
                    },
                    stored: "2025-02-20T14:30:00.000Z",
                    id: uuidv4(),
                    timestamp: "2025-02-20T14:30:00.000Z",
                }]
            }
        );
        waitForRequest();

        // Submit form
        await page.locator(SELECTORS.searchInput).fill(searchValue);
        await page.click(SELECTORS.submitButton);

        // Check that content is correctly escaped
        await expect(alertShown).toBeFalsy();

        // Check if alertShown is correctly handled
        await page.evaluate(() => {
            alert("Test alert");
        });
        await expect(alertShown).toBe(true);
    });
});