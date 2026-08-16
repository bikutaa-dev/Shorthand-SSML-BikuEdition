---
layout: default
title: Soft
parent: Modifications
nav_order: 12
---

# _Soft_

Soft speech is represented by the code **_so_** and does not need any additional data. The SSML equivalence is the **_&lt;amazon:effect phonation="soft"">_** tag.

* **Effect:** Makes the speech being spoken sound softer.

* **Example:** \
    **_#so[A test]_** is equal to **_&lt;amazon:effect phonation="soft""A test&lt;/amazon:effect>_**

* **Audio Example**
    * **Text:** You know! #so[I can be more soft spoken if I want too]
    * <audio controls preload="none">
        <source src="../audio/soft_tts.wav" type="audio/wav" />
        Your browser does not support the audio element. Download:
        <a href="../audio/soft_tts.wav">WAV</a></audio>
