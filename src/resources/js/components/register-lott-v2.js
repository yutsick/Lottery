export default function (){
  let activeStep = 1
  let ring = 1
  let isValidNumber = false;
  const nextSteps = document.querySelectorAll('.reg_lott-btn');

//Switcher pages
  nextSteps.forEach(nextStep => {
    nextStep.addEventListener('click', () => {
      let nextPage = document.querySelector(`.register_lott_popup-body--${activeStep + 1}`);
      let prevPage = document.querySelector(`.register_lott_popup-body--${activeStep}`);
      
      if (activeStep === 1 || isValidNumber) {
        activeStep++;

        //This 'if' need to reset all props after last page and show second page again
        if (activeStep === 8) {
          activeStep = 2;
          nextPage = document.querySelector(`.register_lott_popup-body--${activeStep}`);
          prevPage = document.querySelector('.register_lott_popup-body--7');
          document.querySelector('.register_lott_popup').classList.remove('active');
          document.querySelector(`.register_lott_popup-body--${activeStep} .reg_lott_container`).classList.remove('active');
          document.querySelector(`.register_lott_popup-body--${activeStep} .reg_lott_container`).style.borderColor = 'rgba(245, 99, 99, 1)';;
          ring = 2;
          isValidNumber = false;
          document.querySelector(`.register_lott_popup-body--${activeStep} .reg_lott_input`).value = ''
        }

        nextPage.style.display = 'flex';
        prevPage.style.display = 'none';
        const input = document.querySelector(`.register_lott_popup-body--${activeStep} .reg_lott_input`);
        const container = document.querySelector(`.register_lott_popup-body--${activeStep} .reg_lott_container`);
        const errorNumber = document.querySelector(`.register_lott_popup-body--${activeStep} .error_number`);
        const chevrons = document.querySelectorAll(`.register_lott_popup-body--${activeStep} .reg_lott_dropdown-top .dropdown-top_header, .register_lott_popup-body--${activeStep} .reg_lott_dropdown-top .chevron`);
        const dropdownHistory = document.querySelectorAll(`.register_lott_popup-body--${activeStep} .dropdown_item`);

        //Validate lottery number
        input.addEventListener('blur', () => {
          const value = input.value;
          if (/^\d{12}$/.test(value)) {
            input.value = value.replace(/(\d{4})(\d{4})(\d{4})/, '$1 - $2 - $3');
            container.classList.add('active');
            errorNumber.style.display = 'none';
            container.style.borderColor = 'rgba(7, 70, 88, 1)';
            isValidNumber = true;
          } else {
            input.value = value.replace(/\D/g, '');
            errorNumber.style.display = 'flex';
            container.classList.remove('active');
            container.style.borderColor = 'rgba(245, 99, 99, 1)';
            isValidNumber = false;
          }
        });

        //Open custom dropdown with lott history
        //Open '.reg_lott_dropdown-top'
        chevrons.forEach(chevron => {
          const dropdown = document.querySelector(`.register_lott_popup-body--${activeStep} .reg_lott_dropdown-top`);
          //This 'if' need to prevent double set listener after lage page
          if (ring === 1) {
            chevron.addEventListener('click', () => openDropdown(dropdown))
          }

          function openDropdown(){
            if (dropdown.classList.contains('active')) {
              dropdown.classList.remove('active');
            } else {
              dropdown.classList.add('active');
            }
          }
        });

        //Open '.dropdown_item'
        dropdownHistory.forEach(dropdownItem => {
          const dropdownHistoryChevron = dropdownItem.querySelector('.dropdown_item_header');
          //This 'if' need to prevent double set listener after lage page
          if (ring === 1) {
            dropdownHistoryChevron.addEventListener('click', () => openDropdownHistory(dropdownHistoryChevron))
          }

          function openDropdownHistory(){
            if (dropdownItem.classList.contains('active')) {
              dropdownItem.classList.remove('active');
            } else {
              dropdownItem.classList.add('active');
            }
          }
        });

        //Back to the second page after last page
        if (document.querySelector('.register_lott_popup-body--7').style.display === 'flex') {
            document.querySelector('.register_lott_popup').classList.add('active');
          } else {
            document.querySelector('.register_lott_popup').classList.remove('active');
          }
      }
    })
  });
}