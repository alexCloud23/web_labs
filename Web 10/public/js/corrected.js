$(document).ready(function() {
  $.get('/resource/corrected.txt', function(data) {
    const correctedInstruments = data.split('\n').filter(item => item.trim() !== '');
    $('#corrected-result').html('<h3>Исправленный массив:</h3><pre>' + correctedInstruments.join('\n') + '</pre>');
  }).fail(function(xhr, status, error) {
    alert('Ошибка загрузки исправленного массива: ' + error);
  });

  $('#back').click(function() {
    window.location.href = '/';
  });
}); 