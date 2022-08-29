const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')

let apiQuotes = [];

// Show New Quote
function newQuote() {
  //pick  a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)]
  
  //check if author field is null to replace with unknown 
  !quote.author ? "Unknown" : (authorText.textContent = quote.author);
  
  if(quote.text.length > 120){
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.text;
  

}

// Get Quotes from API
async function getQuotes() {
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
  try{
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    
    newQuote()
  } catch(error){
    //Catch Error Here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?tex=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank' );
}
//Event listener
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuotes()