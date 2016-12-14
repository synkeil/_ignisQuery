document.addEventListener('DOMContentLoaded', function() {

  function _(dad, son, options){
    options = options || {};

    var elem = dad,
        type,
        parent,
        count = -1,
        parentIndex = options.parentIndex || null,
        childIndex = options.childIndex || null,
        child = son,
        tag,
        tagP;

    (function(){

      //setting the type of selector for the parent (eg: tag || id || class)
      if (parentIndex === null) {
        if (dad.charAt(0) === '#') {
          parent = dad.slice(1);
          parent = document.getElementById(parent);
        } else if (dad.charAt(0) === '.') {
          parent = dad.slice(1);
          parent = document.getElementsByClassName(parent);
        } else {
          tagP = dad.toUpperCase();
          parent = document.getElementsByTagName(tagP);
        }
      } else {
        if (dad.charAt(0) === '#') {
          if (dad.charAt(0) === '.') {
            parent = dad.slice(1);
            parent = document.getElementsByClassName(parent)[parentIndex];
        } else {
          tagP = dad.toUpperCase();
          parent = document.getElementsByTagName(tagP)[parentIndex];
        }
      }

      //the selection if there is a child specified
      if (typeof son !== 'undefined') {
        if (son.charAt(0) === '#'){
          for (var i = 0; i < parent.childNodes.length; i++) {
            if (typeof parent.childNodes[i].id === 'undefined') {
              continue;
            }
            if(childIndex === null && parent.childNodes[i].id == son){
              count++;
              child[count] = parent.childNodes[i];
            } else if (parent.childNodes[i].id == son) {
              count++;
              child[count] = parent.childNodes[i];
            }
          }
        }else if (son.charAt(0) === '.'){
          for (var j = 0; j < parent.childNodes.length; j++) {
            if (typeof parent.childNodes[j].className === 'undefined') {
              continue;
            }
            if(childIndex === null && parent.childNodes[j].className.split(" ").indexOf(son) !== -1){
              count++;
              child[count] = parent.childNodes[j];
            } else if (parent.childNodes[j].className.split(" ").indexOf(son) !== -1) {
              count++;
              child[count] = parent.childNodes[j];
            }
          }
        }else{
          tag = son.toUpperCase();
          for (var k = 0; k < parent.childNodes.length; k++) {
            if (typeof parent.childNodes[k].tagName === 'undefined') {
              continue;
            }
            if(childIndex === null && parent.childNodes[k].tagName == tag){
              count++;
              child[count] = parent.childNodes[k];
            } else if (parent.childNodes[k].tagName == tag) {
              count++;
              child[count] = parent.childNodes[k];
            }
          }
        }
        if(childIndex === null){
          elem = child;
          return elem;
        }
        elem = child[childIndex];
        return elem;
      }

      //the selection when no child is specified
      elem = parent;
      return elem;
      }
      return elem;
    })();

    this.attr = function(attribut, val){
      val = val || "";
      if(val === ""){
        return elem.getAttribute(attribut);
      } else {
        elem.setAttribute(attribut, val);
      }
    };

    this.css = function(style){
      elem.style.cssText = style;
    };

    this.addClass = function(toAdd){
      elem.classList.add(toAdd);
    };

    this.removeClass = function(toRemove){
      elem.classList.remove(toRemove);
    };

    this.html = function(a) {
      a = a || null;
      if (a === null) {
        return elem.innerHTML;
      }
      elem.innerHTML = a;
    };

    this.append = function(code) {
      elem.innerHTML += code;
    };

    this.get = function() {
      return elem;
    };

    return elem;
  }

  function test10K(times) {
    if(times === 0){return;}
    var result = 0,
    timeStart = Date.now(),
    timeEnd,
    elapsed;
    for (var i = 0; i < times; i++) {

      timeStart = Date.now();

      for (var j = 0; j < 10000; j++) {
        console.log(_('#testUnit').get());
      }

      timeEnd = Date.now();
      elapsed = timeEnd - timeStart;
      result = result + elapsed;

    }

    console.log(result/times);

  }
   test10K(0);
  // _('div', {parentIndex:1}).css("height:250px;width:10px");
  // _('#test').html('<span>adding stuff</span>');
  // console.log(_('#test').html());
    console.log(_('#test'));

}, false);

// document.getElementById('testUnit') = 1101.1
// _.sP('#testUnit') = 1079
// _('#testUnit').get() = 1125.96
// document.querySelectorAll('#testUnit') = 2883.3
// $('#testUnit') = 6759.7

// _.sP('.testUnit') = 2792.2
// document.getElementsByClassName('testUnit') = 2811.3

// _('div').get() = 5117.7
// document.querySelectorAll('div') = 5179.8
// _.sP('div') = 5012
//$('div') = 9276.6

// _.sC('firstSection', 'testUnit', 1) = 1194
// _.sC('firstSection', 'div') = 4635.3
