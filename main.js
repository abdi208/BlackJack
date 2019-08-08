
//----set variables-----////
var playerScore;
var dealerScore;
var deal;
var hit;
var win;
var dealtCards;
var dealersCard;
var playersCard;
var allCards;
var cardsDealer;
var cardsPlayer;
var loss;
var gameover;
var gameStarted;
var cardImg1;




document.addEventListener('DOMContentLoaded',function(e){
    deal = document.getElementById('deal');
    // console.log(deal);
    hit = document.getElementById('hit');
    stay = document.getElementById('stay');
    dealersCard = document.getElementById('dealersCard');
    playersCard = document.getElementById('playersCard');
    cardImg1 = document.getElementById('img');   
    dealersTotal = document.getElementById('firstScore');
    playersTotal = document.getElementById('secondScore');
    initialize();
    addListeners();
  
    
})
//---- set scores to 0-----//
function initialize(){
    playerScore = 0;
    dealerScore = 0;
    win = false;
    dealtCards =[];
    allCards = [...deck];
    cardsDealer = []
    cardsPlayer =[];
    loss = false;
    gameover = false;
    gameStarted = false;
}

function addListeners(){
   
    deal.addEventListener('click', dealCard);
    reset.addEventListener('click', resetGame);
    
}
//--------- create cards and deal to either player of dealer upon event listener-----///

function addCardToPile(handOwner){
 

// =========
    let card = allCards.pop();
    var hand;
    var element;
    if(handOwner === 'p'){
        hand = cardsPlayer;
        element = playersCard;
        playerScore += parseInt(card.value);
        
        playersTotal.value=playerScore;
       console.log('player1 score:' + playerScore);
       
    }else if (handOwner === 'd') {
        hand = cardsDealer;
        element = dealersCard;
        dealerScore += parseInt(card.value);
        

        dealersTotal.value = dealerScore;
        console.log('dealer score:' + dealerScore); 
        
    }
    
    hand.push(card);
    
    var cardImg1 = document.createElement('img');
    cardImg1.classList.add('img');
    cardImg1.src = card.image;
    element.appendChild(cardImg1);
}
  

 //---start the game and deal the two intial cards ----//  
function dealCard(){
    console.log('hello');
    gameStarted = true;
    gameOver = false;
    win = false;

    deal.removeEventListener('click',dealCard);
    stay.addEventListener('click',newFunc);
    playerhit.addEventListener('click',hitplayer);
    // Shuffle the card the dealer has
    allCards.sort(function() {
    return 0.5 - Math.random();
    });
      
     // should be shuffled

    for(var i = 0; i < 2; i++) {
    addCardToPile('d');
    addCardToPile('p');
    }
}

// ---- player hits stay annd the dealer is given cards until he wins or loses--///
function newFunc(){
    console.log('the newfunc function is active')
    while(dealerScore < 16){
        
            hitdealer();
    }
   
    checkForWinner();
}

//---give player card when event list3ener is hit-----/////
function hitplayer(e){
  if(cardsPlayer.length < 5){
      addCardToPile('p');

      }
  checkForWinner();
}   


//---give dealer card when event list3ener is hit-----/////
function hitdealer(e){

  if(cardsDealer.length < 5){
    addCardToPile('d');
 
    playerhit.removeEventListener('click', hitplayer);
    


  }
  checkForWinner();
}
  
function checkForWinner(){
    console.log('checkForWinner is running');
    


    if(playerScore === 21){
    //win = true;
    displayMessage('Player is the WINNER!!!');
    gameover = true;

    }else if (playerScore > 21){
    displayMessage('You lost');
    gameover = true;

    }else if( dealerScore === 21){ 
    displayMessage('Dealer WON!!!');
    gameover = true;
    
    }else if(dealerScore > 21){
    displayMessage('Player wins');
    gameover = true;

    }else if (dealerScore > playerScore) {
        gameover = true
        displayMessage('dealer wins');
    }else if(playerScore === dealerScore){
    displayMessage('Its a Draw');
    gameover = true;
    
    }
   
}



function displayMessage(msg){
    var message = document.getElementById('message');
    message.innerHTML = msg;
    stay.removeEventListener('click',newFunc);
    playerhit.removeEventListener('click', hitplayer);
}


 

function resetGame(){
    

    console.log('reset is clicked');
    playerScore = 0;
    dealerScore = 0;
    dealtCards =[];
    allCards = [...deck];
    cardsDealer = []
    cardsPlayer =[];
    dealersTotal.value= '';
    playersTotal.value = '';
    gameover = true;
    document.getElementById('dealersCard').innerHTML = '';
    document.getElementById('playersCard').innerHTML = '';
    document.getElementById('message').innerHTML ='';
    deal.addEventListener('click', dealCard);
    stay.removeEventListener('click',newFunc);
    playerhit.removeEventListener('click',hitplayer);



}


