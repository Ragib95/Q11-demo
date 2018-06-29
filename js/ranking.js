/*global WildRydes _config*/

var WildRydes = window.WildRydes || {};
(function rideScopeWrapper($) {
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
    console.log('adsdfdsaf....',WildRydes);

    function requestData() {
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
                ContestID: 'ContestOne'
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
            window.location.href = 'signin.html';
        });

       
    }
    requestData();

    function completeRequest(result) {
        console.log('Response received from API: ', result);
        
        var i;
        for (i = 0; i < result.length; i++) { 
                result[i];
                console.log(result[i]);
                $( "ol" ).append( `<li> ${result[i].M.UserName.S} ${result[i].M.UserTeamName.S}  ${result[i].M.score.N}</li>` );

            };  
    }
    console.log('requestdata......');  
    
}(jQuery));
