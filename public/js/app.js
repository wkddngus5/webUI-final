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