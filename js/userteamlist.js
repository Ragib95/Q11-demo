var WildRydes = window.WildRydes || {};

(function user_profile($) 
{
			
	 		
	 		
	 		var jsonObject = new Object();
	 		jsonObject["MatchID"] = "CSKvsRCB";
	 		jsonObject["UserTeamName"] = "T1";
	 		// console.log("object is " + JSON.stringify(jsonObject));
	 		requestData();
            function requestData() 
            {
                $.ajax({
                    method: 'PUT',
                    url: _config.api.invokeUrl + '/user-player-list' ,
                    headers: {
                        Authorization: 'authToken'
                    },
                    data: JSON.stringify(jsonObject),
                    sagar: console.log("Body is " + JSON.stringify(jsonObject)),
					contentType: 'application/json',
                    success: completeRequest,
                    error: function ajaxError(jqXHR, textStatus, errorThrown) {
                        // console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
                        // console.error('Response: ', jqXHR.responseText);
                        alert('An erro==r occured when requesting your unicorn:\n' + jqXHR.responseText);
                    }
                });
            }
            function completeRequest(result) 
            {
                console.log("Result is " + result["Player1ID"]);
                for (var i = 1; i < 12; i++) 
                {
                	var v1 = "Player" + i + "ID";
                	console.log("DSSD"+v1);
                	// console.log("jhgjg"+ result[v1]);
                	// result[i]
                	$("ol").append(`
                                    
                                    <p> <span>Player Name  </span>
                                        <span id ="currentuser" style="margin-left: 5em" id ="teamleft">${result[v1]}</span>
                                        
                                       
                                    </p>`)
                }
                // $('#result').html(result);
            }






}(jQuery));
