

$(function() {


    $("#txtCurrency").keyup(function () {
        var txtCurrency = $('#txtCurrency').val();
  
        if(txtCurrency != '') {
            $.ajax( {
                url: 'https://api.coincap.io/v2/assets',
                method: 'get',
                data: {search: txtCurrency},
                dataType: 'json',
                success: function (data) {
                    var tableHeader = '<h2 class="text-primary">Risultato trovato:</h2><table border="0" class="table table-sm table-striped table-bordered table-hover"><thead><tr><th class="d-none">#</th><th>Name</th><th>Symbol</th><th>Adicionare</th></tr></thead><tbody id="tableResult">';

                    for (i in data.data)
                    {                       
                        var tableBody ='<tr><td class="d-none">'+ i +'</td><td>' + data.data[i].id + '</td><td>' + data.data[i].symbol + '</td><td class="text-center"><input type="checkbox" id="ckbox_'+ data.data[i].symbol + '" value="'+ i +'" /></td></tr>'  
                        document.getElementById("show_criptoCurrency").innerHTML = tableHeader += tableBody;  
                        
                      // console.log('i=', i, 'rank ', rank, 'symbol',  symbol, 'name', name, 'price', price, 'market', market, 'price', 'price24h', price24h);   
                    }  
                    document.getElementById("show_criptoCurrency").innerHTML += '</tbody></table>';       
                    var ckbox = document.getElementById('tableResult');
                    
                    ckbox.addEventListener('click', function(e) {               
                        var idCampo = $(e.target).attr('id');          
                        var p =  document.getElementById(idCampo).value;
                        var str = idCampo;
                        var textoReplace = "ckbox_";
                        var new_id = idCampo.substring(idCampo.indexOf(textoReplace) + textoReplace.length); 

                        if(document.getElementById(idCampo).checked) 
                        {    
                            if(document.getElementById(new_id) != null){
                                alert('La criptovaluta '+ new_id +' è già stata aggiunta!');                                
                            }
                            else
                            {

                               
                                console.log('Criptovaluta '+ new_id +' AGGIUNTA!');                                
                                var corpo_tabela = document.querySelector("#tbLiveCurr");                
                                var template = document.querySelector("#template1");

                              
                                //<button onclick="deleteRow("tbLiveCurr", "ATOM")">Cancellare</button>
                                var btn = '<button onclick="';
                                btn += 'deleteRow("';
                                btn += 'tbLiveCurr';
                                btn += '", "';
                                btn += new_id;
                                btn += '")">Cancellare</button>';            
                               // console.log(btn);

                                lista_td = template.content.querySelectorAll("td");
                                lista_td[0].textContent = data.data[p].rank;
                                lista_td[1].textContent = data.data[p].symbol;
                                lista_td[2].textContent = data.data[p].id;
                                lista_td[3].textContent = data.data[p].priceUsd;;
                                lista_td[4].textContent = data.data[p].marketCapUsd;                                                                                                                                     
                                lista_td[5].textContent = data.data[p].vwap24Hr;
                             

                                //lista_td[7].innerHTML = '<button onclick='deleteRow("tbLiveCurr", '+new_id.toUpperCase()+')'>Cancellare</button>';
                                //lista_td[7].innerHTML = btn;
                                var nova_linha = document.importNode(template.content, true);
                                corpo_tabela.appendChild(nova_linha);
                                document.getElementById('linha').id = new_id;      

                            }  
  

                        }
                        // delete row                        
                        else if($(idCampo).prop('disable', false)) {
                            console.log('Criptovaluta '+ new_id +' CANCELLATO ');
                            var rowparent = document.getElementById("tbLiveCurr");
                            var rowchild = document.getElementById(new_id);
                            console.log(rowparent, rowchild);
                            var d = rowparent.removeChild(rowchild);                        
                        }
                        





                    });
                }
            });
        }
    });


        
});

var thIndex = 0,
    curThIndex = null;

$(function(){
  $('#tblLiveCurr #theadLiveCurr tr th').click(function(){
    thIndex = $(this).index();
    if(thIndex != curThIndex){
      curThIndex = thIndex;
      sorting = [];
      tbodyHtml = null;
      $('#tblLiveCurr #tbLiveCurr tr').each(function(){
        sorting.push($(this).children('td').eq(curThIndex).html() + ', ' + $(this).index());
      });
      
      sorting = sorting.sort();
      sortIt();
    }
  });
})

function sortIt(){
  for(var sortingIndex = 0; sortingIndex < sorting.length; sortingIndex++){
  	rowId = parseInt(sorting[sortingIndex].split(', ')[1]);
  	tbodyHtml = tbodyHtml + $('#tblLiveCurr #tbLiveCurr tr').eq(rowId)[0].outerHTML;
  }
  $('#tblLiveCurr #tbLiveCurr').html(tbodyHtml);
}


