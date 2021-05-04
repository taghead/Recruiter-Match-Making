document.addEventListener('DOMContentLoaded', function() { // Materialize Components

  var modals = document.querySelectorAll('.modal'); // Declare modal
  M.Modal.init(modals); // Initialize modal

  var items = document.querySelectorAll('.collapsible'); // Declare Collapsible
  M.Collapsible.init(items); // Initialize collapsible

  var parrs = document.querySelectorAll('.parallax');
  M.Parallax.init(parrs);
});