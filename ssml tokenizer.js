import { Reader } from "./reader.js"

export class SSMLTokenzier{
    constructor(txt = ""){
        this.reader = new Reader(txt)
        this.text = txt
        this.token_array = []
        this.startedSSML = false
        this.char = this.reader.read()
    }

    initializeTokenzier(txt){
        this.reader.initializeText(txt)
        this.text = txt
        this.token_array = []
        this.char = this.reader.read()
    }

    generateTokenArray(){
        this.reader.read()
        let sub_string = ""
        loop:
        while(this.reader.char !== undefined){
            ////console.log("CHAR", this.reader.char
            switch(this.reader.char){
                case "#":{
                    if(sub_string.length){
                        this.token_array.push(sub_string)
                        sub_string = ""
                    }
                    let start_i = this.reader.i
                    if(!this._SSMLSwitch()){
                        sub_string = sub_string + "#"
                        this.reader.moveHeadTo(start_i)
                    }
                    this.reader.readnext()
                    break;
                }
                default:{
                    sub_string = sub_string + this.reader.char
                    this.reader.readnext()
                }
            } 
        }
        if(sub_string.length){
            this.token_array.push(sub_string)
        }
        return this.token_array
    }

    _SSMLSwitch(){
        let test_array = ["%%%"]
        let temp = []
        let has_data = false
        while(this.reader.char){
            this.reader.readnext()
            
            if(this.reader.char === undefined){
                return false
            }

            switch(this.reader.char.toLowerCase()){
                case "b":{
                    temp = this._letterB()
                    if(temp){
                        test_array = test_array.concat(temp)
                        has_data = true
                    }
                    break
                }
                case "i":{
                    temp = this._letterI()
                    if(temp){
                        test_array = test_array.concat(temp)
                        has_data = true
                    }
                    break
                }
                case "l":{
                    temp = this._letterL()
                    if(temp){
                        test_array = test_array.concat(temp)
                        has_data = true
                    }
                    break
                }
                case "p":{
                    temp = this._letterP()
                    if(temp){
                        test_array = test_array.concat(temp)
                        has_data = true
                    }
                    break
                }
                case "m":{
                    temp = this._letterM()
                    if(temp){
                        test_array = test_array.concat(temp)
                        has_data = true
                    }
                    break
                }

                case "r":{
                    temp = this._letterR()
                    if(temp){
                        test_array = test_array.concat(temp)
                        has_data = true 
                    }
                    break
                }
                case "v":{
                    temp = this._letterV()
                    if(temp){
                        test_array = test_array.concat(temp)
                        has_data = true 
                    }
                    break
                }
                case "t":{
                    temp = this._letterT()
                    if(temp){
                        test_array = test_array.concat(temp)
                        has_data = true 
                    }
                    break
                }
                case "w":{
                    temp = this._letterW()
                    if(temp){
                        test_array = test_array.concat(temp)
                        has_data = true
                    }
                    break
                }
                case "s":{
                    temp = this._letterS()
                    if(temp){
                        test_array = test_array.concat(temp)
                        has_data = true
                    }
                    break
                }
                case "e":{
                    temp = this._letterE()
                    if(temp){
                        test_array = test_array.concat(temp)
                        has_data = true
                    }
                    break
                }
                case "d":{
                    temp = this._letterD()
                    if(temp){
                        test_array = test_array.concat(temp)
                        has_data = true 
                    }
                    break
                }
                case "[":{
                    temp = this._switchEncapsulation()
                    if(temp && temp.length && has_data){
                        has_data = true
                        test_array = test_array.concat(temp)
                        this.token_array = this.token_array.concat(test_array)
                        return true;
                    }else{
                        return false;
                    }
                }
                case " ":{
                    return false
                }
                
            }
        }
    }

    _letterM() {
        switch(this.reader.peak()){
            case "e":{
                this.reader.readnext()
                let temp = this._getModAndScale("me")
                if(temp){
                    return temp
                }
            }
            case "i":{
                this.reader.readnext()
                return ["%mi%"]
            }
            case "u":{
                this.reader.readnext()
                let temp = this._getModAndScale("mu")
                if(temp){
                    return temp
                }
            }
            default:{
                return false
            }
        }
    }

    _letterE() {
        switch(this.reader.peak()){
            case "x":{
                this.reader.readnext()
                return ["%ex%"]
            }
            case "m":{
                this.reader.readnext()
                let temp = this._getModAndScale("em")
                if(temp){
                    return temp
                }
            }
            case "c":{
                this.reader.readnext()
                let temp = this._getModAndScale("ec")
                if(temp){
                    return temp
                }
            }
            default:{
                return false
            }
        }
    }

