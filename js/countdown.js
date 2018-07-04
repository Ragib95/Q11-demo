
// Set the date we're counting down to

(function countdowntime($) 
{
    var countDownDate = new Date("July 4, 2018 7:00:00").getTime();

// Update the count down every 1 second
    var x = setInterval(function() {

    // Get todays date and time
        var now = new Date().getTime();
    
    // Find the distance between now an the count down date
        var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
        var time =  days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
       // ol.setAttribute("disabled");

        $("#countdown").html(time+" to match time");
        if(hours<1){
        //  var b = document.querySelector("button"); 
        // b.setAttribute("disabled", "");           

            $("#countdown").html(" The Contest registration has closed <br>"+time+"to match time");
        }
        if(distance<0){
            
            if(hours>-3)
            {
                var distance = now-countDownDate;
    
    // Time calculations for days, hours, minutes and seconds
                
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
                var time =   hours + "h " + minutes + "m " + seconds + "s ";
                $("#countdown").html(time+" <br>The Contest registration has closed. The match is in progress");
            }
            else
                $("#countdown").html(" The Contest registration has closed. The match has ended ");
           }
    
    //Repeating the above same logic for the rankings page with slight modification in the output.
    var distance = countDownDate - now;

    $("#countdown_rankings").html(time+" to match time");
        if(distance<0){
            if(hours>-3)
            {
                var distance = now-countDownDate;
    
    // Time calculations for days, hours, minutes and seconds
                
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
                var time =   hours + "h " + minutes + "m " + seconds + "s ";
                $("#countdown_rankings").html(time+" <br>The match is in progress, the current rankings are:");
            }
            else
                $("#countdown_rankings").html("The match has ended, the final rankings are: ");
           }



    
//     if (distance < 0) {
//         clearInterval(x);
//         document.getElementById("demo").innerHTML = "EXPIRED";
//     }
        }, 1000);

    // body...
}(jQuery));
