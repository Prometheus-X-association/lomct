import {type BrowserContext, chromium, test as base} from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

/**
 * This file handles :
 * - Browser context setup
 * - Getting the extension path from an environment variable
 * - Loading the extension
 * - Retrieving the extension ID
 */
export const test = base.extend<{
    context: BrowserContext;
    extensionId: string;
}>({
    context: async ({}, use) => {
        const pathToExtension = process.env.EXTENSION_PATH;
        if (!pathToExtension) {
            throw new Error("EXTENSION_PATH must be set in .env file");
        }

        const context = await chromium.launchPersistentContext("", {
            channel: "chromium",
            args: [
                `--disable-extensions-except=${pathToExtension}`,
                `--load-extension=${pathToExtension}`,
            ],
            slowMo: 500,
        });

        try {
            await use(context);
        } finally {
            await context.close();
        }
    },
    extensionId: async ({context}, use) => {
        let [background] = context.serviceWorkers();
        if (!background) {
            background = await context.waitForEvent("serviceworker");
        }

        const extensionId = background.url().split("/")[2];
        await use(extensionId);
    },
});

export const expect = test.expect;