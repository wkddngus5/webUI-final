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
