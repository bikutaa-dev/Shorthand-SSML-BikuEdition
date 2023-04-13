import { Reader } from "./reader.js"

export class SSMLTokenzier{
    constructor(txt = ""){
        this.reader = new Reader(txt)
        this.text = txt
        this.token_array = []
        this.accaptable_modifiers = ["p", "t", "r"]
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
                    temp = this._getModAndFloatScale("b")
                    if(temp){
                        test_array = test_array.concat(temp)
                        has_data = true
                    }
                    break
                }
                case "i":{
                    temp = this._getModAndEncap("i")
                    if(temp){
                        test_array = test_array.concat(temp)
                        has_data = true
                    }
                    break
                }
                case "l":{
                    temp = this._getModAndEncap("l")
                    if(temp){
                        test_array = test_array.concat(temp)
                        has_data = true
                    }
                    break
                }
                case "p":{
                    temp = this._getModAndScale("p")
                    if(temp){
                        test_array = test_array.concat(temp)
                        has_data = true
                    }
                    break
                }
                case "r":{
                    temp = this._getModAndScale("r")
                    if(temp){
                        test_array = test_array.concat(temp)
                        has_data = true 
                    }
                    break
                }
                case "v":{
                    temp = this._getModAndScale("v")
                    if(temp){
                        test_array = test_array.concat(temp)
                        has_data = true 
                    }
                    break
                }
                case "t":{
                    temp = this._getModAndScale("t")
                    if(temp){
                        test_array = test_array.concat(temp)
                        has_data = true 
                    }
                    break
                }
                case "w":{
                    test_array = test_array.concat("%w%")
                    has_data = true
                    break
                }
                case "s":{
                    test_array = test_array.concat("%s%")
                    has_data = true
                    break
                }
                case "e":{
                    test_array = test_array.concat("%e%")
                    has_data = true
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