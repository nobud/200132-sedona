var pageHeader = document.querySelector('.page-header');
var navToggle = pageHeader.querySelector('.page-header__menu-toggle');

pageHeader.classList.remove('page-header--nojs');

pageHeader.addEventListener('click', function() {
  if (pageHeader.classList.contains('page-header--menu-closed')) {
    pageHeader.classList.remove('page-header--menu-closed');
    pageHeader.classList.add('page-header--menu-opened');
  } else {
    pageHeader.classList.add('page-header--menu-closed');
    pageHeader.classList.remove('page-header--menu-opened');
  }
});
