
var WildRydes = window.WildRydes || {};
var test="adas"
(function contestlist($) 
{
    var poolData = 
    {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId
    };


    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var userData = {
        Username : 'username',
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    //var cognitoUser = userPool.getCurrentUser();

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

} (jQuery));

