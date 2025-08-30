import { Reader } from "./reader.js";
import { SSMLTagsData } from "./ssml tags data.js";
import { SSMLTokenzier } from "./ssml tokenizer.js";

export class SSMLParser{
    constructor(txt = ""){
        this.tokenizer = new SSMLTokenzier(txt)
        this.reader = new Reader()
        this.generator = new SSMLTagsData()
        this.ssml_regex =  /%((?:wh|so|ex)|(?:(?<dual_letter>em|me|ec|br|pi|ra|vo|ti|du|re|mi|mu|ro))(?<scale>[\+]{1,2}|[-]{1,2}|\d*(?:\.\d+)?)?|(?:ip|la)\((?<encap>[^\)]*?)\))%/i
        this.effect_regex = /(--(bxl|bl|b|bs|bxs)--)/ig
        this.special_characters = /((<3|&))/ig
        this.token_array = []
        this.output = ""
    }

    initialize(txt){
        txt = this._checkForSpecialCharacters(txt)
        this.tokenizer.initializeTokenzier(txt)
        this.token_array = []
        this.output = ""
    }

    _checkForSpecialCharacters(txt){
        return txt.replace(this.special_characters, (match, m_one) => {
            switch(m_one){
                case "<3": return "&lt;3"
                case "&": return "&amp;"
                default: return m_one
            }
        })
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
                default: return m_one
            }
          })
    }

    _ssmlSwitch(){
        this.generator.reset()
        let code = 0
        let has_expletive = false
        while(this.reader.char !== "%[%"){
            code = this._generateSSMLTag()
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
        //console.log("REGEX:", match[0], match.groups) 
        if(match !== null){
            const first_two_letters = match[1].substring(0,2).toLowerCase();
            switch(first_two_letters){
                case "em": this.generator.setEmphasis(match.groups.scale); return;
                case "me": this.generator.setMegaphoneVariation(match.groups.scale); return;
                case "br": this.generator.setBreak(match.groups.scale); return;
                case "pi": this.generator.setProsodyPitch(match.groups.scale); return;
                case "ra": this.generator.setProsodyRate(match.groups.scale); return;
                case "vo": this.generator.setProsodyVolume(match.groups.scale); return;
                case "ti": this.generator.setEffectTimbre(match.groups.scale); return;
                case "du": this.generator.setProsodyMaxDuration(match.groups.scale); return;
                case "re": this.generator.setReverbLevel(match.groups.scale); return;
                case "mi": this.generator.setMinified(); return;
                case "ec": this.generator.setEchoLevel(match.groups.scale); return;
                case "mu": this.generator.setMufflerLevel(match.groups.scale); return;
                case "ro": this.generator.setRobotLevel(match.groups.scale); return;
                case "ex": this.generator.setSayAsInterpretAs("expletive"); return;
                case "ip": this.generator.setPheomeIpa(match.groups.encap); return;
                case "la": this.generator.setLang(match.groups.encap); return;
                case "wh": this.generator.setEffectWhisper(); return;
                case "so": this.generator.setEffectSoft(); return;
                default: break;
            }
            console.log("match", match)
        }
        
        //console.log("Regex matching",this.reader.char, "got the match: ", match)
    }

}