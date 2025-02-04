# 0. General

## Test Case 1: Verify Logo Icon
**Objective:** Ensure the extension logo matches the specified icon and color.

**Precondition:** The extension is installed and enabled.

**Steps:**
- Open Google Chrome.
- Locate the extension icon in the toolbar.
- Verify the icon matches https://www.iconfinder.com/icons/8725689/comment_info_icon.
- Verify the icon color is #1F8AFF.

**Expected Result:** The extension logo icon and color match the specified design.

**Result:** Validated.

## Test Case 2: Verify Extension Display on Click
**Objective:** Ensure the extension is displayed when the logo is clicked. 

**Precondition:** The extension is installed and enabled.

**Steps:**
- Open Google Chrome.
- Click on the extension logo.

**Expected Result:** The extension popup is displayed as a 300 px square on top of the page.

**Result:** Validated.

## Test Case 3: Verify Extension Removal on Click
**Objective:** Ensure the extension is hidden when the logo is clicked again.

**Precondition:** The extension popup is displayed.

**Steps:**
- Click on the extension logo again.

**Expected Result:** The extension popup is hidden.

**Result:** Validated.

## Test Case 4: Verify Extension Removed by Clicking Outside 
**Objective:** Ensure the extension popup is removed when clicking outside of it.

**Precondition:** The extension popup is displayed.

**Steps:**
- Click outside the extension popup.

**Expected Result:** The extension popup disappears.

**Result:** Validated.


## Test Case 5: Verify Extension Size Consistency
**Objective:** Ensure the extension size remains the same on all pages.

**Precondition:** The extension is installed and enabled.

**Steps:**
- Open Google Chrome.
- Click on the extension logo to display the popup.
- Navigate through different pages within the extension popup.

**Expected Result:** The extension size remains a 300 px square on all pages.

**Result:** Validated.

## Test Case 6: Verify Extension Compatibility with Different Browsers
**Objective:** Ensure the extension works on different versions of Google Chrome.

**Precondition:** The extension is installed and enabled.

**Steps:**
- Install different versions of Google Chrome.
- Enable the extension on each version.
- Verify the logo and extension functionality.

**Expected Result:** The extension works correctly on all tested versions.

**Result:** Validated.

## Test Case 7: Verify Extension Performance Under Load (one user)
**Objective:** Ensure the extension performs well under high load.

**Precondition:** The extension is installed and enabled.

**Steps:**
- Simulate high load conditions (e.g., multiple tabs, intensive browsing).
- Click on the extension logo to display the popup.

**Expected Result:** The extension displays and functions correctly without performance degradation.

**Result:** Validated.


# 1. First Time Onboarding

## Test Case 1: Verify Onboarding Page Display
**Objective:** Ensure the onboarding page is displayed the first time the extension is opened.

**Precondition:** The extension is installed and opened for the first time.

**Steps:**
- Open Google Chrome.
- Click on the extension logo to open the extension.

**Expected Result:** The onboarding page with the fields "My username", "My biography", "Primary source link", “Email”, “Primary source basic auth” and the checkbox is displayed.

**Reslut:** Validated.

## Test Case 2: Verify Required Fields with Asterisks
**Objective:** Ensure the required fields are marked with asterisks.

**Precondition:** The onboarding page is displayed.

**Steps:**
- Open the extension.
- Check the fields for "My username", "Primary source link", “Email”, “Primary source basic auth” and the checkbox.

**Expected Result:** "My username" and "Primary source link" fields, as well as the checkbox, are marked with asterisks.

**Result:** Validated.

## Test Case 3: Verify Information Icons for Fields
**Objective:** Ensure an icon for more detailed information is displayed for each field.

**Precondition:** The onboarding page is displayed.

**Steps:**
- Open the extension.
- Locate the information icons next to each field.
- Hover on each icon.

**Expected Result:** A tooltip with detailed information is displayed for each field.

**Result:** Validated.

## Test Case 4: Verify Username Field Accepts Input
**Objective:** Ensure the "My username" field accepts input up to 30 characters.

**Precondition:** The onboarding page is displayed.

**Steps:**
- Enter a username into the "My username" field.
- Ensure the username is visible in the field.
- Enter 1 character 
- Enter 2-29 characters
- Enter 30 characters
- Attempt to enter more than 30 characters.

