# Splitwise_project
 Splitwise algorithm implementation to find the final amount that a user must receive/give to another user by overall simplying the debt/credit of all the person in the group. 
**FOR EXAMPLE**
Let's consider a group of 4 people: A, B, C, and D. They made the following transactions:

A pays B ₹50

B pays C ₹30

C pays D ₹20

A pays D ₹40

**A's Balance:**

A pays ₹50 to B, so A’s balance decreases by ₹50.

A pays ₹40 to D, so A’s balance decreases by ₹40.

Total balance for A: -₹90 (A owes ₹90 in total).

**B's Balance:**

B receives ₹50 from A, so B’s balance increases by ₹50.

B pays ₹30 to C, so B’s balance decreases by ₹30.

Total balance for B: +₹20 (B is owed ₹20).

**C's Balance:**

C receives ₹30 from B, so C’s balance increases by ₹30.

C pays ₹20 to D, so C’s balance decreases by ₹20.

Total balance for C: +₹10 (C is owed ₹10).

**D's Balance:**

D receives ₹40 from A, so D’s balance increases by ₹40.

D receives ₹20 from C, so D’s balance increases by ₹20.

Total balance for D: +₹60 (D is owed ₹60).

**Simplifying the Debts**

A owes ₹90, and the total amount that B, C, and D are owed is ₹20 + ₹10 + ₹60 = ₹90.

We can match A's debt with B, C, and D's credits.


**Now,we can try to settle these debts in the fewest number of transactions:**

A owes ₹90.

A can give ₹20 to B, reducing B’s balance to ₹0 (B’s original balance was +₹20).

A can give ₹10 to C, reducing C’s balance to ₹0 (C’s original balance was +₹10).

A can give ₹60 to D, reducing D’s balance to ₹0 (D’s original balance was +₹60).

Now all debts are settled!

Final Result:
A pays ₹20 to B, ₹10 to C, and ₹60 to D.

B, C, and D no longer owe anything.

Thus, after simplifying the transactions, the result is:

A pays a total of ₹90 (₹20 to B, ₹10 to C, ₹60 to D).

B, C, and D receive ₹20, ₹10, and ₹60 respectively.