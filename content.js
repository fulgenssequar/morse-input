function addBtn(){
    var morse = document.createElement("div")
    var txt = document.createElement("textarea")
    txt.style.width="300px"
    txt.style.height="200px"
    txt.value="Feel free to type in morse code with a proper key. However, if your are not adequate with morse encoding, don't waste your time."
    var btn = document.createElement("button")
    btn.innerText="Cut"
    morse.appendChild(txt)
    morse.appendChild(btn)
    document.body.insertBefore(morse, document.body.firstChild)
    btn.focus()
    function makePossible(f){
        var shortInterval=200;
        var charInterval=600;
        var wordInterval=1000;

        var cur01=""
        var curCode=""
        var curSentence=""

        var keyInFire=false

        var allIntervals= new Array()
        function clearIntervals(){
            allIntervals.forEach(n=>clearTimeout(n))
            allIntervals=[]
        }
        function clearAll(){
            cur01=curCode=curSentence=""
            f("Type in morse code ")
            clearIntervals()
        }
        function changeLast(){
            if (cur01=="1")
                cur01=0
            else if (cur01=="0")
                cur01 = 1
            f(reader())
        }
        function addChar(){
            if (codeDict[curCode])
                curSentence += codeDict[curCode]
            curCode=""
            cur01=""
            clearIntervals()
            allIntervals.push(setTimeout(addWord, wordInterval))
            f(reader())
        }
        function add01down(){
            if (keyInFire)
                return
            else keyInFire=true;
            clearIntervals()
            cur01="0"
            allIntervals.push(setTimeout(changeLast, shortInterval))
            f(reader())
        }
        function add01up(){
            clearIntervals()
            keyInFire=false
            curCode += cur01
            cur01=""
            allIntervals.push(setTimeout(addChar, charInterval))
            f(reader())
        }
        function addWord(){
            curSentence += " "
            f(reader()+"_")
        }
        function reader(){
            return curSentence + curCode + cur01
        }
        var codeDict={
            "01":"a",
            "1000":"b",
            "1010":"c",
            "100":"d",
            "0":"e",
            "0010":"f",
            "110":"g",
            "0000":"h",
            "00":"i",
            "0111":"j",
            "101":"k",
            "0100":"l",
            "11":"m",
            "10":"n",
            "111":"o",
            "0110":"p",
            "1101":"q",
            "010":"r",
            "000":"s",
            "1":"t",
            "001":"u",
            "0001":"v",
            "011":"w",
            "1001":"x",
            "1011":"y",
            "1100":"z",
            "01111":"1",
            "00111":"2",
            "00011":"3",
            "00001":"4",
            "00000":"5",
            "10000":"6",
            "11000":"7",
            "11100":"8",
            "11110":"9",
            "11111":"0"
        }
        return {"down":add01down, "up":add01up, "clear":clearAll}
    }
    function f(s){
        txt.value=s
    }
    var allNeeded=makePossible(f)
    btn.onclick=(e)=>{
        txt.select()
        document.execCommand("copy")
        allNeeded.clear()
        btn.focus()
    }
    btn.onkeydown=allNeeded.down
    btn.onkeyup = allNeeded.up
}


addBtn()
