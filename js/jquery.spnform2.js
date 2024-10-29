function urlencode(str) {
    str = (str + '').toString();
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}

function ReturnKeyCode(e) {
    if (e.keyCode) {
        code = e.keyCode;
    } else {
        if (e.which) {
            code = e.which;
        } else {
            code = e.charCode;
        }
    }
    return code;
}

function validateForm(formData, jqForm, options) {
    formElement = $(jqForm[0]);
    name = formElement.find('.name').val();

    if (formElement.find('[name="name"]').val().replace(/ /g, '') == '') {
        alert('Необходимо заполнить поле Имя');
        return false;
    }
    if (formElement.find('[name="phone"]').val().replace(/ /g, '') == '') {
        alert('Необходимо заполнить поле телефон!!!!');
        return false;
    }
    $('body').prepend('<div class="superBlockView" style="position:fixed;width:100%;height:100%;left:0px;top:0px;background:rgba(200,200,200,0.5);z-index:9999;"></div>');
    return true;
}

function successSend(responseText, statusText, xhr, $form)  {
	$('.superBlockView').remove();
    try {
        json = JSON.parse(responseText);
    } catch (err) {
        json = false;
    }
    if (!json || (json && !json.response.order_id)) {
        alert('Ошибка отправка заказа');
    } else {
        $('.spnForm').each(function(){
            $(this).find('input').each(function(){
                input = $(this);
                if (input.attr('type') != 'hidden' && input.attr('type') != 'checkbox' && input.attr('type') != 'radio' && input.attr('type') != 'submit') {
                    input.val('');
                }
            });
        });
        callback_form(json.response.order_id);
    }
}

$(function(){
//    $('input[name="phone"]').keypress(function(event) {
//        var code = ReturnKeyCode(event);
//        if ((code < 48 && code != 37 && code != 39 && code != 9 && code != 8 && code != 13 && code != 46) || code > 57) {
//			event.preventDefault();
//            return false;
//        } else {
//            return true;
//        }
//    });

    $('.gmt').val(-(new Date().getTimezoneOffset()/60));

    if(window.location.search!==''){
      sessionStorage.url = encodeURI(window.location.search);
    }
    var urls = window.location.href;

    if(sessionStorage.url && urls.indexOf(decodeURI(sessionStorage.url)) == -1){
      urls += decodeURI(sessionStorage.url);
    }
    $('.url').val(urlencode(urls));
    $('.spnForm').on('submit',function(e){
        $(this).find('[name="phone"]').blur();
    });
    $('.spnForm:not(#call-modal)').ajaxForm({
        beforeSubmit:  validateForm,
        success:       successSend
    });
});

    $(document).ready(function() {
        $('input[name="phone"]').mask("9(999)999-99-99");
    });
