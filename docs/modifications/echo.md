---
layout: default
title: Echo
parent: Modifications
nav_order: 3
---

# _Echo_
Echo is a secondary effect, meaning its beeing added on after the TTS is generated.

Echo is represented by the code **_ec_** and needs a following number between 1 and 6 for the strength of the echo effect. There is no SSML equivalence.

* **Effect:** Adds an echo effect at the chosen level.

* **Numeric:**
    * **default:** 2
    * **max:** 6
    * **min:** 1

* **Example:** \
    **_#ec4[A test]_**

* **Audio Example**
    * **Text:**
    * <audio controls preload="none">
        <source src="../audio/echo_tts.wav" type="audio/wav" />
        Your browser does not support the audio element. Download:
        <a href="../audio/echo_tts.wav">WAV</a></audio>
