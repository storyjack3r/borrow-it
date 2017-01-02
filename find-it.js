/*
Function 0: Check if page is one of a list of pages with books names on it. Check for the DIV ID the page uses to house its title.
Function 1: check for book title. If it's there take the contents of the DIV.
Function 2: turn into string and put into list. Put '+' symbols in-between.
Function 3: select library URL structure based on user input (not in scope) insert string from function 2 in 
Function 4: getURL

*/


var myBookSearch;
var myTextSearch;
var uniName;
var standardInject=1
var cutWords;

function optionsOpen(){
chrome.runtime.openOptionsPage()
}
//function 0 
var titleID;
var pageHost = window.location.hostname;
if (pageHost=="www.amazon.co.uk"){
	titleID = "productTitle"; 
	authorID = "contributorNameID";//define this is the DIV id to take the search text from and turn into a link
	
	//find titleID
	var bookTitle=document.getElementById(titleID);
	//save a copy of this target for injecting the HTML later
	var injectTarget=bookTitle;
	bookTitle = bookTitle.textContent || bookTitle.innerText;

	// find author
	var bookAuthor=document.getElementsByClassName(authorID)[0];
	if (bookAuthor!=null){
	bookAuthor = bookAuthor.textContent || bookAuthor.innerText;
	}
	else
	{
		bookAuthor=""
	}
}

else if (pageHost=="bookshop.blackwell.co.uk"){
    titleID = "h1";
    authorID = "product__author";

	//find title
	var bookTitle=document.getElementsByTagName(titleID)[0];

	var injectTarget=bookTitle;
	
	bookTitle = bookTitle.textContent || bookTitle.innerText;
	bookTitle = bookTitle.trim();
	

// find author
	var bookAuthor=document.getElementsByClassName(authorID)[0];
	// console.log("got author!");
	if (bookAuthor!=null){
		bookAuthor = bookAuthor.textContent || bookAuthor.innerText;
		bookAuthor = bookAuthor.trim();
	}
	else {
		bookAuthor="";
	}
}

else if (pageHost=="www.waterstones.com"){
	
      
	titleID = "scope_book_title"; 
	authorID = "contributors";//define this is the DIV id to take the search text from and turn into a link
	
	//find titleID
	var bookTitle=document.getElementById(titleID);
	
	//save a copy of this target for injecting the HTML later
	var injectTarget=bookTitle;
	bookTitle = bookTitle.textContent || bookTitle.innerText;

	// find author
	var bookAuthor=document.getElementsByClassName(authorID)[0];
	if (bookAuthor!=null){
	bookAuthor = bookAuthor.textContent || bookAuthor.innerText;
	}
	else
	{
		bookAuthor=""
	}
}



function findSearchTerm(){

//1. selected text identified
//2. selected text turned into button
//3. unselect text and button goes away


	       var selectedText = window.getSelection().toString();//1
	       var textCount = selectedText.length;//1
    	    if (textCount>0){				//if something is selected...

	    		cutWords = selectedText;

	    		formaText = selectedText.replace('\'','').split(' ').join('+'); //function 2: make into a search term...
	    		  	chrome.storage.sync.get("uni", function(items) {
    		if (!chrome.runtime.error) {

    		if(items.uni){
      			var uniID = items.uni;
      			myTextSearch = uniList[uniID].stringDesign1;
      			myTextSearch= myTextSearch + formaText;
      			console.log("==" + myTextSearch + "==");	//DEBUG
			}
		}
		else {var myTextSearch="no-search-term-DEBUG";
			console.log("==" + myTextSearch + "==");	//DEBUG
		}
		$("p:contains('" + selectedText + "')").text(function () {
			    	str = this.innerHTML;
			    	res = str.replace(selectedText, "<a href= '" + myTextSearch + "'>" + cutWords + "</a>");
			    	this.innerHTML = res;
				});
	});
			
    		
    		} //textCount conditional close
    		

}
  
  //listens for selection...
  $(document).ready(function(){

	    
		$( "p" ).on( "click", function() {
		findSearchTerm();

		});
		});//end doc ready function


  var extractBook =  bookTitle + " " + bookAuthor; //Function 1
	var myBookTerm =extractBook.replace(/ *\([^)]*\) */g, " ");//gets rid of bracketed title content from search
	myBookTerm = myBookTerm.replace('\'','').split(' ').join('+'); //function 2
 

  chrome.storage.sync.get("uni", function(items) {

    if (!chrome.runtime.error) {
    	if(items.uni){
      var uniID = items.uni;
      myBookSearch = uniList[uniID].stringDesign1;
      myBookSearch= myBookSearch + myBookTerm;
      uniName= uniList[uniID].ID;
      console.log(uniName);
      console.log(myBookSearch);
      // document.getElementById("current").innerText = "stored as: " + uniName + " (" + uniID + ")";
  var injectedHTML = "<a href='" + myBookSearch + "' target='_blank'><span class='borrower'>" + bookTitle + " </span><br><span id='borrow-it'><span class='main-text'>Borrow it @"+ uniName +"</span> (£0.00)</span></a><br> "; 

//changes the title of the book into a button with a link to the library of choices
	}//end of if item.uni check
	else
	{
	var injectedHTML = 	"<span class='borrower'>" + bookTitle + " </span><br><a href='#' onclick='optionsOpen()' style='color:white; background-color:red; font-size:14px; padding:5px;'> Choose your library to get started</a><br>"; 
	}
injectTarget.innerHTML = injectedHTML;

}//end of if runtime check
});



 

	
   
   
   
