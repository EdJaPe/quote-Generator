const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = [];

// Show loading
function loading(){
  loader.hidden = false;
  quoteContainer.hidden = true;

}

// Hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

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

  // Set Quote length to determine styling
  quoteText.textContent = quote.text;
  complete()

}

// Get Quotes from API
async function getQuotes() {
  loading()
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
// loading()