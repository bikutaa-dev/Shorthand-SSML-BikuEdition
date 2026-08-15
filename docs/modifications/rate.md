---
layout: default
title: Rate
parent: Modifications
nav_order: 13
---

# _Rate_

Rate is represented by the code **_ra_** and supports either a following numeric value or **_+ , ++ , - , --_**. The SSML equivalence is the **_&lt;prosody rate=””>_** tag. 

* **Effect:** Changes the speed at which the words are spoken.
* **Characters:** \
    These represent the same preset values that normal SSML has.
    * **++ =** x-fast
    * **+ =** fast
    * **- =** slow
    * **-- =** x-slow

* **Numeric:**
    * **default:** 100
    * **max:** 2000
    * **min:** 20

* **Example:**
    * **Characters:**  \
        **_#ra--[A test]_** is equal to **_&lt;prosody rate=”x-slow”>A test&lt;/prosody>_**
    * **Numeric:** \
        **_#ra150[A test]_** is equal to **_&lt;prosody rate=”150%”>A test&lt;/prosody>_**
