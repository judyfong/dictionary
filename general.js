function findMatchingWords() {
  let input, filter, table, tr, english, icelandic, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
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
