
Bugs Found – problem_user
-----------
The following issues were identified while testing the application using the `problem_user` account.


## BUG-01: Incorrect product images displayed
-----------------------------------

User: problem_user  
Area: Product Catalog  
Severity: High  

Steps to Reproduce
1. Login as `problem_user`
2. Navigate to the Products page
3. Observe product images

Actual Result
Product images do not match their corresponding product names.

Expected Result
Each product should display the correct image associated with it.

## BUG-02: Sorting does not reorder products correctly
-----------------------------------

User: problem_user  
Area: Sorting  
Severity: Medium  

Steps to Reproduce
1. Login as `problem_user`
2. Select "Price (low to high)" sorting option

Actual Result
Products are not sorted correctly by Price and by Name.

Expected Result
Products should be sorted from lowest to highest price and vice versa.
Products should be sorted from A-Z and Z-A successfully.

## BUG-03: Unable to remove item from cart
-----------------------------------

User: problem_user  
Area: Shopping Cart  
Severity: High  

Steps to Reproduce
1. Login as `problem_user`
2. Navigate to the Products page
3. Add any product to the cart
5. Click the **Remove** button for the added product in the catalog

Actual Result
The item is not removed from the cart after clicking **Remove**.

Expected Result
The selected item should be removed from the cart and no longer appear in the cart list.

## BUG-05: About page displays incorrect content
-----------------------------------

User: problem_user
Area: Navigation – About Page 
Severity: Medium 

Steps to Reproduce
1. Login as `problem_user`
2. Open the menu
3. Click on **About**


Actual Result
The **About** page displays incorrect 404 content and does not match the expected About page.

Expected Result
The About page should display the correct company information and content as shown for a normal user.

    