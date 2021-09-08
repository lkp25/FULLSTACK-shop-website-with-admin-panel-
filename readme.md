

This is an advanced full-stack online shop application, divided into two parts:
1. Public part - available for everyone
2. Admin panel - available only for store admin. 

admin panel has three parts:
1. PRODUCTS:
 lets the owner to delete existing / add new products with image upload or edit any existing one. All changes are disabled by default, a click on 'unable' button is required in order to change anything. There is also another security mechanism - in order to force changes being saved in the database, admin must click on 'save changes' button and then confirm his choice in popup by clicking 'yes'. Only then new data will be added to database and the existing one edited / removed. Since this data is generally available - rendered in public views of the site - it is simply stored in a json file directly on the server and not ever written into the database.
 2. ORDERS:
 contains all the orders that were successfully placed by users. main view contains only most important data for each order. If more info is needed, 'details' button must be clicked. Orders can be sorted by value, date, surname and sent / not yet sent flag. A flag is a red (for unsent) or green (for sent) square - it changes color upon click. If admin clicks on red flag, it changes to green and immidiately an email is dispatched informing the buyer that his order was already sent. 
 3. QUESTIONS:
 