// var cardsvalue = {"ACE": 1, "2": 2,"3": 3, "4": 4, "5": 5,"6": 6,"7": 7,"8": 8,"9": 9, "10": 10, "JACK": 10,"QUEEN": 10,"KING": 10};

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

function addCardToPile(handOwner){
    // cardValue = cardsDealer[i].value;
  for (let i = 0; i < cardsDealer.length; i++)  {
    var cardValue = cardsDealer[i].value;
    // console.log("this is the value of cards", cardValue)
  }

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
    // Get card for player
    // let card1 = allCards.pop();
    // cardsPlayer.push(card1); // deals one card to player
    // var cardImg1 = document.createElement('img');
    // cardImg1.classList.add('img');
    // cardImg1.src = card1.image;
    // playersCard.appendChild(cardImg1);
    // playerScore += parseInt(card1.value);
    // console.log("player score is:", playerScore);

    // // Deal to dealer
    // let card2 = allCards.pop();
    // cardsDealer.push(card2)
    // var cardImg2 = document.createElement('img');
    // cardImg2.classList.add('img');
    // cardImg2.src = card2.image;
    // dealersCard.appendChild(cardImg2);
    addCardToPile('d');
    addCardToPile('p');
    }
}

function newFunc(){
    console.log('the newfunc function is active')
    while(dealerScore < 16){
        
            hitdealer();
    }
   
    checkForWinner();
}


function hitplayer(e){
  if(cardsPlayer.length < 5){
      addCardToPile('p');




      // let newCard = allCards.pop();
      // console.log(newCard.value);
      // cardsPlayer.push(newCard)
      // var cardImg = document.createElement('img');
      // cardImg.classList.add('img');
      // cardImg.src = newCard.image;
      // playersCard.appendChild(cardImg); 
      // playerScore += parseInt(newCard.value);
      // console.log("player score is:", playerScore);
      
      
  }
  checkForWinner();
}   



function hitdealer(e){

  if(cardsDealer.length < 5){
    addCardToPile('d');
    //   let newCard2 = allCards.pop();
    //   cardsDealer.push(newCard2)
    //   var cardImg = document.createElement('img');
    //   cardImg.classList.add('img');
    //   cardImg.src = newCard2.image;
    //   dealersCard.appendChild(cardImg);
    //   console.log(newCard2.value)
      
    // }
    playerhit.removeEventListener('click', hitplayer);
    


  }
  checkForWinner();
}
  
function checkForWinner(){
    console.log('checkForWinner is running');
    // create another if else with the conidition that stay button was clicked


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
    }
    // else if(playerScore === dealerScore){
    // // displayMessage('Its a Draw');
    // // gameover = true;
    // // }
    // checkForWinner();
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


