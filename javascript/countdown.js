// Variables

var celebrationTime;
var celebrationName;
var celebrationEmoji;

var now = new Date().getTime();
var year = new Date().getFullYear();

var celebrations = [
	[ new Date(`Jun 28, ${year} 00:00:00`), "End of School", "🏫" ],
	[ new Date(`Oct 31, ${year} 00:00:00`), "Halloween", "🎃" ],
	[ new Date(`Dec 25, ${year} 00:00:00`), "Christmas", "🎄" ]
]

document.addEventListener("load", function() {
    console.log("Test 1 passed");
    
    // Celebration
    
    for (let i = 0; i < celebrations.length; i++) {
        let days = Math.floor((celebrations[i][0] - now) / (1000 * 60 * 60 * 24));
    
        if (days >= -1 && days <= 14) {
            celebrationTime = celebrations[i][0];
            celebrationName = celebrations[i][1];
            celebrationEmoji = celebrations[i][2];
            document.getElementById("countdownBar").style.display = "block";
            break;
        }
    }

    // Snow Effect

    if (celebrationName == "Christmas") {
        var snowMax = 75;
        var snowMinSize = 10;
        var snowMaxSize = 20;
        var snowSpeed = 0.75;
        var snowColor = ["#DDD", "#EEE"];
        var snowRefresh = 50;
        var snowEntity = "&#x2022;";
        var snowStyles = "cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none;";
    
        var snow = [],
            pos = [],
            coords = [],
            lefr = [],
            marginBottom,
            marginRight;
    
        function randomise(range) {
            rand = Math.floor(range * Math.random());
            return rand;
        }
    
        function initSnow() {
            var snowSize = snowMaxSize - snowMinSize;
            marginBottom = document.body.scrollHeight - 5;
            marginRight = document.body.clientWidth - 15;
    
            for (i = 0; i <= snowMax; i++) {
                coords[i] = 0;
                lefr[i] = Math.random() * 15;
                pos[i] = 0.03 + Math.random() / 10;
                snow[i] = document.getElementById("flake" + i);
                snow[i].style.fontFamily = "inherit";
                snow[i].size = randomise(snowSize) + snowMinSize;
                snow[i].style.fontSize = snow[i].size + "px";
                snow[i].style.color = snowColor[randomise(snowColor.length)];
                snow[i].style.zIndex = 1000;
                snow[i].sink = snowSpeed * snow[i].size / 5;
                snow[i].posX = randomise(marginRight - snow[i].size);
                snow[i].posY = randomise(2 * marginBottom - marginBottom - 2 * snow[i].size);
                snow[i].style.left = snow[i].posX + "px";
                snow[i].style.top = snow[i].posY + "px";
            }
    
            moveSnow();
        }
    
        function resize() {
            marginBottom = document.body.scrollHeight - 5;
            marginRight = document.body.clientWidth - 15;
        }
    
        function moveSnow() {
            for (i = 0; i <= snowMax; i++) {
                coords[i] += pos[i];
                snow[i].posY += snow[i].sink;
                snow[i].style.left = snow[i].posX + lefr[i] * Math.sin(coords[i]) + "px";
                snow[i].style.top = snow[i].posY + "px";
    
                if (snow[i].posY >= marginBottom - 2 * snow[i].size || parseInt(snow[i].style.left) > (marginRight - 3 * lefr[i])) {
                    snow[i].posX = randomise(marginRight - snow[i].size);
                    snow[i].posY = 0;
                }
            }
    
            setTimeout("moveSnow()", snowRefresh);
        }
    
        for (i = 0; i <= snowMax; i++) {
            document.write("<span id='flake" + i + "' style='" + snowStyles + "position:absolute;top:-" + snowMaxSize + "'>" + snowEntity + "</span>");
        }
    
        window.addEventListener('resize', resize);
        window.addEventListener('load', initSnow);
    }

    // Countdown

    var update = setInterval(function() {
        var now = new Date().getTime();
    	var distance = celebrationTime - now;
    
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
        if (distance > 0) {
            document.getElementById("countdownBar").innerHTML = `${celebrationName}: ${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`
        } else {
            clearInterval(update);
    		if (celebrationName != "Christmas") {
    			document.getElementById("countdownBar").innerHTML = `Happy ${celebrationName}! ${celebrationEmoji}`;
    		} else {
    			document.getElementById("countdownBar").innerHTML = `Merry ${celebrationName}! ${celebrationEmoji}`;
    		}
        }
    }, 1000);
});