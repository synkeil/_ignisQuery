/************
Galery config
************/

function nextContainer() {
  _.sP('.setContainer').style.transform = "translateX(-100%)";
}

function prevContainer() {
  _.sP('.setContainer').style.transform = "translateX(0%)";
}

_.sP('#gal-prev').addEventListener('click', prevContainer);
_.sP('#gal-next').addEventListener('click', nextContainer);

/**************
 Slider config
**************/

var count = 0,
  indexButton;

/* toggling the slider*/
function sliderShaper() {
  _.sP('#wrapper_slider').style.cssText =
    "height:100%;width:100%";
}

function sliderReset() {
  _.sP('#wrapper_slider').style.cssText =
    "height:0%;width:0%";
}

/*  injecting the image in the slider */
function sliderBuilder() {
  $.post('include/img' + count + '.html',
    function (data) {
      $('#showcase').html(data);
    });

  sliderShaper();
}

/* adding as many buttons as there are images*/
function buttonAdd() {
  var i,
    nbButtons = _.sT('#illustration-wrapper','img').length;
  for (i = 0; i < nbButtons; i++) {
    _.sP('#buttons').innerHTML+='<div class="sliderPos"><img src="images/previews/img' + i + '.jpg"></div>';
  }
}

/*closing the slider*/
 _.sP('.closeicon').addEventListener('click', sliderReset);
$('img', '#illustration-wrapper').addEventListener('click' ,function () {
  var indexId = _.sT('#illustration-wrapper', 'img').index($(this));
  count = indexId;
  sliderBuilder();

});

buttonAdd();

/* Replaces the img in the slider according to the button's index */
$(document).on('click', '.sliderPos', function () {
  indexButton = $('.sliderPos', '#buttons').index($(this));
  count = indexButton;
  sliderBuilder();
});


//cicle the counter to get the previous pannel
$(document).on("click", ".prevFull", function () {
  if (count > 0) {
    count--;
  } else {
    count = ($('div', '#buttons').length - 1);
  }
  sliderBuilder();
});

//cicle the counter to get the next pannel
$(document).on("click", ".nextFull", function () {
  if (count < ($('div', '#buttons').length - 1)) {
    count++;
  } else {
    count = 0;
  }
  sliderBuilder();
});

/* showing a preview on hover button */
$(".prevFull").hover(function () {
  if (count > 0) {
    $('#prevPreview').html("<img src='images/previews/img" + (count - 1) + ".jpg' />");
  } else {
    $('#prevPreview').html("<img src='images/previews/img" + ($('div', '#buttons').length - 1) + ".jpg' />");
  }
});

$(".nextFull").hover(function () {
  if (count < ($('div', '#buttons').length - 1)) {
    $('#prevPreview').html("<img src='images/previews/img" + (count + 1) + ".jpg' />");
  } else {
    $('#prevPreview').html("<img src='images/previews/img0.jpg' />");
  }
});
