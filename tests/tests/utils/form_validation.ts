import {expect} from "../fixtures";
import {Locator} from "playwright-core";

type ValidationType = "url" | "number" | "email";

type ValidationRule = {
    type?: ValidationType;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
};

type FormField = {
    name: string;
    required?: boolean;
    validation?: ValidationRule;
};

export type FormTestConfig = {
    inputs: FormField[];
    submitSelector: string;
};

export class FormTester {
    constructor(
        private form: Locator,
        private config: FormTestConfig
    ) {
    }

    /**
     * @returns Form required fields
     */
    get requiredFields() {
        return this.config.inputs.filter((field) => field.required);
    }

    /**
     * @returns Form fields with validation process
     */
    get fieldsWithValidation() {
        return this.config.inputs.filter((field) => field.validation);
    }

    private getValidValue(field: FormField): string | undefined {
        let value = undefined;

        if (field.required) {
            value = `Test ${field.name}`;
        }

        if (!field.validation) {
            return value;
        }

        switch (field.validation.type) {
            case "url":
                return "https://example.com";
            case "number":
                if (field.validation.min) {
                    return String(field.validation.min);
                }
                if (field.validation.max) {
                    return String(field.validation.max);
                }
                break;
            case "email":
                return "test@example.com";
        }

        if (field.validation.minLength) {
            return "a".repeat(field.validation.minLength);
        } else if (field.validation.maxLength) {
            return "a".repeat(field.validation.maxLength);
        }

        return value;
    }

    private getInvalidValues(field: FormField): string[] {
        if (!field.validation) {
            return [];
        }

        const values: string[] = [];
        switch (field.validation.type) {
            case "url":
                values.push("not-a-url");
                break;
            case "number":
                if (field.validation.min) {
                    values.push(String(field.validation.min - 1));
                }
                if (field.validation.max) {
                    values.push(String(field.validation.max + 1));
                }
                break;
            case "email":
                values.push("invalid-email");
                break;
        }

        if (field.validation.minLength) {
            values.push("a".repeat(field.validation.minLength - 1));
        }
        if (field.validation.maxLength) {
            values.push("a".repeat(field.validation.maxLength + 1));
        }

        return values;
    }

    async testFieldVisibility() {
        await expect(this.form).toBeVisible();

        // Check text fields existence and attributes
        for (const fieldConfig of this.config.inputs) {
            const field = this.form.locator(`[name="${fieldConfig.name}"]`);
            await expect(field).toBeVisible();
            await expect(field).toHaveValue("");
            if (fieldConfig.required) {
                await expect(field).toHaveAttribute("required", "");
            }
        }

        // Submit button
        await expect(this.form.locator(this.config.submitSelector)).toBeVisible();
    }

    async testInvalidValues() {
        if (this.fieldsWithValidation.length === 0) {
            return;
        }

        // First fill all required fields with valid values
        for (const requiredField of this.requiredFields) {
            await this.form.locator(`[name="${requiredField.name}"]`).fill(this.getValidValue(requiredField));
        }

        for (const field of this.config.inputs) {
            const inputField = this.form.locator(`[name="${field.name}"]`);
            const invalidValues = this.getInvalidValues(field);

            for (const invalidValue of invalidValues) {
                // Fill field with an invalid value
                await inputField.fill(invalidValue);

                // Submit form
                await this.submitForm();

                // Check invalid field are marked as invalid
                if (field.validation?.type === "number") {
                    await expect(inputField).toHaveJSProperty("validity.valid", false);
                } else {
                    await expect(inputField).toHaveAttribute("aria-invalid", "true");
                }

                await inputField.fill(this.getValidValue(field));
            }
        }
    }

    async testValidValues() {
        // Fill valid values
        await this.fillFormWithValidData();

        // Submit form
        await this.submitForm();

        // Check fields validity
        for (const field of this.config.inputs) {
            const inputField = this.form.locator(`[name="${field.name}"]`);
            await expect(inputField).toHaveJSProperty("validity.valid", true);
            await expect(inputField).toHaveAttribute("aria-invalid", "false");
        }
    }

    async testRequiredFields() {
        if (this.requiredFields.length === 0) {
            return;
        }

        // First submit empty form
        await this.submitForm();

        // Check required field are marked as invalid
        for (const field of this.config.inputs) {
            const inputField = this.form.locator(`[name="${field.name}"]`);
            if (field.required) {
                await expect(inputField).toHaveJSProperty("validity.valid", false);
            } else {
                await expect(inputField).not.toHaveJSProperty("validity.valid", false);
                await expect(inputField).not.toHaveAttribute("aria-invalid", "true");
            }
        }
    }

    async fillFormWithValidData() {
        // Fill fields with valid values
        for (const field of this.config.inputs) {
            const validValue = this.getValidValue(field);
            if (validValue) {
                await this.form.locator(`[name="${field.name}"]`).fill(validValue);
            }
        }
    }

    async submitForm() {
        await this.form.locator(this.config.submitSelector).click();
    }

}