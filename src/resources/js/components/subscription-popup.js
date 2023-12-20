export default function (){

    $('.popup_right-header button, .popup_right-button--second .prevPage').on('click',switchToPrevPage);
    $('.verify_button').on('click',validateInputs);
    $('.popup_right-button--second, .popup_qr, .popup_right-4 .loader-wrapper').on('click', switchToNextPage);
    $('#personnummer').on('input blur', function () {
        setTimeout(() => validateInputs(), 4000);
    });
    $('#email').on('input blur', function () {
        setTimeout(() => validateInputs(), 2000);
    });
    $('#mobilnummer').on('input blur', function () {
        setTimeout(() => validateInputs(), 2000);
    });



    document.getElementById('personnummer').addEventListener('input', function (e) {
        let inputValue = e.target.value.replace(/\D/g, '');
        if (inputValue.length > 8) {
            e.target.value = inputValue.replace(/(\d{4})(\d{2})(\d{2})(\d{4})/, '$1$2$3-$4');
        } else {
            e.target.value = inputValue;
        }
    });

    $('#mobilnummer').on('input', (e) => {
        console.log(e.target.value)
        let inputValue = e.target.value.replace(/\D/g, '');
        if (inputValue.length > 3) {
            e.target.value = inputValue.replace(/(\d{3})(\d{7})/, '$1-$2');
        } else {
            e.target.value = inputValue;
        }
    });
    
    
    function validateInputs() {
        const personnummerInput = document.getElementById('personnummer');
        const emailInput = document.getElementById('email');
        const mobilnummerInput = document.getElementById('mobilnummer');
        
        const personnummerErrorMessage = document.getElementById('errorWindow');
        const emailErrorMessage = document.getElementById('errorWindow2');
        const mobilnummerErrorMessage = document.getElementById('errorWindow3');
        const verifyButton = document.querySelector('.verify_button');

    
        if (!validateInput(personnummerInput, personnummerErrorMessage, 'personnummer') ||
            !validateInput(emailInput, emailErrorMessage, 'email') ||
            !validateInput(mobilnummerInput, mobilnummerErrorMessage, 'mobilnummer')) {
                verifyButton.classList.add('blocked');
                verifyButton.classList.remove('open');
                verifyButton.removeEventListener('click', switchToNextPage);
        } else { 
            verifyButton.classList.remove('blocked');
            verifyButton.classList.add('open');
            verifyButton.addEventListener('click', switchToNextPage);
        }
    }
    
    function validateInput(input, errorMessageElement, inputType) {
        switch (inputType) {
            case 'personnummer':
                if (input.value.length !== 13) {
                    errorMessageElement.style.display = 'block';
                    return false;
                } else {
                    errorMessageElement.style.display = 'none';
                    return true;
                }
                break;
    
            case 'email':
                const emailValue = input.value.trim()
                if (!isValidEmail(emailValue)) {
                    errorMessageElement.style.display = 'block';
                    return false;
                } else {
                    errorMessageElement.style.display = 'none';
                    return true;
                }
                break;
    
            case 'mobilnummer':
                if (input.value.length !== 11) {
                    errorMessageElement.style.display = 'block';
                    return false;
                } else {
                    errorMessageElement.style.display = 'none';
                    return true;
                }
                break;
    
            default:
                return false;
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    let PageIndex = 1;/*Temp. Must be =1*/
    popupResize();
    
    function switchToNextPage() {
        const currentPage = document.querySelector(`[popup_right-index="${PageIndex}"]`);
        currentPage.classList.remove('active');
    
        PageIndex++;
    
        const nextPage = document.querySelector(`[popup_right-index="${PageIndex}"]`);
        nextPage.classList.add('active');
    
        popupResize();
      
    }
    
    function switchToPrevPage() {
        const currentPage = document.querySelector(`[popup_right-index="${PageIndex}"]`);
        currentPage.classList.remove('active');
    
        PageIndex--;
    
        const prevPage = document.querySelector(`[popup_right-index="${PageIndex}"]`);
        prevPage.classList.add('active');
        popupResize();
        if (PageIndex < 4){
            $('.popup_left').show();
        }
    }
    
    
    function popupResize(){
        if (PageIndex === 4){
            $('.popup').addClass('small');
        } else {
            $('.popup').removeClass('small');
        }
        if (PageIndex < 4){
            $('.popup_left').show();
        }
    }
    
    $(document).ready(function () {
        var customRadios = $('.customRadio');
        var hiddenText = $('.hidden_text');
        var hidText = $('.hid_text');
        var bottWay = $('.bott_way');
        var dFlex = $('.d_flex');
      
        customRadios.on('click', function () {
          hiddenText.css('display', 'none');
          hidText.css('display', 'block');
          bottWay.css('height', '285px');
          dFlex.css('height', '28%');
        });
      });
    
    
    
    document.addEventListener('DOMContentLoaded', function () {
        const errorWindow4 = document.getElementById('errorWindow4');
        const verifyButton = document.getElementById('third_but');
        let selectedRadio;
            $('input[name="radio"]').change(function() {
                if ($(this).is(':checked')) {
                    verifyButton.classList.add('open');
                    errorWindow4.style.display = 'none';
                }
              });
              $('input[name="item"]').change(function() {
                if ($(this).is(':checked') && $(this).attr('title') !== 'Välj bank') {
                    verifyButton.classList.add('open');
                    errorWindow4.style.display = 'none';
                    $('.custom-select').removeAttr('open');
                }
              });
    
              $('#third_but').on('click', function () {
                var eFakturaRadio = $('#radio');
                var selectedItem = $('input[name="item"]:checked');
                if (eFakturaRadio.prop('checked') && selectedItem.attr('title') === 'Välj bank') {
                  $('#errorWindow4').css('display', 'block');
                  $('#third_but').removeClass('open').addClass('blocked');
                 
                } else if(selectedItem.length === 0){
                    $('#third_but').removeClass('open').addClass('blocked');
                
                } else {
                  $('#errorWindow4').css('display', 'none');
                  $('#third_but').addClass('open').removeClass('blocked');
    
                  selectedRadio = $('input[name="radio"]:checked').data('type');
                  $('.popup_left').hide();
                  PageIndex = 3;
                  switchToNextPage();
                }
              });
    
            //   Error screens
    
            const errors = {
                '1': {'title': 'Hoppsan,<br>Något gick fel', 'text': 'Försök igen'},
                '2': {'title': 'BankID-appen<br>svarar inte', 'text': 'Försök igen om du vill delta.'},
                '3': {'title': 'BankID-appen<br>är inte giltig', 'text': 'Kontakta din bank.'},
                '4': {'title': 'BankID-appen<br>kunde inte öppnas', 'text': 'Försök igen om du vill delta.'},
                '5': {'title': 'Oj, köpet har avbrutits', 'text': 'Försök igen om du vill delta.'},
                '6': {'title': 'Misslyckades med att<br>starta Swish', 'text': 'Kontakta din bank.'},
                '7': {'title': 'Oh nej! Det går inte att<br>genomföra betalningen.', 'text': 'Försök igen'}
            };
    
            const errorPlace = $('.error_general-topbar');
    
            function errorText(errorId){
                errorPlace.find('h2').html(errors[errorId].title);
                errorPlace.find('span').html(errors[errorId].text);
            }
            errorText(3);  //Call this function with number of error
    });
}