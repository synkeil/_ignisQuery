function $(dad, options , son){
  options = options || {};

  var childElem = [];
  var elem,
      parent = dad,
      child = son,
      count = -1,
      parentIndex = options.parentIndex+1 || null,
      childIndex = options.childIndex+1 || null,
      tagC,
      tagP;

  (function(){

    if (parentIndex !== null) { //select parent at index

      if (parent.charAt(0) === '.') { //select class
        parent = parent.slice(1);
        parent = document.getElementsByClassName(parent)[parentIndex];
      } else { //select Tag
        tagP = parent.toUpperCase();
        parent = document.getElementsByTagName(tagP)[parentIndex];
      }
    } else { //select parent array
      if (parent.charAt(0) === '#') { //select ID
        parent = parent.slice(1);
        parent = document.getElementById(parent);
      } else {
        if (parent.charAt(0) === '.') { //select Class
          parent = parent.slice(1);
          parent = document.getElementsByClassName(parent);
        } else { //select Tag
          tagP = parent.toUpperCase();
          parent = document.getElementsByTagName(tagP);
        }
      }
    }

    // stops the function and returns parent as elem if child defined
    if (typeof child == 'undefined') {
      elem = parent;
      return elem;
    }

    //goes on to select the child as elem
    if (childIndex !== null) { //select child at index

      if (child.charAt(0) === '.') { //select class
        child = child.slice(1);
        for (var i = 0; i < parent.childNodes.length; i++) {
          if (typeof parent.childNodes[i].className === 'undefined') {
            continue;
          }
          if (parent.childNodes[i].className.split(" ").indexOf(child) !== -1) {
            count++;
            childElem[count] = parent.childNodes[i];
          }
        }
        elem = childElem[childIndex-1];
        return elem;

      } else { //select Tag
        tagC = child.toUpperCase();
        for (var j = 0; j < parent.childNodes.length; j++) {
          if (typeof parent.childNodes[j].tagName === 'undefined') {
            continue;
          }
          if (parent.childNodes[j].tagName == tagC) {
            count++;
            childElem[count] = parent.childNodes[j];
          }
        }

        elem = childElem[childIndex-1];
        return elem;

      }
    } else {//select child array

      if (child.charAt(0) === '#') { //select ID
        child = child.slice(1);
        child = document.getElementById(child);
      } else {
        if (child.charAt(0) === '.') { //select class
          child = child.slice(1);
          for (var k = 0; k < parent.childNodes.length; k++) {
            if (typeof parent.childNodes[k].className === 'undefined') {
              continue;
            }
            if (parent.childNodes[k].className.split(" ").indexOf(child) !== -1) {
              count++;
              childElem[count] = parent.childNodes[k];
            }
          }
          elem = childElem;
          return elem;

        } else { //select Tag
          tagC = child.toUpperCase();
          for (var l = 0; l < parent.childNodes.length; l++) {
            if (typeof parent.childNodes[l].tagName === 'undefined') {
              continue;
            }
            if (parent.childNodes[l].tagName == tagC) {
              count++;
              childElem[count] = parent.childNodes[l];
            }
          }

          elem = childElem;
          return elem;

        }
      }
    }
    return elem;
  })();

  //methods that can be used on the selected element

  //returns the selection
  this.get = function(){
    return elem;
  };

  //if val is empty returns the selected attribute, otherwise sets it to val
  this.attr = function(attribut, val){
    val = val || "";
    if(val === ""){
      return elem.getAttribute(attribut);
    } else {
      elem.setAttribute(attribut, val);
    }
  };

  //set the css of the $ in the form of "color:blue;width:125px"
  this.css = function(style){
    elem.style.cssText = style;
  };

  this.addClass = function(toAdd){
    elem.classList.add(toAdd);
  };

  this.removeClass = function(toRemove){
    elem.classList.remove(toRemove);
  };

  //returns the content of $ if a is empty, else sets it to a
  this.html = function(a) {
    a = a || null;
    if (a === null) {
      return elem.innerHTML;
    }
    elem.innerHTML = a;
  };

  // add your code to the html of $
  this.append = function(code) {
    elem.innerHTML += code;
  };

  this.ajax = function(options) {
    options = options || {};

    var
      url = options.url,
      context = options.context,
      success = options.success;

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
               this.innerHTML = xmlhttp.responseText;
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
};



  //ends function adn allows for the use of the methods
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

 //test10K(0);

 console.log($('#testUnit').attr('class'));
 $('#testUnit').attr('class', 'testons');
 console.log($('#testUnit').attr('class'));
