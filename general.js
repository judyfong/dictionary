function searchForWords() {
  let input;
  input = document.getElementById("myInput");
  findMatchingWords(input.value);
  window.history.pushState({},'','?q=' + input.value);
}

function findMatchingWords(word) {
  let filter, table, tr, english, icelandic, i, txtValue;
  filter = word.toUpperCase();
  table = document.getElementById("EN-IS-dictionary");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    english = tr[i].getElementsByTagName("td")[0];
    icelandic = tr[i].getElementsByTagName("td")[1];
    if (english) {
      txtValue = english.textContent || english.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
    if (icelandic) {
      txtValue = icelandic.textContent || icelandic.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      }
    }
  }
}

$(window).load(function() {
  console.debug('onload');
  //verify speechId is a query parameter at the end of the URL
  if (window.location.href.indexOf("q=") > -1) {
    var word = (window.location.href.match(/q=([^&]+)/))[1];
    if (word) {
        document.getElementById("myInput").value=word;
        findMatchingWords(word);
    }
  }
});
