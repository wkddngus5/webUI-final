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
