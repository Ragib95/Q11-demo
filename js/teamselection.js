/*global WildRydes _config*/
var items = new Array();
var name = "";
var a=new Array();
var submit_data=new Object();
submit_data['MatchID']='CSKvsRCB';


var authToken;

var poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId
    };


var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
      //var currentUser = userPool.getCurrentUser();
var cognitoUser = userPool.getCurrentUser();
console.log(cognitoUser.username);
submit_data['UserName']=cognitoUser.username;
submit_data['UserTeamName']=submit_data['MatchID']+"-"+submit_data['UserName'];

// function which is triggered whenever a checkbox is clicked
function listUpdate(){
    total_player_count=0;
    total_team_point=0;
    team1_player_count=0;
    team2_player_count=0;
    role_batsman_count=0;
    role_bowler_count=0;
    role_allrounder_count=0;
    role_wicketkeeper_count=0;
    falg=1;

    for (i=0;i<22;i++){
        a[i]=document.getElementById(items[i].PlayerID.S).checked;
        if(a[i]){
            document.getElementById(items[i].PlayerID.S+"_row").style.backgroundColor="green";
            document.getElementById(items[i].PlayerID.S+"_row").style.color="white";
            total_player_count++;
            total_team_point+=parseInt(items[i].Credit.S);
            if(items[i].TeamID.S=='RCB'){
                team1_player_count++;

            }
            else
                team2_player_count++;
            if(items[i].Role.S=="Batsman")
                role_batsman_count++;
            if(items[i].Role.S=="Bowler")
                role_bowler_count++;
            if(items[i].Role.S=="All Rounder")
                role_allrounder_count++;
            if(items[i].Role.S=="Wicket Keeper")
                role_wicketkeeper_count++;

        }
        else{
            document.getElementById(items[i].PlayerID.S+"_row").style.color="black";
            document.getElementById(items[i].PlayerID.S+"_row").style.backgroundColor="lightgrey";

        }


    }
    document.getElementById("test").innerHTML="Total Credits used: "+total_team_point;
    if(total_player_count!=11){
        falg=0;
        document.getElementById("player_count_error").innerHTML="Total Playes Must be = 11, Current count is "+total_player_count;
    }
    else
        document.getElementById("player_count_error").innerHTML="Total Playes Must be = 11, Current count is "+total_player_count;
    if(total_team_point>100){
        falg=0;
        document.getElementById("player_credit_error").innerHTML="Maximum credit allowed is 100";
    }
    else
        document.getElementById("player_credit_error").innerHTML="";
    if(team1_player_count>7){
        falg=0;
        document.getElementById("team1_count_error").innerHTML="Cannot have more than 7 players from one team";
    }
    else
        document.getElementById("team1_count_error").innerHTML="";
    if(team2_player_count>7){
        falg=0;
        document.getElementById("team2_count_error").innerHTML="Cannot have more than 7 players from one team";
    }
    else
        document.getElementById("team2_count_error").innerHTML="";
    if(role_batsman_count>7){
        falg=0;
        document.getElementById("batsman_count_error").innerHTML="Cannot have more than 7 Batsmen";
    }
    else
        document.getElementById("batsman_count_error").innerHTML="";
    if(role_bowler_count>4){
        falg=0;
        document.getElementById("bowler_count_error").innerHTML="Cannot have more than 4 Bowlers";
    }
    else
        document.getElementById("bowler_count_error").innerHTML="";
    if(role_allrounder_count>3){
        falg=0;
        document.getElementById("allrounder_count_error").innerHTML="Cannot have more than 3 All Rounders";
    }
    else
        document.getElementById("allrounder_count_error").innerHTML="";
    if(role_wicketkeeper_count>1){
        falg=0;
        document.getElementById("wicketkeeper_count_error").innerHTML="Cannot have more than 1 Wicketkeeper";
    }
    else
        document.getElementById("wicketkeeper_count_error").innerHTML="";
    if(falg)
        document.getElementById("submit_team").innerHTML=" <button onclick='submit()'>Submit</button>";
    else
        document.getElementById("submit_team").innerHTML=" <button >Unable to Submit</button>";
}

