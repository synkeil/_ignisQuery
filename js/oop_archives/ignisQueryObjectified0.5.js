function _(dad, options , son){ //the selection
  options = options || {};

  var childElem = [];
  var elem = [];
  var parent = dad;
  var child = son;
  var count = -1;
  var parentIndex = options.parentIndex+1 || null;
  var childIndex = options.childIndex+1 || null;
  var tagC;
  var tagP;
  var svg;

  (function(){

    if (parentIndex !== null) { //select parent at index

      switch (parent.charAt(0)) {
        case '.': //select class
          parent = parent.slice(1);
          parent = document.getElementsByClassName(parent)[parentIndex];
          break;
        default:  //select Tag
          tagP = parent.toUpperCase();
          parent = document.getElementsByTagName(tagP)[parentIndex];
      }

    } else { //select parent array
// console.log("parent index null");
      switch (parent.charAt(0)) {
        case '#': //select ID
          parent = parent.slice(1);
          parent = document.getElementById(parent);
          // console.log('parent is an id');
        break;
        case '.': //select Class
          parent = parent.slice(1);
          for (var m = 0; m < parent.length; m++) {
            parent[m] = document.getElementsByClassName(parent)[m];
          }
          // console.log('parent is a class');
        break;
        default://select Tag
          tagP = parent.toUpperCase();
          for (var n = 0; n < parent.length; n++) {
            parent[n] = document.getElementsByTagName(tagP)[n];
          }
          // console.log('parent is a tag');
      }
    }

    // stops the function and returns parent as elem if child defined
    if (typeof child === 'undefined') {

      // console.log('child is undefined');
      return elem;
    }

    //goes on to select the child as elem
    if (childIndex !== null) { //select child at index
// console.log('child index not null');
      switch (child.charAt(0)) {
        case '.': //select class
        // console.log('child is a class');
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
        default: //select Tag
        // console.log('child is a tag');
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
    } else {  //select child array
      // console.log('child array');
      switch (child.charAt(0)) {
        case '#': //select ID
        // console.log('child is id');
          child = child.slice(1);
          child = document.getElementById(child);
        break;
        case '.': //select class
        // console.log('child is class');
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
        default:  //select Tag
        // console.log('child is tag');
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
    return this;
  })();

  //methods that can be used on the selected element

  //returns the selection
  this.get = function(){
    return elem;
  };

  //if val is empty returns the selected attribute, otherwise sets it to val
  this.attr = function(attribut, val){
    val = val || "";
    if (elem.length<1) {
      console.log('single elem');
      if(val === ""){
        return elem.getAttribute(attribut);
      } else {
        elem.setAttribute(attribut, val);
      }
    } else {
      for (var m = 0; m < elem.length; m++) {
        if(val === ""){
          elem[m].getAttribute(attribut);
        } else {
          elem[m].setAttribute(attribut, val);
        }
      }
    }
  };

  //set the css of the _ in the form of "color:blue;width:125px"
  this.css = function(style){
    elem.style.cssText = style;
  };

  this.addClass = function(toAdd){
    elem.classList.add(toAdd);
    if (elem.length<1) {
      elem.classList.add(toAdd);
    } else {
      for (var i = 0; i < elem.length; i++) {
        elem[i].classList.add(toAdd);
      }
    }
  };

  this.removeClass = function(toRemove){
    if (elem.length<1) {
      elem.classList.remove(toRemove);
    } else {
      for (var i = 0; i < elem.length; i++) {
        elem[i].classList.remove(toRemove);
      }
    }
  };

  //returns the content of _ if a is empty, else sets it to a
  this.html = function(a) {
    a = a || null;
    if (a === null) {
      return elem.innerHTML;
    }
    elem.innerHTML = a;
  };

  // this.listen = function(evnt,func) {
  //   var that = this;
  //   elem.addEventListener(evnt,function() {
  //     func.call(that);
  //   });
  // };

  // add your code to the html of _
  this.append = function(code) {
    elem.innerHTML += code;
  };

  this.ajax = function(options) {
    var xmlhttp = new XMLHttpRequest();

    options = options || {};
    var url = options.url || console.log('You need to specify a url');
    var methods = options.methods || 'GET';
    var postString = options.postString || '';


    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
               elem.html(xmlhttp.response);
           }
           else if (xmlhttp.status == 400) {
              alert('page does not exist on the server.');
           }
           else {
               alert('something went wrong.');
           }
        }
    };

    xmlhttp.open(methods, url, true);
    xmlhttp.send(postString);
  };

  this.svgAdd = function(options){
    options = options || {};
    var cls = options.cls || '';
    var idSet = options.idSet || '';
    var geometry = options.geometry;

    switch (geometry) {
      case 'rect':
      console.log('a rect');
        this.append('<rect id="'+idSet+'" class="'+cls+'"></rect>');
        break;
      case 'circle':
      console.log('a circle');
        this.append('<circle id="'+idSet+'" class="'+cls+'"></circle>');
        break;
      case 'ellipse':
      console.log('an ellipse');
        this.append('<ellipse id="'+idSet+'" class="'+cls+'"></ellipse>');
        break;
      default:
      console.log('something special');
        this.append(geometry);

    }
  };

  this.svg = function (options) {
    options = options || {};

    var d =  options.d || null;
    var _x =  options._x || null;
    var _y =  options._y || null;
    var cy =  options.cy || null;
    var cx =  options.cx || null;
    var r =  options.r || null;
    var rx =  options.rx || null;
    var ry =  options.ry || null;
    var height =  options._height || null;
    var width =  options._width || null;
    var fill =  options.fill || null;
    var stroke =  options.stroke || null;
    var strokewidth =  options.strokewidth || null;
    var strokedasharray =  options.strokedasharray || null;
    var strokedashoffset =  options.strokedashoffset || null;
    var geoTag;

    if(d !== null) {this.attr("d", d);}
    if(_x !== null) {this.attr("x", _x);}
    if(_y !== null) {this.attr("y", _y);}
    if(cy !== null) {this.attr("cy", cy);}
    if(cx !== null) {this.attr("cx", cx);}
    if(r !== null) {this.attr("r", r);}
    if(rx !== null) {this.attr("rx", rx);}
    if(ry !== null) {this.attr("ry", ry);}
    if(height !== null) {this.attr("height", height);}
    if(width !== null) {this.attr("width", width);}
    if(fill !== null) {this.attr("fill", fill);}
    if(stroke !== null) {this.attr("stroke", stroke);}
    if(strokewidth !== null) {this.attr("stroke-width", strokewidth);}
    if(strokedasharray !== null) {this.attr("stroke-dasharray", strokedasharray);}
    if(strokedashoffset !== null) {this.attr("stroke-dashoffset", strokedashoffset);}

  };
  //returning this allows use of methods, but doesn't return the selection on its own


  return this.nodeValue;

}

// tests toTest for times * 10000 and returns the median
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

//test10K(_('#firstSection',{}, 'div').get(),0);


/************
TESTING AREA
************/

console.log(_('.div').get());


/*****************
 BENCHMARK RESULTS
 *****************/
// _('#testUnit').get() = 1031.9(Ignis Version)
 // document.getElementById('testUnit') = 1101.1
 // _.sP('#testUnit') = 1079
 // _('#testUnit').get() = 1125.96
 // document.querySelectorAll('#testUnit') = 2883.3
 // _('#testUnit') = 6759.7 (Jqerry version)

// _('.testUnit').get() = 2730.9 (Ignis version)
 // _.sP('.testUnit') = 2792.2
 // document.getElementsByClassName('testUnit') = 2811.3

 // _('#firstSection',{}, 'div').get() = 3767.5
 // _.sC('firstSection', 'testUnit', 1) = 1194
 // _.sC('firstSection', 'div') = 4635.3

 // _('div').get() = 4819 (Ignis version)
 // _('div').get() = 5117.7
 // document.querySelectorAll('div') = 4726.4
 // _.sP('div') = 5012
 //_('div') = 9276.6 (jQuery version)
