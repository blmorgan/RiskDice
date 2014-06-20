/*//____________________________
//Program   : RiskDice.js
//Author    : Ben Morgan
//Date      : 6/19/2014
//Purpose   : Create a risk dice emulator, simulating Risk attack and defense:
                * 1-3 attack dice
                * 1-2 defense dice 
                * match highest of each
//Updated   : 
//Last Run  :   
//____________________________*/

function RiskDice() {
//get number of dice for attack and defense
    //attack
    if (document.getElementById("ad1").checked)
    {
        var attackNumber = Number(document.getElementById("ad1").value);
    }
    else if (document.getElementById("ad2").checked)
    {
        var attackNumber = Number(document.getElementById("ad2").value);
    }
    else if (document.getElementById("ad3").checked)
    {
        var attackNumber = Number(document.getElementById("ad3").value);
    }
    else
    {
        confirm("Please choose the number of attack dice.");
        return -1;
    }
    //defense
    if (document.getElementById("dd1").checked)
    {
        var defenseNumber = Number(document.getElementById("dd1").value);
    }
    else if (document.getElementById("dd2").checked)
    {
        var defenseNumber = Number(document.getElementById("dd2").value);
    }
    else
    {
        confirm("Please choose the number of defense dice.");
        return -1;
    }
       
    //now roll the dice
    var attackResults = rollDice(attackNumber);
    var defenseResults = rollDice(defenseNumber);

    //display results    
    var tblHeader = '<table border=1><tr><th>Attack Results &nbsp &nbsp </th><th>Defense Results &nbsp &nbsp </th><th>Outcome &nbsp &nbsp </th></tr>';
    var tblFooter = '</table>';
    
    if (attackNumber >= defenseNumber) { //determine how many rows to display in output
        var rows = Number(attackNumber);
    }
    else {
        var rows = Number(defenseNumber);
    }
    
    var tblBody = ''; //table body, will be filled by loop
    
    for (var i = 0; i < rows; i++) {
        var curOutcome = compareResults(attackResults[i],defenseResults[i]); //get result
        if (String(attackResults[i]) == "undefined") { //improve display for empty attack results
            var curAttack = "";
        }
        else {
            var curAttack = attackResults[i]
        }
        if (String(defenseResults[i]) == "undefined") { //improve display for empty defense results
            var curDefense = "";
        }
        else {
            var curDefense = defenseResults[i]
        }
        
        tblBody = tblBody + '<tr><td>' + curAttack + '</td><td>' + curDefense + '</td><td>' + curOutcome + '</td> </tr>'; //build row
    }
    
    document.getElementById("Result").innerHTML = tblHeader + tblBody + tblFooter;    
};

function rollDice(rolls){
    //roll dice the specified number of times, then return an array with the results.
    var rollResults = [];
    
    for (var i = 1; i <= rolls; i++) {
        var curResult = Math.floor(Math.random() * 6) + 1; //generate random number 1-6
        rollResults.push(curResult);
    }
    
    rollResults.sort(function(a, b){return b-a}); //sort array in descending order

    return rollResults;
};

function compareResults(attack,defense){
    //compare each attack and defense dice roll.
    //this is a standard numeric comparison, with ties going to the defense.
    
    //account for empty variables and quit comparison
    if (String(attack) == "undefined") {
        return "";
    }
    else if (String(defense) == "undefined") {
        return "";
    }
    
    if (Number(attack) > Number(defense)) {
        return "Defender loses one army.";
    }
    else {
        return "Attacker loses one army.";
    }   
};