$(document).ready(function() {
  $('#process').click(function() {
    const instruments = $('#instruments').val().split('\n').filter(item => item.trim() !== '');
    $.ajax({
      url: '/process',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ instruments: instruments }),
      success: function(response) {
        $('#original-result').html('<h3>Исходный массив:</h3><pre>' + response.original.join('\n') + '</pre>');
      },
      error: function(xhr, status, error) {
        alert('Ошибка: ' + error);
      }
    });
  });

  $('#show-corrected').click(function() {
    window.location.href = '/corrected.html';
  });
}); 