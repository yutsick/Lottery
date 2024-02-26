export default function (){

    const termsBlock = document.getElementById("termsBlock");
    const personnummerInput = document.getElementById('personnummer');
    const emailInput = document.getElementById('email');
    const mobilnummerInput = document.getElementById('mobilnummer');
    const verifyButton = document.querySelector('.verify_button');
    const verifyButtonId = document.querySelector('.popup_right-1');
    verifyButtonId.setAttribute('tabindex', 0);

    const personnummerErrorMessage = document.getElementById('errorWindow');
    const emailErrorMessage = document.getElementById('errorWindow2');
    const mobilnummerErrorMessage = document.getElementById('errorWindow3');

    $('#termsLink').on('click', function (event) {
        event.preventDefault();
        termsBlock.style.transform = "translateY(0)";
    });

    $('#termsBlock button').on('click', function () {
        termsBlock.style.transform = "translateY(100%)";
    });

    $('.popup_right-button--second .prevPages, .prevPages').on('click',switchToPrevPage);
    $('.verify_button').on('click',validateInputs);
    $('.popup_right-button--second .verify_button, .popup_qr, .popup_right-4 .loader-wrapper').on('click', switchToNextPage);

    verifyButtonId.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            validateInputs();
            if (isValidId(personnummerInput.value) &&
            isValidEmail(emailInput.value) &&
            isValidPhone(mobilnummerInput.value)) {
                switchToNextPage();
            }
        }
    });

    function setupInputValidation(inputId, inputObject, errorMessage, validationDelay) {
        $('#' + inputId).on('input', debounce(function () {
            validateInput(inputObject, errorMessage, inputId);
            if (isValidId(personnummerInput.value) &&
                isValidEmail(emailInput.value) &&
                isValidPhone(mobilnummerInput.value)) {
                verifyButton.classList.remove('blocked');
                verifyButton.classList.add('open');
                verifyButton.addEventListener('click', switchToNextPage);
            } else {
                verifyButton.classList.add('blocked');
                verifyButton.classList.remove('open');
                verifyButton.removeEventListener('click', switchToNextPage);
            }
        }, validationDelay));
    }
    
    function debounce(func, delay) {
        let timeout;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, delay);
        };
    }
    
    setupInputValidation('personnummer', personnummerInput, personnummerErrorMessage, 3000, 1);
    setupInputValidation('email', emailInput, emailErrorMessage, 3000, 1);
    setupInputValidation('mobilnummer', mobilnummerInput, mobilnummerErrorMessage, 3000, 1);
    
    document.getElementById('personnummer').addEventListener('input', function (e) {
        let inputValue = e.target.value.replace(/\D/g, '');

        if (inputValue.length > 8) {
            e.target.value = inputValue.replace(/(\d{4})(\d{2})(\d{2})(\d{4})/, '$1$2$3-$4');
        } else {
            e.target.value = inputValue;
        }
    });

    $('#mobilnummer').on('input', (e) => {
        let inputValue = e.target.value.replace(/\D/g, '');
        if (inputValue.length > 3) {
            e.target.value = inputValue.replace(/(\d{3})(\d{7})/, '$1-$2');
        } else {
            e.target.value = inputValue;
        }
    });
    
    function validateInputs() {
        if (!validateInput(personnummerInput, personnummerErrorMessage, 'personnummer') ||
            !validateInput(emailInput, emailErrorMessage, 'email') ||
            !validateInput(mobilnummerInput, mobilnummerErrorMessage, 'mobilnummer')) {
                verifyButton.classList.add('blocked');
                verifyButton.classList.remove('open');
                verifyButton.removeEventListener('click', switchToNextPage);
                return false;
        } else { 
            verifyButton.classList.remove('blocked');
            verifyButton.classList.add('open');
            verifyButton.addEventListener('click', switchToNextPage);
            return true;
        }
    }
    
    function validateInput(input, errorMessageElement, inputType) {

       // if(input.value.length !==0){
            switch (inputType) {
                case 'personnummer':
                    if (input.value.length === 13 || input.value.length === 10) {
                        errorMessageElement.style.display = 'none';
                        return true;
                    } else {
                        errorMessageElement.style.display = 'block';
                        return false;
                    }
        
                case 'email':
                    const emailValue = input.value.trim()
                    if (!isValidEmail(emailValue)) {
                        errorMessageElement.style.display = 'block';
                        return false;
                    } else {
                        errorMessageElement.style.display = 'none';
                        return true;
                    }
        
                case 'mobilnummer':
                    if (input.value.length !== 11) {
                        errorMessageElement.style.display = 'block';
                        return false;
                    } else {
                        errorMessageElement.style.display = 'none';
                        return true;
                    }
            }
       // }
       

    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        return phone.length === 11;
    }

    function isValidId(id) {
        return id.length === 13 || id.length === 10;
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
        const customRadios = $('.customRadio');
        const hiddenText = $('.hidden_text');
        const hidText = $('.hid_text');
        const bottWay = $('.bott_way');
        const dFlex = $('.d_flex');
      
        customRadios.on('click', function () {
          hiddenText.css('display', 'none');
          hidText.css('display', 'block');
          bottWay.css('padding-top','24px');
          dFlex.css('height', '28%');
        });
      });

      function updateVerificationStatus() {
        if (isValidId(personnummerInput.value) &&
            isValidEmail(emailInput.value) &&
            isValidPhone(mobilnummerInput.value)) {
            verifyButton.classList.remove('blocked');
            verifyButton.classList.add('open');
            personnummerErrorMessage.style.display = 'none';
            emailErrorMessage.style.display = 'none';
            mobilnummerErrorMessage.style.display = 'none';
        }
    }

    setInterval(updateVerificationStatus, 1000);
    
    document.addEventListener('DOMContentLoaded', function () {
        const errorWindow4 = document.getElementById('errorWindow4');
        const verifyButton2 = document.getElementById('third_but');
        let selectedRadio;
            $('input[name="radio"]').change(function() {
                if ($(this).is(':checked')) {
                    verifyButton2.classList.add('open');
                    errorWindow4.style.display = 'none';
                }
              });
              $('input[name="item"]').change(function() {
                if ($(this).is(':checked') && $(this).attr('title') !== 'Välj bank') {
                    verifyButton2.classList.add('open');
                    errorWindow4.style.display = 'none';
                    $('.custom-select').removeAttr('open');
                }
              });
    
              $('#third_but').on('click', function () {
                var eFakturaRadio = $('#radio');
                var selectedItem = $('input[name="item"]:checked');
                var screenWidth = $(window).width();
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
                  if (screenWidth <= 700) {
                    const currentPage = document.querySelector(`[popup_right-index="3"]`);
                    currentPage.classList.remove('active');
                    PageIndex = 4;
                } else {
                    PageIndex = 3;
                }
                  switchToNextPage();
                }
            });

            $('.text-slider').css('visibility', 'hidden');

            $('#autogiro').on('click', function () {
                console.log('autogiro clicked')
                $('.text-slider').css('visibility', 'visible');
            });
        
            $('input[name="radio"]').not('#autogiro').on('click', function () {
                $('.text-slider').css('visibility', 'hidden');
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