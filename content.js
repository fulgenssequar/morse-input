function addBtn(){
    var morse = document.createElement("div")
    var txt = document.createElement("textarea")
    txt.className="light-body"
    txt.value="Note: Feel free to type in morse code with a proper key. However, if your are not adequate with morse code, don't waste your time."
    var btn = document.createElement("button")
    btn.innerText="Cut Input"
    var btn2 = document.createElement("button")
    btn2.innerText="Encode The Text To Morse"


    var globleSpeed = 1
    var speeder = document.createElement("input")
    speeder.type="range"
    speeder.min=33
    speeder.max=150
    speeder.value=100
    var speederContainer = document.createElement("div")
    speederContainer.innerText="Speed:   "
    speederContainer.appendChild(speeder)

    morse.appendChild(txt)
    morse.appendChild(document.createElement("p"))
    morse.appendChild(btn)
    morse.appendChild(btn2)
    morse.appendChild(speederContainer)
    document.body.insertBefore(morse, document.body.firstChild)
    btn.focus()


    var di = document.createElement("audio")
    var da = document.createElement("audio")
    di.src="diii.mp3"
    da.src="da.mp3"
    
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
        var codeDict={"01":"a", "1000":"b", "1010":"c", "100":"d", "0":"e", "0010":"f", "110":"g", "0000":"h", "00":"i", "0111":"j", "101":"k", "0100":"l", "11":"m", "10":"n", "111":"o", "0110":"p", "1101":"q", "010":"r", "000":"s", "1":"t", "001":"u", "0001":"v", "011":"w", "1001":"x", "1011":"y", "1100":"z", "01111":"1", "00111":"2", "00011":"3", "00001":"4", "00000":"5", "10000":"6", "11000":"7", "11100":"8", "11110":"9", "11111":"0"}
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


    function getBlinker(f1f2) {
	var t0=100;
	var t1=400;
	var tInter=150;
	var tShort=400;
	var tSpace=3000;
	var timeouts=[]
	
	var beemer = f1f2.herald
	var reader= f1f2.reader
	var writer= f1f2.writer
	var f1 = f1f2.up
	var f0 = f1f2.down

	var text = ""

	var wdDict={'a':'01', 'b':'1000', 'c':'1010', 'd':'100', 'e':'0', 'f':'0010', 'g':'110', 'h':'0000', 'i':'00', 'j':'0111', 'k':'101', 'l':'0100', 'm':'11', 'n':'10', 'o':'111', 'p':'0110', 'q':'1101', 'r':'010', 's':'000', 't':'1', 'u':'001', 'v':'0001', 'w':'011', 'x':'1001', 'y':'1011', 'z':'1100', '1':'01111', '2':'00111', '3':'00011', '4':'00001', '5':'00000', '6':'10000', '7':'11000', '8':'11100', '9':'11110', '0':'11111'}

	function starter(){
	    console.log("started")
	    text=reader()
	    setAllTimes()
	}
	
	function finisher(){
	    timeouts.forEach(n=>clearTimeout(n))
	    timeouts=[]
	}

	function char2Intervals(time0, i){
	    var bs = wdDict[text[i].toLowerCase()]
	    var tvs = []

	    var t = time0
	    var tThis = t0
	    var j=0;
	    while(j < bs.length){
		var b = bs[j]
		tvs.push(setTimeout(beemer, t, b ))
		j = j+1
		if (b=="1") {
		    var tThis = t1
		}
		else {
		    var tThis = t0
		}
		tvs.push(setTimeout(f1, t))
		t = t+tThis/globleSpeed
		tvs.push(setTimeout(f0, t))
		t = t + tInter/globleSpeed
	    }
	    tvs.push(setTimeout(()=>{writer(text.slice(0,i+1))}, t + tShort/globleSpeed ))
	    timeouts = timeouts.concat(tvs)
	    return t
	}
	
	function setAllTimes(){
	    var tThis = tShort
	    var time0=0
	    timeouts.forEach((n)=>clearTimeout(n))
	    timeouts=[]
	    var i=-1;
	    while (i < text.length-1){
		i = i+1;
		if (wdDict[text[i].toLowerCase()]){
		    time0 = char2Intervals(time0 + tThis/globleSpeed, i)
		    tThis = tShort
		}
		else {
		    tThis = tSpace
		}
	    }
	}
	return {starter:starter}
    }
    
    function showSound(s) {
	if (s == "1") {
	    di.currentTime="0.0"
	    di.play()
	}
	else if (s == "0"){
	    da.currentTime = "0.01"
	    da.play()
	}
    }

    function showDark(){
	btn2.style.background="grey"
    }
    function showLight(){
	btn2.style.background="orange"
    }
    function getText(){
	return txt.value
    }
    function showText(s){
	txt.value=s
    }
    var blinkStarter = getBlinker({herald:showSound,down:showDark, up:showLight, reader:getText, writer:showText})
    btn2.onclick = blinkStarter.starter
    speeder.onchange = ()=>{globleSpeed = speeder.value/100}
}


addBtn()
