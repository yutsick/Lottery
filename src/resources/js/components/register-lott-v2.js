export default function () {

  const mobile = 460;
  const bg = document.querySelector('#bg').value;
  let activeStep = 1;
  let ring = 1, cancel = false
  let isValidNumber = false;
  const nextSteps = document.querySelectorAll('.reg_lott-btn:not(.no-steps)');

  //set background
  if ($(window).width() <= mobile) {
    $("#registration_lott").css('background', bg);
  } else {
    $(".register_lott_popup").css('background', bg);
  }

  //close popup
  document.querySelectorAll('.close_btn').forEach((el) => {
    el.addEventListener('click', () => {

      document.querySelector(`.register_lott_popup-body--${activeStep}`).style.display = 'none';
      document.querySelector(`.register_lott_popup-body--cancel`).style.display = 'flex';
      document.querySelector('#registration_lott .register_lott_popup').style.background = '#BDE5D5';
      if ($(window).width() <= mobile) {
        document.querySelector('#registration_lott').style.background = '#BDE5D5';
      }
    })
  })

  //close popup buttons
  document.querySelector('.register_lott_popup-body--cancel .reg_lott-btn').addEventListener('click', () => {
    document.querySelector('#registration_lott .register_lott_popup').style.background = bg;
    if ($(window).width() <= mobile) {
      document.querySelector('#registration_lott').style.background = bg;
    }

    document.querySelector(`.register_lott_popup-body--cancel`).style.display = '';
    activeStep = 7;
    isValidNumber = true;
  })


  document.querySelector('.register_lott_popup-body--cancel .reg_lott-btn.btn-primary').addEventListener('click', () => {
    document.querySelector(`.register_lott_popup-body--${activeStep}`).style.display = 'none';
    document.querySelector(`.register_lott_popup-body--cancel`).style.display = 'none';
    document.querySelector('#registration_lott').style.display = "none";
  })



  //Switcher pages
  nextSteps.forEach(nextStep => {



    nextStep.addEventListener('click', () => {
      //console.log(activeStep)
      let nextPage = document.querySelector(`.register_lott_popup-body--${activeStep + 1}`);
      let prevPage = document.querySelector(`.register_lott_popup-body--${activeStep}`);

      if (activeStep === 1 || isValidNumber) {
        activeStep++;

        if (activeStep === 7) {
          ($(window).width() <= mobile) ? document.querySelector('#registration_lott').style.background = "#BDE5D5" : document.querySelector('#registration_lott .register_lott_popup').style.background = "#BDE5D5";

        } else
          ($(window).width() <= mobile) ? document.querySelector('#registration_lott').style.background = bg : document.querySelector('#registration_lott .register_lott_popup').style.background = bg;

        //second screen animation
        if (activeStep === 2) {
          nextPage.style.display = 'flex';
          nextPage.style.opacity = 1;
          prevPage.style.position = 'absolute'
          prevPage.style.transform = "translateY(-100%)";
          prevPage.style.opacity = 0;
          
          setTimeout(() => {
            prevPage.style.display = 'none';
            nextPage.style.transform = '';
            nextPage.classList.remove('first');
          }, 1000)

        } else {
          nextPage.style.display = 'flex';
          prevPage.style.display = 'none';
        }



        const input = document.querySelector(`.register_lott_popup-body--${activeStep} .reg_lott_input`);
        const container = document.querySelector(`.register_lott_popup-body--${activeStep} .reg_lott_container`);
        const errorNumber = document.querySelector(`.register_lott_popup-body--${activeStep} .error_number`);

        const chevrons = document.querySelectorAll(`
          .register_lott_popup-body--${activeStep} .reg_lott_dropdown-top .dropdown-top_header,
          .register_lott_popup-body--${activeStep} .reg_lott_dropdown-top .chevron
        `);

        const dropdownHistory = document.querySelectorAll(`.register_lott_popup-body--${activeStep} .dropdown_item`);

        //Validate lottery number
        input.addEventListener('blur', () => {
          $('.register_lott_wrapper').removeClass('disabled');
          isValidNumber = validateInputValue(input, container, errorNumber)
        });

        if (!input.readOnly) {
          input.addEventListener('focus', () => {
            $('.register_lott_wrapper').addClass('disabled')
          })
        }
     
          input.addEventListener('focus', () => {
            const value = input.value;
            input.value = value.replace(/(\d{4})(\d{4})(\d{4})/, '$1 - $2 - $3');
            errorNumber.style.display = 'none';
          })
        
        

      
        input.addEventListener('input', function() {
          let formattedValue = input.value.replace(/\D/g, ''); 
          let formattedWithDashes = '';
          const value = input.value.replace(/ - /g, '');
         
          if(/^\d{12}$/.test(value)){
            container.classList.add('active');
          } else {
            container.classList.remove('active');
          }

          for (let i = 0; i < formattedValue.length; i++) {
            if (i > 0 && i % 4 === 0) {
              formattedWithDashes += ' - ';
            }
            formattedWithDashes += formattedValue[i];
          }
      
          input.value = formattedWithDashes;
        });
      
        



        //Open custom dropdown with lott history
        //Open '.reg_lott_dropdown-top'
        chevrons.forEach(chevron => {
          const dropdown = document.querySelector(`.register_lott_popup-body--${activeStep} .reg_lott_dropdown-top`);
          //This 'if' need to prevent double set listener after lage page
          if (ring === 1) {
            chevron.addEventListener('click', () => openDropdown(dropdown))

          }

          function openDropdown() {
            dropdown.classList.toggle('active');
          }
        });

        //Open '.dropdown_item'
        dropdownHistory.forEach(dropdownItem => {
          const dropdownHistoryChevron = dropdownItem.querySelector('.dropdown_item_header');
          
          //This 'if' need to prevent double set listener after lage page
          if (ring === 1) {
            dropdownHistoryChevron.addEventListener('click', () => {
              openDropdownHistory(dropdownHistoryChevron);

              if (activeStep === 8) {
                ring = 2;
              }
            })

          }

          function openDropdownHistory() {
            if (dropdownItem.classList.contains('active')) {
              dropdownItem.classList.remove('active');
            } else {
              dropdownItem.classList.add('active');
            }
          }
        });


      }
    })
  });

  function validateInputValue(input, container, errorNumber) {
    const pattern = /^\d{4} - \d{4} - \d{4}$/;
    const value = input.value.replace(/ - /g, ''); // Remove dashes for digit count check
    const isValidFormat = pattern.test(input.value);
    const hasExactly12Digits = /^\d{12}$/.test(value);

    if (isValidFormat && hasExactly12Digits) {
      
      container.classList.add('active');
      errorNumber.style.display = 'none';
      container.style.borderColor = '';
      input.style.borderColor = '';
      return true;
    } else {
      
      errorNumber.style.display = 'flex';
      if ($(window).width() <= mobile) {
        input.classList.remove('active');
        input.style.borderColor = 'rgba(245, 99, 99, 1)';
      } else {
        container.classList.remove('active');
        container.style.borderColor = 'rgba(245, 99, 99, 1)';
      }

      return false;
    }
  }

  //Cancel registration
  document.querySelector('.cancel-step .register').addEventListener('click', () => {
    document.querySelector(`.register_lott_popup-body--${activeStep}`).style.display = 'none';
    document.querySelector(`.cancel-step`).style.display = 'none';
    document.querySelector(`.register_lott_popup-body--3`).style.display = 'flex';

    setTimeout(() => {

      document.querySelector('#registration_lott').style.display = "none";
    }, 1000)

  })

  //change CTA text on mobile
  if ($(window).width() <= mobile) {
    $('.reg_lott-btn:not(.register_lott_popup-body--1 .reg_lott-btn, .register_lott_popup-body--cancel .reg_lott-btn)').text('Registrera lott')
  }

}