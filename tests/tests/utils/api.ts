import {expect} from "../fixtures";
import {DEFAULT_USER_DATA, EXPECTED_API_HEADERS} from "./setup";
import {Page, Request} from "playwright-core";

export async function mockApi(page: Page, endpoint: string, body) {
    await page.route(endpoint, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(body),
        });
    });
    return () => page.waitForRequest((request: Request) => request.url().includes(endpoint));
}

export async function checkHeaders(request: Request, authToken: string = DEFAULT_USER_DATA.primarySourceBasicAuth) {
    // Check headers
    const headers = request.headers();
    expect(headers["authorization"]).toBe(`Basic ${authToken}`);
    Object.entries(EXPECTED_API_HEADERS).forEach(([key, value]) => {
        expect(headers[key]).toBe(value);
    });
}