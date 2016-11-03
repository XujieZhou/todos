$(function(){
	var ra=$(".yuan");
	var input=$("input");
	var ul=$("ul");
	var todos=[];
	var li=$("li");
	var startpos;
	ul.on("touchstart","li",function(e){
		startpos=e.originalEvent.changedTouches[0].clientX;
	})
	ul.on("touchend","li",function(e){
		var endpos=e.originalEvent.changedTouches[0].clientX;
		if(endpos-startpos>50){
			todos[$(this).index()].state=1;
			$(this).addClass("done");
		}
		if(endpos-startpos<-50){
			todos[$(this).index()].state=0;
			$(this).removeClass("done");
		}
		localStorage.todos=JSON.stringify(todos);
	})
	if(localStorage.todos){
		todos=JSON.parse(localStorage.todos);
		render();
	}
	ra.on("touchend",function(){
		var v=$.trim(input.val());
		if(!v){
			return;
		}
		var todo={
			name:v,
			state:0
		}
		todos.push(todo);
		localStorage.todos=JSON.stringify(todos);
		render();
		input.val("");
	})
	ul.on("touchend",".delete",function(){
		todos=JSON.parse(localStorage.todos);
		var aa=$(this).closest('li');
		var index=aa.index();
		todos.splice(index,1);
		localStorage.todos=JSON.stringify(todos);
		aa.addClass('ani-delete');
		aa.delay(800).queue(function(){
			$(this).remove().dequeue();
		})
	})
	ul.on("touchend","li",function  (e) {
		var end=e.originalEvent.changedTouches[0].clientX;
		if(end-startpos>50){
			var aa=$(this).closest('li');
			var index=aa.index();
			todos.splice(index,1);
			localStorage.todos=JSON.stringify(todos);
			aa.addClass('ani-delete');
			aa.delay(800).queue(function(){
				$(this).remove().dequeue();
		})
		}
	})
	ul.on("touchstart","li",function  (e) {
		start=e.originalEvent.changedTouches[0].clientX;
	})
	
	
function render(){
	ul.empty();
	for(var i=0;i<todos.length;i++){
		var c=(todos[i].state)?'done':'';
		$("<li class='done'><div class='content'>"+todos[i].name+"</div><div class='small'></div><div class='delete'>－</div></li>").appendTo(ul);
	}
}

	
	
	
	
	
	
})
