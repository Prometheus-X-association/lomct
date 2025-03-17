import {expect, test} from "./fixtures";
import {EXPECTED_API_URL, goToExtensionPopup, setupApiMock, setupStorage} from "./utils/setup";
import {FormTestConfig, FormTester} from "./utils/form_validation"
import {v4 as uuidv4} from "uuid";
import {checkHeaders, mockApi} from "./utils/api";

const SELECTORS = {
    previousInput: 'input[name="statementId"]',
    ratingContainer: ".react-simple-star-rating",
    emptyStars: ".empty-icons",
    filledStars: ".filled-icons",
};

const ADD_REVIEW_TEXT = "Add review";
const BACK_TEXT = "Back";

const formConfig: FormTestConfig = {
    inputs: [
        {
            name: "comment",
            required: true,
        },
    ],

    submitSelector: 'button[type="submit"]',
} as const;

test.describe("LOMCT Add review form", () => {
    let formTester: FormTester;

    test.beforeEach(async ({context, page, extensionId}) => {
        await setupStorage(context);
        await setupApiMock(page);
        await goToExtensionPopup(page, extensionId);

        // Click on the "Add review" button to go to the form
        const addReviewButton = page.getByRole("button", {name: ADD_REVIEW_TEXT});
        await addReviewButton.waitFor();
        await addReviewButton.click();

        formTester = new FormTester(page.locator("form"), formConfig);
    });

    test("should the Back button works correctly", async ({page}) => {
        const backButton = page.getByRole("button", {name: BACK_TEXT});
        await expect(backButton).toBeVisible();
        await backButton.click();

        // Check if we are back to the previous screen
        await expect(page.locator(SELECTORS.previousInput)).toBeVisible();
    });

    test("should display review form fields", async ({page}) => {
        await expect(page.getByRole("heading", {name: ADD_REVIEW_TEXT})).toBeVisible();

        // Check fields existence and attributes
        await formTester.testFieldVisibility();

        // Check stars
        const ratingContainer = page.locator(SELECTORS.ratingContainer);
        await expect(ratingContainer).toBeVisible();
        await expect(page.locator(`${SELECTORS.emptyStars} svg`)).toHaveCount(5);
        await expect(page.locator(`${SELECTORS.filledStars} svg`)).toHaveCount(5);

        // Disabled submit button
        const submitButton = page.locator(formConfig.submitSelector);
        await expect(submitButton).toBeDisabled();

        await formTester.fillFormWithValidData();
        await expect(submitButton).toBeEnabled();
    });

    // Since the submit button is disabled when required fields are empty, this test is useless :
    // test("should validate required fields", async () => {
    //     // Check required fields are marked as invalid / optional fields are not marked as invalid
    //     await formTester.testRequiredFields();
    // });

    // Since there is no field with validation, this test is useless :
    // test("should handle invalid values correctly", async () => {
    //     // Fill fields with invalid values and check if there is errors
    //     await formTester.testInvalidValues();
    // });

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