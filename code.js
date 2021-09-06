
var players = -1;
blueGitiPositions = [-1,-1,-1,-1];
redGitiPositions = [-1,-1,-1,-1];
yellowGitiPositions = [-1,-1,-1,-1];
greenGitiPositions = [-1,-1,-1,-1];
turns = [0,0,0,0];
isClicked = 0;

function resetStat()
{
    alert("About Game:\n" +
        "=> Roll the dice by 'Roll Dice' button\n" +
        "=> Do your Move if number is valid\n" +
        "=> Press 'Next Turn' button to Go to next turn\n");
    document.getElementById("buttonID").disabled = false;
    document.getElementById("player").value = "Blue Turn";
    document.getElementById("nextBtnID").disabled = true;
    turns = [0,0,0,0];
    turns[0]  = 1;
    players = 1;
    blueGitiPositions = [-1,-1,-1,-1];
    redGitiPositions = [-1,-1,-1,-1];
    yellowGitiPositions = [-1,-1,-1,-1];
    greenGitiPositions = [-1,-1,-1,-1];
    document.getElementById("startID").disabled = true;
}
function refresh()
{
    window.location.reload();
}

function selectPlayer()
{
    document.getElementById("nextBtnID").disabled = true;
    document.getElementById("buttonID").disabled = false;
    document.getElementById("player").value = "";
    var num1 = document.getElementById("field").value;
    document.getElementById("field").value = "";

    if(num1 !== " ")
    {
        players = (players+1)%4;
        if(players === 0){
            document.getElementById("player").value = "Red Turn";
            turns[0] = 0;
            turns[1] = 0;
            turns[2] = 0;
            turns[3] = 1;
        }
        else if(players === 1){
            document.getElementById("player").value = "Blue Turn";
            turns[0] = 1;
            turns[1] = 0;
            turns[2] = 0;
            turns[3] = 0;
        }
        else if(players === 2){
            document.getElementById("player").value = "Yellow Turn";
            turns[0] = 0;
            turns[1] = 1;
            turns[2] = 0;
            turns[3] = 0;
        }
        else{
            document.getElementById("player").value = "Green Turn";
            turns[0] = 0;
            turns[1] = 0;
            turns[2] = 1;
            turns[3] = 0;
        }

    }


}

function generateRandom()
{
    x = Math.floor((Math.random() * 6) + 1);
    document.getElementById("field").value = x;
    if(x === 6){
        alert("SIX!! Move your piece Then roll Dice Again!!")
        document.getElementById("player").value = "Roll Again";
        document.getElementById("buttonID").disabled = false;
        document.getElementById("nextBtnID").disabled = true;
    }
    else{
        document.getElementById("buttonID").disabled = true;
        document.getElementById("nextBtnID").disabled = false;
    }
    isClicked = 1;
}
function checkDeath(gotiColor, gotiID)
{
    if(gotiColor === 'blue')
    {
        if(gotiID === 'one'){
            temp = blueGitiPositions[0];
            for(i=0; i<4; i++){
                if(temp === yellowGitiPositions[i]){
                    if(yellowGitiPositions[i] !== 1 &&  yellowGitiPositions[i] !== 13 && yellowGitiPositions[i] !== 26 && yellowGitiPositions[i] !== 39){
                        return ["yellow",i];
                    }
                }
            }

        }
        return ["",""]
    }
}

function Bluemove(parent,myid)
{
    if(turns[0] === 0){
        alert("It's Not Your Turn!!");
        return;
    }
    if(isClicked !== 1){
        alert("Roll the Dice!!");
        return;
    }
    isClicked = 0;

    num = document.getElementById("field").value;
    num = parseInt(num);
    if(num === 6 && document.getElementById(parent).innerHTML !== "")
    {
        val = document.getElementById(parent);
        var bluemyGoti = val.innerHTML;
        val.innerHTML="";
        document.getElementById("0").innerHTML = bluemyGoti;
        if(myid === 'one'){
            blueGitiPositions[0] = 0;
        }
        else if(myid === 'two'){
            blueGitiPositions[1] = 0;
        }
        else if(myid === 'three'){
            blueGitiPositions[2] = 0;
        }
        else if(myid === 'four'){
            blueGitiPositions[3] = 0;
        }
    }
    else {
        myParentId = document.getElementById(myid).parentElement.id;
        console.log("my parent is: ", myParentId);
        if (myid === 'one') {
            myposition = blueGitiPositions[0];
            if (blueGitiPositions[0] === -1) {
                alert("Invalid Move");
                isClicked = 1;
            }
            else {
                var val1 = document.getElementById(myParentId);
                var singleGiti = val1.innerHTML;
                val1.innerHTML = "";

                currentPos = blueGitiPositions[0];
                if(currentPos >= 45 && currentPos<= 50 && (parseInt(blueGitiPositions[0]) + parseInt(num)) >= 51){
                    currentPos = parseInt(blueGitiPositions[0]) + parseInt(num)+1;
                }
                else{
                    currentPos = parseInt(blueGitiPositions[0]) + parseInt(num);
                }
                if(currentPos > 50){
                    var insideBlueHome1 = currentPos % 51;
                    if(insideBlueHome1 >= 1 && insideBlueHome1 <6){
                        currentPos = 51 + insideBlueHome1;
                    }
                    else{
                        console.log("blue Home:",insideBlueHome1);
                        console.log("Curent: ",currentPos);
                        currentPos = blueGitiPositions[0];
                        currentPos = parseInt(currentPos);

                        if(insideBlueHome1 === 0){
                            currentPos = 52;
                        }
                        else if(currentPos === 50 && num === 6){
                            currentPos = 57;
                        }
                        else if(currentPos === 52 && num === 5){
                            console.log("At pos 52 && num 5");
                            currentPos = 58;
                        }
                        else if(currentPos === 53 && num === 4){
                            currentPos = 59;
                        }
                        else if(currentPos === 54 && num === 3){
                            currentPos = 60;
                        }
                        else if(currentPos === 55 && num === 2){
                            currentPos = 61;
                        }
                        else if(currentPos === 56 && num === 1){
                            currentPos = 62;
                        }
                        else{
                            alert("Not appropriate number.");
                            isClicked = 1;
                            currentPos = blueGitiPositions[0];
                        }
                    }
                }

                blueGitiPositions[0] = currentPos;
                document.getElementById(currentPos).innerHTML = singleGiti;
            }

        }
        else if(myid === 'two')
        {
            myposition = blueGitiPositions[1];
            if (blueGitiPositions[1] === -1) {
                alert("Invalid Move");
                isClicked = 1;
            }
            else{
                var val2 = document.getElementById(myParentId);
                var singleGiti2 = val2.innerHTML;
                val2.innerHTML = "";

                currentPos = blueGitiPositions[1];
                if(currentPos >= 45 && currentPos<= 50 && (parseInt(blueGitiPositions[1]) + parseInt(num)) >= 51){
                    currentPos = parseInt(blueGitiPositions[1]) + parseInt(num)+1;
                }
                else{
                    currentPos = parseInt(blueGitiPositions[1]) + parseInt(num);
                }
                if(currentPos > 50){
                    var insideBlueHome2 = currentPos % 51;
                    if(insideBlueHome2 >= 1 && insideBlueHome2 < 6){
                        currentPos = 51 + insideBlueHome2;
                    }
                    else{
                        currentPos = blueGitiPositions[1];
                        currentPos = parseInt(currentPos);

                        if(insideBlueHome2 === 0){
                            currentPos = 52;
                        }
                        else if(currentPos === 50 && num === 6){
                            currentPos = 57;
                        }
                        else if(currentPos === 52 && num === 5){
                            currentPos = 58;
                        }
                        else if(currentPos === 53 && num === 4){
                            currentPos = 59;
                        }
                        else if(currentPos === 54 && num === 3){
                            currentPos = 60;
                        }
                        else if(currentPos === 55 && num === 2){
                            currentPos = 61;
                        }
                        else if(currentPos === 56 && num === 1){
                            currentPos = 62;
                        }
                        else{
                            alert("Not appropriate number.");
                            currentPos = blueGitiPositions[1];
                            isClicked = 1;
                        }
                    }
                }

                document.getElementById(currentPos).innerHTML = singleGiti2;
                blueGitiPositions[1] = currentPos;
            }
        }

        else if(myid === 'three')
        {
            myposition = blueGitiPositions[2];
            if (blueGitiPositions[2] === -1) {
                alert("Invalid Move");
                isClicked = 1;
            }
            else{
                var val3 = document.getElementById(myParentId);
                var singleGiti3 = val3.innerHTML;
                val3.innerHTML = "";

                currentPos = blueGitiPositions[2];
                if(currentPos >= 45 && currentPos<= 50 && (parseInt(blueGitiPositions[2]) + parseInt(num)) >= 51){
                    currentPos = parseInt(blueGitiPositions[2]) + parseInt(num)+1;
                }
                else{
                    currentPos = parseInt(blueGitiPositions[2]) + parseInt(num);
                }
                if(currentPos > 50){
                    var insideBlueHome3 = currentPos % 51;
                    if(insideBlueHome3 >= 1 && insideBlueHome3 < 6){
                        currentPos = 51 + insideBlueHome3;
                    }
                    else{
                        currentPos = blueGitiPositions[2];
                        currentPos = parseInt(currentPos);

                        if(insideBlueHome3 === 0){
                            currentPos = 52;
                        }
                        else if(currentPos === 50 && num === 6){
                            currentPos = 57;
                        }
                        else if(currentPos === 52 && num === 5){
                            currentPos = 58;
                        }
                        else if(currentPos === 53 && num === 4){
                            currentPos = 59;
                        }
                        else if(currentPos === 54 && num === 3){
                            currentPos = 60;
                        }
                        else if(currentPos === 55 && num === 2){
                            currentPos = 61;
                        }
                        else if(currentPos === 56 && num === 1){
                            currentPos = 62;
                        }
                        else{
                            alert("Not appropriate number.");
                            currentPos = blueGitiPositions[2];
                            isClicked = 1;
                        }
                    }
                }
                document.getElementById(currentPos).innerHTML = singleGiti3;
                blueGitiPositions[2] = currentPos
            }
        }
        else if(myid === 'four')
        {
            myposition = blueGitiPositions[3];
            if (blueGitiPositions[3] === -1) {
                alert("Invalid Move");
                isClicked = 1;
            }
            else{
                var val4 = document.getElementById(myParentId);
                var singleGiti4 = val4.innerHTML;
                val4.innerHTML = "";
                currentPos = blueGitiPositions[3];
                if(currentPos >= 45 && currentPos<= 50 && (parseInt(blueGitiPositions[3]) + parseInt(num)) >= 51){
                    currentPos = parseInt(blueGitiPositions[3]) + parseInt(num)+1;
                }
                else{
                    currentPos = parseInt(blueGitiPositions[3]) + parseInt(num);
                }
                if(currentPos > 50){
                    var insideBlueHome4 = currentPos % 51;
                    if(insideBlueHome4 >= 1 && insideBlueHome4 < 6){
                        currentPos = 51 + insideBlueHome4;
                    }
                    else{
                        currentPos = blueGitiPositions[3];
                        currentPos = parseInt(currentPos);
                        if(insideBlueHome4 === 0){
                            currentPos = 52;
                        }
                        else if(currentPos === 50 && num === 6){
                            currentPos = 57;
                        }
                        else if(currentPos === 52 && num === 5){
                            currentPos = 58;
                        }
                        else if(currentPos === 53 && num === 4){
                            currentPos = 59;
                        }
                        else if(currentPos === 54 && num === 3){
                            currentPos = 60;
                        }
                        else if(currentPos === 55 && num === 2){
                            currentPos = 61;
                        }
                        else if(currentPos === 56 && num === 1){
                            currentPos = 62;
                        }
                        else{
                            alert("Not appropriate number.");
                            currentPos = blueGitiPositions[3];
                            isClicked = 1;
                        }
                    }
                }
                document.getElementById(currentPos).innerHTML = singleGiti4;
                blueGitiPositions[3] = currentPos
            }
        }
    }
}

