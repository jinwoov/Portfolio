'use strict';

$('.show-update').on('click', updateButton)

function updateButton(e) {
  e.preventDefault();
  let num = $(this).val();
  $(`#update${num}`).toggle();
}
$('.delete-container').on('click', deleteButton)
function deleteButton(e) {
  e.preventDefault()
  let num = $(this).val();
  $(`#delete${num}`).toggle();
}

$('.cancel').on('click', cancelButton)
function cancelButton(e) {
  e.preventDefault()
  $('.update').hide();
  $('.delete-form').hide();
}



$('.update').hide();
$('.delete-form').hide();
