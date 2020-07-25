function type(n, t) {
  let str = document.getElementsByTagName("code")[n].innerHTML.toString();
  let i = 0;
  document.getElementsByTagName("code")[n].innerHTML = "";
  
  setTimeout(function() {
    let se = setInterval(function() {
      i++;
      document.getElementsByTagName("code")[n].innerHTML =
        str.slice(0, i) + "|";
      if (i == str.length) {
        clearInterval(se);
        document.getElementsByTagName("code")[n].innerHTML = str;
      }
    }, 10);
  }, t);
}

type(0, 0);
type(1, 600);
type(2, 1300);
