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
  this.init.call(this);
  this.HOW_MANY_IN_A_PAGE = 3;
  this.HOW_MANY_IN_ARRANGE = 5;
}

IndexManager.prototype.init = function () {
  $.ajax("http://128.199.76.9:8002/wkddngus5/todo/count", {
    "type": "get"
  }).done(function(data, status) {
    this.todoCount = data.cnt;
    this.makeIndex.call(this, 1);
  }.bind(this));
}

IndexManager.prototype.makeIndex = function(arrange) {
  var todoIndex = (this.todoCount - (this.todoCount % this.HOW_MANY_IN_A_PAGE))
    / this.HOW_MANY_IN_A_PAGE + 1;
  var index = [];
  for (var i = (arrange - 1) * this.HOW_MANY_IN_ARRANGE + 1;
       (i <= todoIndex) && (i <= arrange * this.HOW_MANY_IN_ARRANGE); i++) {
      index.push({number: i});
  }
  console.log(index);
  console.log(this);

  var indexElements = $(this.indexTemplate({
    "index": index
  }));

  this.indexZone.append(indexElements);
}

// /**
//  * Created by Naver on 2017. 5. 31..
//  */
function TodoManager(todoZone) {
  this.todoZone = todoZone;
  this.todoTemplate = Handlebars.compile($("#todo-template").html());
  this.init.call(this, 0);
}

TodoManager.prototype.init = function(index) {
  $.ajax("http://128.199.76.9:8002/wkddngus5/todo/page?start=" + index + "&limit=3", {
    "type": "get"
  }).done(function(data, status) {
    this.makeTodos.call(this, data);
  }.bind(this));
}

TodoManager.prototype.makeTodos = function(todos, status) {
  console.log(todos);
  console.log(this);

  var todoElements = $(this.todoTemplate({
    "todoElement": todos
  }));

  this.todoZone.append(todoElements);
}
