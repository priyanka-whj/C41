class Game
{
    constructor()
    {

    }

    getState()  //This function will read the gameState value from the database (read)
    {
        var gameStateRef = db.ref('gameState');
        gameStateRef.on("value", function(data){gameState = data.val()});
    }

    updateState(state) // This function will update the gamestate value in the database (write)
    {
        db.ref('/').update({gameState: state}); // '/' refers to main database inside which gameState is created
    }

    async start()
    {
        if(gameState === 0)
        {
            player = new Player;
            var playerCountRef = await db.ref('playerCount').once("value"); //once method(asynchronous listener) read the value once from the database
            if(playerCountRef.exists()) //exists() function check if the playerCountRef has a value or not.
            {
                playerCount = playerCountRef.val(); //val() function will extract the data from the data snapshot
                player.getCount(); //To permanently listen to the database
            }

            form = new Form(); //create a form object only after getting playerCount value from the database
            form.display(); //Display the form
        }
    }

    play() //play() function will be called when gameState becomes 1
    {
        form.hideForm(); //hide the form
        textSize(30);
        text("Game Start", 120, 100);

        player.getPlayerInfo();

        if(allPlayers !== undefined)
        {
            var display_position = 130;
            for(var plr in allPlayers) //in operator will take the key from the first key-value pair in the first ateration & store it in the variable plr
            {
                if(plr === "player" + player.index)          
                {                                                         
                    fill("red");
                }
                else
                {
                    fill("black")
                }
                textSize(15);
                text(allPlayers[plr].name + ":" + allPlayers[plr].distance, 120, display_position);
                display_position = display_position + 20;
            }
        }

        if(keyIsDown(UP_ARROW))
        {
            player.distance = player.distance + 50;
            player.update();
        }
    }
};