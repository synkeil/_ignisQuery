var _ = {

  sP: function(el, a=null){
    var elem="";
    if (el.charAt(0) === '#') {
      elem = el.slice(1);
      return document.getElementById(elem);
    } else {
      if (el.charAt(0) === '.' && a === null) {
        elem = el.slice(1);
        return document.getElementsByClassName(elem);
      } else if (el.charAt(0) === '.') {
        elem = el.slice(1);
        return document.getElementsByClassName(elem)[a];
      } else if (a === null) {
        return document.getElementsByTagName(el);
      }
      return document.getElementsByTagName(el)[a];
    }

  },

  sC: function(dad, son, a = null){
    var elem = "",
    parent = dad,
    count = -1,
    child = [];
    parent = document.getElementById(parent);

    for (var i = 0; i < parent.childNodes.length; i++) {
      if (typeof parent.childNodes[i].className === 'undefined') {
        continue;
      }
      if(a === null && parent.childNodes[i].className.split(" ").indexOf(son) !== -1){
        count++;
        child[count] = parent.childNodes[i];
      } else if (parent.childNodes[i].className.split(" ").indexOf(son) !== -1) {
        count++;
        child[count] = parent.childNodes[i];
      }
    }
    if(a === null){
      return child;
    }
    return child[a];
  },

  sT: function(dad, son, a = null){
    var elem = "",
    tag = son.toUpperCase(),
    parent = dad,
    count = -1,
    child = [];
    parent = document.getElementById(parent);

    for (var i = 0; i < parent.childNodes.length; i++) {
      if (typeof parent.childNodes[i].tagName === 'undefined') {
        continue;
      }
      if(a === null && parent.childNodes[i].tagName == tag){
        count++;
        child[count] = parent.childNodes[i];
      } else if (parent.childNodes[i].tagName == tag) {
        count++;
        child[count] = parent.childNodes[i];
      }
    }
    if(a === null){
      return child;
    }
    return child[a];
  },

  simplifiedTagSelect: function(dad, son, a = null){
    var parent,child;
    if (dad.charAt(0) === '#') {
      parent = dad.slice(1);
      parent = document.getElementById(parent);
    }
    if (dad.charAt(0) === '.') {
      parent = dad.slice(1);
      parent = document.getElementsByClassName(parent);
    }

  },

  name: function(name, a = null){
    if (a === null) {
      return document.getElementsByName(name);
    }
    return document.getElementsByName(name)[a];
  }

};

//adds the attr function to the DOM
HTMLElement.prototype.attr = function(atr,a = ""){
  if(a === ""){
    return this.getAttribute(atr);
  }
  return this.setAttribute(atr, a);
};

for (var i = 0; i < _.sP('div').length; i++) {
  _.sP('div', i).innerHTML += '<p>added</p>';
}

// document.getElementById('testUnit') = 900 to 1K
// _.sP('#testUnit') = 1079
// document.querySelectorAll('#testUnit') = 2.77k to 3.1k
// $('#testUnit') = 6917 to 7447

// _.sP('.testUnit') = 2792.2
// document.getElementsByClassName('testUnit') = 2811.3

// _.sC('firstSection', 'testUnit', 1) = 1194
//_.sC('firstSection', 'div') = 4635.3

function test10K(a = null) {
  if(a === null){
    var timeStart = Date.now(),
    timeEnd,
    elapsed;
    for (var i = 0; i < 10000; i++) {
      console.log(_.sP('div'));
    }

    timeEnd = Date.now();
    elapsed = timeEnd - timeStart;
    console.log(elapsed);
  }else{
    console.log(a/10);
  }

}
_.sP('section', 0).style.background = '#494949';
test10K(5032+5079+4617+4934+4818+5149+5065+5227+5014+5185);
//console.log(_.sT('firstSection', 'div',1));
