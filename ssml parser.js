import { Reader } from "./reader.js";
import { SSMLTagsData } from "./ssml tags data.js";
import { SSMLTokenzier } from "./ssml tokenizer.js";

export class SSMLParser{
    constructor(txt = ""){
        this.tokenizer = new SSMLTokenzier(txt)
        this.reader = new Reader()
        this.generator = new SSMLTagsData()
        this.ssml_regex =  /%((?:w|s|e)|(?:p|r|v|t)(?<scale>[\+]{1,2}|[-]{1,2}|\d+)?|b(?<time>\d*(?:\.\d+)?)|(?:i|l)\((?<encap>[^\)]*?)\))%/i
        this.effect_regex = /(::(a0#|b0|c1|c1#|d1|d1#|e1|f1|f1#|g1|g1#|a1|a1#|b1|c2|bxl|bl|b|bs|bxs)::)/ig
        this.breath_regex = /(::(bxl|bl|b|bs|bxs)::)/ig
        this.token_array = []
        this.output = ""
    }

    initialize(txt){
        this.tokenizer.initializeTokenzier(txt)
        this.token_array = []
        this.output = ""
    }

    parse(txt = ""){
        if(txt !== ""){
            this.initialize(txt)
        }
        this.token_array = this.tokenizer.generateTokenArray()
        this._parse()
        this._parseEffects()
        return this.output
    }

    parseWithTokens(tokens){
        this.token_array = []
        this.output = ""
        this.token_array = tokens
        return this._parse()
    }
    
    _parse(){
        //console.log("TOKEN ARRAY:", this.token_array)
        this.reader.initializeText(this.token_array)

        while(this.reader.char){
            switch(this.reader.char){
                case "%%%":{
                    this.reader.readnext()
                    this._ssmlSwitch()
                    break;
                }
                default:{
                    this.output = this.output + this.reader.char
                }
            }
            this.reader.readnext()
        }

        return this.output
    }

    _parseEffects(){
        this.output = this.output.replace(this.effect_regex, (match, m_one, m_two) => {
            switch(m_two.toLowerCase()){
                case "bxl": return '<amazon:breath duration="x-long" volume="x-loud"/>';
                case "bl": return '<amazon:breath duration="long" volume="x-loud"/>';
                case "b": return '<amazon:breath duration="medium" volume="x-loud"/>';
                case "bs": return '<amazon:breath duration="short" volume="x-loud"/>';
                case "bxs": return '<amazon:breath duration="x-short" volume="x-loud"/>';
                case "a0#": return '<prosody pitch="-50%"><say-as interpret-as="expletive">Bs.</say-as></prosody>'
                case "b0": return '<prosody pitch="-30%"><say-as interpret-as="expletive">Bs.</say-as></prosody>'
                case "c1": return '<prosody pitch="-27%"><say-as interpret-as="expletive">Bs.</say-as></prosody>'
                case "c1#": return '<prosody pitch="-22%"><say-as interpret-as="expletive">Bs.</say-as></prosody>'
                case "d1": return '<prosody pitch="-17%"><say-as interpret-as="expletive">Bs.</say-as></prosody>'
                case "d1#": return '<prosody pitch="-12%"><say-as interpret-as="expletive">Bs.</say-as></prosody>'
                case "e1": return '<prosody pitch="-8%"><say-as interpret-as="expletive">Bs.</say-as></prosody>'
                case "f1": return '<prosody pitch="0%"><say-as interpret-as="expletive">Bs.</say-as></prosody>'
                case "f1#": return '<prosody pitch="+5%"><say-as interpret-as="expletive">Bs.</say-as></prosody>'
                case "g1": return '<prosody pitch="+10%"><say-as interpret-as="expletive">Bs.</say-as></prosody>'
                case "g1#": return '<prosody pitch="+18%"><say-as interpret-as="expletive">Bs.</say-as></prosody>'
                case "a1": return '<prosody pitch="+25%"><say-as interpret-as="expletive">Bs.</say-as></prosody>'
                case "a1#": return '<prosody pitch="+33%"><say-as interpret-as="expletive">Bs.</say-as></prosody>'
                case "b1": return '<prosody pitch="+40%"><say-as interpret-as="expletive">Bs.</say-as></prosody>'
                case "c2": return '<prosody pitch="+50%"><say-as interpret-as="expletive">Bs.</say-as></prosody>' 
                default: return m_one
            }
          })
    }

    _ssmlSwitch(){
        this.generator.reset()
        while(this.reader.char !== "%[%"){
            this._generateSSMLTag()
            this.reader.readnext()
        }
        let tags = this.generator.generateTags()
        this.output = this.output + tags.start
        
        let sub = this.reader.getEncapsulation("%[%", "%]%")
        let temp_parser = new SSMLParser()
        this.output = this.output + temp_parser.parseWithTokens(sub) + tags.end
        //console.log("Reader at char ", this.reader.char)
    }

    _generateSSMLTag(){
        let match = this.ssml_regex.exec(this.reader.char)
        //console.log("Char:", this.reader.char)
        //console.log("REGEX:", match[0], match.groups)
        if(match !== null){
            switch(match[1][0]){
                case "b": this.generator.setBreak(match.groups.time); return;
                case "e": this.generator.setSayAsInterpretAs("expletive"); return;
                case "i": this.generator.setPheomeIpa(match.groups.encap); return;
                case "p": this.generator.setProsodyPitch(match.groups.scale); return;
                case "r": this.generator.setProsodyRate(match.groups.scale); return;
                case "v": this.generator.setProsodyVolume(match.groups.scale); return;
                case "t": this.generator.setEffectTimbre(match.groups.scale); return;
                case "l": this.generator.setLang(match.groups.encap); return;
                case "w": this.generator.setEffectWhisper(); return;
                case "s": this.generator.setEffectSoft(); return;
                default: break;
            }
        }
        
        //console.log("Regex matching",this.reader.char, "got the match: ", match)
    }

}