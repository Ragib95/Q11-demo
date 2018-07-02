/*global WildRydes _config*/
var poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId
    };


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


    function requestData1(registered_contest) {




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
                ContestID: registered_contest
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
        
        var i;
        for (i = 0; i < result.length; i++) { 
                result[i];
                console.log(result[i]);
                //$("h4").append('contestid = ${registered_contest}')
                $( "ol" ).append( `<li> ${result[i].M.UserName.S} ${result[i].M.UserTeamName.S}  ${result[i].M.score.N}</li>` );

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
                requestData1(contestid);

            }  
    }
}(jQuery));
