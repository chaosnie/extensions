var Menu={
	
	q: null,
	
	data: null,
	
	depth: 4,
	
	init: function(){
		Menu.build();
		
		Menu.loadXML("http://m.weather.com.cn/data5/city.xml");
		
	},
	
	loadXML: function(url,level){
		
		var l=0;
		
		if(level){
			l=level;
		}
		
		Menu.q=new $G.Q(url,"GET");
		
		Menu.q.level=l;
		
		Menu.q.parse(Menu.loadS,Menu.loadF);
	},
	
	loadS: function(){
		
		Menu.data=Menu.q.$().split(",");
		
		var cities=new Array();
		
		for(var i=0;i <Menu.data.length;i++){
			cities.push({id:Menu.data[i].split("|")[0],name:Menu.data[i].split("|")[1]});
		}
 
		while(Menu.groups[Menu.q.level].firstChild){
			Menu.groups[Menu.q.level].removeChild(Menu.groups[Menu.q.level].firstChild);
		}
		
		for(var i=0;i<cities.length;i++){
			
			var node=new $E("option",{value:cities[i].id});
			node.appendChild(cities[i].name);
			
			node.insertTo(Menu.groups[Menu.q.level]);
		}
		
		if(Menu.q.level<Menu.depth-1){
			Menu.loadXML("http://m.weather.com.cn/data5/city"+cities[0].id+".xml",Menu.q.level+1);
		}
		
	},
	
	loadF: function(){
		window.msg("load error");
	},
	
	regAction: function(node,level){
		
		
		node.onchange=function(){
			
			var value="http://m.weather.com.cn/data5/city"+node.value+".xml";
			
			Menu.loadXML(value,level+1);
			
		}
		
	},
	
	groups: new Array(),
	
	build: function(){
		
		for(var i=0;i<Menu.depth;i++){
			
			var flag=document.createElement("select");
			
			flag.id="city"+(i+1);
			flag.name="city"+(i+1);
			Menu.regAction(flag,i);
			
			Menu.groups.push(flag);
			
			flag.style.width="80px";
			$("city").appendChild(flag);
		}
		
		Menu.groups[Menu.depth-1].style.display="none";
		
	}
	
}
 
window.LOAD=window.LOAD?window.LOAD:new Array();
 
window.LOAD.push(Menu.init);