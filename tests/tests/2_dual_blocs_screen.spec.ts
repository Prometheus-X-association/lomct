import {expect, test} from "./fixtures";
import {EXPECTED_API_URL, goToExtensionPopup, setupApiMock, setupStorage} from "./utils/setup";
import {v4 as uuidv4} from "uuid";
import {checkHeaders, mockApi} from "./utils/api";

// List of selectors on this screen
const SELECTORS = {
    searchInput: 'input[name="statementId"]',
    submitButton: 'button[type="submit"]',
    informationCard: ".information-card-subtracted",
    informationTable: 'div[style*="display: table"]',
    reviewsTable: 'div[style*="display: table"]',
    reviewsCard: ".information-card-subtracted + div", // No specific class :(
};

/**
 * Converts ISO date string to localized display format
 * @param {string} isoDate - Date in ISO format
 * @returns {string} Formatted date string
 */
const formatDate = (isoDate: string): string => {
    return new Date(isoDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
};

/**
 * Interface representing a review entry
 */
interface Review {
    author: string;
    note: number;
    message: string;
    date: string;
}

/**
 * Interface representing an edit form fields
 */
interface LearningFields {
    Title: string;
    Keywords: string[];
    Provider: string;
    Author: string;
    Publisher: string;
    Description: string;
    Bloom: string;
    Level: string;
    Language: string;
    Type: string;
    Duration: string;
}

test.describe("LOMCT Dual blocs screen", () => {
    test.beforeEach(async ({context, page, extensionId}) => {
        // Before testing this screen, we need to put data in the extension storage and mock the API
        await setupStorage(context);
        await goToExtensionPopup(page, extensionId);
        await setupApiMock(page);
        await page.waitForSelector(SELECTORS.searchInput);
    });

    test("should display search form", async ({page}) => {
        await expect(page.locator(SELECTORS.searchInput)).toBeVisible();
        await expect(page.locator(SELECTORS.submitButton)).toBeVisible();
    });

    test("should validate search input", async ({page}) => {
        const searchInput = page.locator(SELECTORS.searchInput);
        const submitButton = page.locator(SELECTORS.submitButton);

        // Check initial state
        await expect(searchInput).toHaveAttribute("aria-invalid", "false");

        // Check invalid state
        await searchInput.fill("not a valid url");
        await submitButton.click();
        await expect(searchInput).toHaveAttribute("aria-invalid", "true");

        // Check valid state
        await searchInput.fill("https://example.com");
        await submitButton.click();
        await expect(searchInput).toHaveAttribute("aria-invalid", "false");
    });

    test("should display information card", async ({page}) => {
        // First card
        const infoSection = page.locator(SELECTORS.informationCard);
        await expect(infoSection).toBeVisible();
        await expect(infoSection.locator("h3")).toBeVisible(); // Title
        await expect(infoSection.locator("button")).toBeVisible(); // Edit button
        await expect(infoSection.locator("img")).toBeVisible(); // Image
    });

    test("should display reviews section", async ({page}) => {
        // Second card
        const reviewsSection = page.locator(SELECTORS.reviewsCard);
        await expect(reviewsSection).toBeVisible();
        await expect(reviewsSection.locator("h3")).toBeVisible(); // Title
        await expect(reviewsSection.locator("button")).toBeVisible(); // Add review button
        await expect(reviewsSection.locator("img")).toBeVisible(); // Image
        await expect(reviewsSection.locator(".bg-yellow03")).toBeVisible(); // Rating container
    });

    test("should display edit section with data", async ({page}) => {
        const searchValue = "https://inokufu.com";
        const endpoint = `${EXPECTED_API_URL}?activity=${encodeURIComponent(searchValue)}`;

        const author = "pierrocknroll";
        const storedDate = "2012-11-17T22:05:12.411Z";
        const fields: LearningFields = {
            Title: "Lorem ipsum",
            Keywords: ["dolor sit amet", "consectetur"],
            Provider: "adipiscing elit",
            Author: "Phasellus tincidunt",
            Publisher: "sem nec viverra",
            Description: "augue felis vulputate",
            Bloom: "Apply",
            Level: "confirmed",
            Language: "Greek",
            Type: "Distance-learning",
            Duration: "", // Test empty
        };


        // Mock API response
        const waitForRequest = await mockApi(page, endpoint, {
                more: "",
                statements: [
                    {
                        context: {
                            extensions: {
                                "http://schema.prometheus-x.org/extension/username": author,
                                "http://schema.prometheus-x.org/extension/biography": "",
                                "http://schema.prometheus-x.org/extension/bloom": fields.Bloom,
                                "http://schema.prometheus-x.org/extension/provider": fields.Provider,
                                "http://schema.prometheus-x.org/extension/license": "",
                                "http://schema.prometheus-x.org/extension/keywords": fields.Keywords,
                                "http://schema.prometheus-x.org/extension/publisher": fields.Publisher,
                                "http://schema.prometheus-x.org/extension/author": fields.Author,
                                "http://schema.prometheus-x.org/extension/duration": fields.Duration,
                                "http://schema.prometheus-x.org/extension/type": fields.Type,
                                "http://schema.prometheus-x.org/extension/level": fields.Level,
                            },
                            language: "el"
                        },
                        actor: {
                            objectType: "Agent",
                            name: author,
                            mbox: "mailto:toto@example.com"
                        },
                        verb: {
                            id: "https://w3id.org/xapi/dod-isd/verbs/proposed",
                            display: {
                                "en-US": "proposed"
                            }
                        },
                        object: {
                            id: searchValue,
                            definition: {
                                name: {
                                    en: fields.Title,
                                },
                                description: {
                                    en: fields.Description,
                                }
                            },
                            objectType: "Activity"
                        },
                        id: "6dda4efb-42c6-4c32-843e-0ebd75a31d7c",
                        stored: storedDate,
                        authority: {
                            objectType: "Agent",
                            name: "Mockup LOMCT all",
                            mbox: "mailto:contact@inokufu.com"
                        },
                        version: "1.0.0"
                    }
                ]
            }
        );
        const apiRequestPromise = waitForRequest();

        // Submit form
        await page.locator(SELECTORS.searchInput).fill(searchValue);
        await page.click(SELECTORS.submitButton);

        // Check API request
        const request = await apiRequestPromise;
        const url = new URL(request.url());
        await expect(request.method()).toBe("GET");
        await expect(url.searchParams.get("activity")).toBe(searchValue);

        await checkHeaders(request);

        // Check if API response data is present
        const table = page.locator(SELECTORS.informationTable);
        await table.waitFor();
        await table.getByRole("heading", {name: author}).isVisible(); // Author
        await expect(table.getByText(formatDate(storedDate))).toHaveCount(2);

        for (const [fieldName, value] of Object.entries(fields)) {
            const fieldContainer = table.locator("li", {hasText: fieldName});
            await expect(fieldContainer).toBeVisible();
            if (Array.isArray(value)) {
                const valueContainer = fieldContainer.locator("div").nth(1);
                for (const tag of value) {
                    await expect(valueContainer.locator("span", {hasText: tag})).toBeVisible();
                }
            } else {
                await expect(fieldContainer).toContainText(value);
            }
        }
    });

    test("should display review section with data", async ({page}) => {
        const searchValue = "https://inokufu.com";
        const endpoint = `${EXPECTED_API_URL}?activity=${encodeURIComponent(searchValue)}`;

        const reviews: Review[] = [
            {
                author: "pierrocknroll",
                note: 5,
                message: "Super",
                date: "2025-02-20T14:30:00.000Z",
            },
            {
                author: "jacky",
                note: 3,
                message: "Pas mal",
                date: "2025-02-18T10:15:00.000Z",
            },
            {
                author: "toto",
                note: 2,
                message: "Bof",
                date: "2025-02-15T08:45:00.000Z",
            }
        ];

        // Mock API response
        const waitForRequest = await mockApi(page, endpoint, {
                more: "",
                statements: reviews.map(review => ({
                    context: {
                        extensions: {
                            "http://schema.prometheus-x.org/extension/username": review.author,
                            "http://schema.prometheus-x.org/extension/biography": ""
                        },
                        language: "en"
                    },
                    actor: {
                        objectType: "Agent",
                        name: review.author,
                        mbox: `mailto:${review.author}@example.com`
                    },
                    object: {
                        id: "your-search-value-here",
                        objectType: "Activity"
                    },
                    verb: {
                        id: "http://id.tincanapi.com/verb/reviewed",
                        display: {
                            "en-US": "reviewed"
                        }
                    },
                    result: {
                        score: {
                            raw: review.note
                        },
                        response: review.message
                    },
                    stored: review.date,
                    id: uuidv4(),
                    timestamp: review.date,
                    authority: {
                        objectType: "Agent",
                        name: "Mockup LOMCT all",
                        mbox: "mailto:contact@inokufu.com"
                    },
                    version: "1.0.0"
                })),
            }
        );
        const apiRequestPromise = waitForRequest();

        // Submit form
        await page.locator(SELECTORS.searchInput).fill(searchValue);
        await page.click(SELECTORS.submitButton);

        // Check API request
        const request = await apiRequestPromise;
        const url = new URL(request.url());
        await expect(request.method()).toBe("GET");
        await expect(url.searchParams.get("activity")).toBe(searchValue);

        await checkHeaders(request);

        // Check if API response data is present
        const reviewsCard = page.locator(SELECTORS.reviewsCard);
        await expect(reviewsCard).toBeVisible();
        const reviewsTable = reviewsCard.locator(SELECTORS.reviewsTable);
        await reviewsTable.waitFor();

        // Average bloc
        const average = reviews.reduce((acc, review) => acc + review.note, 0) / reviews.length;
        await expect(reviewsCard.getByText(average.toFixed(2))).toBeVisible();
        await expect(reviewsCard.getByText(`(${reviews.length})`)).toBeVisible();

        // Reviews
        for (const review of reviews) {
            await expect(reviewsTable.getByRole("heading", {name: review.author})).toBeVisible();
            await expect(reviewsTable.locator(`p:has-text("${review.message}")`)).toBeVisible();
            await expect(reviewsTable.getByText(formatDate(review.date))).toBeVisible();
        }
    });
});