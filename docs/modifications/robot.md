---
layout: default
title: Robot
parent: Modifications
nav_order: 15
---

# _Robot_
Robot is a secondary effect, meaning its beeing added on after the TTS is generated.

Robot is represented by the code **_ro_** and needs a following numeric selector (1–3). There is no SSML equivalence.

* **Effect:** Applies a robotic effect at the chosen level.

* **Numeric:**
    * **default:** 1
    * **max:** 3
    * **min:** 1

* **Example:** \
    **_#ro2[A test]_**

* **Audio Example**
    * **Text:**
    * <audio controls preload="none">
        <source src="../audio/robot_tts.wav" type="audio/wav" />
        Your browser does not support the audio element. Download:
        <a href="../audio/robot_tts.wav">WAV</a></audio>
