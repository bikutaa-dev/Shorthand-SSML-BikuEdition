---
layout: default
title: Timbre
parent: Modifications
nav_order: 16
---

# _Timbre_

Timbre is represented by the code **_ti_** and supports either a following numeric value or **_+ , ++ , - , --._** The SSML equivalence is the **_&lt;amazon:effect vocal-tract-length="">_**  tag. 

* **Effect:** Changes the timbre of voice.
* **Characters:**
    * **++ =** 200%
    * **+ =** 150%
    * **- =** 75%
    * **–- =** 50%

* **Numeric:**
    * **default:** 100
    * **max:** 200
    * **min:** 50

* **Example:**
    * **Characters:**  \
        **_#ti--[A test]_** is equal to **_&lt;amazon:effect vocal-tract-length="50%">A test&lt;/amazon:effect>_**
    * **Numeric:** \
        **_#ti50[A test]_** is equal to **_&lt;amazon:effect vocal-tract-length="50%">A test&lt;/amazon:effect>_**
