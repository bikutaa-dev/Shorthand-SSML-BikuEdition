---
layout: default
title: Language
parent: Modifications
nav_order: 6
---

# _Language_

Language is represented by the code **_la_** and followed by encapsulated in **_()_** the language code for the language you want to use. The SSML equivalence is the **_&lt;lang xml:lang="fr-FR">_** tag.

* **Effect:** Changes what language the voice will use to try to speak the words.

* **Language codes:**

<table>
  <tr>
   <td>
<strong>Language</strong>
   </td>
   <td><strong>Code</strong>
   </td>
   <td><strong>Language</strong>
   </td>
   <td><strong>Code</strong>
   </td>
   <td><strong>Language</strong>
   </td>
   <td><strong>Code</strong>
   </td>
  </tr>
  <tr>
   <td>Arabic
   </td>
   <td>arb
   </td>
   <td>Arabic (gulf)
   </td>
   <td>ar-ae
   </td>
   <td>Catalan
   </td>
   <td>ca-es
   </td>
  </tr>
  <tr>
   <td>Chinese (Cantonese)
   </td>
   <td>yue-cn
   </td>
   <td>Chinese (Mandarin)
   </td>
   <td>cmn-cn
   </td>
   <td>Danish
   </td>
   <td>da-dk
   </td>
  </tr>
  <tr>
   <td>Dutch
   </td>
   <td>nl-nl
   </td>
   <td>English (Australien)
   </td>
   <td>en-au
   </td>
   <td>English (British)
   </td>
   <td>en-gb
   </td>
  </tr>
  <tr>
   <td>English (Indian)
   </td>
   <td>en-in
   </td>
   <td>English (New Zealand)
   </td>
   <td>en-nz
   </td>
   <td>English (South African)
   </td>
   <td>en-za
   </td>
  </tr>
  <tr>
   <td>English (US)
   </td>
   <td>en-us
   </td>
   <td>English (Welsh)
   </td>
   <td>en-gb-wls
   </td>
   <td>Finnish
   </td>
   <td>fi-fi
   </td>
  </tr>
  <tr>
   <td>French
   </td>
   <td>fr-fr
   </td>
   <td>French (Canadian)
   </td>
   <td>fr-ca
   </td>
   <td>Hindi
   </td>
   <td>hi-in
   </td>
  </tr>
  <tr>
   <td>German
   </td>
   <td>de-de
   </td>
   <td>German (Austrian)
   </td>
   <td>de-at
   </td>
   <td>Icelandic
   </td>
   <td>is-is
   </td>
  </tr>
  <tr>
   <td>Italian
   </td>
   <td>it-it
   </td>
   <td>Japanese
   </td>
   <td>ja-jp
   </td>
   <td>Korean
   </td>
   <td>ko-kr
   </td>
  </tr>
  <tr>
   <td>Norwegian
   </td>
   <td>nb-no
   </td>
   <td>Polish
   </td>
   <td>pl-pl
   </td>
   <td>Portuguese (Brazilian)
   </td>
   <td>pt-br
   </td>
  </tr>
  <tr>
   <td>Portuguese (European)
   </td>
   <td>pt-pt
   </td>
   <td>Romanian
   </td>
   <td>ro-ro
   </td>
   <td>Russian
   </td>
   <td>ru-ru
   </td>
  </tr>
  <tr>
   <td>Spanish (European)
   </td>
   <td>es-es
   </td>
   <td>Spanish (Mexican)
   </td>
   <td>es-mx
   </td>
   <td>Spanish (US)
   </td>
   <td>es-us
   </td>
  </tr>
  <tr>
   <td>Swedish
   </td>
   <td>sv-se
   </td>
   <td>Turkish
   </td>
   <td>tr-tr
   </td>
   <td>Welsh
   </td>
   <td>cy-gb
   </td>
  </tr>
</table>

* **Example:**
    * **Characters:** \
        **_#la(ja-jp)[A test]_** is equal to **_&lt;lang xml:lang="ja-JP">A test&lt;/lang>_**
    * **Numeric:** \
        **_#la(en-us)[A test]_** is equal to **_&lt;lang xml:lang="en-US">A test&lt;/lang>_**

* **Audio Example**
    * **Text:** I could say Gomenasai, but I pronounce it better with #la(ja-jp)[ごめんなさい]
    * <audio controls preload="none">
        <source src="../audio/language_tts.wav" type="audio/wav" />
        Your browser does not support the audio element. Download:
        <a href="../audio/language_tts.wav">WAV</a></audio>
