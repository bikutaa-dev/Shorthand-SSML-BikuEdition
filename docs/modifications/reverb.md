---
layout: default
title: Reverb
parent: Modifications
nav_order: 14
---

# _Reverb_
Reverb is a secondary effect, meaning its beeing added on after the TTS is generated.

Reverb is represented by the code **_re_** and needs a following numeric strength selector (1–3). There is no SSML equivalence.

* **Effect:** Adds reverb at the chosen level.

* **Numeric:**
    * **default:** 1
    * **max:** 3
    * **min:** 1

* **Example:** \
    **_#re3[A test]_**

* **Audio Example**
    * **Text:** #re2[I have always liked places with reverb]
    * <audio controls preload="none">
        <source src="../audio/reverb_tts.wav" type="audio/wav" />
        Your browser does not support the audio element. Download:
        <a href="../audio/reverb_tts.wav">WAV</a></audio>
