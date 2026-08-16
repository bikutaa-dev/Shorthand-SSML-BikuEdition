---
layout: default
title: IPA (International Phonetic Alphabet)
parent: Modifications
nav_order: 5
---

# _IPA (International Phonetic Alphabet)_

IPA is represented by the code **_ip_** and followed by encapsulated in () the phonetic symbols for pronunciation. The SSML equivalence is the **_&lt;phoneme alphabet="ipa" ph=”">_** tag.

* **Effect:** Changes how the word(s) encapsulated in **_[]_** are spoken.

* **Example:** \
    **_#ip(pɪˈkɑːn)[A test]_** is equal to **_&lt;phoneme alphabet="ipa" ph="pɪˈkɑːn">pecan&lt;/phoneme>_**

* **Audio Example**
    * **Text:** I could say pecan, but I could pronounce it better with  #ip(pɪˈkɑːn)[pecan]
    * <audio controls preload="none">
        <source src="../audio/ipa_tts.wav" type="audio/wav" />
        Your browser does not support the audio element. Download:
        <a href="../audio/ipa_tts.wav">WAV</a></audio>
