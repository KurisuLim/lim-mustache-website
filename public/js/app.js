var $form = $('form#contact-form'),
url = 'https://script.google.com/macros/s/AKfycbxfcqTvoqhu03WBQi1nClQNI1XuPpcLXvzli6etOpk1dAhue3M/exec'

$('#submit-form').on('click', function(e) {
e.preventDefault();
var jqxhr = $.ajax({
url: url,
method: 'GET',
dataType: 'json',
data: $form.serializeObject()
}).success(
// do something
alert('message sent')
);
})