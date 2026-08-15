---
layout: default
title: Megaphone
parent: Modifications
nav_order: 7
---

# _Megaphone_
Megaphone is a secondary effect, meaning its beeing added on after the TTS is generated.

Megaphone is represented by the code **_me_** and needs a following numeric selector (1–3). There is no SSML equivalence.

* **Effect:** Applies a megaphone effect at the chosen level.

* **Numeric:**
    * **default:** 1
    * **max:** 2
    * **min:** 1

* **Example:** \
    **_#me2[A test]_**

* **Audio Example**
    * **Text:**
    * <audio controls preload="none">
        <source src="../audio/megaphone_tts.wav" type="audio/wav" />
        Your browser does not support the audio element. Download:
        <a href="../audio/megaphone_tts.wav">WAV</a></audio>