    _letterI(){
        switch(this.reader.peak()){
            case "p":{
                this.reader.readnext()
                let temp = this._getModAndEncap("ip")
                if(temp){
                    return temp
                }
            }
            default:{
                return false
            }
        }
    }

    _letterB() {
        switch(this.reader.peak()){
            case "r":{
                this.reader.readnext()
                let temp = this._getModAndFloatScale("br")
                if(temp){
                    return temp
                }
            }
            default:{
                return false
            }
        }
    }

    _letterL(){
        switch(this.reader.peak()){
            case "a":{
                this.reader.readnext()
                let temp = this._getModAndEncap("la")
                if(temp){
                    return [temp]
                }
            }
            default:{
                return false
            }
        }
    }

    _letterP(){
        switch(this.reader.peak()){
            case "i":{
                this.reader.readnext()
                let temp = this._getModAndScale("pi")
                if(temp){
                    return temp
                }
            }
            default:{
                return false
            }
        }
    }

    _letterR(){
        switch(this.reader.peak()){
            case "a":{
                this.reader.readnext()
                let temp = this._getModAndScale("ra")
                if(temp){
                    return temp
                }
            }
            case "e":{
                this.reader.readnext()
                let temp = this._getModAndScale("re")
                if(temp){
                    return temp
                }
            }
            case "o":{
                this.reader.readnext()
                let temp = this._getModAndScale("ro")
                if(temp){
                    return temp
                }
            }
            default:{
                return false
            }
        }
    }

    _letterV(){
        switch(this.reader.peak()){
            case "o":{
                this.reader.readnext()
                let temp = this._getModAndScale("vo")
                if(temp){
                    return temp
                }
            }
            default:{
                return false
            }
        }
    }

    _letterT(){
        switch(this.reader.peak()){
            case "i":{
                this.reader.readnext()
                let temp = this._getModAndScale("ti")
                if(temp){
                    return temp
                }
            }
            default:{
                return false
            }
        }
    }

    _letterW(){
        switch(this.reader.peak()){
            case "h":{
                this.reader.readnext()
                return ["%wh%"]
            }
            default:{
                return false
            }
        }
    }

    _letterS(){
        switch(this.reader.peak()){
            case "o":{
                this.reader.readnext()
                return ["%so%"]
            }
            default:{
                return false
            }
        }
    }

    _letterD(){
        switch(this.reader.peak()){
            case "u":{
                this.reader.readnext()
                let temp = this._getModAndFloatScale("du")
                if(temp){
                    return temp
                }
            }
            default:{
                return false
            }
        }
    }

    _switchEncapsulation(){
        let test = this.reader.isEncapsulating("[", "]")
        if(test !== false){
            let sub = this.reader.getSubstring(test.open + 1, test.close - 1)
            let sub_tokenizer = new SSMLTokenzier(sub)
            let sub_array = ["%[%"]
            sub_array = sub_array.concat(sub_tokenizer.generateTokenArray())
            sub_array.push("%]%")
            this.reader.moveHeadTo(test.close)
            return sub_array
        }else{
            return false
        }
        
    }

    _getModAndEncap(letter){
        let data = "%" + letter  
        if(this.reader.peak() === "("){
            this.reader.readnext()
            let encap = this.reader.getSuperGreedyEncapsulation("(", ")", true)
            if(encap !== false){
                return `${data}${encap}%`
            }else{
                return false
            }
        }else{
            return false
        }
        
    }

    _getModAndScale(letter){
        let data = "%" + letter 
        let complete_data = false
        let temp_array = []
        //console.log(letter, "peeking", this.reader.peak())
        while(this._isCharNumber(this.reader.peak()) || this.reader.peak() === "+" || this.reader.peak() === "-"){
            this.reader.readnext()
           //console.log(letter, "found", this.reader.char)
            data = data + this.reader.char
            complete_data = true  
        }

        temp_array.push(data + "%")
        return temp_array
    }

    _getModAndFloatScale(letter){
        let data = "%" + letter 
        let complete_data = false
        let temp_array = []
        //console.log("P peeking", this.reader.peak())
        while(this._isCharNumber(this.reader.peak()) || this.reader.peak() === "." || this.reader.peak() === "+" || this.reader.peak() === "-"){
            this.reader.readnext()
            //console.log("P found NUMBER", this.reader.char)
            data = data + this.reader.char
            complete_data = true  
        }

        temp_array.push(data + "%")
        return temp_array
    }

    _isCharNumber(c) {
        return c >= '0' && c <= '9';
      }
}