**Expected Result:** The field accepts input up to 30 characters and rejects additional characters. Error message “The username must not exceed 30 characters.”

**Reslut:** Validated.

## Test Case 5: Verify Biography Field Accepts Input
**Objective:** Ensure the "My biography" field accepts input up to 60 characters.

**Precondition:** The onboarding page is displayed.

**Steps:**
- Enter a biography into the "My biography" field.
- Ensure the biography is visible in the field.
- Enter 1 character 
- Enter 2-59 characters
- Enter 60 characters
- Attempt to enter more than 60 characters.

**Expected Result:** The field accepts input up to 60 characters and rejects additional characters. Error message “The biography must not exceed 60 characters.”

**Result:** Validated.

## Test Case 6: Verify Primary Source Link Field Accepts Input
**Objective:** Ensure the "Primary source link" field accepts input.

**Precondition:** The onboarding page is displayed.

**Steps:**
- Enter a link into the "Primary source link" field.
- Ensure the link is visible in the field.

**Expected Result:** The field accepts the input link.

**Result:** Validated.

## Test Case 7: Verify Checkbox Selection
**Objective:** Ensure the checkbox can be selected and unselected.

**Precondition:** The onboarding page is displayed.

**Steps:**
- Click on the checkbox to select it.
- Click on the checkbox again to unselect it.

**Expected Result:** The checkbox can be toggled between selected and unselected states.

**Result:** Validated.

## Test Case 8: Verify Error Message for Incomplete Required Fields
**Objective:** Ensure an error message is displayed if required fields are not completed.

**Precondition:** The onboarding page is displayed.

**Steps:**
- Leave one or more required fields empty.
- Click on the "Login" button.

**Expected Result:** An error message "all required fields not completed" is displayed.

**Result:** Validated.

## Test Case 9: Verify Data Storage
**Objective:** Ensure all entered data is stored locally in the user's browser.

**Precondition:** The onboarding page is displayed and data has been entered.

**Steps:**
- Complete all fields and click "Login".
- Check the browser's local storage for the entered data.

**Expected Result:** The data is stored locally in the user's browser.

**Result:** Validated.

## Test Case 10: Verify Unique User ID Association
**Objective:** Ensure a unique user ID is associated with the user for each LRS.

**Precondition:** The onboarding page is displayed and data has been entered.

**Steps:**
- Complete all fields and click "Login".
- Check the xAPI statements for the actor.account.name field.

**Expected Result:** A unique user ID is associated with the user for each LRS.

**Result:** Validated.


# 2. Home Extension

## Test Case 1: Verify Default Display of Metadata and Reviews
**Objective:** Ensure that the extension displays metadata and reviews of the learning object by default.

**Precondition:** The extension is active on a webpage with a learning object.

**Steps:**
- Open the extension on a webpage with a learning object.

**Expected Result:** The extension displays the URL of the resource, information, and reviews sections.

**Result:** Validated.

## Test Case 2: Verify URL Field Auto-Fill
**Objective:** Ensure the URL field is automatically filled with the current webpage's URL.

**Precondition:** The extension is active on a webpage with a learning object.

**Steps:**
- Open the extension on a webpage with a learning object.
- Check the URL field.

**Expected Result:** The URL field is automatically filled with the current webpage's URL.

**Result:** Validated.

## Test Case 3: Verify URL Field Manual Entry and Search
**Objective:** Ensure the user can manually enter a URL and search for metadata and reviews.

**Precondition:** The extension is active.

**Steps:**
- Clear the auto-filled URL field.
- Enter a different URL manually.
- Press Enter or click the "search" button.

**Expected Result:** The extension fetches and displays statements from the LRS based on the entered URL.

**Result:** Validated.

## Test Case 4: Verify Information Display
**Objective:** Ensure the information section displays the title, bloom, level, and license from the authority statement of the primary LRS

**Precondition:** The extension is active, and the primary LRS contains metadata for the learning object.

**Steps:**
- Open the extension on a webpage with a learning object.
- Check the information section.

**Expected Result:** The information section displays the title, bloom, level, and license.

**Result:** Validated.

## Test Case 5: Verify Incomplete Metadata Handling
**Objective:** Ensure fields are left empty if some but not all metadata is provided by the authority.

**Precondition:** The extension is active, and the primary LRS contains partial metadata for the learning object.

