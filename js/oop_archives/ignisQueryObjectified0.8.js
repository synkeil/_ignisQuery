function sk(mainSelector, subSelector) {


    var mainS = mainSelector;
    var subS = subSelector || null;
    var main = [];
    var sub = [];
    var mainCount = [];
    var subCount = [];
    var selected = [];
    var count = 0;
    var iM = null;
    var iS = null;

    (function() {
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
        if (subS === null) {
          for (var c = 0; c < main.length; ++c) {
              selected[c] = main[c];
          }
          return selected;
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
        return selected;
    })();

    this.attr = function(atr, val) {

        if (iM !== null && subS === null) {
            selected.setAttribute(atr, val);
        } else if (subS === null) {
            for (var i = 0; i < selected.length; ++i) {
                selected[i].setAttribute(atr, val);
            }
        } else if (iS !== null) {
            selected.setAttribute(atr, val);
        } else {
            for (var j = 0; j < selected.length; ++j) {
                selected[j].setAttribute(atr, val);
            }
        }
        return this;
    };

    this.get = function() {
        return selected;
    };

    //set the css of the sk in the form of "color:blue;width:125px"
    this.css = function(style) {
        if (iM !== null && subS === null) {
            selected.style.cssText = style;
        } else if (subS === null) {
            for (var i = 0; i < selected.length; ++i) {
                selected[i].style.cssText = style;
            }
        } else if (iS !== null) {
            selected.style.cssText = style;
        } else {
            for (var j = 0; j < selected.length; ++j) {
                selected[j].style.cssText = style;
            }
        }
        return this;
    };

    this.addClass = function(toAdd) {
        if (iM !== null && subS === null) {
            selected.classList.add(toAdd);
        } else if (subS === null) {
            for (var i = 0; i < selected.length; ++i) {
                selected[i].classList.add(toAdd);
            }
        } else if (iS !== null) {
            selected.classList.add(toAdd);
        } else {
            for (var j = 0; j < selected.length; ++j) {
                selected[j].classList.add(toAdd);
            }
        }
        return this;
    };

    this.removeClass = function(toRemove) {

        if (iM !== null && subS === null) {
            selected.classList.remove(toRemove);
        } else if (subS === null) {
            for (var i = 0; i < selected.length; ++i) {
                selected[i].classList.remove(toRemove);
            }
        } else if (iS !== null) {
            selected.classList.remove(toRemove);
        } else {
            for (var j = 0; j < selected.length; ++j) {
                selected[j].classList.remove(toRemove);
            }
        }
        return this;
    };

    //returns the content of sk if a is empty, else sets it to a
    this.html = function(a) {
        a = a || null;
        if (a === null) {
            return selected.innerHTML;
        }

        if (iM !== null && subS === null) {
            selected.innerHTML = a;
        } else if (subS === null) {
            for (var i = 0; i < selected.length; ++i) {
                selected[i].innerHTML = a;
            }
        } else if (iS !== null) {
            selected.innerHTML = a;
        } else {
            for (var j = 0; j < selected.length; ++j) {
                selected[j].innerHTML = a;
            }
        }
        return this;
    };


    //adds an event listener in the form of element.addEventListener(type, listener, useCapture);
    this.listen = function(evnt, func) {

        if (iM !== null && subS === null) {
            selected.addEventListener(evnt, func);
        } else if (subS === null) {
            for (var i = 0; i < selected.length; ++i) {
                selected[i].addEventListener(evnt, func);
            }
        } else if (iS !== null) {
            selected.addEventListener(evnt, func);
        } else {
            for (var j = 0; j < selected.length; ++j) {
                selected[j].addEventListener(evnt, func);
            }
        }
        return this;
    };

    // add your code to the html of sk
    this.append = function(code) {
        if (iM !== null && subS === null) {
            selected.innerHTML += code;
        } else if (subS === null) {
            for (var i = 0; i < selected.length; ++i) {
                selected[i].innerHTML += code;
            }
        } else if (iS !== null) {
            selected.innerHTML += code;
        } else {
            for (var j = 0; j < selected.length; ++j) {
                selected[j].innerHTML += code;
            }
        }
        return this;
    };

    this.ajax = function(options) {
        var xmlhttp = new XMLHttpRequest();

        options = options || {};
        var url = options.url || console.log('You need to specify a url');
        var methods = options.methods || 'GET';
        var postString = options.postString || '';

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {

                    if (iM !== null && subS === null) {
                        selected.html(xmlhttp.response);
                    } else if (subS === null) {
                        for (var i = 0; i < selected.length; ++i) {
                            selected[i].html(xmlhttp.response);
                        }
                    } else if (iS !== null) {
                        selected.html(xmlhttp.response);
                    } else {
                        for (var j = 0; j < selected.length; ++j) {
                            selected[j].html(xmlhttp.response);
                        }
                    }
                } else if (xmlhttp.status == 400) {
                    alert('page does not exist on the server.');
                } else {
                    alert('something went wrong.');
                }
            }
            return this;
        };

        xmlhttp.open(methods, url, true);
        xmlhttp.send(postString);
    };

    this.svgSet = function(options) {
        options = options || {};

        var d = options.d || null;
        var _x = options._x || null;
        var _y = options._y || null;
        var cy = options.cy || null;
        var cx = options.cx || null;
        var r = options.r || null;
        var rx = options.rx || null;
        var ry = options.ry || null;
        var height = options._height || null;
        var width = options._width || null;
        var fill = options.fill || null;
        var stroke = options.stroke || null;
        var strokewidth = options.strokewidth || null;
        var strokedasharray = options.strokedasharray || null;
        var strokedashoffset = options.strokedashoffset || null;
        var geoTag;

        if (d !== null) {
            this.attr("d", d);
        }
        if (_x !== null) {
            this.attr("x", _x);
        }
        if (_y !== null) {
            this.attr("y", _y);
        }
        if (cy !== null) {
            this.attr("cy", cy);
        }
        if (cx !== null) {
            this.attr("cx", cx);
        }
        if (r !== null) {
            this.attr("r", r);
        }
        if (rx !== null) {
            this.attr("rx", rx);
        }
        if (ry !== null) {
            this.attr("ry", ry);
        }
        if (height !== null) {
            this.attr("height", height);
        }
        if (width !== null) {
            this.attr("width", width);
        }
        if (fill !== null) {
            this.attr("fill", fill);
        }
        if (stroke !== null) {
            this.attr("stroke", stroke);
        }
        if (strokewidth !== null) {
            this.attr("stroke-width", strokewidth);
        }
        if (strokedasharray !== null) {
            this.attr("stroke-dasharray", strokedasharray);
        }
        if (strokedashoffset !== null) {
            this.attr("stroke-dashoffset", strokedashoffset);
        }
        return this;
    };

    this.eq = function(iM,iS){
      iM = iM || null;
      iS = iS || null;

      (function(){
        if (iM !== null) {
          selected = selected[iM - 1];
          return selected;
        } else {
          return selected;
        }
        if (iS !== null) {
            selected = selected[iS - 1];
            return selected;
          }
        return selected;
      })();

      return this;
    };

    this.svg = function(options1, options2) {
        options1 = options1 || {};
        var cls = options1.cls || '';
        var idSet = options1.idSet || '';
        var geometry = options1.geometry;
        switch (geometry) {
            case 'rect':
                this.append('<rect id="' + idSet + '" class="' + cls + '"></rect>');
                break;
            case 'circle':
                this.append('<circle cx="50%" cy="50%" id="' + idSet + '" class="' + cls + '"></circle>');
                break;
            case 'ellipse':
                this.append('<ellipse cx="50%" cy="50%" id="' + idSet + '" class="' + cls + '"></ellipse>');
                break;
            default:
                alert(geometry + ' is not a supported parameter.');
        }

        svg = sk('.' + cls + '');

        options2 = options2 || {};

        var d = options2.d || null;
        var _x = options2._x || null;
        var _y = options2._y || null;
        var cy = options2.cy || null;
        var cx = options2.cx || null;
        var r = options2.r || null;
        var rx = options2.rx || null;
        var ry = options2.ry || null;
        var height = options2._height || null;
        var width = options2._width || null;
        var fill = options2.fill || null;
        var stroke = options2.stroke || null;
        var strokewidth = options2.strokewidth || null;
        var strokedasharray = options2.strokedasharray || null;
        var strokedashoffset = options2.strokedashoffset || null;
        var geoTag;

        if (d !== null) {
            this.attr("d", d);
        }
        if (_x !== null) {
            this.attr("x", _x);
        }
        if (_y !== null) {
            this.attr("y", _y);
        }
        if (cy !== null) {
            this.attr("cy", cy);
        }
        if (cx !== null) {
            this.attr("cx", cx);
        }
        if (r !== null) {
            this.attr("r", r);
        }
        if (rx !== null) {
            this.attr("rx", rx);
        }
        if (ry !== null) {
            this.attr("ry", ry);
        }
        if (height !== null) {
            this.attr("height", height);
        }
        if (width !== null) {
            this.attr("width", width);
        }
        if (fill !== null) {
            this.attr("fill", fill);
        }
        if (stroke !== null) {
            this.attr("stroke", stroke);
        }
        if (strokewidth !== null) {
            this.attr("stroke-width", strokewidth);
        }
        if (strokedasharray !== null) {
            this.attr("stroke-dasharray", strokedasharray);
        }
        if (strokedashoffset !== null) {
            this.attr("stroke-dashoffset", strokedashoffset);
        }
        return this;
    };

    return this;
}


function test10K(times) {
    if (times === 0) {
        return;
    }
    var result = 0,
        timeStart = Date.now(),
        timeEnd,
        elapsed;
    for (var i = 0; i < times; i++) {
        timeStart = Date.now();
        for (var j = 0; j < 10000; j++) {
            sk('p').attr("name", "bluezzy").css("color:blue").addClass('woot').removeClass('span').html("it works").append(" quite well");
        }
        timeEnd = Date.now();
        elapsed = timeEnd - timeStart;
        result = result + elapsed;

    }

    console.log(result / times);

}

test10K(1);

console.log(sk('p').attr("name", "bluezzy").css("color:blue").addClass('woot').removeClass('span').html("it works").append(" quite well").get());
