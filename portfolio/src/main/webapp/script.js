// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Get query from URL to activate correct page
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Displays selected content
function openContent(evt, page) {
  let i;

  // Set all the pages display to none
  Array.from(document.getElementsByClassName("content")).forEach(
    function(page) {
        page.style.display = "none";
    }
  );

  // Once a page is selected make it active and display it
  const navitem = document.getElementsByClassName("navitem");
  for (i = 0; i < navitem.length; i++) {
    navitem[i].className = navitem[i].className.replace(" active", "");
  }

  document.getElementById(page).style.display = "block";
  evt.currentTarget.className += " active";

  // Select the header and footer
  const headerElement = document.getElementById("headerSection");
  const footerElement = document.getElementById("footerSection");

  // If on the about page make the header and footer large otherwise shrink them
  if(page == "about"){
    headerElement.classList.remove("minimise");
    headerElement.classList.add("maximise");
    footerElement.classList.add("maximiseFooter");
    footerElement.classList.remove("minimiseFooter");
  }else{
    headerElement.classList.add("minimise");
    headerElement.classList.remove("maximise");
    footerElement.classList.remove("maximiseFooter");
    footerElement.classList.add("minimiseFooter");
  }

  // When comments page is selected load the comments
  if (page == "comments"){
    getComments();
  }
}

// Fetches data and adds the result to the DOM
function getComments() {
  // Get users preference for max comments results
  let numResults = document.getElementById("results").value;
  if (numResults == ""){
    numResults = 5;
  }
  fetch(`/data?results=${numResults}`).then(response => response.json()).then((comments) => {
    // Select the table and empty it
    const table = document.getElementById("comment-table");
    table.innerHTML = `
          <tr>
            <th>Username</th>
            <th>Comment</th>
            <th>Date</th>
          </tr>`;

    // For every comment create a new row and fill cells with data
    comments.forEach((comment) => {
      let row = table.insertRow(1);
      let usernameCell = row.insertCell(0);
      let commentCell = row.insertCell(1);
      let dateCell = row.insertCell(2);

      usernameCell.innerHTML = comment.username;
      commentCell.innerHTML = comment.comment;
      dateCell.innerHTML = comment.currentDate;
    })
  });
}


