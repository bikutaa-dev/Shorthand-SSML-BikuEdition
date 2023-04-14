# _Shorthand SSML for Bikubot_

---
## _How it works_

Any change to how something is spoken start with **_#_** followed by the modifications you wanna do to the voice, these modifications are represented by a letter [as an example **_p_** for pitch] and for some modification the addition of numbers are needed to represent the scale of the modification. Finally the spoken word you want the modification to apply to is encapsulated by **_[ and ]_**. Because of this the characters **[** and **]** are **reserved** and if used within a voice modification it needs to be a matching pair. \
 \
an example would be the SSML **_&lt;prosody pitch="+50%" rate="200%">This is a test&lt;/prosody>_** would in shorthand be **_#p150r200[this is a test]_**. Note that it's not a one to one for some things, as pitch in Normal SSML goes between -30 and +50, but shorthand only works with positive numbers so a conversion is done, where instead of starting at 0 the shorthand starts at 100 for pitch. \
 \
You can also mix any modifications, as an example if you wanted to add a whisper to the above example the shorthand would be: **_#wp150r200[this is a test]_**. The order of the modification characters does not matter. So you could do it like **_#p150wr200[this is a test]_** and it would work the same. \
 \
But if you would try to do something like **_#wr20r200[this is a test],_** that is to have the same modification more than once in the same **_tag_** it will only take the latest modification it sees in the tag so in the case it would seen the same as **_#wr200[this is a test]_**, the r20 will be thrown away. \
 \
The shorthand also support nested tags, so you could do something like **_#p150[this is a #w[test]]._** All modification is also case insensitive so **_#P150L(Sv-Se)[test]_** is the same as **_#p150l(sv-se)[test]_**. \
 \
The bot also does its best to fix any issues, such as if a value is too high it will set it to highest possible for that modification. \
 The possible modifications and their values can be found next.

---
## _Modifications_

---
### _Break_

pitch is represented by the letter **_b_** and supports either a following numeric value or **_+ , ++ , - , --_**. The SSML equivalence is the **_&lt;break time=””>_** tag. The break happens before any given text, if there is any in the encapsulating **_[]_** 




* **Effect:** Creates a break in the speech at the given point of the tag for the given amount of time in seconds..
* **Characters:** \
    These represent the same preset values that normal SSML has.
    * **++** = x-high
    * **+** = high
    * **-** = low
    * **--** = x-low

* **Numeric:**
    * **default:** 1.0
    * **max:** 10.0
    * **min:** 0.0

* **Example:**
    * **Characters:** \
        **#b+[]** is equal to **&lt;break strength=”strong” />**
* **Numeric:** \
    **#b1.2[A test]** is equal to **&lt;break strength=”1200ms” />A test** \
    **#b.5[]** is equal to **&lt;break strength=”500ms” />**

---
### _Expletive/Beep_

Expletive/beep is represented by the letter e and does not need any additional data. The SSML equivalence is the**_&lt;say-as interpret-as="expletive">_** tag.

* **Effect:** Beeps out the content.

---
### _IPA (International Phonetic Alphabet)_

IPA is represented by the letter **_i_** and followed by encapsulated in () the phonetic symbols for pronunciation. The SSML equivalence is the **_&lt;phoneme alphabet="ipa" ph=”">_** tag.
	

* **Effect: **Changes how the word(s) encapsulated in **_[]_** are spoken.** 


* **Example:** \
    **_#i(pɪˈkɑːn)[A test]_** is equal to **_&lt;phoneme alphabet="ipa" ph="pɪˈkɑːn">pecan&lt;/phoneme>_**

---
### _Language_

Language is represented by the letter **_l_** and followed by encapsulated in **_()_** the language code for the language you want to use. The SSML equivalence is the **_&lt;lang xml:lang="fr-FR">_** tag.


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
        **#l(ja-jp)[A test]** is equal to **&lt;lang xml:lang="ja-JP">A test&lt;/lang>**
    * **Numeric:** \
        **#l(en-us)[A test]** is equal to **&lt;lang xml:lang="en-US">A test&lt;/lang>**

---
### _Pitch_

pitch is represented by the letter **_p_** and supports either a following numeric value or **_+ , ++ , - , --_**. The SSML equivalence is the **_&lt;prosody pitch=””>_** tag. 

* **Effect:** Changes the pitch at which the spoken words are spoken at.
* **Characters:** \
    These represent the same preset values that normal SSML has.
    * **++ =** x-high
    * **+ =** high
    * **- =** low
    * **-- =** x-low 

* **Numeric:**
    * **default:** 100
    * **max:** 150
    * **min:** 70

* **Example:**
    * **Characters:** \
        **#p++[A test]** is equal to **&lt;prosody pitch=”x-high”>A test&lt;/prosody>**
    * **Numeric:** \
        **#p150[A test]** is equal to **&lt;prosody pitch=”50%”>A test&lt;/prosody>**

