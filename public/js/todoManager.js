/**
 * Created by Naver on 2017. 5. 31..
 */
function TodoManager(todoZone) {
  this.todoZone = todoZone;
  this.todoTemplate = Handlebars.compile($("#todo-template").html());
  this.init.bind(this)(1);
  console.log('TTTTTOOOOOOOOOOOODDDDDDDOOOOOOO');
}

IndexManager.prototype.init = function (index) {
  index = 0;
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


