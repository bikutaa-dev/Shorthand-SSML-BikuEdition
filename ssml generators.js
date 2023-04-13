import { validValues } from "./valid values"

export class SSMLGenerator{
    constructor(){
        if(SSMLGenerator.instance){
            return SSMLGenerator.instance
        }else{
            SSMLGenerator.instance = this
        }
        this.valid = new validValues()
    }

    pause(time){
        if(/none|x-weak|weak|medium|strong|x-strong|/i.test(time)){
            return `<break strenght="${time}"/>`
        }else if(/\d+(ms|s)/i.test(time)){
            return `<break time="${time}"/>`
        }else{
            return `<break time="1s"/>`
        }       
    }

    emphasis(txt, level){
        if(this.valid.emphasis[level.toLowerCase] && txt){
            return `<emphasis level="${level.toLowerCase()}">${txt}</emphasis>`
        }else if(txt){
            return `<emphasis level="moderate">${txt}</emphasis>`
        }else{
            return ""
        }
    }

    lang(txt, lang){
        lang = this.valid.lang[lang.toLowerCase()]
        if(lang && txt){
            return `<lang xml:lang="${lang}">${txt}</lang>`
        }else if(txt){
            return txt
        }else{
            return ""
        }
    }

    phoneme(txt, alphabet, ph){
        if(this.valid.phoneme.alpabet[alphabet.toLowerCase()] && txt){
            return `<phoneme alphabet="${alphabet.toLowerCase()}" ph="${ph}">${txt}</phoneme>`
        }else if(txt){
            return txt
        }else{
            return ""
        }
    }

    prosody(txt, volume, rate, pitch){
        let prosdoybuild = "<prosody"
        if(volume){
            if(this.valid.prosody.volume.test(volume)){
                prosdoybuild = `${prosdoybuild} volume="${volume}"`
            }else{
                prosdoybuild = `${prosdoybuild} volume="default"`
            }
        }

        if(rate){
            if(this.valid.prosody.rate.test(rate)){
                prosdoybuild = `${prosdoybuild} rate="${rate}"`
            }else{
                prosdoybuild = `${prosdoybuild} rate="medium"`
            }
        }
    }
}