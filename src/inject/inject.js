function stringToNumber(string) {
	var saldo = string.innerText
	.replace(/[^\d,]/g, '')
	.replace(',', '.');

	return parseFloat(saldo);
}

function numberToString(number) {
	var total = number.toFixed(2).replace('.', ',');
  total = total.slice(0,1) + '.' + total.slice(1);

  return total;
}

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			function trocaDeValores() {
			  if(status == 'saldo'){
			    status = 'total';
			    return saldoElement.innerHTML = '<i>R$</i> ' + numberToString(saldo);
			  }

			  status = 'saldo';
			  saldoElement.innerHTML = '<i>R$</i> ' + total;
			}

			var status = 'total';
			var saldoElement = document.querySelector('.info-text big');
			var saldo = stringToNumber(saldoElement);

			var faturaElement = document.querySelector('.card p strong');
			fatura = stringToNumber(faturaElement);

			var total = (saldo - fatura).toFixed(2).replace('.', ',');
			total = total.slice(0,1) + '.' + total.slice(1);


			var container = document.querySelector('.hide-saving-accounts');
			var label = document.createElement('label');
			var input = document.createElement('input');
			var i = document.createElement('i');
			var span = document.createElement('span');

			span.innerText = 'Descontar fatura do cartão';
			i.classList.add('icon', 'i16', 'icon-12');

			input.type = 'checkbox';
			input.checked = false;
			input.classList.add('castor');

			label.style.marginTop = '10px';
			label.appendChild(input, i, span);
			label.appendChild(i);
			label.appendChild(span);

			container.appendChild(label);
			document.querySelector('#box-balance').style.height = '295px';

			var descontar = document.querySelector('.castor');
			descontar.addEventListener('change', trocaDeValores);
		}
	}, 10);
});
