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


