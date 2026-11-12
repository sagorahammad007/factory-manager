FACTORY MANAGER - SUBSCRIPTION UPDATE
=====================================

WHAT IS NEW
1. Subscription lock. New customers sign up, see "Waiting for approval", and you approve them in admin.html after they pay and you confirm by phone. When the date passes (or you block them) the app locks by itself.
2. Admin panel (admin.html). Waiting clients first, plan (1/3/6/12 months), amount, bKash/Nagad TrxID, Approve / Renew / Extend / Block / Unblock. The page title shows how many are waiting.
3. Dues bar in Accounts. Shows money still to receive from unpaid invoices and money receipts. The new "Dues" tab lists customers, oldest first, with a Received button.
4. Extra advance. You can now give an advance bigger than the worker has earned. The extra shows as a red minus number and shrinks every day the worker is present. At salary time it is deducted first (in parts if needed).
5. The lock is enforced by the database (firestore.rules), so it cannot be bypassed from the app.

UPLOAD STEPS (do them in this order, or existing clients get locked)
1. Firebase Console > Firestore Database > Rules. Copy your CURRENT rules into a text file and keep it. This is your way back if anything goes wrong.
2. Upload all these files to your GitHub repository (replace the old ones). Wait for Netlify / GitHub Pages to finish publishing. (Do not upload README.txt or firestore.rules; they are not part of the site. You may if you like.)
3. Open firebase-config.js and put your phone number in SUPPORT_PHONE. Customers see it on the lock screens.
4. Open yoursite/admin.html and sign in as the owner. Every existing client, including your own workspaces, shows as "No plan yet". Approve each one (for example 12 months, amount 0). Do this BEFORE step 5.
5. Firebase Console > Firestore Database > Rules. Delete everything, paste the content of firestore.rules, press Publish.
6. Test: create a new account on the app. It must show "Waiting for approval". Approve it in admin.html; the app opens by itself. Then press Block; it locks within seconds.

DAILY USE
- New signup: they appear in admin.html under Waiting. Call, confirm payment, press Approve.
- Renewal: press Renew / Extend and enter the new payment.
- Admin panel refreshes itself every minute.

GOOD TO KNOW
- If a customer's phone is offline, it can keep showing the last data it loaded until it reconnects. After reconnecting, the lock applies.
- Use a strong password for your admin email account. Anyone who gets into it controls every client.
- There is no automatic payment yet. Payments are confirmed by you. A merchant account can be added later.
- Existing workspaces without a plan are locked once step 5 is done, so never skip step 4.
