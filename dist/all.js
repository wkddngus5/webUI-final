/**
 * Created by Naver on 2017. 5. 30..
 */

$(document).ready(function() {
  init();
});

var indexZone = $("#index-zone");

var todoZone = $("#todo-zone");


var init = function() {
  indexManager = new IndexManager(indexZone);
  todoManager = new TodoManager(todoZone);
}
/**
 * Created by Naver on 2017. 5. 31..
 */
function IndexManager(indexZone) {
  this.indexZone = indexZone;
  this.indexTemplate = Handlebars.compile($("#index-template").html());
  this.init.bind(this)();
}

IndexManager.prototype.init = function () {
  $.ajax("http://128.199.76.9:8002/wkddngus5/todo/count", {
    "type": "get"
  }).done(makeIndex.bind(this));
}

function makeIndex(data, status) {
  var todoCount = data.cnt;
  var todoIndex = (todoCount - (todoCount % 3)) / 3 + 1;
  var index = [];
  for (var i = 1; i <= todoIndex; i++) {
    index.push(JSON.parse('{"number": "' + i + '"}'));
  }
  console.log(index);
  console.log(this);

  var indexElements = $(this.indexTemplate({
    "index": index
  }));

  this.indexZone.append(indexElements);
}



/**
 * Created by Naver on 2017. 5. 31..
 */
function TodoManager(todoZone) {
  this.todoZone = todoZone;
  this.todoTemplate = Handlebars.compile($("#todo-template").html());
  this.init.bind(this);
  console.log('TTTTTOOOOOOOOOOOODDDDDDDOOOOOOO');
}

IndexManager.prototype.init = function () {
  var index = 0;
  $.ajax("http://128.199.76.9:8002/wkddngus5/todo/page?start=" + index + "&limit=3", {
    "type": "get"
  }).done(makeTodos.bind(this));
}

function makeTodos(todos, status) {
  console.log(todos);
  console.log(this);

  var todoElements = $(this.indexTemplate({
    "todoElement": todos
  }));

  this.todoZone.append(indexElements);
}


