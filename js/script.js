"use strict"

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);
    
    let formData = new FormData(form);

    if(error === 0) {
      form.classList.add('_sending');
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });

      if (response.ok){
        let result = await response.json();
        alert(result.message);
        formPreview.innerHTML = '';
        form.reset();
        form.classList.remove('_sending');
      } else {
        alert('Ошибка');
        form.classList.remove('_sending');
      }
    } else {
      alert('Заполните обязательные поля');
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._red');
    const $select = $('.__select__title')
    
    if($select.html() === 'Выберите тариф') {
      $select.addClass('_error');
      error++;
    } else {
      $select.removeClass('_error');
    }

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains('_email')) {
        if (emailList(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if(input.value === ''){
          formAddError(input)
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }
  // функция проверки email
  function emailList(input) {
    return !/^\w+([\.]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }


  // ==================
  // if($('.__select__title').text() === 'Выберите тариф') {
  //   console.log(555)
  // }

  $(document).on('click','.js-videoPoster',function(e) {
    //отменяем стандартное действие button
    e.preventDefault();
    var poster = $(this);
    // ищем родителя ближайшего по классу
    var wrapper = poster.closest('.js-videoWrapper');
    videoPlay(wrapper);
  });
  
  //вопроизводим видео, при этом скрывая постер
  function videoPlay(wrapper) {
    var iframe = wrapper.find('.js-videoIframe');
    // Берем ссылку видео из data
    var src = iframe.data('src');
    // скрываем постер
    wrapper.addClass('videoWrapperActive');
    // подставляем в src параметр из data
    iframe.attr('src',src);
  }
})