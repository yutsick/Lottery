
export default function (){

let showMoreLinks = document.querySelectorAll('.js-toggle-row');

    showMoreLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let row = link.closest('tr');
            let nextRow = row.nextElementSibling;
            if (nextRow && nextRow.classList.contains('hidden-row')) {
				
                if (nextRow.style.display === 'none') {
                    nextRow.style.display = 'table-row';
                    link.textContent = link.getAttribute('data-text-toggle'); 
                } else {
                    nextRow.style.display = 'none';
                    link.textContent = 'Visa mer'; 
                }
            }
        });
    });

    try {
        $('#withdrawConto a').on('click', function(e) {
            e.preventDefault();
            $('#withdrawConto').addClass('hidden');
            $('#withdrawContoChange').removeClass('hidden');
            
        });

        $('#withdrawContoChange a.cancel').on('click', function(e) {
            e.preventDefault();
            $('#withdrawContoChange').addClass('hidden');
            $('#withdrawConto').removeClass('hidden');
            $('#accountNr, #clearingNr').val('');
            $('#withdrawContoChange .js-action-empty-input').css('opacity', '0');
            
        });
        $('#withdrawContoChange a.confirm').on('click', function(e) {
            e.preventDefault();
            $('#withdrawContoChange').addClass('hidden');
            $('#withdrawConto').removeClass('hidden');
        });
    } catch (error) {
        
    }
}