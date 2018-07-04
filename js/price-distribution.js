
var WildRydes = window.WildRydes || {};

(function contestlist($) 
{
    var poolData = 
    {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId
    };


    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    
    var cognitoUser = userPool.getCurrentUser();

    console.log(cognitoUser)

    //var cognitoUser = userPool.getCurrentUser();

    var attributeList = [];
    var datawinninghistory = {
            Name :'custom:WinningHistory',
            Value : JSON.stringify({
                MatchID: 'ram',
                ContestID: 'syam',
                Price: '10',
                Rank: '1'
            })
        }
    

    var datawinninghistory = new AmazonCognitoIdentity.CognitoUserAttribute(datawinninghistory);
    attributeList.push(datawinninghistory);

    console.log(attributeList)

    cognitoUser.updateAttributes(attributeList, function(err, result) {
        if (err) {
            alert(err);
            return;
        }
        console.log('call result: ' + result);
    });

} (jQuery));

