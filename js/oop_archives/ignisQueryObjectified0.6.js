function sk(mainSelector, options, subSelector){

  options = options || {};

  var iM = options.iM || null;
  var iS = options.iS || null;

  var mainS = mainSelector;
  var subS = subSelector || null;
  var main = [];
  var sub = [];
  var mainCount = [];
  var subCount = [];
  var selected = [];
  var count = 0;

  (function(){
    switch (mainS.charAt(0)) {
      case '#':
        mainS = mainS.slice(1);
        main[0] = document.getElementById(mainS);
        break;
      case '.':
        //gets rid of the . in front of the class
        mainS = mainS.slice(1);
        //gets the htmlCollection into mainCount
        mainCount = document.getElementsByClassName(mainS);
        for (var a = 0; a < mainCount.length; ++a) {
          main[a] = document.getElementsByClassName(mainS)[a];
        }
        break;
      default:
        mainCount = document.getElementsByTagName(mainS.toUpperCase());
        for (var b = 0; b < mainCount.length; ++b) {
          main[b] = document.getElementsByTagName(mainS)[b];
        }
    }
    if (subS === null){
      for (var c = 0; c < main.length; ++c) {
        selected[c] = main[c];
      }
      if(iM !== null){
        selected = selected[iM-1];
        return selected[iM-1];
      } else {
        return selected;
      }
    } else {
      if(iM !== null){
        main = main[iM-1];
      }
    }

    switch (subS.charAt(0)) {
      case '#':
        subS = subS.slice(1);
        sub[0] = document.getElementById(subS);
        break;
      case '.':
        //gets rid of the . in front of the class
        subS = subS.slice(1);
        //gets the htmlCollection into subCount
        subCount = main.childNodes;
        for (var d = 0; d < subCount.length; ++d) {
          if (main.childNodes[d].className === undefined) {
            continue;
          }
          if (main.childNodes[d].className.split(" ").indexOf(subS) !== null) {
              sub[count] = main.childNodes[d];
              count++;
          }
        }
        console.log(main.childNodes);
        break;
      default:
        subCount = main.childNodes;
        subS = subS.toUpperCase();
        for (var f = 0; f < main.childNodes.length; ++f) {
          if (main.childNodes[f].tagName === undefined) {
            continue;
          }
          if (main.childNodes[f].tagName == subS) {
            sub[count] = main.childNodes[f];
            count++;
          }
        }
    }
    for (var g = 0; g < sub.length; ++g) {
      selected[g] = sub[g];
    }
    if (iS !== null) {
      return selected[iS-1];
    }
    return selected;
  })();

  this.attr = function(atr, val){

    if (iM !== null && subS === null) {
        selected[iM-1].setAttribute(atr, val);
    } else if(subS === null){
      for (var i = 0; i < selected.length; ++i) {
        selected[i].setAttribute(atr, val);
      }
    } else if(iS !== null){
      selected[iS-1].setAttribute(atr, val);
    } else {
      for (var j = 0; j < selected.length; ++j) {
        selected[j].setAttribute(atr, val);
      }
    }
  };

  this.get = function(){
    return selected;
  };

  return this;
}

function test10K(toTest,times) {
  if(times === 0){return;}
  var result = 0,
  timeStart = Date.now(),
  timeEnd,
  elapsed;
  for (var i = 0; i < times; i++) {
    timeStart = Date.now();
    for (var j = 0; j < 10000; j++) {
      console.log(toTest);
    }
    timeEnd = Date.now();
    elapsed = timeEnd - timeStart;
    result = result + elapsed;

  }

  console.log(result/times);

}

test10K(sk('section', {iM:2}, 'p').get(), 10);

//console.log(sk('section', {iM:2}, 'p').get());
