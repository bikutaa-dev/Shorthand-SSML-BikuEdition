import {validLangs} from "./valid values.js"
export class SSMLTagsData{
    constructor(){
        this.reset()
    }

    reset(){
        this.constructed_tags = {start: "", end: ""}
        this.whisper = false
        this.break = null
        this.lang = null
        this.prosody = {
            rate: null,
            pitch: null,
            volume: null
        }
        this.pheome = {
            alphabet: "ipa",
            ph: null

        }
        this.effect = {
            whisper: false,
            soft: false,
            timbre: null
        }

        this.say_as = {
            interpret_as: null
        }
    }

    setBreak(value){
        let check = this._checkForPlusMinus(value, "x-strong", "strong", "weak", "x-weak", "weak")
        if(check !== false){
            this.break = ["strength", check]
            return true
        }else if(typeof value === "string"){
            value = Math.floor(parseFloat(value) * 1000)
        }

        check = this._checkForNumber(value, 0, 10000, 1000)
        if(check !== false){
            this.break = ["time", check + "ms"]
            return true
        }else{
            return false
        }
    }
    setLang(lang){
        let valid_langs = validLangs()
        let language = valid_langs[lang.toLowerCase()]
        if(language){
            this.lang = language
        }
    }
    setEffectWhisper(){
        this.effect.whisper = true
    }

    setSayAsInterpretAs(as_type){
        this.say_as.interpret_as = as_type
    }

    setEffectSoft(){
        this.effect.soft = true
    }

    setPheomeIpa(value){
        if(typeof value === "string"){
            this.pheome.ph = value
        }
    }

    setEffectTimbre(value){
        let check = this._checkForPlusMinus(value, "200%", "150%", "75%", "50%", "100%")
        if(check !== false){
            this.effect.timbre = check
            return true
        }else if(typeof value === "string"){
            value = parseInt(value)
        }

        check = this._checkForNumber(value, 50, 500, 100)
        if(check !== false){
            this.effect.timbre = check + "%"
            return true
        }else{
            return false
        }
    }

    setProsodyVolume(value){
        let check = this._checkForPlusMinus(value, "x-loud", "loud", "soft", "x-soft", "medium")
        if(check !== false){
            this.prosody.volume = check
            return true
        }else if(typeof value === "string"){
            value = parseInt(value)
        }
        check = this._checkForNumber(value, 4, 14, 10)
        if(check !== false){
            if(check-10 >= 0){
                this.prosody.volume = `+${check-10}db`
            }else{
                this.prosody.volume = `${check-10}db`
            }
            return true
        }else{
            return false
        }
    }
    setProsodyRate(value){
        let check = this._checkForPlusMinus(value, "x-fast", "fast", "slow", "x-slow", "medium")
        if(check !== false){
            this.prosody.rate = check
            return true
        }else if(typeof value === "string"){
            value = parseInt(value)
        }
        check = this._checkForNumber(value, 20, 200, 100)
        if(check !== false){
            this.prosody.rate = `${check}%`
            return true
        }else{
            return false
        }
    }

    setProsodyPitch(value){
        let check = this._checkForPlusMinus(value, "x-high", "high", "low", "x-low", "medium")
        if(check !== false){
            this.prosody.pitch = check
            return
        }else if(typeof value === "string"){
            value = parseInt(value)
        }

        check = this._checkForNumber(value, 70, 150, 0)
        if(check !== false){
            if(check-100 >= 0){
                this.prosody.pitch = `+${check-100}%`
            }else{
                this.prosody.pitch = `${check-100}%`
            }
            return true
        }else{
            return false
        }

    }

    _checkForNumber(value, min, max, fallback){
        if(isNaN(value)){
            return fallback
        }else if(value > max){
            return max
        }else if(value < min){
            return min
        }else{
            return value
        }
    }
    _checkForPlusMinus(value, plusplus, plus, minus, minusminus, fallback){
        if(value === "+"){
            return plus
        }else if(value === "++"){
            return plusplus
        }else if(value === "-"){
            return minus
        }else if(value === "--"){
            return minusminus
        }else if(value === undefined){
            return fallback
        }else{
            return false
        }
    }

    generateTags(){
        this._generateProsody()
        this._generateEffect()
        this._generateBreak()
        this._generateSayAs()
        this._generatePhoneme()
        this._generateLanguage()
        return this.constructed_tags
    }

    _generateLanguage(){
        let temp = "<lang "
        let has_data = false
        if(this.lang !== null){
            has_data = true
            temp = `${temp} xml:lang="${this.lang}">`
        }

        if(has_data){
            this.constructed_tags["start"] = this.constructed_tags["start"] + `${temp}` 
            this.constructed_tags["end"] = "</lang>" + this.constructed_tags["end"]
        }

    }

    _generatePhoneme(){
        //<phoneme alphabet="ipa" ph="pɪˈkɑːn">
        let temp = "<phoneme "
        let has_data = false

        if(this.pheome.ph !== null){
            temp = `${temp} alphabet="${this.pheome.alphabet}" ph="${this.pheome.ph}">`
            has_data = true
        }

        if(has_data){
            this.constructed_tags["start"] = this.constructed_tags["start"] + `${temp}` 
            this.constructed_tags["end"] = "</phoneme>" + this.constructed_tags["end"]
        }
    }

    _generateBreak(){
        let temp = "<break"
        let has_data = false

        if(this.break !== null && this.break.length > 1){
            temp = `${temp} ${this.break[0]}="${this.break[1]}"`
            has_data = true
        }
        if(has_data){
            this.constructed_tags["start"] = this.constructed_tags["start"] + `${temp}/>` 
        }
    }

    _generateSayAs(){
        let temp = "<say-as interpret-as="
        let has_data = false

        if(this.say_as.interpret_as !== null){
            temp = `${temp}"${this.say_as.interpret_as}">`
            has_data = true
        }

        if(has_data){
            this.constructed_tags["start"] = this.constructed_tags["start"] + `${temp}` 
            this.constructed_tags["end"] = "</say-as>" + this.constructed_tags["end"]
        }
    }

    _generateEffect(){
        let temp = "<amazon:effect"
        let has_data = false
        if(this.effect.whisper){
            temp = `${temp} name="whispered"`
            has_data = true
        }

        if(this.effect.soft){
            temp = `${temp} phonation="soft"`
            has_data = true
        }

        if(this.effect.timbre !== null){
            temp = `${temp} vocal-tract-length="${this.effect.timbre}"`
            has_data = true
        }

        if(has_data){
            this.constructed_tags["start"] = this.constructed_tags["start"] + `${temp}>` 
            this.constructed_tags["end"] = "</amazon:effect>" + this.constructed_tags["end"]
        }
        
    }

    _generateProsody(){
        let temp = "<prosody"
        let has_data = false
        
        if(this.prosody.pitch !== null){
            temp = `${temp} pitch="${this.prosody.pitch}"`
            has_data = true
        }

        if(this.prosody.rate !== null){
            temp = `${temp} rate="${this.prosody.rate}"`
            has_data = true
        }

        if(this.prosody.volume !== null){
            temp = `${temp} volume="${this.prosody.volume}"`
            has_data = true
        }

        if(has_data){
            this.constructed_tags["start"] = this.constructed_tags["start"] + temp + ">"
            this.constructed_tags["end"] = "</prosody>" + this.constructed_tags["end"]
        }else{
            return ""
        }
    }

}