var WildRydes = window.WildRydes || {};

(function user_profile($) 
{
	var authToken;
    console.log('dsaf...........',WildRydes);
    WildRydes.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
            console.log('Tokensssssss', authToken)
        } else {
            window.location.href = 'signin.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = 'signin.html';
    });
    

    var poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId
    };


    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
      //var currentUser = userPool.getCurrentUser();

    console.log("SFGDFGDGD");
    WildRydes.authToken = new Promise(function fetchCurrentAuthToken(resolve, reject) {
        var cognitoUser = userPool.getCurrentUser();
        console.log(cognitoUser);
        console.log("Username is " + cognitoUser.username);
        if (cognitoUser) {
            cognitoUser.getSession(function sessionCallback(err, session) {
                if (err) {
                    reject(err);
                } else if (!session.isValid()) {
                    resolve(null);
                } else {
                    resolve(session.getIdToken().getJwtToken());
                    console.log('TOKEN');
                    console.log(session.getIdToken().getJwtToken());
                }
            });
        } else {
            resolve(null);
        }

        cognitoUser.getUserAttributes(function(err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            
            for (var i = 0; i < result.length; i++) {
                console.log("Key is " + result[i].getName() +"Value is " + result[i].getValue());
            }
        	var email_verified = result[2].getValue();
        	var birthdate = result[1].getValue();
        	var name = result[4].getValue();
        	var phone_number_verified = result[6].getValue();
        	var phone_number = result[7].getValue();
        	var email = result[8].getValue();
        	var walletmoney = result[5].getValue();
            var winningHistroy = JSON.parse(result[3].getValue());
            //console.log('attribute ' + birthdate + ' has value ' + email);
            console.log(winningHistroy.MatchID)
            $("#username").html(name);
            $("#email").html(email);
            $("#mobilenumber").html(phone_number);
            $("#birthdate").html(birthdate);
            $("#walletmoney").html(walletmoney);
            //$("#winninghistory").html(JSON.stringify(`<p>data ${winningHistroy.MatchID} ${winningHistroy.ContestID} ${winningHistroy.Price} ${Rank}</p>`));
            console.log(winningHistroy)

            $("winninghistory").html(`<table style="width:100%">
                                         <tr>
                                                 <th>MatchID</th>
                                                 <th>ContestID</th>
                                                 <th>Price</th>
                                                 <th>Rank</th>
                                                 </tr>
                                                 <tr>
                                                    <td>${winningHistroy.MatchID}</td>
                                                    <td>${winningHistroy.ContestID}</td>
                                                    <td>${winningHistroy.Price}</td>
                                                    <td>${winningHistroy.Rank}</td>
                                                </tr>
                                        </table>
                                    <br><hr>`)
            //}
        });
    });

    $('#signOut').click(function() {
            WildRydes.signOut();
            alert("You have been signed out.");
            window.location = "signin.html";
        }); 


	// body...
}(jQuery));
