---
layout: default
title: Emphasis
parent: Modifications
nav_order: 2
---

# _Emphasis_

Emphasis is represented by the code **_em_** and needs a following **_- , + , ++_**. The SSML equivalence is the**_&lt;emphasis level="modeerate">_** tag.

* **Effect:** Tries to (de)emphasis the word/sentence.

* **Characters:** \
    These represent the same preset values that normal SSML has.
    * **++** = strong
    * **+** = moderate
    * **-** = reduced

* **Example:** \
    **_#em++[A test]_** is equal to **_&lt;emphasis level="strong">A test&lt;/say-as>_** \
    **_#em-[A test]_** is equal to **_&lt;emphasis level="reduced">A test&lt;/say-as>_**

* **Audio Example**
    * **Text:** When I #em++[strongly emphasise] and when I have a #em-[reduced emphasise]
    * <audio controls preload="none">
        <source src="../audio/emphasis_tts.wav" type="audio/wav" />
        Your browser does not support the audio element. Download:
        <a href="../audio/emphasis_tts.wav">WAV</a></audio>
