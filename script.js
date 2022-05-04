const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

//Show loading 
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;

}
//Hide loading 
function complete(){
    quoteContainer.hidden = false; 
    loader.hidden = true;
}


// Show New Quote
function newQuote() {

    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
       //Check if Author fiels is blank and replace it with 'Unknown'
       if(!quote.author){
        authorText.textContent = 'Unknown';
    }else{
        authorText.textContent = quote.author;
    }

    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
    }else{quoteText.classList.remove('long-quote');
}
    quoteText.textContent = quote.text;


}

//GET QUOTES FROM API
async function getQuotes() {
    const apiURL = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
        //console.log(apiQuotes);


    } catch (error) {//Catch Error Here
    }
}

//On Load
getQuotes();

//Tweet Out Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - author=${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