**Steps:**
- Open the extension on a webpage with a learning object.
- Check the information section.

**Expected Result:** Only the provided metadata is displayed; missing metadata fields are left empty.

**Result:** Validated.

## Test Case 6: Verify "View More" Navigation
**Objective:** Ensure the "view more >" link navigates to the more information section.

**Precondition:** The extension is active.

**Steps:**
- Open the extension on a webpage with a learning object.
- Click on the "view more >" link.

**Expected Result:** The extension navigates to the more information section displaying all learning object information and metadata edit proposals.

**Result:** Validated

## Test Case 7: Verify "Edit" Button Navigation
**Objective:** Ensure the "edit" button navigates to the metadata edit proposals section.

**Precondition:** The extension is active.

**Steps:**
- Open the extension on a webpage with a learning object.
- Click on the "edit" button.

**Expected Result:** The extension navigates to the metadata edit proposals section.

**Result:** Validated.
  
## Test Case 8: Verify Display of Metadata Edit Proposals
**Objective:** Ensure metadata edit proposals are displayed if no primary LRS information is available.

**Precondition:** The extension is active, and there are metadata edit proposals available.

**Steps:**
- Open the extension on a webpage with a learning object.

**Expected Result:** The beginning of metadata edit proposals is displayed.

**Result:** Validated.
  
## Test Case 9: Verify Chronological Display of Metadata from Two LRS
**Objective:** Ensure metadata from two LRS is displayed chronologically (recent first).

**Precondition:** The extension is active, and there are two LRS providing metadata.

**Steps:**
- Open the extension on a webpage with a learning object.

**Expected Result:** Metadata from both LRS is displayed chronologically, with recent data first.

**Result:** Validated.
  
## Test Case 10: Verify Duplicate Metadata Handling
**Objective:** Ensure only one metadata edit proposal is displayed if there are duplicates.

**Precondition:** The extension is active, and there are duplicate metadata edit proposals.

**Steps:**
- Open the extension on a webpage with a learning object.

**Expected Result:** Only one metadata edit proposal is displayed.

**Result:** Validated.
  
## Test Case 11: Verify Display When No Information or Metadata Edits Proposed
**Objective:** Ensure a message and a centered button are displayed if there is no information or metadata edits proposed.

**Precondition:** The extension is active, and there is no information or metadata edits proposed.

**Steps:**
- Open the extension on a webpage with a learning object.

**Expected Result:** A centered button with the label "We are not familiar with this educational learning object yet. Be the first to describe it by clicking on the button below!" is displayed.

**Result:** Validated.

## Test Case 12: Verify Display of User Reviews
**Objective:** Ensure user reviews are displayed, including the average rating, number of reviews, and the first few reviews.

**Precondition:** The extension is active, and there are user reviews available.

**Steps:**
- Open the extension on a webpage with a learning object.
- Check the reviews section.

**Expected Result:** The reviews section displays the average rating, number of reviews, and the first few reviews.

**Result:**Validated.
  
## Test Case 13: Verify "View More" Reviews Navigation
**Objective:** Ensure the "view more >" link navigates to the more reviews section.

**Precondition:** The extension is active.

**Steps:**
- Open the extension on a webpage with a learning object.
- Click on the "view more >" link in the reviews section.

**Expected Result:** The extension navigates to the more reviews section.

**Reslut:** Validated
  
## Test Case 14: Verify "+ Add Review" Button Navigation
**Objective:** Ensure the "+ add review" button navigates to the add review section.

**Precondition:** The extension is active.

**Steps:**
- Open the extension on a webpage with a learning object.
- Click on the "+ add review" button.

**Expected Result:** The extension navigates to the add review section.

**Result:** Validated.

## Test Case 15: Verify Chronological Display of Reviews from Two LRS
**Objective:** Ensure reviews from two LRS are displayed chronologically (recent first).

**Precondition:** The extension is active, and there are reviews from two LRS.

**Steps:**
- Open the extension on a webpage with a learning object.

**Expected Result:** Reviews from both LRS are displayed chronologically, with recent reviews first.

**Result:** Validated.

## Test Case 16: Verify Duplicate Review Handling
**Objective:** Ensure only one review is displayed if there are duplicate reviews.

**Precondition:** The extension is active, and there are duplicate reviews.