---
### _Soft_

soft speech is represented by the letter **_s_** and does not need any additional data. The SSML equivalence is the **_&lt;amazon:effect phonation="soft"">_** tag.



* **Effect:** Makes the speech being spoken sound softer.

---
### _Rate_

Rate is represented by the letter **_r_** and supports either a following numeric value or **_+ , ++ , - , --_**. The SSML equivalence is the **_&lt;prosody rate=””>_** tag. 



* **Effect:** Changes the speed at which the words are spoken.
* **Characters:** \
    These represent the same preset values that normal SSML has.
    * **++ =** x-fast
    * **+ =** fast
    * **- =** slow
    * **-- =** x-slow

* **Numeric:**
    * **default:** 100
    * **max:** 200
    * **min:** 20

* **Example:**
    * **Characters:**  \
        **#r--[A test]** is equal to **&lt;prosody rate=”x-slow”>A test&lt;/prosody>**
    * **Numeric:** \
        **#r150[A test]** is equal to **&lt;prosody rate=”150%”>A test&lt;/prosody>**

---
### _Timbre_

Rate is represented by the letter **_t_** and supports either a following numeric value or **_+ , ++ , - , --._** The SSML equivalence is the **_&lt;amazon:effect vocal-tract-length="">_**  tag. 



* **Effect:** Changes the timbre of voice.
* **Characters:**
    * **++ =** 200%
    * **+ =** 150%
    * **- =** 75%
    * **–- =** 50%

* **Numeric:**
    * **default:** 100
    * **max:** 200
    * **min:** 50

* **Example:**
    * **Characters:**  \
        **#t--[A test]** is equal to **&lt;amazon:effect vocal-tract-length="50%">_A test&lt;/amazon:effect>**
    * **Numeric:** \
        **#t50[A test]** is equal to **&lt;amazon:effect vocal-tract-length="50%">_A test&lt;/amazon:effect>**

---
### _Volume_

Volume is represented by the letter **_v_** and supports either a following numeric value or **_+ , ++ , - , --_**. The SSML equivalence is the **_&lt;prosody volume=””>_** tag.


* **Effect:** Changes the volume of the speech.

* **Characters:** \
    These represent the same preset values that normal SSML has.
    * **++ =** x-loud
    * **+ =** loud
    * **- =** soft
    * **-- =** x-soft

* **Numeric:**
    * **default:** 10
    * **max:** 14
    * **min:** 4 

* **Example:**
    * **Characters:**  \
        **#v+[A test]** is equal to **&lt;prosody volume=”loud”>A test&lt;/prosody>**
    * **Numeric: \
        **#v4[A test]** is equal to **&lt;prosody rate=”-6db”>A test&lt;/prosody>**

---
### _Whisper_

Is represented by the letter **_w_** and does not need any additional data. The SSML equivalence is the **_&lt;amazon:effect name="whispered">_** tag.



* **Effect:** Makes the spoken words be spoken in a whispering voice. \

* **Example:** \
    **#w[A test]** is equal to **_&lt;amazon:effect name="whispered">A test&lt;/amazon:effect>_**

---
## Special Effects

There are a few special effects that the shorthand supports. These sounds are represented by the effect name encapsulated by **_::_** , like **_::effectname::_** . Some of these will be affected by modifications as they are created with SSML and TTS, if so it will be noted.**_ _**Plans for the future is to allow streamers to add their own sounds to this system. These are all case insensitive.

---
### _Breath_

These are created using the SSML **_&lt;amazon:breath>_** tag. All breath uses the volume=”x-loud” for a chance to be heard.



* **_::BXL::_** = &lt;amazon:breath duration="x-long" volume="x-loud"/>
* **_::BL::_** = &lt;amazon:breath duration="long" volume=”x-loud"/>
* **_::B::_** = &lt;amazon:breath duration="medium" volume=”loud"/>
* **_::BS::_** = &lt;amazon:breath duration="short" volume=”loud"/>
* **_::BXS::_** = &lt;amazon:breath duration=”x-short" volume=”loud"/>

---
### _Music notes_

These are created by using pitch and the SSML expletive tag so might not be 100% accurate and will also be affected if part of a modification. The following notes are supported. Only tested with the Brian voice.

* **_::A0#::_** = A0#
* **_::B0::_** = B0
* **_::C1::_** = C1
* **_::C1#::_** = C1#
* **_::D1::_** = D1
* **_::D1#::_** = D1#
* **_::E1::_** = E1
* **_::F1::_** = F1
* **_::F1#::_** = F1#
* **_::A1#::_** = A1#
* **_::B1::_** = B1
* **_::C2::_** = C2
---