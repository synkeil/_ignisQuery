document.addEventListener('DOMContentLoaded', function() {

  function _(el, a=null){
    var elem = el,
        type,
        index = a;
    (function(){
      if (elem.charAt(0) === '#') {
        elem = elem.slice(1);
        elem = document.getElementById(elem);
        type = 0;
        return elem;
      } else {
        if (elem.charAt(0) === '.' && index === null) {
          elem = elem.slice(1);
          elem = document.getElementsByClassName(elem);
          type = 1;
          return elem;
        } else if (elem.charAt(0) === '.') {
          elem = elem.slice(1);
          elem = document.getElementsByClassName(elem)[index];
          type = 1;
          return elem;
        } else if (index === null) {
          elem = document.getElementsByTagName(elem);
          type = 2;
          return elem;
        }
        elem = document.getElementsByTagName(el)[index];
        type = 2;
        return elem;
      }
    })();

    this.attr = function(attribut, val=""){
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

    this.html = function(a = null) {
      if (a === null) {
        return elem.innerHTML;
      }
      elem.innerHTML = a;
    };

    this.append = function(code) {
      elem.innerHTML += code;
    };

    this.get = function(son = null,a = null) {
      var
        count = -1,
        child = [];

      if(son === null && a === null){
        return elem;
      }
      if (son.charAt(0) === '.') {
        child = son.slice(1);
        for (var i = 0; i < elem.childNodes.length; i++) {
          if (typeof elem.childNodes[i].className === 'undefined') {
            continue;
          }
          if(a === null && elem.childNodes[i].className == child){
            count++;
            child[count] = elem.childNodes[i];
          } else if (elem.childNodes[i].className == child) {
            count++;
            child[count] = elem.childNodes[i];
          }
        }
      }

      child = son;
      tag = child.toUpperCase();


      if(a === null){
        return child;
      }
      return child[a];
    };
    return this;
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
  _('div', 1).css("height:250px;width:10px");
  _('#test').html('<span>adding stuff</span>');
  console.log(_('#test').html());
  console.log(_('#test').get('span'));

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