**Steps:**
- Open the extension on a webpage with a learning object.

**Expected Result:** Only one review is displayed.

**Result:** Validated.
  
## Test Case 17: Verify Display When No Reviews
**Objective:** Ensure a message and a centered button are displayed if there are no reviews.

**Precondition:** The extension is active, and there are no reviews available.

**Steps:**
- Open the extension on a webpage with a learning object.

**Expected Result:** A centered button with the label "No review yet for this learning object. Be the first to review it!" is displayed.

**Result:** Validated.
  

# 3. Informations 

### a. More Information

## Test Case 1: Verify Navigation to Metadata Extension
**Objective:** Ensure that clicking the "view more >" link in the information section navigates to the metadata extension.

**Precondition:** The extension is active.

**Steps:**
- Open the extension on a webpage with a learning object.
- Click on the "view more >" link in the information section.

**Expected Result:** The extension navigates to the metadata extension page.

**Result:** Validated.

## Test Case 2: Verify Display of Authority's Metadata
**Objective:** Ensure the first part of the metadata extension displays the authority's metadata.

**Precondition:** The extension is active, and the authority has made metadata in the LRS.

**Steps:**
- Open the metadata extension page.
- Check the first part of the page for the authority's metadata.

**Expected Result:** All fields are displayed, marked with "/" if not entered by the authority in the last statement.

**Result:** Validated.
  
## Test Case 3: Verify Display of All Metadata Fields
**Objective:** Ensure all metadata fields are displayed in the first part of the metadata extension.

**Precondition:** The extension is active, and metadata is available.

**Steps:**
- Open the metadata extension page.
- Check for the display of all metadata fields: Title, Bloom, Level, Licence, Provider, Language, Type, Duration, Author, Publisher, Date, Keywords, Description.

**Expected Result:** All specified metadata fields are displayed.

**Result:** Validated.
  
## Test Case 4: Verify Display of Metadata from Two LRS
**Objective:** Ensure metadata from two LRS is displayed, with primary first and then secondary.

**Precondition:** The extension is active, and there are two LRS providing metadata.

**Steps:**
- Open the metadata extension page.

**Expected Result:** Metadata from the primary LRS is displayed first, followed by metadata from the secondary LRS.

**Result:** Validated.

## Test Case 5: Verify Display of User Metadata Edit Proposals
**Objective:** Ensure the second part of the metadata extension displays user metadata edit proposals.

**Precondition:** The extension is active, and there are user metadata edit proposals.

**Steps:**
- Open the metadata extension page.
- Check the second part of the page for user metadata edit proposals.

**Expected Result:** User metadata edit proposals are displayed in chronological order, sorted by date.

**Result:** Validated.

## Test Case 6: Verify Chronological Order of User Metadata Edit Proposals
**Objective:** Ensure user metadata edit proposals are displayed in chronological order.

**Precondition:** The extension is active, and there are multiple user metadata edit proposals.

**Steps:**
- Open the metadata extension page.
- Check the order of user metadata edit proposals.

**Expected Result:** User metadata edit proposals are displayed in chronological order.

**Result:** Validated.

## Test Case 7: Verify Handling of Duplicate Metadata Edit Proposals
**Objective:** Ensure only one metadata edit proposal is displayed if there are duplicates from different LRS.

**Precondition:** The extension is active, and there are duplicate metadata edit proposals.

**Steps:**
- Open the metadata extension page.
- Check for duplicate metadata edit proposals.

**Expected Result:** Only one metadata edit proposal is displayed if duplicates exist.

**Result:** Validated.

## Test Case 8: Verify Navigation Using "<" Button
**Objective:** Ensure the "<" button navigates back to the previous page.

**Precondition:** The extension is active.

**Steps:**
- Open the metadata extension page.
- Click on the "<" button.

**Expected Result:** The extension navigates back to the previous page.

**Result:** Validated.

### b. Metadata edit proposal 

## Test Case 9: Verify "Edit" Button Navigation
**Objective:** Ensure the "edit" button navigates to the metadata edit proposals section.

**Precondition:** The extension is active.

**Steps:**
- Open the metadata extension page.
- Click on the "edit" button.

**Expected Result:** The extension navigates to the metadata edit proposals section.

**Result:** Validated.