function RedMove(parent,myid)
{
    if(turns[3] === 0){
        alert("It's Not Your Turn!!");
        return;
    }
    if(isClicked !== 1){
        alert("Roll the Dice!!");
        return;
    }
    isClicked = 0;
    num = document.getElementById("field").value;
    num = parseInt(num);
    if (num === 6 && document.getElementById(parent).innerHTML !== "") {
        Rval1 = document.getElementById(parent);
        var rGiti1 = Rval1.innerHTML;
        Rval1.innerHTML = "";
        document.getElementById("13").innerHTML = rGiti1;
        var currentPos = 0;
        if (myid === 'rOne') {
            redGitiPositions[0] = 13;
        } else if (myid === 'rTwo') {
            redGitiPositions[1] = 13;
        } else if (myid === 'rThree') {
            redGitiPositions[2] = 13;
        } else if (myid === 'rFour') {
            redGitiPositions[3] = 13;
        }
    }
    else {
        myParentId = document.getElementById(myid).parentElement.id;
        if (myid === 'rOne') {
            if (redGitiPositions[0] === -1) {
                alert("Invalid Move");
                isClicked = 1;
            } else {
                var rVal2 = document.getElementById(myParentId);
                var rGiti2 = rVal2.innerHTML;
                rVal2.innerHTML = "";
                currentPos = redGitiPositions[0];
                if (((currentPos <= 11 && currentPos >= 6) && (parseInt(redGitiPositions[0]) + parseInt(num)) >= 11) || currentPos > 62) {
                    currentPos = (parseInt(redGitiPositions[0]) + parseInt(num));
                    if (currentPos > 11) {
                        var insideRedHome1 = currentPos % 12;
                        if (insideRedHome1 >= 1 && insideRedHome1 <= 6) {
                            if (currentPos >= 63) {
                                if (redGitiPositions[0] === 63) {
                                    if (num === 1) {
                                        currentPos = 64;
                                    } else if (num === 2) {
                                        currentPos = 65;
                                    } else if (num === 3) {
                                        currentPos = 66;
                                    } else if (num === 4) {
                                        currentPos = 67;
                                    } else if (num === 5) {
                                        currentPos = 72;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (redGitiPositions[0] === 64) {
                                    if (num === 1) {
                                        currentPos = 65;
                                    } else if (num === 2) {
                                        currentPos = 66;
                                    } else if (num === 3) {
                                        currentPos = 67;
                                    } else if (num === 4) {
                                        currentPos = 71;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (redGitiPositions[0] === 65) {
                                    if (num === 1) {
                                        currentPos = 66;
                                    } else if (num === 2) {
                                        currentPos = 67;
                                    } else if (num === 3) {
                                        currentPos = 70;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (redGitiPositions[0] === 66) {
                                    if (num === 1) {
                                        currentPos = 67;
                                    } else if (num === 2) {
                                        currentPos = 69;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (redGitiPositions[0] === 67) {
                                    if (num === 1) {
                                        currentPos = 68;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else {
                                    alert("result not possible");
                                    isClicked = 1;
                                }
                            } else {
                                currentPos = 63 + insideRedHome1;
                            }
                        } else {
                            currentPos = redGitiPositions[0];
                            currentPos = parseInt(currentPos);
                            if (insideRedHome1 === 0) {
                                currentPos = 63;
                            } else if (currentPos + num <= 67) {
                                currentPos = currentPos + num;
                            } else if (currentPos === 11 && num === 6) {
                                currentPos = 68;
                            } else if (currentPos === 63 && num === 5) {
                                currentPos = 69;
                            } else if (currentPos === 64 && num === 4) {
                                currentPos = 70;
                            } else if (currentPos === 65 && num === 3) {
                                currentPos = 71;
                            } else if (currentPos === 66 && num === 2) {
                                currentPos = 72;
                            } else if (currentPos === 67 && num === 1) {
                                currentPos = 73;
                            } else {
                                alert("Not appropriate number.");
                                currentPos = redGitiPositions[0];
                                isClicked = 1;
                            }
                        }
                        document.getElementById(currentPos).innerHTML = rGiti2;
                        redGitiPositions[0] = currentPos;
                    } else {
                        document.getElementById(currentPos).innerHTML = rGiti2;
                        redGitiPositions[0] = currentPos;

                    }

                } else {
                    currentPos = (parseInt(redGitiPositions[0]) + parseInt(num)) % 52;
                    document.getElementById(currentPos).innerHTML = rGiti2;
                    redGitiPositions[0] = currentPos;
                }
            }
        } else if (myid === 'rTwo') {
            if (redGitiPositions[1] === -1) {
                alert("Invalid Move");
                isClicked = 1;
            } else {
                var rVal3 = document.getElementById(myParentId);
                var rGiti3 = rVal3.innerHTML;
                rVal3.innerHTML = "";
                currentPos = redGitiPositions[1];

                if (((currentPos <= 11 && currentPos >= 6) && (parseInt(redGitiPositions[1]) + parseInt(num)) >= 11) || currentPos > 62) {
                    currentPos = (parseInt(redGitiPositions[1]) + parseInt(num));
                    if (currentPos > 11) {
                        var insideRedHome2 = currentPos % 12;
                        if (insideRedHome2 >= 1 && insideRedHome2 <= 6) {
                            if (currentPos >= 63) {
                                if (redGitiPositions[1] === 63) {
                                    if (num === 1) {
                                        currentPos = 64;
                                    } else if (num === 2) {
                                        currentPos = 65;
                                    } else if (num === 3) {
                                        currentPos = 66;
                                    } else if (num === 4) {
                                        currentPos = 67;
                                    } else if (num === 5) {
                                        currentPos = 72;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (redGitiPositions[1] === 64) {
                                    if (num === 1) {
                                        currentPos = 65;
                                    } else if (num === 2) {
                                        currentPos = 66;
                                    } else if (num === 3) {
                                        currentPos = 67;
                                    } else if (num === 4) {
                                        currentPos = 71;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (redGitiPositions[1] === 65) {
                                    if (num === 1) {
                                        currentPos = 66;
                                    } else if (num === 2) {
                                        currentPos = 67;
                                    } else if (num === 3) {
                                        currentPos = 70;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (redGitiPositions[1] === 66) {
                                    if (num === 1) {
                                        currentPos = 67;
                                    } else if (num === 2) {
                                        currentPos = 69;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (redGitiPositions[1] === 67) {
                                    if (num === 1) {
                                        currentPos = 68;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else {
                                    alert("result not possible");
                                    isClicked = 1;
                                }
                            }
                            else {
                                currentPos = 63 + insideRedHome2;
                                redGitiPositions[1] = currentPos;
                            }
                        }
                        else {
                            currentPos = redGitiPositions[1];
                            currentPos = parseInt(currentPos);
                            if (insideRedHome2 === 0) {
                                currentPos = 63;
                            } else if (currentPos + num <= 67) {
                                currentPos = currentPos + num;
                            } else if (currentPos === 11 && num === 6) {
                                currentPos = 68;
                            } else if (currentPos === 63 && num === 5) {
                                currentPos = 69;
                            } else if (currentPos === 64 && num === 4) {
                                currentPos = 70;
                            } else if (currentPos === 65 && num === 3) {
                                currentPos = 71;
                            } else if (currentPos === 66 && num === 2) {
                                currentPos = 72;
                            } else if (currentPos === 67 && num === 1) {
                                currentPos = 73;
                            } else {
                                alert("Not appropriate number.");
                                currentPos = redGitiPositions[1];
                                isClicked = 1;
                            }
                        }
                        document.getElementById(currentPos).innerHTML = rGiti3;
                        redGitiPositions[1] = currentPos;
                    }
                    else {
                        document.getElementById(currentPos).innerHTML = rGiti3;
                        redGitiPositions[1] = currentPos;
                    }
                }
                else {
                    currentPos = (parseInt(redGitiPositions[1]) + parseInt(num)) % 52;
                    document.getElementById(currentPos).innerHTML = rGiti3;
                    redGitiPositions[1] = currentPos
                }
            }
        } else if (myid === 'rThree') {
            if (redGitiPositions[2] === -1) {
                alert("Invalid Move");
                isClicked = 1;
            }
            else {
                var rVal4 = document.getElementById(myParentId);
                var rGiti4 = rVal4.innerHTML;
                rVal4.innerHTML = "";
                currentPos = redGitiPositions[2];

                if (((currentPos <= 11 && currentPos >= 6) && (parseInt(redGitiPositions[2]) + parseInt(num)) >= 11) || currentPos > 62) {
                    currentPos = (parseInt(redGitiPositions[2]) + parseInt(num));
                    if (currentPos > 11) {
                        var insideRedHome3 = currentPos % 12;
                        if (insideRedHome3 >= 1 && insideRedHome3 <= 6) {
                            if (currentPos >= 63) {
                                if (redGitiPositions[2] === 63) {
                                    if (num === 1) {
                                        currentPos = 64;
                                    } else if (num === 2) {
                                        currentPos = 65;
                                    } else if (num === 3) {
                                        currentPos = 66;
                                    } else if (num === 4) {
                                        currentPos = 67;
                                    } else if (num === 5) {
                                        currentPos = 72;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (redGitiPositions[2] === 64) {
                                    if (num === 1) {
                                        currentPos = 65;
                                    } else if (num === 2) {
                                        currentPos = 66;
                                    } else if (num === 3) {
                                        currentPos = 67;
                                    } else if (num === 4) {
                                        currentPos = 71;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (redGitiPositions[2] === 65) {
                                    if (num === 1) {
                                        currentPos = 66;
                                    } else if (num === 2) {
                                        currentPos = 67;
                                    } else if (num === 3) {
                                        currentPos = 70;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (redGitiPositions[2] === 66) {
                                    if (num === 1) {
                                        currentPos = 67;
                                    } else if (num === 2) {
                                        currentPos = 69;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (redGitiPositions[2] === 67) {
                                    if (num === 1) {
                                        currentPos = 68;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                }
                                else {
                                    alert("result not possible");
                                    isClicked = 1;
                                }
                            }
                            else {
                                currentPos = 63 + insideRedHome3;
                                redGitiPositions[2] = currentPos;
                            }
                        } else {
                            currentPos = redGitiPositions[2];
                            currentPos = parseInt(currentPos);
                            if (insideRedHome3 === 0) {
                                currentPos = 63;
                            } else if (currentPos + num <= 67) {
                                currentPos = currentPos + num;
                            } else if (currentPos === 11 && num === 6) {
                                currentPos = 68;
                            } else if (currentPos === 63 && num === 5) {
                                console.log("At pos 12 && num 5");
                                currentPos = 69;
                            } else if (currentPos === 64 && num === 4) {
                                currentPos = 70;
                            } else if (currentPos === 65 && num === 3) {
                                currentPos = 71;
                            } else if (currentPos === 66 && num === 2) {
                                currentPos = 72;
                            } else if (currentPos === 67 && num === 1) {
                                currentPos = 73;
                            } else {
                                alert("Not appropriate number.");
                                currentPos = redGitiPositions[2];
                                isClicked = 1;
                            }
                        }
                        document.getElementById(currentPos).innerHTML = rGiti4;
                        redGitiPositions[2] = currentPos;
                    } else {
                        document.getElementById(currentPos).innerHTML = rGiti4;
                        redGitiPositions[2] = currentPos;
                    }
                }
                else {
                    currentPos = (parseInt(redGitiPositions[2]) + parseInt(num)) % 52;
                    document.getElementById(currentPos).innerHTML = rGiti4;
                    redGitiPositions[2] = currentPos
                }
            }
        } else if (myid === 'rFour') {
            if (redGitiPositions[3] === -1) {
                alert("Invalid Move");
                isClicked = 1;
            }
            else {
                var rVal5 = document.getElementById(myParentId);
                var rGiti5 = rVal5.innerHTML;
                rVal5.innerHTML = "";
                currentPos = redGitiPositions[3];

                if (((currentPos <= 11 && currentPos >= 6) && (parseInt(redGitiPositions[3]) + parseInt(num)) >= 11) || currentPos > 62) {
                    currentPos = (parseInt(redGitiPositions[3]) + parseInt(num));
                    if (currentPos > 11) {
                        var insideRedHome4 = currentPos % 12;
                        if (insideRedHome4 >= 1 && insideRedHome4 <= 6) {
                            if (currentPos >= 63) {
                                if (redGitiPositions[3] === 63) {
                                    if (num === 1) {
                                        currentPos = 64;
                                    } else if (num === 2) {
                                        currentPos = 65;
                                    } else if (num === 3) {
                                        currentPos = 66;
                                    } else if (num === 4) {
                                        currentPos = 67;
                                    } else if (num === 5) {
                                        currentPos = 72;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (redGitiPositions[3] === 64) {
                                    if (num === 1) {
                                        currentPos = 65;
                                    } else if (num === 2) {
                                        currentPos = 66;
                                    } else if (num === 3) {
                                        currentPos = 67;
                                    } else if (num === 4) {
                                        currentPos = 71;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (redGitiPositions[3] === 65) {
                                    if (num === 1) {
                                        currentPos = 66;
                                    } else if (num === 2) {
                                        currentPos = 67;
                                    } else if (num === 3) {
                                        currentPos = 70;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (redGitiPositions[3] === 66) {
                                    if (num === 1) {
                                        currentPos = 67;
                                    } else if (num === 2) {
                                        currentPos = 69;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (redGitiPositions[3] === 67) {
                                    if (num === 1) {
                                        currentPos = 68;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else {
                                    alert("result not possible");
                                    isClicked = 1;
                                }
                            }
                            else {
                                currentPos = 63 + insideRedHome4;
                                redGitiPositions[3] = currentPos;
                            }

                        } else {
                            currentPos = redGitiPositions[3];
                            currentPos = parseInt(currentPos);
                            if (insideRedHome4 === 0) {
                                currentPos = 63;
                            } else if (currentPos + num <= 67) {
                                currentPos = currentPos + num;
                            } else if (currentPos === 11 && num === 6) {
                                currentPos = 68;
                            } else if (currentPos === 63 && num === 5) {
                                currentPos = 69;
                            } else if (currentPos === 64 && num === 4) {
                                currentPos = 70;
                            } else if (currentPos === 65 && num === 3) {
                                currentPos = 71;
                            } else if (currentPos === 66 && num === 2) {
                                currentPos = 72;
                            } else if (currentPos === 67 && num === 1) {
                                currentPos = 73;
                            } else {
                                alert("Not appropriate number.");
                                currentPos = redGitiPositions[3];
                                isClicked = 1;
                            }
                        }
                        document.getElementById(currentPos).innerHTML = rGiti5;
                        redGitiPositions[3] = currentPos;
                    } else {
                        document.getElementById(currentPos).innerHTML = rGiti5;
                        redGitiPositions[3] = currentPos;

                    }
                }
                else {
                    currentPos = (parseInt(redGitiPositions[3]) + parseInt(num)) % 52;
                    document.getElementById(currentPos).innerHTML = rGiti5;
                    redGitiPositions[3] = currentPos

                }
            }
        }
    }
}
function YellowMove(parent, myid) {
    if(turns[1] === 0){
        alert("It's Not Your Turn!!");
        return;
    }
    if(isClicked !== 1){
        alert("Roll the Dice!!");
        return;
    }
    isClicked = 0;
    num = document.getElementById("field").value;
    num = parseInt(num);
    if (num === 6 && document.getElementById(parent).innerHTML !== "") {
        yVal1 = document.getElementById(parent);
        var yGiti1 = yVal1.innerHTML;
        yVal1.innerHTML = "";
        document.getElementById("39").innerHTML = yGiti1;
        if(myid === 'Yone'){
            yellowGitiPositions[0] = 39;
        }
        else if(myid === 'Ytwo'){
            yellowGitiPositions[1] = 39;
        }
        else if(myid === 'Ythree'){
            yellowGitiPositions[2] = 39;
        }
        else if(myid === 'Yfour'){
            yellowGitiPositions[3] = 39;
        }

    }
    else {
        myParentId = document.getElementById(myid).parentElement.id;
        console.log("my parent is: ", myParentId);
        if (myid === 'Yone') {
            if (yellowGitiPositions[0] === -1) {
                alert("Invalid Move.");
                isClicked = 1;
            } else {
                var yVal2 = document.getElementById((myParentId));
                var yGiti2 = yVal2.innerHTML;
                yVal2.innerHTML = "";

                currentPos = yellowGitiPositions[0];
                if (((currentPos <= 37 && currentPos >= 32) && (parseInt(yellowGitiPositions[0]) + parseInt(num)) >= 37) || currentPos >= 85) {
                    currentPos = (parseInt(yellowGitiPositions[0]) + parseInt(num));
                    var insideyellowHome1;
                    if (currentPos > 37) {
                        if (currentPos >= 85) {
                            insideyellowHome1 = currentPos % 85;
                        } else {
                            insideyellowHome1 = currentPos % 38;
                        }
                        if (insideyellowHome1 >= 1 && insideyellowHome1 <= 6) {
                            currentPos = yellowGitiPositions[0];
                            if (currentPos >= 85) {
                                if (yellowGitiPositions[0] === 85) {
                                    if (num === 1) {
                                        currentPos = 86;
                                    } else if (num === 2) {
                                        currentPos = 87;
                                    } else if (num === 3) {
                                        currentPos = 88;
                                    } else if (num === 4) {
                                        currentPos = 89;
                                    } else if (num === 5) {
                                        currentPos = 95;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (yellowGitiPositions[0] === 86) {
                                    if (num === 1) {
                                        currentPos = 87;
                                    } else if (num === 2) {
                                        currentPos = 88;
                                    } else if (num === 3) {
                                        currentPos = 89;
                                    } else if (num === 4) {
                                        currentPos = 94;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (yellowGitiPositions[0] === 87) {
                                    if (num === 1) {
                                        currentPos = 88;
                                    } else if (num === 2) {
                                        currentPos = 89;
                                    } else if (num === 3) {
                                        currentPos = 93;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (yellowGitiPositions[0] === 88) {
                                    if (num === 1) {
                                        currentPos = 89;
                                    } else if (num === 2) {
                                        currentPos = 92;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (yellowGitiPositions[0] === 89) {
                                    if (num === 1) {
                                        currentPos = 91;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else {
                                    alert("result not possible");
                                    isClicked = 1;
                                }
                            } else {
                                currentPos = 85 + insideyellowHome1;
                            }
                        } else {
                            currentPos = yellowGitiPositions[0];
                            currentPos = parseInt(currentPos);
                            if (insideyellowHome1 === 0) {
                                currentPos = 85;
                            } else if (currentPos + num <= 89) {
                                currentPos = currentPos + num;
                            } else if (currentPos === 37 && num <= 6) {
                                if (num === 1) {
                                    currentPos = 85;
                                } else if (num === 2) {
                                    currentPos = 86;
                                } else if (num === 3) {
                                    currentPos = 87;
                                } else if (num === 4) {
                                    currentPos = 88;
                                } else if (num === 5) {
                                    currentPos = 89;
                                } else if (num === 6) {
                                    currentPos = 90;
                                }
                            } else if (currentPos === 85 && num === 5) {
                                currentPos = 90;
                            } else if (currentPos === 86 && num === 4) {
                                currentPos = 91;
                            } else if (currentPos === 87 && num === 3) {
                                currentPos = 92;
                            } else if (currentPos === 88 && num === 2) {
                                currentPos = 93;
                            } else if (currentPos === 89 && num === 1) {
                                currentPos = 94;
                            } else {
                                alert("Not appropriate number.");
                                currentPos = yellowGitiPositions[0];
                                isClicked = 1;
                            }
                        }
                        document.getElementById(currentPos).innerHTML = yGiti2;
                        yellowGitiPositions[0] = currentPos;
                    } else {
                        document.getElementById(currentPos).innerHTML = yGiti2;
                        yellowGitiPositions[0] = currentPos;
                    }

                } else {
                    currentPos = (parseInt(yellowGitiPositions[0]) + parseInt(num)) % 52;
                    document.getElementById(currentPos).innerHTML = yGiti2;
                    yellowGitiPositions[0] = currentPos;

                }
            }
        }
        else if (myid === 'Ytwo') {
            myposition = yellowGitiPositions[1];
            if (yellowGitiPositions[1] === -1) {
                alert("Invalid Move");
                isClicked = 1;
            } else {
                var Yval3 = document.getElementById(myParentId);
                var YGiti3 = Yval3.innerHTML;
                Yval3.innerHTML = "";

                currentPos = yellowGitiPositions[1];
                if (((currentPos <= 37 && currentPos >= 32) && (parseInt(yellowGitiPositions[1]) + parseInt(num)) >= 37) || currentPos >= 85) {
                    currentPos = (parseInt(yellowGitiPositions[1]) + parseInt(num));
                    var insideyellowHome2;
                    if (currentPos > 37) {
                        if (currentPos >= 85) {
                            insideyellowHome2 = currentPos % 85;
                        } else {
                            insideyellowHome2 = currentPos % 38;
                        }
                        if (insideyellowHome2 >= 1 && insideyellowHome2 <= 6) {
                            currentPos = yellowGitiPositions[1];
                            if (currentPos >= 85) {
                                if (yellowGitiPositions[1] === 85) {
                                    if (num === 1) {
                                        currentPos = 86;
                                    } else if (num === 2) {
                                        currentPos = 87;
                                    } else if (num === 3) {
                                        currentPos = 88;
                                    } else if (num === 4) {
                                        currentPos = 89;
                                    } else if (num === 5) {
                                        currentPos = 95;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (yellowGitiPositions[1] === 86) {
                                    if (num === 1) {
                                        currentPos = 87;
                                    } else if (num === 2) {
                                        currentPos = 88;
                                    } else if (num === 3) {
                                        currentPos = 89;
                                    } else if (num === 4) {
                                        currentPos = 94;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (yellowGitiPositions[1] === 87) {
                                    if (num === 1) {
                                        currentPos = 88;
                                    } else if (num === 2) {
                                        currentPos = 89;
                                    } else if (num === 3) {
                                        currentPos = 93;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (yellowGitiPositions[1] === 88) {
                                    if (num === 1) {
                                        currentPos = 89;
                                    } else if (num === 2) {
                                        currentPos = 92;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (yellowGitiPositions[1] === 89) {
                                    if (num === 1) {
                                        currentPos = 91;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else {
                                    alert("result not possible");
                                    isClicked = 1;
                                }
                            } else {
                                currentPos = 85 + insideyellowHome2;
                            }
                        } else {
                            currentPos = yellowGitiPositions[1];
                            currentPos = parseInt(currentPos);
                            if (insideyellowHome2 === 0) {
                                currentPos = 85;
                            } else if (currentPos + num <= 89) {
                                currentPos = currentPos + num;
                            } else if (currentPos === 37 && num <= 6) {
                                if (num === 1) {
                                    currentPos = 85;
                                } else if (num === 2) {
                                    currentPos = 86;
                                } else if (num === 3) {
                                    currentPos = 87;
                                } else if (num === 4) {
                                    currentPos = 88;
                                } else if (num === 5) {
                                    currentPos = 89;
                                } else if (num === 6) {
                                    currentPos = 90;
                                }
                            } else if (currentPos === 85 && num === 5) {
                                currentPos = 90;
                            } else if (currentPos === 86 && num === 4) {
                                currentPos = 91;
                            } else if (currentPos === 87 && num === 3) {
                                currentPos = 92;
                            } else if (currentPos === 88 && num === 2) {
                                currentPos = 93;
                            } else if (currentPos === 89 && num === 1) {
                                currentPos = 94;
                            } else {
                                alert("Not appropriate number.");
                                currentPos = yellowGitiPositions[1];
                                isClicked = 1;
                            }
                        }
                        document.getElementById(currentPos).innerHTML = YGiti3;
                        yellowGitiPositions[1] = currentPos;
                    } else {
                        document.getElementById(currentPos).innerHTML = YGiti3;
                        yellowGitiPositions[1] = currentPos;
                    }

                } else {
                    currentPos = (parseInt(yellowGitiPositions[1]) + parseInt(num)) % 52;
                    document.getElementById(currentPos).innerHTML = YGiti3;
                    yellowGitiPositions[1] = currentPos;
                }
            }
        }
        else if (myid === 'Ythree') {
            if (yellowGitiPositions[2] === -1) {
                alert("Invalid Move");
                isClicked = 1;
            } else {
                var yVal3 = document.getElementById(myParentId);
                var yGiti3 = yVal3.innerHTML;
                yVal3.innerHTML = "";

                currentPos = yellowGitiPositions[2];
                if (((currentPos <= 37 && currentPos >= 32) && (parseInt(yellowGitiPositions[2]) + parseInt(num)) >= 37) || currentPos >= 85) {
                    currentPos = (parseInt(yellowGitiPositions[2]) + parseInt(num));
                    var insideyellowHome3;
                    if (currentPos > 37) {
                        if (currentPos >= 85) {
                            insideyellowHome3 = currentPos % 85;
                        } else {
                            insideyellowHome3 = currentPos % 38;
                        }
                        if (insideyellowHome3 >= 1 && insideyellowHome3 <= 6) {
                            currentPos = yellowGitiPositions[2];
                            if (currentPos >= 85) {
                                if (yellowGitiPositions[2] === 85) {
                                    if (num === 1) {
                                        currentPos = 86;
                                    } else if (num === 2) {
                                        currentPos = 87;
                                    } else if (num === 3) {
                                        currentPos = 88;
                                    } else if (num === 4) {
                                        currentPos = 89;
                                    } else if (num === 5) {
                                        currentPos = 95;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (yellowGitiPositions[2] === 86) {
                                    if (num === 1) {
                                        currentPos = 87;
                                    } else if (num === 2) {
                                        currentPos = 88;
                                    } else if (num === 3) {
                                        currentPos = 89;
                                    } else if (num === 4) {
                                        currentPos = 94;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (yellowGitiPositions[2] === 87) {
                                    if (num === 1) {
                                        currentPos = 88;
                                    } else if (num === 2) {
                                        currentPos = 89;
                                    } else if (num === 3) {
                                        currentPos = 93;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (yellowGitiPositions[2] === 88) {
                                    if (num === 1) {
                                        currentPos = 89;
                                    } else if (num === 2) {
                                        currentPos = 92;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (yellowGitiPositions[2] === 89) {
                                    if (num === 1) {
                                        currentPos = 91;
                                    } else {
                                        alert("Invalid Move")
                                    }
                                } else {
                                    alert("result not possible");
                                    isClicked = 1;
                                }
                            } else {
                                currentPos = 85 + insideyellowHome3;
                            }
                        } else {
                            currentPos = yellowGitiPositions[2];
                            currentPos = parseInt(currentPos);
                            if (insideyellowHome3 === 0) {
                                currentPos = 85;
                            } else if (currentPos + num <= 89) {
                                currentPos = currentPos + num;
                            } else if (currentPos === 37 && num <= 6) {
                                if (num === 1) {
                                    currentPos = 85;
                                } else if (num === 2) {
                                    currentPos = 86;
                                } else if (num === 3) {
                                    currentPos = 87;
                                } else if (num === 4) {
                                    currentPos = 88;
                                } else if (num === 5) {
                                    currentPos = 89;
                                } else if (num === 6) {
                                    currentPos = 90;
                                }
                            } else if (currentPos === 85 && num === 5) {
                                currentPos = 90;
                            } else if (currentPos === 86 && num === 4) {
                                currentPos = 91;
                            } else if (currentPos === 87 && num === 3) {
                                currentPos = 92;
                            } else if (currentPos === 88 && num === 2) {
                                currentPos = 93;
                            } else if (currentPos === 89 && num === 1) {
                                currentPos = 94;
                            } else {
                                alert("Not appropriate number.");
                                currentPos = yellowGitiPositions[2];
                                isClicked = 1;
                            }
                        }
                        document.getElementById(currentPos).innerHTML = yGiti3;
                        yellowGitiPositions[2] = currentPos;
                    } else {
                        document.getElementById(currentPos).innerHTML = yGiti3;
                        yellowGitiPositions[2] = currentPos;
                    }

                } else {
                    currentPos = (parseInt(yellowGitiPositions[2]) + parseInt(num)) % 52;
                    document.getElementById(currentPos).innerHTML = yGiti3;
                    yellowGitiPositions[2] = currentPos
                }
            }
        }
        else if (myid === 'Yfour') {
            myposition = yellowGitiPositions[3];
            if (yellowGitiPositions[3] === -1) {
                alert("Invalid Move");
                isClicked = 1;
            } else {
                var yVal4 = document.getElementById(myParentId);
                var yGiti4 = yVal4.innerHTML;
                yVal4.innerHTML = "";

                currentPos = yellowGitiPositions[3];
                if (((currentPos <= 37 && currentPos >= 32) && (parseInt(yellowGitiPositions[3]) + parseInt(num)) >= 37) || currentPos >= 85) {
                    currentPos = (parseInt(yellowGitiPositions[3]) + parseInt(num));
                    var insideyellowHome4;
                    if (currentPos > 37) {
                        if (currentPos >= 85) {
                            insideyellowHome4 = currentPos % 85;
                        } else {
                            insideyellowHome4 = currentPos % 38;
                        }
                        if (insideyellowHome4 >= 1 && insideyellowHome4 <= 6) {
                            currentPos = yellowGitiPositions[3];
                            if (currentPos >= 85) {
                                if (yellowGitiPositions[3] === 85) {
                                    if (num === 1) {
                                        currentPos = 86;
                                    } else if (num === 2) {
                                        currentPos = 87;
                                    } else if (num === 3) {
                                        currentPos = 88;
                                    } else if (num === 4) {
                                        currentPos = 89;
                                    } else if (num === 5) {
                                        currentPos = 95;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (yellowGitiPositions[3] === 86) {
                                    if (num === 1) {
                                        currentPos = 87;
                                    } else if (num === 2) {
                                        currentPos = 88;
                                    } else if (num === 3) {
                                        currentPos = 89;
                                    } else if (num === 4) {
                                        currentPos = 94;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (yellowGitiPositions[3] === 87) {
                                    if (num === 1) {
                                        currentPos = 88;
                                    } else if (num === 2) {
                                        currentPos = 89;
                                    } else if (num === 3) {
                                        currentPos = 93;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (yellowGitiPositions[3] === 88) {
                                    if (num === 1) {
                                        currentPos = 89;
                                    } else if (num === 2) {
                                        currentPos = 92;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (yellowGitiPositions[3] === 89) {
                                    if (num === 1) {
                                        currentPos = 91;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else {
                                    alert("result not possible");
                                    isClicked = 1;
                                }
                            } else {
                                currentPos = 85 + insideyellowHome4;
                            }
                        } else {
                            console.log("manual ");
                            currentPos = yellowGitiPositions[3];
                            currentPos = parseInt(currentPos);
                            if (insideyellowHome4 === 0) {
                                currentPos = 85;
                            } else if (currentPos + num <= 89) {
                                currentPos = currentPos + num;
                            } else if (currentPos === 37 && num <= 6) {
                                if (num === 1) {
                                    currentPos = 85;
                                } else if (num === 2) {
                                    currentPos = 86;
                                } else if (num === 3) {
                                    currentPos = 87;
                                } else if (num === 4) {
                                    currentPos = 88;
                                } else if (num === 5) {
                                    currentPos = 89;
                                } else if (num === 6) {
                                    currentPos = 90;
                                }
                            } else if (currentPos === 85 && num === 5) {
                                currentPos = 90;
                            } else if (currentPos === 86 && num === 4) {
                                currentPos = 91;
                            } else if (currentPos === 87 && num === 3) {
                                currentPos = 92;
                            } else if (currentPos === 88 && num === 2) {
                                currentPos = 93;
                            } else if (currentPos === 89 && num === 1) {
                                currentPos = 94;
                            } else {
                                alert("Not appropriate number.");
                                currentPos = yellowGitiPositions[3];
                                isClicked = 1;
                            }
                        }
                        document.getElementById(currentPos).innerHTML = yGiti4;
                        yellowGitiPositions[3] = currentPos;
                    } else {
                        document.getElementById(currentPos).innerHTML = yGiti4;
                        yellowGitiPositions[3] = currentPos;
                    }

                } else {
                    currentPos = (parseInt(yellowGitiPositions[3]) + parseInt(num)) % 52;
                    document.getElementById(currentPos).innerHTML = yGiti4;
                    yellowGitiPositions[3] = currentPos
                }

            }
        }
    }
}


function GreenMove(parent,myid) {
    if(turns[2] === 0){
        alert("It's Not Your Turn!!");
        return;
    }
    if(isClicked !== 1){
        alert("Roll the Dice!!");
        return;
    }
    isClicked = 0;
    num = document.getElementById("field").value;
    num = parseInt(num);
    if (num === 6 && document.getElementById(parent).innerHTML !== "") {
        gVal1 = document.getElementById(parent);
        var gGiti1 = gVal1.innerHTML;
        gVal1.innerHTML = "";
        document.getElementById("26").innerHTML = gGiti1;
        if (myid === 'gone') {
            greenGitiPositions[0] = 26;
        } else if (myid === 'gtwo') {
            greenGitiPositions[1] = 26;
        } else if (myid === 'gthree') {
            greenGitiPositions[2] = 26;
        } else if (myid === 'gfour') {
            greenGitiPositions[3] = 26;
        }
    } else {
        myParentId = document.getElementById(myid).parentElement.id;
        if (myid === 'gone') {
            myposition = greenGitiPositions[0];
            if (greenGitiPositions[0] === -1) {
                alert("Invalid Move");
                isClicked = 1;
            } else {
                var gVal2 = document.getElementById(myParentId);
                var gGiti2 = gVal2.innerHTML;
                gVal2.innerHTML = "";

                currentPos = greenGitiPositions[0];
                if (((currentPos <= 24 && currentPos >= 19) && (parseInt(greenGitiPositions[0]) + parseInt(num)) >= 24) || currentPos > 73) {
                    currentPos = (parseInt(greenGitiPositions[0]) + parseInt(num));
                    var insidegreenHome1 ;
                    if (currentPos > 24) {
                        if(currentPos >= 74){
                            insidegreenHome1 = currentPos % 74;
                        }
                        else{
                            insidegreenHome1 = currentPos % 25;
                        }
                        if (insidegreenHome1 >= 1 && insidegreenHome1 <= 6) {
                            currentPos = greenGitiPositions[0];
                            if (currentPos >= 74) {
                                if (greenGitiPositions[0] === 74) {
                                    if (num === 1) {
                                        currentPos = 75;
                                    } else if (num === 2) {
                                        currentPos = 76;
                                    } else if (num === 3) {
                                        currentPos = 77;
                                    } else if (num === 4) {
                                        currentPos = 78;
                                    } else if (num === 5) {
                                        currentPos = 84;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (greenGitiPositions[0] === 75) {
                                    if (num === 1) {
                                        currentPos = 76;
                                    } else if (num === 2) {
                                        currentPos = 77;
                                    } else if (num === 3) {
                                        currentPos = 78;
                                    } else if (num === 4) {
                                        currentPos = 83;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (greenGitiPositions[0] === 76) {
                                    if (num === 1) {
                                        currentPos = 77;
                                    } else if (num === 2) {
                                        currentPos = 78;
                                    } else if (num === 3) {
                                        currentPos = 82;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (greenGitiPositions[0] === 77) {
                                    if (num === 1) {
                                        currentPos = 78;
                                    } else if (num === 2) {
                                        currentPos = 81;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (greenGitiPositions[0] === 78) {
                                    if (num === 1) {
                                        currentPos = 80;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else {
                                    alert("result not possible");
                                    isClicked = 1;
                                }
                            } else {
                                currentPos = 74 + insidegreenHome1;
                            }
                        } else {
                            currentPos = greenGitiPositions[0];
                            currentPos = parseInt(currentPos);
                            if (insidegreenHome1 === 0) {
                                currentPos = 74;
                            } else if (currentPos + num <= 78) {
                                currentPos = currentPos + num;
                            }
                            else if(currentPos===24 && num<=6){
                                if(num===1){
                                    currentPos = 74;
                                }
                                else if(num===2){
                                    currentPos = 75;
                                }
                                else if(num===3){
                                    currentPos = 76;
                                }
                                else if(num===4){
                                    currentPos = 77;
                                }
                                else if(num===5){
                                    currentPos = 78;
                                }
                                else if(num ===6){
                                    currentPos = 81;
                                }
                            }
                            else if (currentPos === 74 && num === 5) {
                                currentPos = 84;
                            } else if (currentPos === 75 && num === 4) {
                                currentPos = 83;
                            } else if (currentPos === 76 && num === 3) {
                                currentPos = 82;
                            } else if (currentPos === 77 && num === 2) {
                                currentPos = 81;
                            } else if (currentPos === 78 && num === 1) {
                                console.log("reached.");
                                currentPos = 80;
                            } else {
                                alert("Not appropriate number.");
                                currentPos = greenGitiPositions[0];
                                isClicked = 1;
                            }
                        }
                        document.getElementById(currentPos).innerHTML = gGiti2;
                        greenGitiPositions[0] = currentPos;
                    } else {
                        document.getElementById(currentPos).innerHTML = gGiti2;
                        greenGitiPositions[0] = currentPos;
                    }

                } else {

                    currentPos = (parseInt(greenGitiPositions[0]) + parseInt(num)) % 52;
                    document.getElementById(currentPos).innerHTML = gGiti2;
                    greenGitiPositions[0] = currentPos;

                }
            }
        } else if (myid === 'gtwo') {
            myposition = greenGitiPositions[1];
            if (greenGitiPositions[1] === -1) {
                alert("Invalid Move");
                isClicked = 1;
            } else {
                var gVal3 = document.getElementById(myParentId);
                var gGiti3 = gVal3.innerHTML;
                gVal3.innerHTML = "";

                currentPos = greenGitiPositions[1];
                if (((currentPos <= 24 && currentPos >= 19) && (parseInt(greenGitiPositions[1]) + parseInt(num)) >= 24) || currentPos > 73) {
                    currentPos = (parseInt(greenGitiPositions[1]) + parseInt(num));
                    var insidegreenHome2;
                    if (currentPos > 24) {
                        if(currentPos >= 74){
                            insidegreenHome2 = currentPos % 74;
                        }
                        else{
                            insidegreenHome2 = currentPos % 25;
                        }
                        if (insidegreenHome2 >= 1 && insidegreenHome2 <= 6) {
                            currentPos = greenGitiPositions[1];
                            if (currentPos >= 74) {
                                if (greenGitiPositions[1] === 74) {
                                    if (num === 1) {
                                        currentPos = 75;
                                    } else if (num === 2) {
                                        currentPos = 76;
                                    } else if (num === 3) {
                                        currentPos = 77;
                                    } else if (num === 4) {
                                        currentPos = 78;
                                    } else if (num === 5) {
                                        currentPos = 84;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (greenGitiPositions[1] === 75) {
                                    if (num === 1) {
                                        currentPos = 76;
                                    } else if (num === 2) {
                                        currentPos = 77;
                                    } else if (num === 3) {
                                        currentPos = 78;
                                    } else if (num === 4) {
                                        currentPos = 83;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (greenGitiPositions[1] === 76) {
                                    if (num === 1) {
                                        currentPos = 77;
                                    } else if (num === 2) {
                                        currentPos = 78;
                                    } else if (num === 3) {
                                        currentPos = 82;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (greenGitiPositions[1] === 77) {
                                    if (num === 1) {
                                        currentPos = 78;
                                    } else if (num === 2) {
                                        currentPos = 81;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (greenGitiPositions[1] === 78) {
                                    if (num === 1) {
                                        currentPos = 80;
                                    } else {
                                        alert("Invalid Move")
                                    }
                                } else {
                                    alert("result not possible");
                                    isClicked = 1;
                                }
                            } else {
                                currentPos = 74 + insidegreenHome2;
                            }
                        } else {
                            currentPos = greenGitiPositions[1];
                            currentPos = parseInt(currentPos);
                            if (insidegreenHome2 === 0) {
                                currentPos = 74;
                            } else if (currentPos>74 && (currentPos + num <= 78)) {
                                currentPos = currentPos + num;
                            }
                            else if(currentPos===24 && num<=6){
                                if(num===1){
                                    currentPos = 74;
                                }
                                else if(num===2){
                                    currentPos = 75;
                                }
                                else if(num===3){
                                    currentPos = 76;
                                }
                                else if(num===4){
                                    currentPos = 77;
                                }
                                else if(num===5){
                                    currentPos = 78;
                                }
                                else if(num ===6){
                                    currentPos = 81;
                                }
                            }else if (currentPos === 24 && num === 6) {
                                currentPos = 79;
                            } else if (currentPos === 74 && num === 5) {
                                currentPos = 84;
                            } else if (currentPos === 75 && num === 4) {
                                currentPos = 83;
                            } else if (currentPos === 76 && num === 3) {
                                currentPos = 82;
                            } else if (currentPos === 77 && num === 2) {
                                currentPos = 81;
                            } else if (currentPos === 78 && num === 1) {
                                currentPos = 80;
                            } else {
                                alert("Not appropriate number.");
                                currentPos = greenGitiPositions[1];
                                isClicked = 1;
                            }
                        }
                        document.getElementById(currentPos).innerHTML = gGiti3;
                        greenGitiPositions[1] = currentPos;
                    } else {
                        document.getElementById(currentPos).innerHTML = gGiti3;
                        greenGitiPositions[1] = currentPos;
                    }
                } else {
                    currentPos = (parseInt(greenGitiPositions[1]) + parseInt(num)) % 52;
                    document.getElementById(currentPos).innerHTML = gGiti3;
                    greenGitiPositions[1] = currentPos;
                }

            }
        } else if (myid === 'gthree') {
            myposition = greenGitiPositions[2];
            if (greenGitiPositions[2] === -1) {
                alert("Invalid Move");
                isClicked = 1;
            } else {
                var gVal4 = document.getElementById(myParentId);
                var gGiti4 = gVal4.innerHTML;
                gVal4.innerHTML = "";

                currentPos = greenGitiPositions[2];
                if (((currentPos <= 24 && currentPos >= 19) && (parseInt(greenGitiPositions[2]) + parseInt(num)) >= 24) || currentPos > 73) {
                    currentPos = (parseInt(greenGitiPositions[2]) + parseInt(num));
                    var insidegreenHome3;
                    if (currentPos > 24) {
                        if(currentPos >= 74){
                            insidegreenHome3 = currentPos % 74;
                        }
                        else{
                            insidegreenHome3 = currentPos % 25;
                        }
                        if (insidegreenHome3 >= 1 && insidegreenHome3 <= 6) {
                            currentPos = greenGitiPositions[2];
                            if (currentPos >= 74) {
                                if (greenGitiPositions[2] === 74) {
                                    if (num === 1) {
                                        currentPos = 75;
                                    } else if (num === 2) {
                                        currentPos = 76;
                                    } else if (num === 3) {
                                        currentPos = 77;
                                    } else if (num === 4) {
                                        currentPos = 78;
                                    } else if (num === 5) {
                                        currentPos = 84;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (greenGitiPositions[2] === 75) {
                                    if (num === 1) {
                                        currentPos = 76;
                                    } else if (num === 2) {
                                        currentPos = 77;
                                    } else if (num === 3) {
                                        currentPos = 78;
                                    } else if (num === 4) {
                                        currentPos = 83;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (greenGitiPositions[2] === 76) {
                                    if (num === 1) {
                                        currentPos = 77;
                                    } else if (num === 2) {
                                        currentPos = 78;
                                    } else if (num === 3) {
                                        currentPos = 82;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (greenGitiPositions[2] === 77) {
                                    if (num === 1) {
                                        currentPos = 78;
                                    } else if (num === 2) {
                                        currentPos = 81;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (greenGitiPositions[2] === 78) {
                                    if (num === 1) {
                                        currentPos = 80;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else {
                                    alert("result not possible");
                                    isClicked = 1;
                                }
                            } else {
                                currentPos = 74 + insidegreenHome3;
                            }
                        } else {
                            currentPos = greenGitiPositions[2];
                            currentPos = parseInt(currentPos);
                            if (insidegreenHome3 === 0) {
                                currentPos = 74;
                            } else if (currentPos>=74 && (currentPos + num <= 78)) {
                                currentPos = currentPos + num;
                            }
                            else if(currentPos===24 && num<=6){
                                if(num===1){
                                    currentPos = 74;
                                }
                                else if(num===2){
                                    currentPos = 75;
                                }
                                else if(num===3){
                                    currentPos = 76;
                                }
                                else if(num===4){
                                    currentPos = 77;
                                }
                                else if(num===5){
                                    currentPos = 78;
                                }
                                else if(num ===6){
                                    currentPos = 81;
                                }
                            }
                            else if (currentPos === 24 && num === 6) {
                                currentPos = 79;
                            } else if (currentPos === 74 && num === 5) {
                                currentPos = 84;
                            } else if (currentPos === 75 && num === 4) {
                                currentPos = 83;
                            } else if (currentPos === 76 && num === 3) {
                                currentPos = 82;
                            } else if (currentPos === 77 && num === 2) {
                                currentPos = 81;
                            } else if (currentPos === 78 && num === 1) {
                                currentPos = 80;
                            } else {
                                alert("Not appropriate number.");
                                currentPos = greenGitiPositions[2];
                                isClicked = 1;
                            }
                        }
                        document.getElementById(currentPos).innerHTML = gGiti4;
                        greenGitiPositions[2] = currentPos;
                    } else {
                        document.getElementById(currentPos).innerHTML = gGiti4;
                        greenGitiPositions[2] = currentPos;
                    }
                } else {
                    currentPos = (parseInt(greenGitiPositions[2]) + parseInt(num)) % 52;
                    document.getElementById(currentPos).innerHTML = gGiti4;
                    greenGitiPositions[2] = currentPos;
                }
            }
        } else if (myid === 'gfour') {
            myposition = greenGitiPositions[3];
            if (greenGitiPositions[3] === -1) {
                alert("Invalid Move");
                isClicked = 1;
            } else {
                var gVal5 = document.getElementById(myParentId);
                var gGiti5 = gVal5.innerHTML;
                gVal5.innerHTML = "";

                currentPos = greenGitiPositions[3];
                if (((currentPos <= 24 && currentPos >= 19) && (parseInt(greenGitiPositions[3]) + parseInt(num)) >= 24) || currentPos > 73) {
                    currentPos = (parseInt(greenGitiPositions[3]) + parseInt(num));
                    var insidegreenHome4;
                    if (currentPos > 24) {
                        if(currentPos >= 74){
                            insidegreenHome4 = currentPos % 74;
                        }
                        else{
                            insidegreenHome4 = currentPos % 25;
                        }
                        if (insidegreenHome4 >= 1 && insidegreenHome4 <= 6) {
                            currentPos = greenGitiPositions[3];
                            if (currentPos >= 74) {
                                if (greenGitiPositions[3] === 74) {
                                    if (num === 1) {
                                        currentPos = 75;
                                    } else if (num === 2) {
                                        currentPos = 76;
                                    } else if (num === 3) {
                                        currentPos = 77;
                                    } else if (num === 4) {
                                        currentPos = 78;
                                    } else if (num === 5) {
                                        currentPos = 84;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (greenGitiPositions[3] === 75) {
                                    if (num === 1) {
                                        currentPos = 76;
                                    } else if (num === 2) {
                                        currentPos = 77;
                                    } else if (num === 3) {
                                        currentPos = 78;
                                    } else if (num === 4) {
                                        currentPos = 83;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (greenGitiPositions[3] === 76) {
                                    if (num === 1) {
                                        currentPos = 77;
                                    } else if (num === 2) {
                                        currentPos = 78;
                                    } else if (num === 3) {
                                        currentPos = 82;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (greenGitiPositions[3] === 77) {
                                    if (num === 1) {
                                        currentPos = 78;
                                    } else if (num === 2) {
                                        currentPos = 81;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else if (greenGitiPositions[3] === 78) {
                                    if (num === 1) {
                                        currentPos = 80;
                                    } else {
                                        alert("Invalid Move");
                                        isClicked = 1;
                                    }
                                } else {
                                    alert("result not possible");
                                    isClicked = 1;
                                }
                            }
                            else {
                                currentPos = 74 + insidegreenHome4;
                            }
                        }
                        else {
                            currentPos = greenGitiPositions[3];
                            currentPos = parseInt(currentPos);
                            if (insidegreenHome4 === 0) {
                                currentPos = 74;
                            }
                            else if(currentPos===24 && num<=6){
                                if(num===1){
                                    currentPos = 74;
                                }
                                else if(num===2){
                                    currentPos = 75;
                                }
                                else if(num===3){
                                    currentPos = 76;
                                }
                                else if(num===4){
                                    currentPos = 77;
                                }
                                else if(num===5){
                                    currentPos = 78;
                                }
                                else if(num ===6){
                                    currentPos = 81;
                                }
                            }
                            else if (currentPos>=74 && (currentPos + num <= 78)) {
                                currentPos = currentPos + num;
                            } else if (currentPos === 24 && num === 6) {
                                currentPos = 79;
                            } else if (currentPos === 74 && num === 5) {
                                currentPos = 84;
                            } else if (currentPos === 75 && num === 4) {
                                currentPos = 83;
                            } else if (currentPos === 76 && num === 3) {
                                currentPos = 82;
                            } else if (currentPos === 77 && num === 2) {
                                currentPos = 81;
                            } else if (currentPos === 78 && num === 1) {
                                currentPos = 80;
                            } else {
                                alert("Not appropriate number.");
                                currentPos = greenGitiPositions[3];
                                isClicked = 1;
                            }
                        }
                        document.getElementById(currentPos).innerHTML = gGiti5;
                        greenGitiPositions[3] = currentPos;
                    } else {
                        document.getElementById(currentPos).innerHTML = gGiti5;
                        greenGitiPositions[3] = currentPos;
                    }
                } else {
                    currentPos = (parseInt(greenGitiPositions[3]) + parseInt(num)) % 52;
                    document.getElementById(currentPos).innerHTML = gGiti5;
                    greenGitiPositions[3] = currentPos;
                }
            }
        }
    }
}




