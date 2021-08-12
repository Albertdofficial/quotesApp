const quoteContainer = document.getElementById("quote-container");
const quoteText= document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn= document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

let apiQuotes = [];

// New quote
const newQuote= function(){
// Get a random quote from apiQuotes array
    const i = Math.trunc(Math.random() * apiQuotes.length);
    const quote = apiQuotes[i]
    if(!quote.author){
        authorText.textContent = 'Unknown'
    }else{
        authorText.textContent = quote.author;
     }
    // //Check quote length to determine styling
    if(quote.text.length > 100){
        quoteText.classList.add("long-quote");
    }else{
        quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = quote.text;
}

// Get Quotes From API
async function getQuotes(){
    //Api url
    const apiUrl = 'https://type.fit/api/quotes';

    try{
        // Gets quote from Api
        const response = await fetch(apiUrl);

        //change the response obj in a JSON
        apiQuotes = await response.json();
        newQuote();

    }catch(error){
        // Catch Error Here

    }
}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)


// On Load
getQuotes();