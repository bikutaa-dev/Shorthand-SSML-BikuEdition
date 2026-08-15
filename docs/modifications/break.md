---
layout: default
title: Break
parent: Modifications
nav_order: 1
---

# _Break_

Break is represented by the code **_br_** and supports either a following numeric value or **_+ , ++ , - , --_**. The SSML equivalence is the **_&lt;break time=””>_** tag. The break happens before any given text, if there is any in the encapsulating **_[]_** 

* **Effect:** Creates a break in the speech at the given point of the tag for the given amount of time in seconds..
* **Characters:** \
    These represent the same preset values that normal SSML has.
    * **++** = x-high
    * **+** = high
    * **-** = low
    * **--** = x-low

* **Numeric:**
    * **default:** 1.0
    * **max:** 10.0
    * **min:** 0.0

* **Example:**
  * **Characters:** \
        **_#br+[]_** is equal to **_&lt;break strength=”strong” />_**
  * **Numeric:** \
        **_#br1.2[A test]_** is equal to **_&lt;break strength=”1200ms” />A test_** \
        **_#br.5[]_** is equal to **_&lt;break strength=”500ms” />_**

* **Audio Example**
    * **Text:** 3 second break #br3[] before it keeps going
    * <audio controls preload="none">
        <source src="../audio/break_tts.wav" type="audio/wav" />
        Your browser does not support the audio element. Download:
        <a href="../audio/break_tts.wav">WAV</a>
    </audio>
