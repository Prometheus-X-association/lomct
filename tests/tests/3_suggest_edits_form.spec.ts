import {expect, test} from "./fixtures";
import {EXPECTED_API_URL, goToExtensionPopup, setupApiMock, setupStorage} from "./utils/setup";
import {FormTestConfig, FormTester} from "./utils/form_validation"
import {v4 as uuidv4} from "uuid";
import {checkHeaders, mockApi} from "./utils/api";

const SELECTORS = {
    editButton: ".information-card-subtracted button",
    previousInput: 'input[name="statementId"]',
};

const BACK_TEXT = "Back";

const COMBOBOXES = [
    {
        text: "bloom"
    },
    {
        text: "level"
    },
    {
        text: "type"
    },
    {
        text: "english"
    },
];

const formConfig: FormTestConfig = {
    inputs: [
        {
            name: "title",
            validation: {
                maxLength: 300,
            },
        },
        {
            name: "license",
            validation: {
                type: "url",
            }
        },
        {
            name: "keywords",
        },
        {
            name: "hours",
            validation: {
                type: "number",
                min: 1,
            }
        },
        {
            name: "minutes",
            validation: {
                type: "number",
                min: 1,
                max: 59,
            }
        },
        {
            name: "seconds",
            validation: {
                type: "number",
                min: 1,
                max: 59,
            }
        },
        {
            name: "provider",
        },
        {
            name: "author",
        },
        {
            name: "publisher",
        },
        {
            name: "description",
        },
    ],

    submitSelector: 'button[type="submit"]',
} as const;

test.describe("LOMCT Suggest edits form", () => {
    let formTester: FormTester;

    test.beforeEach(async ({context, page, extensionId}) => {
        await setupStorage(context);
        await goToExtensionPopup(page, extensionId);
        await setupApiMock(page);

        // Click on the "Suggest edits" button to go to the form
        const editButton = await page.locator(SELECTORS.editButton);
        await editButton.waitFor();
        await editButton.click();

        formTester = new FormTester(page.locator("form"), formConfig);
    });

    test("should the Back button works correctly", async ({page}) => {
        const backButton = page.getByRole("button", {name: BACK_TEXT});
        await expect(backButton).toBeVisible();
        await backButton.click();

        // Check if we are back to the previous screen
        await expect(page.locator(SELECTORS.previousInput)).toBeVisible();
    });

    test("should display edit form fields", async ({page}) => {
        // Check fields existence and attributes
        await formTester.testFieldVisibility();

        // For selects
        for (const combobox of COMBOBOXES) {
            await expect(page.getByRole("combobox")
                .filter({hasText: combobox.text}))
                .toBeVisible();
        }
    });

    test("should validate required fields", async () => {
        // Check required fields are marked as invalid / optional fields are not marked as invalid
        await formTester.testRequiredFields();
    });

    test("should handle invalid values correctly", async () => {
        // Fill fields with invalid values and check if there is errors
        await formTester.testInvalidValues();
    });

    test("should accept valid field values", async ({page}) => {
        // Intercept API call to avoid next screen display
        await page.route(`${EXPECTED_API_URL}?`, async (route) => {
            await route.fulfill({
                status: 500,
            });
        });

        // Fill fields with valid values and check if there is no error
        await formTester.testValidValues();
    });

    test("should handle successful API response", async ({page}) => {
        const endpoint = `${EXPECTED_API_URL}?`;

        // Mock API
        const waitForRequest = await mockApi(page, endpoint, [uuidv4()]);
        const apiRequestPromise = waitForRequest();

        // Fill fields with valid values
        await formTester.fillFormWithValidData();
        await formTester.submitForm();

        // Check API request
        const request = await apiRequestPromise;
        await expect(request.method()).toBe("POST");

        // Check headers
        await checkHeaders(request);

        // Check confirmation screen
        await expect(page.locator("h1")).toBeVisible();
        await expect(page.locator("h3")).toBeVisible(); // "Success" title
        await expect(page.getByRole("button", {name: BACK_TEXT})).toBeVisible();

        // Check OK button
        const okButton = page.getByRole("button", {name: "Ok"});
        await expect(okButton).toBeVisible();
        await okButton.click();
        await expect(page.locator(SELECTORS.previousInput)).toBeVisible();
    });
});