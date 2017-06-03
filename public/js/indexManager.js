/**
 * Created by Naver on 2017. 5. 31..
 */
function IndexManager( indexZone, ee ) {
  this.indexZone = indexZone;
  this.indexTemplate = Handlebars.compile($("#index-template").html());
  this.init.call(this);
  this.HOW_MANY_IN_A_PAGE = 3;
  this.HOW_MANY_IN_ARRANGE = 5;
  this.FIX_VALUE_FOR_REMAINDER = 0.1;
  this.QUINTUPLE = 5;
  this.ee = ee;
}

IndexManager.prototype.init = function () {
  $.ajax("http://128.199.76.9:8002/wkddngus5/todo/count", {
    "type": "get"
  }).done(function (data, status) {
    this.todoCount = data.cnt;
    this.nowIndex = 1;
    this.makeIndex.bind(this)();
  }.bind(this));

  this.indexZone.on("click", this.movePage.bind(this));
}

IndexManager.prototype.makeIndex = function () {
  this.startIndex = this.calcStartIndex(this.nowIndex);
  this.todoIndexMax = this.calcTodoIndexMax(this.todoCount);

  var index = [];
  for (var i = this.startIndex;
       (i <= this.todoIndexMax) && (i < this.startIndex + 5); i++) {
    index.push({number: i});
  }

  var indexElements = $(this.indexTemplate({
    "index": index
  }));
  this.indexZone.empty();
  this.indexZone.append( indexElements );
  if (this.nowIndex == 1) {
    $( ".move-left" ).addClass( "disabled" );
    $( ".move-left-quintuple" ).addClass("disabled");
  }

  if (this.nowIndex == this.todoIndexMax) {
    $( ".move-right" ).addClass( "disabled" );
    $( ".move-right-quintuple" ).addClass( "disabled" );
  }
  this.markSelected.call( this );
}

IndexManager.prototype.movePage = function ( e ) {
  console.log("CLICKED! DISABLE?", $( e.target ).hasClass( "disabled" ));
  if ( $( e.target ).hasClass( "disabled" )) {
    e.preventDefault();
    $( e.target ).css( "background-color", "white" ); //mdl이 자기 마음대로 background를 바꿔서 불가피하게 사용
    return;
  }
  if ( $( e.target ).hasClass( "index-number" )) {
    this.nowIndex = parseInt($(e.target).prop( "id" ));
  } else if ( $( e.target ).hasClass( "move-left" ) ) {
    this.nowIndex--;
  } else if ( $( e.target ).hasClass( "move-right" ) ) {
    this.nowIndex++;
  } else if ( $( e.target ).hasClass( "move-left-quintuple" ) ) {
    this.nowIndex = this.nowIndex > this.QUINTUPLE ? this.nowIndex - this.QUINTUPLE : 1;
  } else if ( $( e.target ).hasClass( "move-right-quintuple" ) ) {
    this.nowIndex = this.nowIndex <= this.todoIndexMax - this.QUINTUPLE ?
      this.nowIndex + this.QUINTUPLE : this.todoIndexMax;
  }
  this.ee.emit( "move", {
    index: this.nowIndex,
    max: this.todoIndexMax
  } );
  this.makeIndex();
}

IndexManager.prototype.calcStartIndex = function ( num ) {
  return parseInt( ( num - this.FIX_VALUE_FOR_REMAINDER )
      / this.HOW_MANY_IN_ARRANGE ) * this.HOW_MANY_IN_ARRANGE + 1;
}

IndexManager.prototype.calcTodoIndexMax = function ( num ) {
  return parseInt( ( num - this.FIX_VALUE_FOR_REMAINDER ) / this.HOW_MANY_IN_A_PAGE ) + 1;
}

IndexManager.prototype.markSelected = function () {
  $( "index-number" ).removeClass( "selected" );
  $( "#" + this.nowIndex ).addClass( "selected" );
}
