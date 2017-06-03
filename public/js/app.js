/**
 * Created by Naver on 2017. 5. 30..
 */

$( document ).ready( function() {
  init();
} );

var indexZone = $( "#index-zone" );
var todoZone = $( "#todo-zone" );
var eventEmitter = new EventEmitter();

var init = function() {
  indexManager = new IndexManager( indexZone, eventEmitter );
  todoManager = new TodoManager( todoZone, eventEmitter );
}
