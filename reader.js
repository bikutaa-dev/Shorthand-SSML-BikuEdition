
export class Reader{
    constructor(txt = ""){
        this.i = 0
        this.lookahead_index = 0
        this.text = txt
        this.char = this.text[0]
    }

    initializeText(txt){
        this.text = txt
        this.i = 0
        this.lookahead_index = 0
        this.char = this.text[0]
    }

    read(){
        if(this.i >= this.text.length){
            return undefined
        }else{
            this.char = this.text[this.i]
            return this.text[this.i]
        }
    }

    readnext(){
        this.i++
        this.char = this.text[this.i]
        if(this.i >= this.text.length){
            return undefined
        }else{
            return this.text[this.i]
    }
        }
        
    moveHeadForward(movment = 1){
        this.i = this.i + movment
        if(this.i > this.text.length){
            this.i = this.text.length - 1
        }
        this.char = this.text[this.i]
    }

    moveHeadTo(i){
        if(i > this.text.length){
            i = this.text.length - 1
        }else if(i < 0){
            i = 0
        }
        this.i = i
        this.char = this.text[this.i]
    }

    moveHeadBackward(movment = 1){
        this.i = this.i - movment
        if(this.i < 0){
            this.i = 0
        }
        this.char = this.text[this.i]
    }

    getSubstring(start, end){
        return this.text.substring(start, end+1)
    }

    getSubstringToChar(char){
        let text = ""
        for(let i = this.i; i < this.text.length; i++){
            text = text + this.text[i]
                if(this.text[i] === char){
                    return text
                }
        }
        return undefined
    }

    peak(steps_ahead = 1){
        return this.text[this.i + steps_ahead]
    }
    

    getEncapsulation(open_char, close_char, with_encap = false){
        let encap = this.isEncapsulating(open_char, close_char)
        if(encap !== false){
            let new_array = null
            if(with_encap){
                new_array = this.text.slice(encap.open, encap.close + 1)
            }else{
                new_array = this.text.slice(encap.open + 1, encap.close)
            }
            this.moveHeadTo(encap.close)
            return new_array
        }else{
            return false
        }
    }

    getSuperGreedyEncapsulation(open_char, close_char, with_encap = false){
        let encap = this.isSuperGreedyEncapsulation(open_char, close_char)
        if(encap !== false){
            let new_array = null
            if(with_encap){
                new_array = this.text.slice(encap.open, encap.close + 1)
            }else{
                new_array = this.text.slice(encap.open + 1, encap.close)
            }
            this.moveHeadTo(encap.close)
            return new_array
        }else{
            return false
        }
    }

    isSuperGreedyEncapsulation(open_char, close_char){
        let opened_at = null
        let did_open = false 
        
        loop:
        for(let i = this.i; i < this.text.length; i++){
            if(did_open && this.text[i] !== close_char && this.text[i] !== open_char){
                continue
            }else if(this.text[i] === open_char && !did_open){
                opened_at = i
                did_open = true
            }else if(this.text[i] === close_char && did_open){
                return {open: opened_at, close: i}
            }else{
                return false
            }
        }

        return false
    
    }

    isEncapsulating(open_char, close_char){
        let opened_at = null
        let closed_at = null
        let unclosed = 0
        let didOpen = false
        
        loop:
        for(let i = this.i; i < this.text.length; i++){
            switch(this.text[i]){
                case(open_char):{
                    unclosed = unclosed + 1
                    if(!didOpen){
                        opened_at = i
                        didOpen = true
                    }
                    break;
                }
                case(close_char):{
                    if(unclosed > 0){
                        unclosed = unclosed - 1
                        closed_at = i
                        if(unclosed === 0){
                            break loop
                        }
                    }
                    break
                }
            }
        }

        if(didOpen && unclosed === 0){
            return {open: opened_at, close: closed_at}
        }else{
            return false
        }
    }
}