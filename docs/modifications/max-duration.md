---
layout: default
title: Max Duration
parent: Modifications
nav_order: 8
---

# _Max Duration_

Max duration is represented by the code **_du_** and needs a following numeric value. The SSML equivalance is the **_&lt;prosody amazon:max-duration="">_** tag. There is limits on how fast the speech can be speed up, and if it already fits within the duration no changes are made.

* **Effect:** Tries to speed up the speech so it fits within the given time.

* **Numeric:**
    * **default:** 1.0
    * **max:** 60.0
    * **min:** 0.0

* **Example**
    **_#du5.3[A test]_** is equal to **_&lt;prosody amazon:max-duration="5300ms">A test&lt;/prosody>_** /
    **_#du.5[A test]_** is equal to **_&lt;prosody amazon:max-duration="500ms">A test&lt;/prosody>_** /

* **Audio Example**
    * **Text:**
    * <audio controls preload="none">
        <source src="../audio/max-duration_tts.wav" type="audio/wav" />
        Your browser does not support the audio element. Download:
        <a href="../audio/max-duration_tts.wav">WAV</a></audio>
