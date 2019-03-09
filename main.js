document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark() {
  siteName = document.getElementById("siteName").value;
  siteUrl = document.getElementById("siteUrl").value;

  var bookmark = {
    name: siteName,
    url: siteUrl
  };

  //Validation
  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  if (localStorage.getItem("bookmarks") === null) {
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  //Reset form
  document.getElementById("myFrom").reset();

  fetchBookmarks();
  e.preventDefault();
}

//fetch and display bookmarks
function fetchBookmarks(e) {
  //fetch and display the urls
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  var bookmarkResults = document.getElementById("bookmarkResults");

  bookmarkResults.innerHTML = "";

  for (var i = 0; i < bookmarks.length; i++) {
    var url = bookmarks[i].url;

    var name = bookmarks[i].name;

    bookmarkResults.innerHTML += `
         <li class="ui item grid">
           <h3 class="eight wide column">${name} </h3>
           <a class="two wide column" target="blank" href="${url}"> Visit</a>
           <a id="del" onclick="deleteBookmark('${url}')" class="two wide column" target="blank" > Delete</a>
         </li>
       `;
    //console.log(bookmarks[i].name);
    //console.log(bookmarkResults);
  }
}
//delete bookmarkS
function deleteBookmark(url) {
  console.log(url);
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      //Remove bookmark
      console.log(bookmarks[i].url);
      bookmarks.splice(i, 1);
    }
  }

  console.log(bookmarks);
  //Reset the bookmarks
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  //re-fetch the bookmarks
  fetchBookmarks();
}

//Validate Form

function validateForm(siteName, siteUrl) {
  var errors = {
    name: "Enter Site name please",
    url: "Enter Site url please",
    site: "Fill the form please"
  };
  if (!siteName && !siteUrl) {
    var error = errors.site;
    return false;
  } else if (!siteName) {
    var error = errors.name;
    return false;
  } else if (!siteUrl) {
    var error = errors.url;
    return false;
  }
  console.log(error);
  var expression = /[-a-zA-Z0-9@:%_\.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regx = RegExp(expression);
  if (!siteUrl.match(regx)) {
    alert("Please enter a valid Url");
    return false;
  }
  return true;
}
