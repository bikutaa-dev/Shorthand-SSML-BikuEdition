---
layout: default
title: Volume
parent: Modifications
nav_order: 17
---

# _Volume_

Volume is represented by the code **_vo_** and supports either a following numeric value or **_+ , ++ , - , --_**. The SSML equivalence is the **_&lt;prosody volume=””>_** tag.

* **Effect:** Changes the volume of the speech.

* **Characters:** \
    These represent the same preset values that normal SSML has.
    * **++ =** x-loud
    * **+ =** loud
    * **- =** soft
    * **-- =** x-soft

* **Numeric:**
    * **default:** 10
    * **max:** 14
    * **min:** 4 

* **Example:**
    * **Characters:**  \
        **_#vo+[A test]_** is equal to **_&lt;prosody volume=”loud”>A test&lt;/prosody>_**
    * **Numeric:** \
        **_#vo4[A test]_** is equal to **_&lt;prosody rate=”-6db”>A test&lt;/prosody>_**

* **Audio Example**
    * **Text:** I can also #vo+[raise my volume] as well as #vo-[lower my volume]
    * <audio controls preload="none">
        <source src="../audio/volume_tts.wav" type="audio/wav" />
        Your browser does not support the audio element. Download:
        <a href="../audio/volume_tts.wav">WAV</a></audio>
