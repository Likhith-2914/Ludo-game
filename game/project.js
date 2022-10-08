window.addEventListener('DOMContentLoaded', () => {

    let dice = ['./images/one.png', './images/two.png', './images/three.png', './images/four.png', './images/five.png', './images/six.png']

    let players = [0, 0, 0, 0, 0]; //players[0] = 1 if game is over
    let player = 0;

    let player11pos = [0, 0, 0, 0];
    let player12pos = [0, 0, 0, 0];
    let player13pos = [0, 0, 0, 0];
    let player14pos = [0, 0, 0, 0];

    let player21pos = [0, 0, 0, 0];
    let player22pos = [0, 0, 0, 0];
    let player23pos = [0, 0, 0, 0];
    let player24pos = [0, 0, 0, 0];

    let player31pos = [0, 0, 0, 0];
    let player32pos = [0, 0, 0, 0];
    let player33pos = [0, 0, 0, 0];
    let player34pos = [0, 0, 0, 0];

    let player41pos = [0, 0, 0, 0];
    let player42pos = [0, 0, 0, 0];
    let player43pos = [0, 0, 0, 0];
    let player44pos = [0, 0, 0, 0];



    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function getID(row, col) {
        let str = "cell";
        str += row.toString();
        str += col.toString();
        return str;
    }

    function setHome(coin, id)
    {
        if(coin == 1)
        {
            if(id == "1") player11pos = [0, 0, 0, 0];
            else if(id=="2") player12pos = [0, 0, 0, 0];
            else if(id=="3") player13pos = [0, 0, 0, 0];
            else if(id=="4") player14pos = [0, 0, 0, 0]; 
        }
        else if(coin == 2)
        {
            if(id == "1") player21pos = [0, 0, 0, 0];
            else if(id=="2") player22pos = [0, 0, 0, 0];
            else if(id=="3") player23pos = [0, 0, 0, 0];
            else if(id=="4") player24pos = [0, 0, 0, 0]; 
        }
        else if(coin == 3)
        {
            if(id == "1") player31pos = [0, 0, 0, 0];
            else if(id=="2") player32pos = [0, 0, 0, 0];
            else if(id=="3") player33pos = [0, 0, 0, 0];
            else if(id=="4") player34pos = [0, 0, 0, 0]; 
        }
        else if(coin == 4)
        {
            if(id == "1") player41pos = [0, 0, 0, 0];
            else if(id=="2") player42pos = [0, 0, 0, 0];
            else if(id=="3") player43pos = [0, 0, 0, 0];
            else if(id=="4") player44pos = [0, 0, 0, 0]; 
        }
        
    }

    function sendHome(row, col)
    {
        let coin, id, color;
        coin = colorOfBox(row, col);
        let cell = document.getElementById("cell"+row.toString()+col.toString());
        id = cell.innerHTML;
        color = cell.style.backgroundColor;
        setHome(coin, id.toString());
        let coin_id = "coin" + coin.toString() + id.toString();
        document.getElementById(coin_id).style.backgroundColor = color;
    }

    function colorOfBox(row, col)
    {
        var box = row.toString() + col.toString();
        var id = "cell" + box;
        var box = document.getElementById(id);
        if((box.style.backgroundColor == "") || (box.style.backgroundColor == "white")) return 0;
        else if(box.style.backgroundColor == "red") return 1;
        else if(box.style.backgroundColor == "green") return 2;
        else if(box.style.backgroundColor == "yellow") return 3;
        else if(box.style.backgroundColor == "blue") return 4;
    }

    function replaceBox(pos, color)
    {
        if(pos[3] != 0) return 1;
        if(colorOfBox(pos[0], pos[1]) == 0)
        {
            return 1; //can be replaced/updated
        }

        if(colorOfBox(pos[0], pos[1]) == color)
        {
            return 0; //cannot be replaced.
        }
        else
        {
            if(colorOfBox(pos[0], pos[1]) == 1)
            {
                if((pos[0] == 7) && (pos[1] == 2))
                {
                    return 0; //as it is in safe point..can't be replaced; 
                }
                else
                {
                    sendHome(pos[0], pos[1]);
                    return 1;
                }
            }
            else if(colorOfBox(pos[0], pos[1]) == 2)
            {
                if((pos[0] == 2) && (pos[1] == 9))
                {
                    return 0; //as it is in safe point..can't be replaced; 
                }
                else
                {
                    sendHome(pos[0], pos[1]);
                    return 1;
                } 
            }
            else if(colorOfBox(pos[0], pos[1]) == 3)
            {
                if((pos[0] == 9) && (pos[1] == 14))
                {
                    return 0; //as it is in safe point..can't be replaced; 
                }
                else
                {
                    sendHome(pos[0], pos[1]);
                    return 1;
                }
            }
            else if(colorOfBox(pos[0], pos[1]) == 4)
            {
                if((pos[0] == 14) && (pos[1] == 7))
                {
                    return 0; //as it is in safe point..can't be replaced; 
                }
                else
                {
                    sendHome(pos[0], pos[1]);
                    return 1;
                }
            }
        }
        
    }

    function updateBox(row, col, safety, pos, fromHome, color, coin) {
        let colour;
        if(color == 1) colour = "red";
        else if(color == 2) colour = "green";
        else if(color == 3) colour = "yellow";
        else if(color == 4) colour = "blue";

        if(!replaceBox(pos, color))
        {
            pos[0] = row; pos[1] = col; pos[2] = safety;
            return 0;
        }
        else
        {
            if(fromHome)
            {
                let id = getID(pos[0], pos[1]);
                document.getElementById(id).style.backgroundColor = colour;
                document.getElementById(id).innerHTML = coin;
                document.getElementById("coin"+color.toString()+coin.toString()).style.backgroundColor = "white";
            }
            else
            {
                document.getElementById(getID(row, col)).style.backgroundColor = "";
                document.getElementById(getID(row, col)).innerHTML = "";
                if(pos[2] == 0) //not in safe lines
                {
                    document.getElementById(getID(pos[0], pos[1])).style.backgroundColor = colour;
                    document.getElementById(getID(pos[0], pos[1])).innerHTML = coin;
                }
                else
                {
                    if(pos[3] == 1)
                    {
                        let coinId = "coin"+color.toString()+coin.toString();
                        document.getElementById(coinId).style.backgroundColor = "lightgreen";
                        pos[0] = 0; pos[1] = 0;
                    }
                    else
                    {
                        document.getElementById(getID(pos[0], pos[1])).style.backgroundColor = colour;
                        document.getElementById(getID(pos[0], pos[1])).innerHTML = coin;
                    }
                }
            }
            return 1;
        }
    }

    function move(pos, num) {
        while(num > 0)
        {
            if(pos[0] == 7) {
                while((pos[1]<=6) && (num>0))
                {
                    pos[1]++; num--;
                }
                if(pos[1] == 7)
                {
                    pos[0]--;
                }
                while((10<=pos[1]) && (pos[1]<=14) && (num>0))
                {
                    pos[1]++; num--;
                }
            }

            if(pos[1] == 7) {
                while((1<pos[0]) && (pos[0]<=6) && (num>0))
                {
                    pos[0]--; num--;
                }
                while((10<=pos[0]) && (pos[0]<=15) && (num>0))
                {
                    pos[0]--; num--;
                }
                if(pos[0] == 9) pos[1]--;
            }

            if(pos[0] == 1)
            {
                while((7<=pos[1]) && (pos[1]<9) && (num>0))
                {
                    pos[1]++; num--;
                }
            }

            if(pos[1] == 9)
            {
                while((pos[0]<=6) && (num>0))
                {
                    pos[0]++; num--;
                }
                if(pos[0] == 7) pos[1]++;
                while((10<=pos[0]) && (pos[0]<15) && (num>0))
                {
                    pos[0]++; num--;
                }
            }

            if(pos[1] == 15)
            {
                while((7<=pos[0]) && (pos[0]<9) && (num>0))
                {
                    pos[0]++; num--; 
                }
            }

            if(pos[0] == 9)
            {
                while((1<pos[1]) && (pos[1]<=6) && (num>0))
                {
                    pos[1]--; num--;
                }
                while((10<=pos[1]) && (pos[1]<=15) && (num>0))
                {
                    pos[1]--; num--;
                }
                if(pos[1]==9) pos[0]++;
            }

            if(pos[0] == 15)
            {
                while((7<pos[1]) && (pos[1]<=9) && (num>0))
                {
                    pos[1]--; num--; 
                }
            }

            if(pos[1] == 1)
            {
                while((7<pos[0]) && (pos[0]<=9) && (num>0))
                {
                    pos[0]--; num--;
                }
            }
        }
    }

    function safemove(pos, num)
    {
        if((pos[0] == 8) && (pos[1] < 7))
        {
            var tmp = pos[1]
            while(num > 0)
            {
                pos[1]++; num--;
            }
            if(pos[1]>7) pos[1] = tmp;
        }

        if((pos[1] == 8) && (pos[0] < 7))
        {
            var tmp = pos[0]
            while(num > 0)
            {
                pos[0]++; num--;
            }
            if(pos[0]>7) pos[0] = tmp;
        }

        if((pos[0] == 8) && (pos[1] > 9))
        {
            var tmp = pos[1]
            while(num > 0)
            {
                pos[1]--; num--;
            }
            if(pos[1]<9) pos[1] = tmp;
        }

        if((pos[1] == 8) && (pos[0] > 9))
        {
            var tmp = pos[0]
            while(num > 0)
            {
                pos[0]--; num--;
            }
            if(pos[0]<9) pos[0] = tmp;
        }

    }

    function move1(pos, num) {
        if((pos[0] == 0) && (pos[1] == 0))
        {
            if(num == 6) num = 1;
            else return;
            pos[0] = 7; pos[1] = 2;
            num--;
            return;
        }

        if(!pos[2])
        {
            let row = pos[0];
            let col = pos[1];
            let roll = num;
            move(pos, num);
            if(((row == 9) && (col <= 5)) || ((row == 8) && (col == 1)))
            {
                if(pos[0] == 7)
                {
                    pos[0] = row;
                    pos[1] = col;
                    num = roll;
                    pos[2] = 1;
                }
            }
        }
        if(pos[2])
        {
            if((pos[0] != 8) || (pos[1] == 1))
            {
                if((pos[0] == 9) && (pos[1] == 5)) num-=5;
                else if((pos[0] == 9) && (pos[1] == 4)) num-=4;
                else if((pos[0] == 9) && (pos[1] == 3)) num-=3;
                else if((pos[0] == 9) && (pos[1] == 2)) num-=2;
                else if((pos[0] == 9) && (pos[1] == 1)) num-=1;
                pos[0] = 8; pos[1] = 1;
            }
            safemove(pos, num);
        }
    }

    function move2(pos, num) {
        if((pos[0] == 0) && (pos[1] == 0))
        {
            if(num == 6) num = 1;
            else return;
            pos[0] = 2; pos[1] = 9;
            num--;
            return;
        }

        if(!pos[2])
        {
            let row = pos[0];
            let col = pos[1];
            let roll = num;
            move(pos, num);
            if(((col == 7) && (row <= 5)) || ((col == 8) && (row == 1)))
            {
                if(pos[1] == 9)
                {
                    pos[0] = row;
                    pos[1] = col;
                    num = roll;
                    pos[2] = 1;
                }
            }
        }
        if(pos[2])
        {
            if(!((pos[1] == 8) && (pos[0] != 1)))
            {
                if((pos[1] == 7) && (pos[0] == 5)) num-=5;
                else if((pos[1] == 7) && (pos[0] == 4)) num-=4;
                else if((pos[1] == 7) && (pos[0] == 3)) num-=3;
                else if((pos[1] == 7) && (pos[0] == 2)) num-=2;
                else if((pos[1] == 7) && (pos[0] == 1)) num-=1;
                pos[1] = 8; pos[0] = 1;
            }
            safemove(pos, num);
        }
    }

    function move3(pos, num) {
        if((pos[0] == 0) && (pos[1] == 0))
        {
            if(num == 6) num = 1;
            else return;
            pos[0] = 9; pos[1] = 14;
            num--;
            return;
        }

        if(!pos[2])
        {
            let row = pos[0];
            let col = pos[1];
            let roll = num;
            move(pos, num);
            if(((row == 7) && (col >= 11)) || ((row == 8)&&(col == 15)))
            {
                if(pos[0] == 9)
                {
                    pos[0] = row;
                    pos[1] = col;
                    num = roll;
                    pos[2] = 1;
                }
            }
        }
        if(pos[2])
        {
            if(!((pos[0] == 8) && (pos[1] != 15)))
            {
                if((pos[0] == 7) && (pos[1] == 11)) num-=5;
                else if((pos[0] == 7) && (pos[1] == 12)) num-=4;
                else if((pos[0] == 7) && (pos[1] == 13)) num-=3;
                else if((pos[0] == 7) && (pos[1] == 14)) num-=2;
                else if((pos[0] == 7) && (pos[1] == 15)) num-=1;
                pos[0] = 8; pos[1] = 15;
            }
            safemove(pos, num);
        }
    }

    function move4(pos, num) {
        if((pos[0] == 0) && (pos[1] == 0))
        {
            if(num == 6) num = 1;
            else return;
            pos[0] = 14; pos[1] = 7;
            num--;
            return;
        }

        if(!pos[2])
        {
            let row = pos[0];
            let col = pos[1];
            let roll = num;
            move(pos, num);
            if(((col == 9) && (row >= 11)) || ((row == 15) && (col==8)))
            {
                if(pos[1]==7)
                {
                    pos[0] = row;
                    pos[1] = col;
                    num = roll;
                    pos[2] = 1;
                }
            }
        }
        if(pos[2])
        {
            if(!((pos[1] == 8) && (pos[0] != 15)))
            {
                if((pos[1] == 9) && (pos[0] == 11)) num-=5;
                else if((pos[1] == 9) && (pos[0] == 12)) num-=4;
                else if((pos[1] == 9) && (pos[0] == 13)) num-=3;
                else if((pos[1] == 9) && (pos[0] == 14)) num-=2;
                else if((pos[1] == 9) && (pos[0] == 15)) num-=1;
                pos[1] = 8; pos[0] = 15;
            }
            safemove(pos, num);
        }
    }

    function play1(num, coin, pos) {
        let row = pos[0];
        let col = pos[1];
        let safety = pos[2];
        let fromHome = false;
        if((pos[0] == 0) && (pos[1] == 0)) fromHome = true;

        let number = 0;
        if(coin == "coin11") number = 1;
        else if(coin == "coin12") number = 2;
        else if(coin == "coin13") number = 3;
        else if(coin == "coin14") number = 4;


        move1(pos, num); //updates the new position
        if((pos[0] == 8) && (pos[1] == 7)) pos[3] = 1;

        //check for same coin meeting

        if(updateBox(row, col, safety, pos, fromHome, 1, number)) players[1] = 0;
    }

    function play2(num, coin, pos) {
        let row = pos[0];
        let col = pos[1];
        let safety = pos[2];
        let fromHome = false;
        if((pos[0] == 0) && (pos[1] == 0)) fromHome = true;

        let number = 0;
        if(coin == "coin21") number = 1;
        else if(coin == "coin22") number = 2;
        else if(coin == "coin23") number = 3;
        else if(coin == "coin24") number = 4;


        move2(pos, num); //updates the new position
        if((pos[0] == 7) && (pos[1] == 8)) pos[3] = 1;

        //check for same coin meeting

        if(updateBox(row, col, safety, pos, fromHome, 2, number)) players[2] = 0;

    }

    function play3(num, coin, pos) {
        let row = pos[0];
        let col = pos[1];
        let safety = pos[2];
        let fromHome = false;
        if((pos[0] == 0) && (pos[1] == 0)) fromHome = true;

        let number = 0;
        if(coin == "coin31") number = 1;
        else if(coin == "coin32") number = 2;
        else if(coin == "coin33") number = 3;
        else if(coin == "coin34") number = 4;


        move3(pos, num); //updates the new position
        if((pos[0] == 8) && (pos[1] == 9)) pos[3] = 1;

        //check for same coin meeting

        if(updateBox(row, col, safety, pos, fromHome, 3, number)) players[3] = 0;

    }

    function play4(num, coin, pos) {
        let row = pos[0];
        let col = pos[1];
        let safety = pos[2];
        let fromHome = false;
        if((pos[0] == 0) && (pos[1] == 0)) fromHome = true;

        let number = 0;
        if(coin == "coin41") number = 1;
        else if(coin == "coin42") number = 2;
        else if(coin == "coin43") number = 3;
        else if(coin == "coin44") number = 4;


        move4(pos, num); //updates the new position'
        if((pos[0] == 9) && (pos[1] == 8)) pos[3] = 1;

        //check for same coin meeting

        if(updateBox(row, col, safety, pos, fromHome, 4, number)) players[4] = 0;

    }


    function play(num)
    {
            document.getElementById("coin11").onclick = function() {if((players[1]>0) && !player11pos[3])play1(num, "coin11", player11pos)};
            document.getElementById("coin12").onclick = function() {if((players[1]>0) && !player12pos[3])play1(num, "coin12", player12pos)};
            document.getElementById("coin13").onclick = function() {if((players[1]>0) && !player13pos[3])play1(num, "coin13", player13pos)};
            document.getElementById("coin14").onclick = function() {if((players[1]>0) && !player14pos[3])play1(num, "coin14", player14pos)};

            document.getElementById("coin21").onclick = function() {if((players[2]>0) && !player21pos[3])play2(num, "coin21", player21pos)};            
            document.getElementById("coin22").onclick = function() {if((players[2]>0) && !player22pos[3])play2(num, "coin22", player22pos)};
            document.getElementById("coin23").onclick = function() {if((players[2]>0) && !player23pos[3])play2(num, "coin23", player23pos)};
            document.getElementById("coin24").onclick = function() {if((players[2]>0) && !player24pos[3])play2(num, "coin24", player24pos)};

            document.getElementById("coin31").onclick = function() {if((players[3]>0) && !player31pos[3])play3(num, "coin31", player31pos)};            
            document.getElementById("coin32").onclick = function() {if((players[3]>0) && !player32pos[3])play3(num, "coin32", player32pos)};
            document.getElementById("coin33").onclick = function() {if((players[3]>0) && !player33pos[3])play3(num, "coin33", player33pos)};
            document.getElementById("coin34").onclick = function() {if((players[3]>0) && !player34pos[3])play3(num, "coin34", player34pos)};
            
            document.getElementById("coin41").onclick = function() {if((players[4]>0) && !player41pos[3])play4(num, "coin41", player41pos)};            
            document.getElementById("coin42").onclick = function() {if((players[4]>0) && !player42pos[3])play4(num, "coin42", player42pos)};
            document.getElementById("coin43").onclick = function() {if((players[4]>0) && !player43pos[3])play4(num, "coin43", player43pos)};
            document.getElementById("coin44").onclick = function() {if((players[4]>0) && !player44pos[3])play4(num, "coin44", player44pos)};

            // document.onkeydown = function(e) {if((e.ctrlKey) && (e.which == 49)) document.getElementById("coin11").onclick}

            //remove the player whose all 

            var isWon = false;
            if(player == 1)
            {
                if(player11pos[3]&&player12pos[3]&&player13pos[3]&&player14pos[3]) isWon = true;
            }
            else if(player == 2)
            {
                if(player21pos[3]&&player22pos[3]&&player23pos[3]&&player24pos[3]) isWon = true;
            }
            else if(player == 3)
            {
                if(player31pos[3]&&player32pos[3]&&player33pos[3]&&player34pos[3]) isWon = true;
            }
            else if(player == 4)
            {
                if(player41pos[3]&&player42pos[3]&&player43pos[3]&&player44pos[3]) isWon = true;
            }

            if(isWon) players[player] = -1
            else players[player] = 0;

            do {
                player = (player%4)+1;
            } while (players[player] < 0);

            players[player] = 1;
    }

    function rolldice() {
        var choice = document.getElementById("choice");
        var num = getRandomInt(6);
        choice.style.backgroundImage = `url(${dice[num]})`;
        num = num + 1;

        play(num);
    }

    function start()
    {
        player = 4;
        players[player] = 1;
        document.getElementById('rollbutton').onclick = function() {rolldice()};
        document.addEventListener('keydown', (event) => {
            if(event.keyCode == 13) rolldice()
        })
    }

    start()

})