---
layout: default
title: Muffler
parent: Modifications
nav_order: 10
---

# _Muffler_
Muffler is a secondary effect, meaning its beeing added on after the TTS is generated.

Muffler is represented by the code **_mu_** and needs a following numeric strength selector (1–3). There is no SSML equivalence.

* **Effect:** Applies a muffling effect at the chosen level.

* **Numeric:**
    * **default:** 1
    * **max:** 3
    * **min:** 1

* **Example:** \
    **_#mu2[A test]_**

* **Audio Example**
    * **Text:** #mu[Hey you, let me out of here! right now!]
    * <audio controls preload="none">
        <source src="../audio/muffler_tts.wav" type="audio/wav" />
        Your browser does not support the audio element. Download:
        <a href="../audio/muffler_tts.wav">WAV</a></audio>