## Test Case 10: Verify Metadata Edit Proposal Submission
**Objective:** Ensure the user can submit metadata edit proposals.

**Precondition:** The extension is active.

**Steps:**
- Open the metadata edit proposals section.
- Fill in the metadata fields with proposed edits.
- Click the "Send" button.

**Expected Result:** The metadata edit proposal is sent, and an xAPI statement is recorded on the LRS with "proposed" in the verb.

**Result:** Validated.

## Test Case 11: Verify Display of Thank-You Message
**Objective:** Ensure a thank-you message is displayed after submitting a metadata edit proposal.

**Precondition:** The extension is active, and a metadata edit proposal has been submitted.

**Steps:**
- Submit a metadata edit proposal.

**Expected Result:** A thank-you message is displayed with the text “Thank you for your contribution in editing this learning object!” and a “return” button.

**Result:** Validated.
  
# 4. Reviews

### a. More Reviews

## Test Case 1: Verify Navigation to Reviews Extension
**Objective:** Ensure that clicking the "view more >" link in the reviews section navigates to the reviews extension.

**Precondition:** The extension is active.

**Steps:**
- Open the extension on a webpage with a learning object.
- Click on the "view more >" link in the reviews section.

**Expected Result:** The extension navigates to the reviews extension page.

**Result:** Validated.

## Test Case 2: Verify Display of All User Reviews
**Objective:** Ensure all user reviews are displayed in the reviews extension.

**Precondition:** The extension is active, and reviews are available in the LRS.

**Steps:**
- Open the reviews extension page.
- Check for the display of user reviews.

**Expected Result:** All user reviews are displayed, fetched from the LRS with the verb "review".

**Result:** Validated.

## Test Case 3: Verify Chronological Order of Reviews from Two LRS
**Objective:** Ensure reviews from two LRS are displayed chronologically (recent first).

**Precondition:** The extension is active, and reviews are available from two LRS.

**Steps:**
- Open the reviews extension page.
- Check the order of reviews.

**Expected Result:** Reviews from both LRS are displayed chronologically, with recent reviews first.

**Result:** Validated.
  
## Test Case 4: Verify Display of Most Recent Review per User
**Objective:** Ensure only the most recent review is displayed if a user has posted multiple reviews.

**Precondition:** The extension is active, and there are multiple reviews by the same user.

**Steps:**
- Open the reviews extension page.
- Check for multiple reviews by the same user.

**Expected Result:** Only the most recent review by each user is displayed.

**Result :** Validated.
  
## Test Case 5: Verify Handling of Duplicate Reviews from Two LRS
**Objective:** Ensure only one review is displayed per user if the review is posted in two LRS.

**Precondition:** The extension is active, and there are duplicate reviews by the same user in two LRS.

**Steps:**
- Open the reviews extension page.
- Check for duplicate reviews by the same user.

**Expected Result:** Only one review per user is displayed.

**Result:** Validated.

## Test Case 6: Verify Display of Mandatory Review Fields
**Objective:** Ensure all mandatory review fields are displayed.

**Precondition:** The extension is active, and reviews are available.

**Steps:**
- Open the reviews extension page.
- Check for the display of mandatory review fields: Username, Stars, Comment.

**Expected Result:** Username, Stars (0-5), and Comment fields are displayed.

**Result:** Validated.

## Test Case 7: Verify Display of Optional Biography Field
**Objective:** Ensure the biography field is displayed if provided, otherwise left blank.

**Precondition:** The extension is active, and reviews with and without biographies are available.

**Steps:**
- Open the reviews extension page.
- Check for the display of the biography field.

**Expected Result:** The biography field is displayed if provided, otherwise left blank.

**Result:** Validated.
  
## Test Case 8: Verify Display of Review Date
**Objective:** Ensure the date of review publication is displayed.

**Precondition:** The extension is active, and reviews are available.

**Steps:**
- Open the reviews extension page.
- Check for the display of the review date.

**Expected Result:** The date of review publication is displayed.

**Result:** Validated.
  
## Test Case 9: Verify Navigation Using "<" Button
**Objective:** Ensure the "<" button navigates back to the previous page.

**Precondition:** The extension is active.

**Steps:**
- Open the reviews extension page.
- Click on the "<" button.

**Expected Result:** The extension navigates back to the previous page.

**Result:** Validated.

