import { validLangs } from "./valid values.js"
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
            volume: null,
            max_duration: null
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

        this.emphasis = null
        this.megaphone = {
            variation: null
        }
        this.reverb = {
            level: null
        }
        this.echo = {
            level: null
        }
        this.minified = false
        this.muffler = {
            level: null
        }
        this.robot = {
            level: null
        }
        this.anti_pop_break = false
    }

    setAntiPopBreak(){
        this.anti_pop_break = true
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

    setProsodyMaxDuration(value){
        value = parseFloat(value) * 1000
        if(isNaN(value)){ 
            return false
        }
        
        value = Math.floor(value)
        value = this._checkForNumber(value, 0, 60000, 5000)  
        this.prosody.max_duration = value
        return true
    }
    
    setLang(lang){
        let valid_langs = validLangs()
        let language = valid_langs[lang.toLowerCase()]
        if(language){
            this.lang = language
        }
    }
    
    setMegaphoneVariation(value){
        let check = this._checkForNumber(parseInt(value), 1, 2, 1)
        if(check !== false){
            this.megaphone.variation = check
            return true
        }
    }
    setReverbLevel(value){
        let check = this._checkForNumber(parseInt(value), 1, 3, 1)
        if(check !== false){
            this.reverb.level = check
            return true
        }else{
            return false
        }
    }
    setEchoLevel(value){
        let check = this._checkForNumber(parseInt(value), 1, 6, 2)
        if(check !== false){
            this.echo.level = check
            return true
        }else{
            return false
        }
    }
    setMinified(){
        this.minified = true
    }
    setMufflerLevel(value){
        let check = this._checkForNumber(parseInt(value), 1, 3, 1)
        if(check !== false){
            this.muffler.level = check
            return true
        }else{
            return false
        }
    }
    setRobotLevel(value){
        let check = this._checkForNumber(parseInt(value), 1, 3, 1)
        if(check !== false){
            this.robot.level = check
            return true
        }else{
            return false
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

    setEmphasis(value){
        let check = this._checkForPlusMinus(value, "strong", "moderate", "reduced", "reduced", "moderate")
        if(check !== false){
            this.emphasis = check
            return true
        }else{
            return false
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

        check = this._checkForNumber(value, 50, 200, 100)
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
                this.prosody.volume = `+${check-10}dB`
            }else{
                this.prosody.volume = `${check-10}dB`
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
        check = this._checkForNumber(value, 20, 2000, 100)
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
        this._generateBreak()
        this._generateProsody()
        this._generateEffect()
        this._generateReverb()
        this._generateMinified()
        this._generateEcho()
        this._generateMuffler()
        this._generateRobot()
        this._generateMegaphone()
        this._generateEmphasis()
        this._generateAntiPopBreak()
        this._generateSayAs()
        this._generateLanguage()
        this._generatePhoneme()

        return this.constructed_tags
    }
    _generateReverb(){
        if(this.reverb.level === null){
            return
        }
        let temp =`<mark name="reverb_${this.reverb.level}"/>`
        this.constructed_tags["start"] = this.constructed_tags["start"] + `${temp}` 
        this.constructed_tags["end"] = `<mark name="reverb_off"/>` + this.constructed_tags["end"]
    }
    _generateEcho(){
        if(this.echo.level === null){
            return
        }
        let temp =`<mark name="echo_${this.echo.level}"/>`
        this.constructed_tags["start"] = this.constructed_tags["start"] + `${temp}` 
        this.constructed_tags["end"] = `<mark name="echo_off"/>` + this.constructed_tags["end"]
    }
    _generateMinified(){
        if(!this.minified){
            return
        }
        let temp =`<mark name="minified_1"/>`
        this.constructed_tags["start"] = this.constructed_tags["start"] + `${temp}` 
        this.constructed_tags["end"] = `<mark name="minified_off"/>` + this.constructed_tags["end"]
    }
    _generateMegaphone(){
        if(this.megaphone.variation === null){
            return
        }
        let temp =`<mark name="megaphone_${this.megaphone.variation}"/>`
        this.constructed_tags["start"] = this.constructed_tags["start"] + `${temp}` 
        this.constructed_tags["end"] = `<mark name="megaphone_off"/>` + this.constructed_tags["end"]
    }
    _generateMuffler(){
        if(this.muffler.level === null){
            return
        }
        let temp =`<mark name="muffler_${this.muffler.level}"/>`
        this.constructed_tags["start"] = this.constructed_tags["start"] + `${temp}` 
        this.constructed_tags["end"] = `<mark name="muffler_off"/>` + this.constructed_tags["end"]
    }
    _generateRobot(){
        if(this.robot.level === null){
            return
        }
        let temp =`<mark name="robot_${this.robot.level}"/>`
        this.constructed_tags["start"] = this.constructed_tags["start"] + `${temp}` 
        this.constructed_tags["end"] = `<mark name="robot_off"/>` + this.constructed_tags["end"]
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
    _generateEmphasis(){
        let temp = "<emphasis"
        let has_data = false
        if(this.emphasis !== null){
            has_data = true
            temp = `${temp} level="${this.emphasis}">`
        }

        if(has_data){
            this.constructed_tags["start"] = this.constructed_tags["start"] + `${temp}` 
            this.constructed_tags["end"] = "</emphasis>" + this.constructed_tags["end"]
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

        if(this.prosody.max_duration !== null){
            temp = `${temp} amazon:max-duration="${this.prosody.max_duration}ms"`
            has_data = true
        } 

        if(has_data){
            this.constructed_tags["start"] = this.constructed_tags["start"] + temp + ">"
            this.constructed_tags["end"] = "</prosody>" + this.constructed_tags["end"]
        }else{
            return ""
        }
    }

    _generateAntiPopBreak(){
        if(this.anti_pop_break){
            let ssml = "<break time='5ms'/>"
            this.constructed_tags["end"] = ssml + this.constructed_tags["end"]
        }
    }
}