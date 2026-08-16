---
layout: default
title: Whisper
parent: Modifications
nav_order: 18
---

# _Whisper_

Is represented by the code **_wh_** and does not need any additional data. The SSML equivalence is the **_&lt;amazon:effect name="whispered">_** tag.

* **Effect:** Makes the spoken words be spoken in a whispering voice.

* **Example:** \
    **_#wh[A test]_** is equal to **_&lt;amazon:effect name="whispered">A test&lt;/amazon:effect>_**

* **Audio Example**
    * **Text:** hey,  come over here! #wh[we can't let the others know of the plan.]
    * <audio controls preload="none">
        <source src="../audio/whisper_tts.wav" type="audio/wav" />
        Your browser does not support the audio element. Download:
        <a href="../audio/whisper_tts.wav">WAV</a></audio>
