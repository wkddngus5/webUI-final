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

QUnit.test("move page", function (assert) {
  //given
  var done = assert.async();
  var indexManager = new IndexManager(indexZone, eventEmitter);

  //when
  setTimeout(function() {
    $(".move-right").trigger("click");
  },100);

  //then
  setTimeout(function() {
    assert.equal(indexManager.nowIndex, 2);
  }, 200);

  //when
  setTimeout(function() {
    $(".move-right-quintuple").trigger("click");
  },300);

  //then
  setTimeout(function() {
    assert.equal(indexManager.nowIndex, 7);
    done();
  }, 400);
});