### b. Add Review

## Test Case 10: Verify "+ Add Review" Button Navigation
**Objective:** Ensure the "+ add review" buttons from the home extension (reviews section) and reviews extension navigate to the add review extension.

**Precondition:** The extension is active.

**Steps:**
- Open the home extension or reviews extension.
- Click on the "+ add review" button.

**Expected Result:** The extension navigates to the add review extension.

**Result:** Validated.
  
## Test Case 11: Verify Mandatory Stars Field
**Objective:** Ensure the "Stars" field is mandatory and accepts values between 0 and 5 stars.

**Precondition:** The extension is active, and the user is on the add review extension.

**Steps:**
- Open the add review extension.
- Leave the "Stars" field empty and try to submit.

**Expected Result:** An error message is displayed: "all required fields not completed.". 
Enter a value less than 0 or greater than 5 in the "Stars" field and try to submit.

**Expected Result:** An error message is displayed: "all required fields not completed.". 
Enter a valid value between 0 and 5 in the "Stars" field.

**Expected Result:** The value is accepted.

**Result:** Validated.

## Test Case 12: Verify Mandatory Comment Field
**Objective:** Ensure the "Comment" field is mandatory.

**Precondition:** The extension is active, and the user is on the add review extension.

**Steps:**
- Open the add review extension.
- Leave the "Comment" field empty and try to submit.

**Expected Result:** An error message is displayed: "all required fields not completed.".
Enter a comment in the "Comment" field.

**Expected Result:** The comment is accepted.

**Result:** Validated.

## Test Case 13: Verify "<" Button Functionality in Add Review Extension
**Objective:** Ensure the "<" button navigates back to the previous screen.

**Precondition:** The extension is active, and the user is on the add review extension.

**Steps:**
- Open the add review extension.
- Click the "<" button.

**Expected Result:** The extension navigates back to the previous screen.

**Result:** Validated.
  
## Test Case 14: Verify Successful Review Submission
**Objective:** Ensure a review is successfully submitted when all required fields are completed.

**Precondition:** The extension is active, and the user is on the add review extension.

**Steps:**
- Open the add review extension.
- Fill in the "Stars" and "Comment" fields with valid data.
- Click the "Submit" button.

**Expected Result:** The review is submitted successfully, an xAPI statement is recorded on the LRS with "review" in verb, and a thank-you message is displayed: "Thanks for sharing your review!" with a "return" button.

**Result:** Validated.
  
## Test Case 15: Verify xAPI Statement Recording for Single LRS
**Objective:** Ensure an xAPI statement is recorded on the LRS with "review" in the verb when a review is submitted.

**Precondition:** The extension is active, and the user is on the add review extension.

**Steps:**
- Open the add review extension.
- Fill in the "Stars" and "Comment" fields with valid data.
- Click the "Submit" button.

**Expected Result:** An xAPI statement with "review" in the verb is recorded on the LRS.

**Result:** Validated.
  
## Test Case 16: Verify xAPI Statement Recording for Two LRS
**Objective:** Ensure an xAPI statement is recorded on both LRS with "review" in the verb when a review is submitted.

**Precondition:** The extension is active, the user has two LRS, and the user is on the add review extension.

**Steps:**
- Open the add review extension.
- Fill in the "Stars" and "Comment" fields with valid data.
- Click the "Submit" button.

**Expected Result:** An xAPI statement with "review" in the verb is recorded on both LRS.

**Result:** Validated.
  
## Test Case 17: Verify Thank-You Message Display
**Objective:** Ensure a thank-you message is displayed after a successful review submission.

**Precondition:** The extension is active, and the user is on the add review extension.

**Steps:**
- Open the add review extension.
- Fill in the "Stars" and "Comment" fields with valid data.
- Click the "Submit" button.

**Expected Result:** A thank-you message is displayed: "Thanks for sharing your review!" with a "return" button.

**Result:** Validated.
  
## Test Case 18: Verify "Return" Button Functionality
**Objective:** Ensure the "return" button navigates back to the home extension after displaying the thank-you message.

**Precondition:** The extension is active, and the thank-you message is displayed after a successful review submission.

**Steps:**
- Successfully submit a review.
- On the thank-you message screen, click the "return" button.

**Expected Result:** The extension navigates back to the home extension.

**Result:** Validated.
