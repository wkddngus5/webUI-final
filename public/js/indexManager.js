/**
 * Created by Naver on 2017. 5. 31..
 */
function IndexManager( indexZone, ee ) {
  this.indexZone = indexZone;
  this.indexTemplate = Handlebars.compile($("#index-template").html());
  this.init.call(this);
  this.HOW_MANY_IN_A_PAGE = 3;    //페이지당 todo개수
  this.HOW_MANY_IN_ARRANGE = 5;   //최대 보여줄 수 있는 index
  this.FIX_VALUE_FOR_REMAINDER = 0.1;   //page move 계산할 때 필요한 값
  this.QUINTUPLE = 5;   //'<<'나 '>>'는 5페이지씩 이동
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
  //현재 index가 [1, 2, 3, 4, 5]중 하나면 startIndex는 1. [6, 7, 8, 9, 10]중 하나면 2...
  this.startIndex = this.calcStartIndex(this.nowIndex);
  //todo개수가 [1, 2, 3]중 하나면 todoIndexMax는 1. [4, 5, 6]중 하나면 2...
  this.todoIndexMax = this.calcTodoIndexMax(this.todoCount);

  var index = [];
  //startIndex ~ (todoIndexMax || startIndex + 4)까지 보여주기
  for (var i = this.startIndex;
       (i <= this.todoIndexMax) && (i < this.startIndex + 5); i++) {
    index.push({number: i});
  }

  var indexElements = $(this.indexTemplate({
    "index": index
  }));
  this.indexZone.empty();
  this.indexZone.append( indexElements );
  //1 페이지면 '<', '<<' disabled
  if (this.nowIndex == 1) {
    $( ".move-left" ).addClass( "disabled" );
    $( ".move-left-quintuple" ).addClass("disabled");
  }

  //끝 페이지면 '>', '>>' disabled
  if (this.nowIndex == this.todoIndexMax) {
    $( ".move-right" ).addClass( "disabled" );
    $( ".move-right-quintuple" ).addClass( "disabled" );
  }

  //현재 페이지 marking
  this.markSelected.call( this );
}

IndexManager.prototype.movePage = function ( e ) {
  console.log("CLICKED! DISABLE?", $( e.target ).hasClass( "disabled" ));
  if ( $( e.target ).hasClass( "disabled" )) {
    e.preventDefault();

    //mdl이 자기 마음대로 background를 바꿔서 불가피하게 사용
    $( e.target ).css( "background-color", "white" );
    return;
  }

  if ( $( e.target ).hasClass( "index-number" )) {
    // 숫자 누르면 그 페이지로 이동
    this.nowIndex = parseInt($(e.target).prop( "id" ));
  } else if ( $( e.target ).hasClass( "move-left" ) ) {
    //'<'는 이전페이지로
    this.nowIndex--;
  } else if ( $( e.target ).hasClass( "move-right" ) ) {
    //'>'는 다음페이지로
    this.nowIndex++;
  } else if ( $( e.target ).hasClass( "move-left-quintuple" ) ) {
    //'<<'는 5 페이지 이전으로. 현재 6 페이지 이전이라면 1 페이지로
    this.nowIndex = this.nowIndex > this.QUINTUPLE ? this.nowIndex - this.QUINTUPLE : 1;
  } else if ( $( e.target ).hasClass( "move-right-quintuple" ) ) {
    //'>>'는 5 페이지 다음으로. 현재 끝 페이지 - 5 보다 큰 상태라면 끝 페이지로
    this.nowIndex = this.nowIndex <= this.todoIndexMax - this.QUINTUPLE ?
      this.nowIndex + this.QUINTUPLE : this.todoIndexMax;
  }
  //todo 그려주고
  this.ee.emit( "move", {
    index: this.nowIndex,
    max: this.todoIndexMax
  } );
  //index도 만들어준다
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
