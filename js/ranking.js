/*global WildRydes _config*/
var poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId
    };

var registered_contest;
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
      //var currentUser = userPool.getCurrentUser();
var cognitoUser = userPool.getCurrentUser();
console.log(cognitoUser.username);
var WildRydes = window.WildRydes || {};
(function rideScopeWrapper($) {
    var authToken;
    //console.log('dsaf...........',WildRydes);
    WildRydes.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
            console.log('Tokensssssss', authToken)
        } else {
            window.location.href = 'signin.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        //window.location.href = 'signin.html';
    });
    console.log('adsdfdsaf....',WildRydes);


    function requestData1(contestid) {




        console.log('requestdata111......');
        WildRydes.authToken.then(function setAuthToken(token) {
            if (token) {
                authToken = token;
                //console.log('Tokensssssss', authToken)
            } else {
                throw 'no token';
            }

            $.ajax({
            method: 'PUT',
            url: _config.api.invokeUrl + '/teamranking',
            //headers: {
            //    Authorization: authToken
            //},
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify({
                MatchID: 'CSKvsRCB',    
                ContestID: contestid
            }),
            contentType: 'application/json',
            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when requesting your data:\n' + jqXHR.responseText);
            }
        });
        }).catch(function handleTokenError(error) {
            alert(error);
            //window.location.href = 'signin.html';
        });

       
    }

  

    function completeRequest(result) {
        console.log('Response received from API: 2', result);
             
       var row=document.createElement("TR");
       var heading=document.createTextNode(registered_contest);
       row.appendChild(heading);
       document.getElementById("contest_table").appendChild(row);
        var i, text1, text2, text3, td1, td2, td3;
        for (i = 0; i < result.length; i++) { 
                result[i];
                console.log(result[i]);
                tr=document.createElement("TR");
                text1=document.createTextNode(result[i].M.UserName.S);
                td1=document.createElement("TD");
                tr.appendChild(td1);
                tr.appendChild(text1);    
                
                text2=document.createTextNode(result[i].M.UserTeamName.S);
                td2=document.createElement("TD");
                tr.appendChild(td2);
                tr.appendChild(text2);

                text3=document.createTextNode(result[i].M.score.N);
                td3=document.createElement("TD");
                tr.appendChild(td3);
                tr.appendChild(text3);
                document.getElementById("contest_table").appendChild(tr);

            };  
    }
    requestData_contests();


        function requestData_contests() {
        console.log('requestdata111......');
        
        WildRydes.authToken.then(function setAuthToken(token) {
            if (token) {
                authToken = token;
                //console.log('Tokensssssss', authToken)
            } else {
                throw 'no token';
            }


            $.ajax({
            method: 'GET',
            url: _config.api.invokeUrl + '/user-contests?'+'MatchID=CSKvsRCB&UserName='+cognitoUser.username,
            //headers: {
            //    Authorization: authToken
            //},
            headers: {
                Authorization: authToken
            },

            contentType: 'application/json',
            success: completeRequest_contests,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when requesting your data:\n' + jqXHR.responseText);
            }
        });
        }).catch(function handleTokenError(error) {
            alert(error);
            //window.location.href = 'signin.html';
        });

       
    }
    function completeRequest_contests(result) {
        //result=[];
        console.log('Response received from API: 1', result);
        console.log(result.length);
        var i;
        for (i = 0; i < result.length; i++) { 
                var contestid=result[i].ContestID.S;
                var matchid = result[i].MatchID.S;
                registered_contest=contestid;
                requestData1(contestid);

            }  
    }
}(jQuery));
