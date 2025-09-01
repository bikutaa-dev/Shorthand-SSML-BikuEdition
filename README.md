# Updates
With shorthand V2 the system moves from using one character to represent an effect to using two, this is to make the letter combination make more sense and open up more "slots" for future effets.
This shorthand is not currently implemented in Bikubot so will not work on streams until implemented.

Down below you can also find the 6 new effects added this time around. These effects are being added on in a second pass on the TTS audio gotten from AWS Polly.
  - [_Modifications_](#modifications)
    - [_Echo_](#echo)
    - [_Megaphone_](#megaphone)
    - [_Minified_](#minified)
    - [_Muffler_](#muffler)
    - [_Reverb_](#reverb)
    - [_Robot_](#robot)

---
  
  # **Shorthand SSML for Bikubot**
- [**Shorthand SSML for Bikubot**](#shorthand-ssml-for-bikubot)
  - [_What is this_](#what-is-this)
  - [_How it works_](#how-it-works)
  - [_Short Notes_](#short-notes)
  - [_Modifications_](#modifications)
    - [_Break_](#break)
    - [_Emphasis_](#emphasis)
    - [_Echo_](#echo)
    - [_Expletive/Beep_](#expletivebeep)
    - [_IPA (International Phonetic Alphabet)_](#ipa-international-phonetic-alphabet)
    - [_Language_](#language)
    - [_Max Duration_](#max-duration)
    - [_Megaphone_](#megaphone)
    - [_Minified_](#minified)
    - [_Muffler_](#muffler)
    - [_Pitch_](#pitch)
    - [_Soft_](#soft)
    - [_Rate_](#rate)
    - [_Reverb_](#reverb)
    - [_Robot_](#robot)
    - [_Timbre_](#timbre)
    - [_Volume_](#volume)
    - [_Whisper_](#whisper)
  - [Special Effects](#special-effects)
    - [_Breath_](#breath)
    - [_Tones_](#tones)

---
## _What is this_
This is a custom and shortend way to control the TTS voices of Bikubot, this uses [AWS Polly SSML tags](https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html) to control how the voice sounds, but shortend and simplfies the tags to make it easier and shorter to use. 

## _How it works_

Any change to how something is spoken start with **_#_** followed by the modifications you wanna do to the voice. These modifications are represented by a two-letter code [as an example **_pi_** for pitch] and for some modification the addition of numbers are needed to represent the scale of the modification. Finally the spoken word you want the modification to apply to is encapsulated by **_[ and ]_**. Because of this the characters **[** and **]** are **reserved** and if used within a voice modification it needs to be a matching pair. \
 
an example would be the SSML **_&lt;prosody pitch="+50%" rate="200%">This is a test&lt;/prosody>_** would in shorthand be **_#pi150ra200[this is a test]_**. Note that it's not a one to one for some things, as pitch in Normal SSML goes between -30 and +50, but shorthand only works with positive numbers so a conversion is done, where instead of starting at 0 the shorthand starts at 100 for pitch. \
 
You can also mix any modifications, as an example if you wanted to add a whisper to the above example the shorthand would be: **_#whpi150ra200[this is a test]_**. The order of the modification codes does not matter. So you could do it like **_#pi150whra200[this is a test]_** and it would work the same. \
 
But if you would try to do something like **_#whra20ra200[this is a test],_** that is to have the same modification more than once in the same **_tag_** it will only take the latest modification it sees in the tag so in the case it would seen the same as **_#whra200[this is a test]_**, the ra20 will be thrown away. \
 
The shorthand also support nested tags, so you could do something like **_#pi150[this is a #wh[test]]._** All modification is also case insensitive so **_#PI150LA(Sv-Se)[test]_** is the same as **_#pi150la(sv-se)[test]_**. \
 
The bot also does its best to fix any issues, such as if a value is too high it will set it to highest possible for that modification. \
 The possible modifications and their values can be found next.

---
## _Short Notes_
* A voice modifications starts with **#** followed by one or more modification found below, then ending with the speech you want modified encapsulated in **[** and **]**.
* The characters **[** and **]** are reserved characters and if used, need to be used in pairs when used outside their intended use case (marking what to modifiy).
* You can do nested modifications.
    * **Example:** 
      * **#pi150[this is a nested pitch #wh[whisper test]]** 
      * **#pi150[this is #wh[deeply #ra120so[nested and #ti120[going deeper], and] now] back up]** 
      * **#vo11[#wh[testing #so[softly] whispering] with a bit higher volume, #ti50[ending with some timbre]]**
* You can add more then one modification per voice modificiation, the order does not matter.
    * **Example:** 
      * **#pi150wh[this is a modifed pitch with whipser]** 
      * **#whsoti50la(sv-se)[this soft and whispering swedish language voice with modified timbre]** 
      * **#br.5ti50pi150ra180[This starts with a 0.5s break and modified pitch, rate and timbre]** 
* The modification part is case insensative.
* Any modification value outside it's min or max range will be set to its min or max (whatever is closest).
* Any modification value that is not valid will be set to a normalized default value.
* Any characters that does not represent a modification will be ignored if part of the modification part.
* A Faulty voice modification, like a space in the modification part or not correctly encapsulated will be read as normal.
---
## _Modifications_

---
### _Break_

Break is represented by the code **_br_** and supports either a following numeric value or **_+ , ++ , - , --_**. The SSML equivalence is the **_&lt;break time=””>_** tag. The break happens before any given text, if there is any in the encapsulating **_[]_** 

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
        **_#br+[]_** is equal to **_&lt;break strength=”strong” />_**
  * **Numeric:** \
        **_#br1.2[A test]_** is equal to **_&lt;break strength=”1200ms” />A test_** \
        **_#br.5[]_** is equal to **_&lt;break strength=”500ms” />_**

---
### _Emphasis_

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

---
### _Echo_
Echo is a secondary effect, meaning its beeing added on after the TTS is generated.

Echo is represented by the code **_ec_** and needs a following number between 1 and 6 for the strength of the echo effect. There is no SSML equivalence.

* **Effect:** Adds an echo effect at the chosen level.

* **Numeric:**
    * **default:** 0.3
    * **max:** 1.0
    * **min:** 0.0

* **Example:** \
    **_#ec0.75[A test]_**

---
### _Expletive/Beep_

Expletive/beep is represented by the code **_ex_** and does not need any additional data. The SSML equivalence is the**_&lt;say-as interpret-as="expletive">_** tag.

* **Effect:** Beeps out the content.

* **Example:** \
    **_#ex[A test]_** is equal to **_&lt;say-as interpret-as="expletive">A test&lt;/say-as>_**

---
### _IPA (International Phonetic Alphabet)_

IPA is represented by the code **_ip_** and followed by encapsulated in () the phonetic symbols for pronunciation. The SSML equivalence is the **_&lt;phoneme alphabet="ipa" ph=”">_** tag.
	

* **Effect:** Changes how the word(s) encapsulated in **_[]_** are spoken.** 


* **Example:** \
    **_#ip(pɪˈkɑːn)[A test]_** is equal to **_&lt;phoneme alphabet="ipa" ph="pɪˈkɑːn">pecan&lt;/phoneme>_**

---
### _Language_

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
---
### _Megaphone_
Megaphone is a secondary effect, meaning its beeing added on after the TTS is generated.

Megaphone is represented by the code **_me_** and needs a following numeric level 1–2. There is no SSML equivalence.

* **Effect:** Applies a megaphone effect at the chosen level.

* **Numeric:**
    * **default:** 1
    * **max:** 2
    * **min:** 1

* **Example:** \
    **_#me2[A test]_**

---
### _Max Duration_

Max duration is represented by the code **_du_** and needs a following numeric value. The SSML equivalance is the **_&lt;prosody amazon:max-duration="">_** tag. There is limits on how fast the speech can be speed up, and if it already fits within the duration no changes are made.

* **Effect:** Tries to speed up the speech so it fits within the given time.

* **Numeric:**
    * **default:** 1.0
    * **max:** 60.0
    * **min:** 0.0

* **Example**
    **_#du5.3[A test]_** is equal to **_&lt;prosody amazon:max-duration="5300ms">A test&lt;/prosody>_** /
    **_#du.5[A test]_** is equal to **_&lt;prosody amazon:max-duration="500ms">A test&lt;/prosody>_** /

---
### _Minified_
Minified is a secondary effect, meaning its beeing added on after the TTS is generated.

Minified is represented by the code **_mi_** and has a single level. There is no SSML equivalence.

* **Effect:** Applies a "minified" effect. Where it sounds like the speech is coming from something small.

* **Numeric:**
    * Fixed level: 1

* **Example:** \
    **_#mi[A test]_**

---
### _Muffler_
Muffler is a secondary effect, meaning its beeing added on after the TTS is generated.

Muffler is represented by the code **_mu_** and needs a following numeric level 1–3. There is no SSML equivalence.

* **Effect:** Applies a muffling effect at the chosen level.

* **Numeric:**
    * **default:** 1
    * **max:** 3
    * **min:** 1

* **Example:** \
    **_#mu2[A test]_**

---
### _Pitch_

Pitch is represented by the code **_pi_** and supports either a following numeric value or **_+ , ++ , - , --_**. The SSML equivalence is the **_&lt;prosody pitch=””>_** tag. 

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
        **_#pi++[A test]_** is equal to **_&lt;prosody pitch=”x-high”>A test&lt;/prosody>_**
    * **Numeric:** \
        **_#pi150[A test]_** is equal to **_&lt;prosody pitch=”50%”>A test&lt;/prosody>_**

---
### _Soft_

Soft speech is represented by the code **_so_** and does not need any additional data. The SSML equivalence is the **_&lt;amazon:effect phonation="soft"">_** tag.

* **Effect:** Makes the speech being spoken sound softer.

* **Example:** \
    **_#so[A test]_** is equal to **_&lt;amazon:effect phonation="soft""A test&lt;/amazon:effect>_**

---
### _Rate_

Rate is represented by the code **_ra_** and supports either a following numeric value or **_+ , ++ , - , --_**. The SSML equivalence is the **_&lt;prosody rate=””>_** tag. 



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
        **_#ra--[A test]_** is equal to **_&lt;prosody rate=”x-slow”>A test&lt;/prosody>_**
    * **Numeric:** \
        **_#ra150[A test]_** is equal to **_&lt;prosody rate=”150%”>A test&lt;/prosody>_**

---
### _Reverb_
Reverb is a secondary effect, meaning its beeing added on after the TTS is generated.

Reverb is represented by the code **_re_** and needs a following numeric level 1–3. There is no SSML equivalence.

* **Effect:** Adds reverb at the chosen level.

* **Numeric:**
    * **default:** 1
    * **max:** 3
    * **min:** 1

* **Example:** \
    **_#re3[A test]_**

---
### _Robot_
Robot is a secondary effect, meaning its beeing added on after the TTS is generated.

Robot is represented by the code **_ro_** and needs a following numeric level 1–2. There is no SSML equivalence.

* **Effect:** Applies a robotic effect at the chosen level.

* **Numeric:**
    * **default:** 1
    * **max:** 2
    * **min:** 1

* **Example:** \
    **_#ro2[A test]_**

---
### _Timbre_

Timbre is represented by the code **_ti_** and supports either a following numeric value or **_+ , ++ , - , --._** The SSML equivalence is the **_&lt;amazon:effect vocal-tract-length="">_**  tag. 


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
        **_#ti--[A test]_** is equal to **_&lt;amazon:effect vocal-tract-length="50%">A test&lt;/amazon:effect>_**
    * **Numeric:** \
        **_#ti50[A test]_** is equal to **_&lt;amazon:effect vocal-tract-length="50%">A test&lt;/amazon:effect>_**

---
### _Volume_

Volume is represented by the code **_vo_** and supports either a following numeric value or **_+ , ++ , - , --_**. The SSML equivalence is the **_&lt;prosody volume=””>_** tag.


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
        **_#vo+[A test]_** is equal to **_&lt;prosody volume=”loud”>A test&lt;/prosody>_**
    * **Numeric: \
        **_#vo4[A test]_** is equal to **_&lt;prosody rate=”-6db”>A test&lt;/prosody>_**

---
### _Whisper_

Is represented by the code **_wh_** and does not need any additional data. The SSML equivalence is the **_&lt;amazon:effect name="whispered">_** tag.



* **Effect:** Makes the spoken words be spoken in a whispering voice. \

* **Example:** \
    **_#wh[A test]_** is equal to **_&lt;amazon:effect name="whispered">A test&lt;/amazon:effect>_**

---
## Special Effects

There are a few special effects that the shorthand supports. These sounds are represented by the effect name encapsulated by **_--_** , like **_--effectname--_** . Some of these will be affected by modifications as they are created with SSML and TTS, if so it will be noted.**_ _**Plans for the future is to allow streamers to add their own sounds to this system. These are all case insensitive.

---
### _Breath_

These are created using the SSML **_&lt;amazon:breath>_** tag. All breath uses the volume=”x-loud” for a chance to be heard.



* **_--BXL--_** = &lt;amazon:breath duration="x-long" volume="x-loud"/>
* **_--BL--_** = &lt;amazon:breath duration="long" volume=”x-loud"/>
* **_--B--_** = &lt;amazon:breath duration="medium" volume=”loud"/>
* **_--BS--_** = &lt;amazon:breath duration="short" volume=”loud"/>
* **_--BXS--_** = &lt;amazon:breath duration=”x-short" volume=”loud"/>

---

### _Tones_
The following cheat sheet uses the old one character system, if you use it make sure to use the two character system.

This is a cheat sheet on how to create tone sounding sounds by using the Expletive/Beep tag, that was created by a community memeber [Nowrench](https://x.com/NoWrench).
![TTS-Melody-Guide](https://github.com/bikutaa-dev/Shorthand-SSML-BikuEdition/assets/64921696/53866c05-31bd-4ca0-af25-2113acb58d29)


---
