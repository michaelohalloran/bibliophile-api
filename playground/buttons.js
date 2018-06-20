const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// searchBtn.addEventListener("click", function(e) {
//     e.preventDefault();
//     alert('testing');
// });

searchBtn.addEventListener("click", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    const searchVal = searchInput.value;
    console.log(searchVal);
    
    alert(searchVal);

}


//HTML

<input type="text" id="searchInput" name="searchTerm"/>
    <button id="searchBtn">Search Title</button>