function submit(){
    var flag=0;
    for(i=0;i<22;i++){
        if(a[i]){
            flag++;
            submit_data['Player'+flag+'ID']=items[i].PlayerID.S;
        }
    }
    console.log('submit data json is ', submit_data);
    requestData();
    function requestData() {
       $.ajax({
           method: 'PUT',
           crossDomain: true,
           url: _config.api.invokeUrl + '/user-team-create',
           // headers: {
           //     Authorization: 'authToken'
           //     },
           data: JSON.stringify(submit_data),
           contentType: 'application/json',
           success: completeRequest,
           error: function ajaxError(jqXHR, textStatus, errorThrown) {
               console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
               console.error('Response: ', jqXHR.responseText);
               alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
           }
       });
   }
   function completeRequest(result){
        console.log('the response after put is ', result);
        alert("Team created")
   }
}


var WildRydes = window.WildRydes || {};
(function rideScopeWrapper($) {
   WildRydes.authToken.then(function setAuthToken(token) {
	   if (token) {
		   authToken = token;
	   } else {
		   window.location.href = 'signin.html';
	   }
   }).catch(function handleTokenError(error) {
	   alert(error);
	   window.location.href = 'signin.html';
   });
   //console.log(authToken);
   
   function requestData(id) {
	   $.ajax({
		   method: 'GET',
       crossDomain: true,
		   url: _config.api.invokeUrl + '/players-list?' + `TeamID=${id}`,
		   // headers: {
			  //  Authorization: 'authToken'
		   // },
		   contentType: 'application/json',
		   success: completeRequest,
		   error: function ajaxError(jqXHR, textStatus, errorThrown) {
			   console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
			   console.error('Response: ', jqXHR.responseText);
			   alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
		   }
	   });
   }
   
   requestData('RCB');
   requestData('CSK');
   var count=0;
   function completeRequest(result) {
   		count++;
	   //items=JSON.parse(result).Items;
	   console.log('Response received from API: ', result);
	   //console.log('Items are', items);      
	   //items.push(result.Items);
	   //Object.push.call(items, result.Items);
	   //items=items.concat(result.Items);
	   console.log(items);
       
	   for(i=0;i<11;i++){
	  		items.push(result.Items[i]);
			var checkbox=document.createElement("INPUT");
			
			if(count==1){
			     var name=items[i].PlayerID.S;
                 var role=items[i].Role.S;
                 var credit=items[i].Credit.S;
                 var team=items[i].TeamID.S;
			}
            else{
			     var name=items[i+11 ].PlayerID.S;	
                 var role=items[i+11].Role.S;
                 var credit=items[i+11].Credit.S;
                 var team=items[i+11].TeamID.S;
			}
            checkbox.setAttribute("type","checkbox");
            checkbox.setAttribute("id",name);//setting the id of checkbox
            var tr=document.createElement('TR');
            tr.setAttribute("id",name+"_row");
            var td=document.createElement('TD');
            var text=document.createTextNode(name);
            tr.appendChild(td);
            tr.appendChild(checkbox);
            tr.appendChild(text);
            text=document.createTextNode(team);
            td=document.createElement('TD');
            tr.appendChild(td);
            tr.appendChild(text);
            text=document.createTextNode(role);
            td=document.createElement('TD');
            tr.appendChild(td);
            tr.appendChild(text);
            text=document.createTextNode(credit);
            td=document.createElement('TD');
            tr.appendChild(td);
            tr.appendChild(text);
            document.getElementById("list_item").appendChild(tr);

		}
		if(count==2)
			listUpdate();
        var tr=document.createElement('TR');
        document.getElementById("list_item").appendChild(tr);

        document.getElementById("list_item").appendChild(tr);
   }



   // request_json={"TeamID":"RCB"};//setting the teamid
  //  var xhttp=new XMLHttpRequest();
   // xhttp.open("GET","https://qiytra8szb.execute-api.ap-southeast-1.amazonaws.com/test/players-list?TeamID=RCB", true);
   // xhttp.send();
	
   // xhttp.onreadystatechange = function() {
	 //   if (this.readyState == 4 && this.status == 200) {
	 //           document.getElementById("test_api").innerHTML =
	 //           this.responseText+"sdfg";//testing
	 //     var response_json=JSON.parse(this.responseText);//json parsing
	 //     items=response_json.Items;//extracting the items
	 //    document.getElementById("test_json").innerHTML =items[i].Role.S+"sdfg";//testing
	 //      }
		   
		 
	  //  }

	//display the list by appending one item at a time
	
	
}(jQuery));