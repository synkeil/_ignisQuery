/*********************
  Setting the nav toggle
  *********************/
  _.sP('#menu_anchor').addEventListener('click',function () {
     if (this.classList.contains('toClose')) {
         this.classList.remove('toClose').add('toOpen');
     } else {
         this.classList.remove('toOpen').add('toClose');
     }
 });
 _.sP('#menu_anchor').addEventListener('click',function () {
     if (this.classList.contains('toClose')) {
         _.sP('#rect4152').classList.remove('burger_top-closed').add('burger_top-opened');
     } else {
         _.sP('#rect4152').classList.remove('burger_top-opened').add('burger_top-closed');
     }
 });
 _.sP('#menu_anchor').addEventListener('click',function () {
     if (this.classList.contains('toClose')) {
         _.sP('#rect4154').classList.remove('burger_bot-closed').add('burger_bot-opened');
     } else {
         _.sP('#rect4154').classList.remove('burger_bot-opened').add('burger_bot-closed');
     }
 });
 _.sP('#menu_anchor').addEventListener('click',function () {
     if (this.classList.contains('toClose')) {
         _.sP('#nav_proper').classList.remove('nav_closed').add('nav_opened');
     } else {
         _.sP('#nav_proper').classList.remove('nav_opened').add('nav_closed');
     }
 });

/******************
Setting the summary
******************/

 function summary() {
   var posDad;
   for (var i = 0; i < _.sP('h1').length; i++) {
     _.sP('h1', i).attr('id', 'title'+i);
     _.sP('#index').innerHTML+='<li class="title"><a href="#title'+i+'">'+_.sP('h1', i).innerHTML()+'</a></li>';
   }
   for (var j = 0; j < $('h2').length; j++) {
     posDad = $('h2', j).prevAll('h1', 0).index('h1');
     _.sP('h2',j).attr('id', 'subtitle'+j);
     _.sP('.title', '#index').index(posDad).innerHTML+='<ul><li class="subtitle"><a href="#subtitle'+j+'">'+$('h2', j).innerHTML()+'</a></li></ul>';
     console.log(posDad);
   }
 }

  function footerLoad(){
   $.ajax({
     url:"footer.html"
   }).done(function(data){
     _.sP('footer').innerHTML(data);
   });
  }

  /******************************
  search and replace article name
  ******************************/
  var titleArticle = _.sP('h1',0).innerHTML();
  var titleArticleArr = titleArticle.split(" ");
  titleArticle = titleArticleArr.join("_");

  function replaceTitle(){
    _.sP('body').children().each(function(){
      this.innerHTML(this.innerHTML().replace(/@articleTitle/g, titleArticle));
    });
  }

  summary();
  footerLoad();
  replaceTitle();
