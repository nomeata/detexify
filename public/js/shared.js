function populateSymbolList(symbols) {
  $('#symbols').empty();
  jQuery.each(symbols, function() {
    var symbol;
    if (this.symbol) {
      symbol = this.symbol;
    } else {
      symbol = this;
    }
    var hex = symbol.codepoint.toString(16).toUpperCase();
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
    info += '<code class="name">U+'+hex+': '+symbol.name+'</code>';
    info += '<br/>';
    info += '<span class="copyhere">Copy here: &#'+symbol.codepoint+';</span>';
    info += ' ∙ <a href="http://www.fileformat.info/info/unicode/char/'+hex+'/index.html" class="fileformat">More Information</a>';
    // info += ' ∙ <a href="http://decodeunicode.org/u+'+symbol.codepoint+'" class="decodeunicode">decodeunicode.org</a>';
    if (symbol.samples != undefined) {
      info += ' ∙ <span class="samples">Samples: <span class="number">'+symbol.samples+'</span></span><br>';
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
