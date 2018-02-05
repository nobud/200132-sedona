var ESC_CODE = 27;

var pageHeader = document.querySelector('.page-header');
if (pageHeader) {
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
}

var wrapReview = document.querySelector('.form-review');
if (wrapReview) {
  var formReview = wrapReview.firstElementChild;
  var firstName = formReview.querySelector('#first-name');
  var lastName = formReview.querySelector('#last-name');
  var email = formReview.querySelector('#email');
  var phone = formReview.querySelector('#phone');

  var messageInfo = document.querySelector('.message-info');
  var messageErr = document.querySelector('.message-info--err');
  var btnCloseMessageInfo = messageInfo.querySelector(
    '.message-info__btn-close');
  var btnCloseMessageErr = messageErr.querySelector(
    '.message-info__btn-close');



  var validityReview = function() {
    var flagValidity = true;
    firstName.value = firstName.value.trim();
    if (!firstName.value) {
      return false;
    }
    lastName.value = lastName.value.trim();
    if (!lastName.value) {
      return false;
    }
    email.value = email.value.trim();
    if (!email.value || !email.validity.valid) {
      return false;
    }
    phone.value = phone.value.trim();
    if (!phone.value || !phone.validity.valid) {
      return false;
    }
    return true;
  };

  var onSubmitFormReview = function(evt) {
    if (!validityReview()) {
      evt.preventDefault();
      if (messageErr) {
        messageErr.classList.add('message-info--opened');
        setListenersMessage();
      }
    } else {
      if (messageInfo) {
        evt.preventDefault();

        var formData = new FormData(formReview);
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function(event) {
          console.log(event.target.responseText);
          messageInfo.classList.add('message-info--opened');
          setListenersMessage();
        });

        xhr.addEventListener('error', function(event) {
          console.log('error sending review');
        });
        xhr.open('POST', 'https://echo.htmlacademy.ru');
        xhr.send(formData);
      }
    }
  };

  var closeMessage = function() {
    if (messageInfo.classList.contains('message-info--opened')) {
      messageInfo.classList.remove('message-info--opened');
    }

    if (messageErr.classList.contains('message-info--opened')) {
      messageErr.classList.remove('message-info--opened');
    }
  };

  var deleteListenersMessage = function() {
    btnCloseMessageInfo.removeEventListener('click', onCloseMessage);
    btnCloseMessageErr.removeEventListener('click', onCloseMessage);
    document.removeEventListener('keydown', onKeyDownMessage);
  };

  var setListenersMessage = function() {
    btnCloseMessageInfo.addEventListener('click', onCloseMessage);
    btnCloseMessageErr.addEventListener('click', onCloseMessage);
    document.addEventListener('keydown', onKeyDownMessage);


  };

  var onKeyDownMessage = function(evt) {
    if (evt.keyCode === ESC_CODE) {
      deleteListenersMessage();

      closeMessage();
    }
  };

  var onCloseMessage = function(evt) {
    deleteListenersMessage();

    closeMessage();
  };

  firstName.required = true;
  lastName.required = true;
  email.required = true;
  phone.required = true;

  setListenersMessage();
  formReview.addEventListener('submit', onSubmitFormReview);
}
