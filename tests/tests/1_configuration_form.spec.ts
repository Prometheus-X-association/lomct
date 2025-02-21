import {expect, test} from "./fixtures";
import {EXPECTED_API_ENDPOINT, goToExtensionPopup} from "./utils/setup";
import {FormTestConfig, FormTester} from "./utils/form_validation";
import {checkHeaders, mockApi} from "./utils/api";

// Describe form fields, selectors, etc.
const SELECTORS = {
    acceptCheckbox: 'input[type="checkbox"]',
    acceptButton: 'button[role="checkbox"]',
};

const formConfig: FormTestConfig = {
    inputs: [
        {
            name: "name",
            required: true,
        },
        {
            name: "actorEmail",
            required: true,
            validation: {
                type: "email",
            },
        },
        {
            name: "primarySourceLink",
            required: true,
            validation: {
                type: "url",
            },
        },
        {
            name: "primarySourceBasicAuth",
            required: true,
            validation: {
                // A token has 108 characters
                minLength: 108,
                maxLength: 108,
            },
        },
        {
            name: "biography",
        },
    ],

    submitSelector: 'button[type="submit"]',
} as const;

test.describe("LOMCT Extension Configuration Form", () => {
    /** @type {FormTester} Form testing utility instance */
    let formTester: FormTester;

    test.beforeEach(async ({page, extensionId}) => {
        await goToExtensionPopup(page, extensionId);

        formTester = new FormTester(page.locator("form"), formConfig);
    });

    test("should display the welcome header correctly", async ({page}) => {
        await expect(page.locator("h1")).toBeVisible();
    });

    test("should display form structure correctly", async ({page}) => {
        // Check fields existence and attributes
        await formTester.testFieldVisibility();

        // Check checkbox
        const checkbox = page.locator(SELECTORS.acceptCheckbox);
        await expect(checkbox).toBeVisible();
        await expect(checkbox).toBeChecked();
    });

    test("should have info buttons", async ({page}) => {
        const infoButtons = page.locator("button.icon-button");
        await expect(infoButtons).toHaveCount(7);

        // Verify help buttons for specific fields
        await expect(
            page.locator('[name="primarySourceLink"] ~ button')
        ).toHaveCount(2);
        await expect(
            page.locator('[name="primarySourceBasicAuth"] ~ button')
        ).toHaveCount(2);
    });

    test("should show validation errors on empty form submission", async () => {
        // Check required fields are marked as invalid / optional fields are not marked as invalid
        await formTester.testRequiredFields();
    });

    test("should validate fields and show error states", async ({page}) => {
        // Fill fields with invalid values and check if there is errors
        await formTester.testInvalidValues();

        // Uncheck checkbox (there is a button linked to the checkbox, IDK why)
        const acceptButton = page.locator(SELECTORS.acceptButton);
        await acceptButton.click();

        await formTester.submitForm();

        await expect(acceptButton).toHaveAttribute("aria-invalid", "true");
    });

    test("should validate form submission without errors", async () => {
        // Fill fields with valid values and check if there is no error
        await formTester.testValidValues();
    });

    test("should handle successful API response", async ({page}) => {
        // First fill fields
        await formTester.fillFormWithValidData();

        // Calculate expected API endpoint
        const sourceLink = await page.locator('[name="primarySourceLink"]').inputValue();
        const authToken = await page.locator('[name="primarySourceBasicAuth"]').inputValue();
        const endpoint = `${sourceLink}${EXPECTED_API_ENDPOINT}?limit=1`;

        // Intercept API call
        const waitForRequest = await mockApi(page, endpoint, {
            statements: [],
        });
        const apiRequestPromise = waitForRequest();

        await formTester.submitForm();

        // Check API request
        const request = await apiRequestPromise;
        expect(request.method()).toBe("GET");

        // Check headers
        await checkHeaders(request, authToken);
    });
});
