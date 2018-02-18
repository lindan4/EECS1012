
function interchangeColors()
{
  var paragraphFour = document.getElementById("fourth").style;

  if ((paragraphFour.color == 'black') && (paragraphFour.backgroundColor == 'white'))
  {
    paragraphFour.color = 'white';
    paragraphFour.backgroundColor = 'black';
  }
  else
  {
    paragraphFour.color = 'black';
    paragraphFour.backgroundColor = 'white';
  }
}

function setChange()
{
  interchangeColors();
  window.setInterval(interchangeColors, 30 * 1000);
}

window.onload = setChange;
