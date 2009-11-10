function populateSymbolList(symbols) {
  $('#symbols').empty();
  jQuery.each(symbols, function() {
    var symbol;
    if (this.symbol) {
      symbol = this.symbol;
    } else {
      symbol = this;
    }
    var info = '';
    if (this.score) {
      info += '<span class="score">Score: '+this.score+'</span><br>';
    }
    if (symbol.block) {
      info += '<code class="block">Block "'+symbol.block+'"</code><br>';
    }
    if (symbol.fontenc) {
      info += '<code class="fontenc">\\usepackage['+symbol.fontenc+']{fontenc}</code><br>';
    }
    info += '<code class="name">'+symbol.codepoint.toString(16)+': '+symbol.name+'</code>';
    if (symbol.samples != undefined) {
      info += '<br><span class="samples">Samples: <span class="number">'+symbol.samples+'</span></span><br>';
    }
    $('#symbols').append(
      '<li id="'+symbol.id+'"><div class="symbolsentry"><div class="symbol"><!-- <img alt="symbol:'+symbol.id+'">-->&#'+symbol.codepoint+';</div>'+
      '<div class="info">'+info+'</div></div></li>'
      );
  });
}

// Train the symbol in canvas to id and call callback on return
function train(id, canvas, callback) {
  $.post("/train", { "id": id, "newtex": true, "strokes": JSON.stringify(canvas.strokes) }, callback, 'json');
}
