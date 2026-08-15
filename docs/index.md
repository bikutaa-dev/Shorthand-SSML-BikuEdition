---
layout: default
title: Shorthand SSML for Bikubot
nav_order: 1
---

# Shorthand SSML for Bikubot
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

- TOC
{:toc}

---

## Updates

**v2** \
With shorthand V2 the system moves from using one character to represent an effect to using two, this is to make the letter combination make more sense and open up more "slots" for future effects.
This v2 only work in streams that uses Bikubot v0.4.301 or later. If you want v1 you can find it here: [Shorthand v1](https://github.com/bikutaa-dev/Shorthand-SSML-BikuEdition/tree/Shorthand-v1)

In the [Modifications]({{ '/modifications/' | relative_url }}) section you can also find the 6 new effects added this time around (Echo, Megaphone, Minified, Muffler, Reverb and Robot). These effects are being added on in a second pass on the TTS audio gotten from AWS Polly.

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
 The possible modifications and their values can be found under [Modifications]({{ '/modifications/' | relative_url }}).

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
