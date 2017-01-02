/*
Function 0: Check if page is one of a list of pages with books names on it. Check for the DIV ID the page uses to house its title.
Function 1: check for book title. If it's there take the contents of the DIV.
Function 2: turn into string and put into list. Put '+' symbols in-between.
Function 3: select library URL structure based on user input (not in scope) insert string from function 2 in 
Function 4: getURL

Function a: look for ISBN 10s (or just 10 digit numbers) on the page 
Function b: turn ISBN HTML text into www link (a al function Function 4)
*/

//localStorage.setItem("bar", foo);
var standardInject=1
var myLibrary = localStorage["myLibrary"];
if (myLibrary==undefined){
myLibrary="manchesterMet";
}
//var test ="this is a test";




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
    authorID = "link_type1";

	//find title
	var bookTitle=document.getElementsByTagName(titleID)[0];
	bookTitle = bookTitle.textContent || bookTitle.innerText;

// find author
	var bookAuthor=document.getElementsByClassName(authorID)[0];
	if (bookAuthor!=null){
		bookAuthor = bookAuthor.textContent || bookAuthor.innerText;
	}
	else {
		bookAuthor="";
	}
}
else if (pageHost=="www.goodreads.com"){

	titleID = "productTitle";
	authorID = "contributorNameID";

	//find title
var bookTitle=document.getElementById(titleID);
//save a copy of this target for injecting the HTML later
var injectTarget=bookTitle;
bookTitle = bookTitle.textContent || bookTitle.innerText;

// find author
var bookAuthor=document.getElementsByClassName(authorID)[0];
bookAuthor = bookAuthor.textContent || bookAuthor.innerText;


}
else if (pageHost=="www.waterstones.co.uk"){
	
	titleID = "scope_book_title";
	authorID = "contributors";

	//find title
	var bookTitle=document.getElementById(titleID);
	//save a copy of this target for injecting the HTML later
	var injectTarget=bookTitle;
	bookTitle = bookTitle.textContent || bookTitle.innerText;

	// find author
	var bookAuthor=document.getElementsByClassName(authorID)[0];
	if (bookAuthor!=null){
	bookAuthor = bookAuthor.textContent || bookAuthor.innerText;
	}
}




  var extractBook =  bookTitle + " " + bookAuthor; //Function 1
	var myBookTerm =extractBook.replace(/ *\([^)]*\) */g, " ");//gets rid of bracketed title content from search
	myBookTerm = myBookTerm.replace('\'','').split(' ').join('+'); //function 2
 



 if (myLibrary=="manchester") {

	var myBookSearch = "https://manchester.spydus.co.uk/cgi-bin/spydus.exe/ENQ/OPAC/BIBENQ?ENTRY_NAME=BS&ENTRY=" + myBookTerm;
}

else if (myLibrary=="birmingham") {
	var myBookSearch = "https://library-opac.birmingham.gov.uk/cgi-bin/spydus.exe/ENQ/OPAC/BIBENQ?ENTRY_NAME=BS&ENTRY=" + myBookTerm;
}
else if (myLibrary=="leeds") {
var myBookSearch = "http://capitadiscovery.co.uk/leeds/items?query=" + myBookTerm;
}
else if (myLibrary=="liverpool") {
var myBookSearch = "http://capitadiscovery.co.uk/liverpool/items?query=" + myBookTerm;
}
else if (myLibrary=="manchesterMet") {
var myBookSearch = "http://mmulibrary.summon.serialssolutions.com/search/?spellcheck=true&keep_r=true&s.q=" + myBookTerm;
}

else if (myLibrary=="notCorrect") {
var myBookSearch = "https//google.co.uk";
}
var injectedHTML = "<a href='" + myBookSearch + "' target='_blank'><span class='borrower'>" + bookTitle + " </span><br><span id='borrow-it'><span class='main-text'>Borrow it @ MMU</span> (£0.00)</span></a><br> "; 

//changes the title of the book into a button with a link to the library of choices
injectTarget.innerHTML = injectedHTML;
	
   
   
   
