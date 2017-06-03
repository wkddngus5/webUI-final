/**
 * Created by Naver on 2017. 5. 30..
 */
var eventEmitter = new EventEmitter();
var indexZone = $( "#index-zone" );
var todoZone = $( "#todo-zone" );

QUnit.test("indexManager init test", function (assert) {
  //given
  var done = assert.async();

  //when
  var indexManager = new IndexManager(indexZone, eventEmitter);

  //then
  setTimeout(function() {
    if(indexManager.todoCount > 12) {
      assert.equal($(".index-number").length, 5);
    } else {
      assert.equal($(".index-number").length, (parseInt((indexManager.todoCount - 0.1)/3) + 1));
    }

    assert.ok($(".move-left").hasClass("disabled"));
    assert.ok($(".move-left-quintuple").hasClass("disabled"));
    assert.ok($("#1").hasClass("selected"));
    done();
  }, 100);
});

QUnit.test("todoManager init test", function (assert) {
  //given
  var done = assert.async();

  //when
  var todoManager = new TodoManager(todoZone, eventEmitter);

  //then
  setTimeout(function() {
    assert.ok($(".todo").length <= 3);
    done();
  }, 100);
});



/*

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
*/