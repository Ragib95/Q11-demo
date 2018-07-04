
var WildRydes = window.WildRydes || {};
var test="";
(function contestlist($) 
{
	/*var xhr = new XMLHttpRequest();
	var parameter = "MatchID=CSKvsRCB"
	var url = "https://qiytra8szb.execute-api.ap-southeast-1.amazonaws.com/test/contest-list"
	xhr.open("GET", url + "?"+parameter, true);
	xhr.send();*/
	var authToken;
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
    var parameter = "MatchID=CSKvsRCB"
    console.log(authToken);
    function requestData() {
        $.ajax({
            method: 'GET',
            url: _config.api.invokeUrl + '/contest-list' + '?' + parameter,

            //data: "",
            contentType: 'application/json',
            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when contacting remote server\n' + jqXHR.responseText);
            }
        });
    }

    requestData();
    function completeRequest(result) {
    	//console.log('Result', result);
        var contest = result;
                

                for (var i = 0; i < contest.length; i++) 
                {
                    var contestID1 = contest[i]['ContestID']["S"];
                    // console.log("id is " + contestID);

                    
                    console.log("sdfsdf"+contest[i]['Teams']);

                    var amount = contest[i]['EntryFee']["N"];
                    var new1 = contestID1 + "-" + amount;
                    // var array = [ contestID1,amount];
                    // console.log("value is " + array);
                    $("ol").append(`<h3 style = "margin-left:4em"> ${contest[i]['ContestID']["S"]}</h3>

               
                    
                                    <p> 
                                        <span class="entryfees" style="margin-left: 5em"> Entry Fee</span>
                                        <span class="amountsymbol">₹</span>
                                        <span class="currency-amount" id ="Entryfees">${amount}</span></span>
                                        <button class="button" id = "joinbutton" style="margin-left: 17em" value = ${new1} onclick = JoinContest()>Join</button>
                                    </p>
                                    <p>
                                        <span id ="currentuser" style="margin-left: 5em" id ="teamleft">${contest[i]['CurrentUser']["N"]}</span>
                                        <span>Cuurent Teams </span>
                                        <span id ="maxuser" style="margin-left: 13em" id ="maxUser">${contest[i]['MaxUser']["N"]}</span>
                                        <span>Max. Teams</span> 
                                    </p> 
                                    <br><hr>`)
                    
                    }

                }
   


} (jQuery));

var contestId 
var contestAmount

function JoinContest() 
{
    var poolData = 
    {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId
    };


    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    WildRydes.authToken = new Promise(function fetchCurrentAuthToken(resolve, reject) {
        var cognitoUser = userPool.getCurrentUser();
        console.log(cognitoUser);

        if (cognitoUser) 
        {
            cognitoUser.getSession(function sessionCallback(err, session) 
            {
                if (err) 
                {
                    reject(err);
                } else if (!session.isValid()) 
                {
                    resolve(null);
                } else 
                {
                    resolve(session.getIdToken().getJwtToken());
                    
                }
            });
        }
        else 
        {
            resolve(null);
        }

        cognitoUser.getUserAttributes(function(err, result) 
        {
            if (err) 
            {
                alert(err.message || JSON.stringify(err));
                return;
            }
            // var email = result[8].getValue();
            var name = result[4].getValue();
            var walletmoney = result[5].getValue();

            $('button:button').unbind('click').click(function() 
            {
                // var v = $(this).val();
                // console.log("Value is " +v);
                var v  =  $(this).val();
                // var m = v[0]
                var v1 = v.split("-",2)
                contestId = v1[0];
                contestAmount = v1[1];
            });

            //contestId =  $(this).val();
            console.log(contestId)
            console.log("Contest amount "+contestAmount);
            var userteamname = "CSKvsRCB" + "-" + cognitoUser.username;
            console.log(contestId)

            var jsonObject = new Object();
            jsonObject["MatchID"] = "CSKvsRCB";
            jsonObject["ContestID"] = contestId;
            jsonObject["UserName"] = cognitoUser.username;
            jsonObject["UserTeamName"] = userteamname;
            jsonObject["walletbalance"] = parseInt(walletmoney,10);
            console.log("Object is " + jsonObject["ContestID"]);
            console.log("team name is " +userteamname);
            var finalAmount = parseInt(walletmoney,10) - parseInt(contestAmount,10);
            if (finalAmount<0) 
            {
                finalAmount = 0;
            }
            console.log("Final amount in wallet is " + finalAmount);
            $.ajax({
                method: 'PUT',
                url: _config.api.invokeUrl + '/contest-registration' ,
                //headers: {
                //    Authorization: authToken
                //},
                data: JSON.stringify(jsonObject),
                contentType: 'application/json',
                success: completeRequest,
                error: function ajaxError(jqXHR, textStatus, errorThrown) {
                    console.error('Error:', textStatus, ', Details: ', errorThrown);
                    console.error('Response: ', jqXHR.responseText);
                    alert('An error occured when requesting your data:\n' + jqXHR.responseText);
                }
            });
            
            function completeRequest(result) 
            {
                if (result=="Already in contest") {
                    alert(result);
                } else if (result=="Table Name not correct") {
                    alert("Confirm Registeration");
                } else if (result=="Successfully Registered without errors") {
                    alert(result);

                    var attributeList = [];
                    var datawalletmoney = {
                        Name : 'custom:WalletMoney',
                        Value : finalAmount.toString()

                    }
                    
                    var datawalletmoney = new AmazonCognitoIdentity.CognitoUserAttribute(datawalletmoney);
                    attributeList.push(datawalletmoney);

                    cognitoUser.updateAttributes(attributeList, function(err, result) {
                        if (err) {
                            alert(err);
                            return;
                        }
                        console.log('call result: ' + result);
                    });
                } else {
                    alert(result);
                }
            }

            
            






            //}
        });
    });
   
}
