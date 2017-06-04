// /**
//  * Created by Naver on 2017. 5. 31..
//  */
function TodoManager(todoZone, ee) {
  this.todoZone = todoZone;
  this.todoTemplate = Handlebars.compile($("#todo-template").html());
  this.init.call(this, 1);
  this.ee = ee;
  this.indexCache = [];

  this.ee.addListener("move", this.print.bind(this));
}

TodoManager.prototype.init = function(index) {
  console.log('INDEX: ', index);
  this.index = index;
  $.ajax("http://128.199.76.9:8002/wkddngus5/todo/page?start=" + (index - 1) * 3 + "&limit=3", {
    "type": "get"
  }).done(function(data, status) {
    this.makeTodos.call(this, data);
    //캐싱
    this.indexCache.push({
      index : this.index,
      data : data
    });
  }.bind(this));
}

TodoManager.prototype.makeTodos = function(todos, status) {
  this.todoElements = $(this.todoTemplate({
    "todoElement": todos
  }));
  this.todoZone.empty();
  this.todoZone.append(this.todoElements);
}

TodoManager.prototype.print = function(data) {
  //ajax호출(init())전에 캐싱된 todo data가 있으면 이 정보를 사용
  for (var i = 0 ; i < this.indexCache.length ; i++) {
    if(this.indexCache[i].index == data.index) {
      this.makeTodos.call(this, this.indexCache[i].data);
      return;
    }
  };
  this.init.call(this, data.index);
}