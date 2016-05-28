       $('.alert').alert().hide();
       //initialize the varriable
       var player1 = [0,0,0,0,0]; 
       var player2 = [0,0,0,0,0];
        //initialize the contestant data (NBA value taken from http://stats.nba.com/player 2016-05-27)
        var contestant = new Array( [1,28.2,8.2,5,19.4],[2,16,9.9,2.4,14.3],[3,23.5,4.5,4,13.9],[4,14,9.5,7.4,13.6]); 
        //alert management
        function hideAlert(){
            $('.alert').alert().hide();
        }
        function showAlert(html,type){
            //remove style
            $('.alert').removeClass('alert-danger');
            $('.alert').removeClass('alert-info');
            //add correct style from type
            $('.alert').addClass('alert-'+type);
            //change html formated text
            $('.alert span').html(html);
            $('.alert').alert().show();
        }
        //Select a player
        function selectPlayer(player){
            // affect player one 
            var idPlayer = '';
            if (player1[0]==0) {
                player1 = contestant[player-1];
                imgPlayer = '#player1';
            }  // affect player two 
            else if (player2[0]==0) {
                // check if same as palyer one
                if (player1[0]==player){
                    showAlert('You have already selected this Players','danger');
                    $('html, body').animate({
                        scrollTop: $("#alert").offset().top - 50
                    }, 1000);
                    return;
                }
                player2 = contestant[player-1];
                imgPlayer = '#player2';
            }  // check if the 2 players are already selected
            else {
               showAlert('You have already selected the two Players','danger');
               $('html, body').animate({
                        scrollTop: $("#alert").offset().top - 50
                    }, 1000);
               return;
           }
           $(imgPlayer).attr('src', 
               $('#contestant'+player).attr('src'));
       }
        /****************************
         * Reset the player, images and values selected
         ****************************/
         function resetBattle(){
            player1 = [0,0,0,0,0]; 
            player2 = [0,0,0,0,0];
            $('#player1').attr('src', 'img/interrogative.png');
            $('#player2').attr('src', 'img/interrogative.png');
            $('#stat_1').prop('checked', false);
            $('#stat_2').prop('checked', false);
            $('#stat_3').prop('checked', false);
            $('#stat_3').prop('checked', false);
            $('#player1').removeClass('winner');  
            $('#player2').removeClass('winner');  
            hideAlert();
        }
        /***************************************
         * Do the battle of stat of the player
         ***************************************/
         function battle(){
            var stat = $('input:radio:checked').val();
            // remove previous winner
            $('#player1').removeClass('winner');  
            $('#player2').removeClass('winner');  
            // check if both player are selected
            if (player1[0]==0 || player2[0]==0) {
               showAlert('Please select all the players','danger');
               return;
           }
            // check if a stat is selected
            if (typeof stat == 'undefined'){
                showAlert('Please select a Statistic for the battle','danger');
                return;
            }
            //get the label of stat selected
            var statlabel = '<strong>'+$('input:radio:checked').next('label:first').text()+'</strong>';

            // check the proper stat for each player show the winner
            // if the stat had been the same check also equality
            var stat1 = player1[stat];
            var stat2 = player2[stat];
            var winnerName = '';
            if (stat1<stat2){
                //get winner name
                winnerName = $('#contestantName'+player2[0]).text();
                //show stat diff
                statlabel += ' ' + stat2 + ' vs ' + stat1;
                $('#player2').addClass('winner');  
            } else {
                //get winner name
                winnerName = $('#contestantName'+player1[0]).text();
                //show stat diff
                statlabel += ' ' + stat1 + ' vs ' + stat2;
                $('#player1').addClass('winner');  
            }
            showAlert('<strong>'+winnerName+'</strong> wins on'+statlabel,'info');

        }