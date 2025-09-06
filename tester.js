import { SSMLParser } from "./ssml parser.js";

const parser = new SSMLParser()
let result = ""
result = parser.parse("Hello #exwhsopi150ra200vo+ti-du1.5me2re3ec0.75muro2miip(pɪˈkɑːn)la(en-US)[this would be a test!!!]")
console.log(result)