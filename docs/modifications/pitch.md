---
layout: default
title: Pitch
parent: Modifications
nav_order: 11
---

# _Pitch_

Pitch is represented by the code **_pi_** and supports either a following numeric value or **_+ , ++ , - , --_**. The SSML equivalence is the **_&lt;prosody pitch=””>_** tag. 

* **Effect:** Changes the pitch at which the spoken words are spoken at.

* **Characters:** \
    These represent the same preset values that normal SSML has.
    * **++ =** x-high
    * **+ =** high
    * **- =** low
    * **-- =** x-low 

* **Numeric:**
    * **default:** 100
    * **max:** 150
    * **min:** 70

* **Example:**
    * **Characters:** \
        **_#pi++[A test]_** is equal to **_&lt;prosody pitch=”x-high”>A test&lt;/prosody>_**
    * **Numeric:** \
        **_#pi150[A test]_** is equal to **_&lt;prosody pitch=”50%”>A test&lt;/prosody>_**

* **Audio Example**
    * **Text:**
    * <audio controls preload="none">
        <source src="../audio/pitch_tts.wav" type="audio/wav" />
        Your browser does not support the audio element. Download:
        <a href="../audio/pitch_tts.wav">WAV</a></audio>
