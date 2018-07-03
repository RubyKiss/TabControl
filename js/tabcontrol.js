var tabcontrol=function(ELID,OPTION){
	var EL=$("#"+ELID);
	var menu=EL.find(".menu").eq(0);
	var cont=EL.find(".cont").eq(0);
	var lastindex=0; //focusindex
	
	OPTION=OPTION||[];
	var tabBTN=OPTION.tabBtn||'span'; //JQ选择器(CSS格式)
	var tabcloseBTN=OPTION.closeBtn||'.close'; //JQ选择器(CSS格式)
	var actionClass=OPTION.tabActionclss||'action'; //类名
	var level=OPTION.tablevel||true; //水平滚动/垂直滚动
	var During=OPTION.levelSpeed||0.3; //滚动延迟
	
	menu.find(".tab").eq(0).addClass(actionClass);
	cont.find(".panel").eq(0).show();
	
	//close元素必须是在tab里面的元素
	menu.on('click','.tab > '+tabcloseBTN,function(el){
		var index=$(el.currentTarget).parent().index();
		menu.find(".tab").eq(index).remove();
		cont.find('.panel').eq(index).remove();
		if(index==lastindex) //点击的是之前选中的那个
		{
			if(index==0) //当点击关闭的标签是第一个的时候
			{
				menu.find(".tab").eq(index).find(tabBTN).trigger('click');
			}
			else
			{
				if((index-1)==menu.find(".tab").length-1) //当点击关闭的标签是最后一个并且是选中的那个
				{
					index-=1;
				}
				menu.find(".tab").eq(index).find(tabBTN).trigger('click');
			}
		}else{
			if(index<lastindex)
			{
				lastindex=lastindex-1;
			}
		}
		console.log(lastindex);
	})
	EL.css('overflow','hidden');
	if(level)
	{
		menu.css('white-space','nowrap');
		menu.css('overflow','hidden');
	}
	else
	{
		menu.css('white-space','normal');
		menu.css('overflow','hidden');
	}
	var pos=0;
	menu.on('mousewheel',function(e){
		$(this).find('.tab').css('transition','transform '+During+'s');
		var inpts=e.originalEvent.deltaY;
		console.log(inpts);
		var tab=$(this).find(".tab").eq($(this).find(".tab").length-1);
		var firsttab=$(this).find(".tab").eq(0);
		if(level)
		{
			var Left=firsttab.prop('offsetLeft')+pos;
			var Right=tab.prop('offsetLeft')+tab.prop('clientWidth')+pos;
			var CLW=$(this).prop('clientWidth');
			var LastUpDistance=0;
			var Next=false;
			$(this).find('.tab').each(function(){
				var index_Right=$(this).prop('offsetLeft')+$(this).prop('clientWidth');
				if(index_Right>CLW)
				{
					if(Next==true)
					{
						LastUpDistance=index_Right-CLW;
						return false;
					}
					Next=true;
				}
			});
			if(inpts>0)
			{
				
				if(Right>CLW)
				{
					pos-=LastUpDistance;
				}
			}
			else
			{
				if(Left<0)
				{
					pos+=LastUpDistance;
				}
			}
			$(this).find('.tab').css('transform','translateX('+pos+'px)')
		}
		else
		{
			var Top=firsttab.prop('offsetTop')+pos;
			var H=firsttab.prop('clientHeight');
			var Bottom=tab.prop('offsetTop')+tab.prop('clientHeight')+pos;
			var CLH=$(this).prop('clientHeight');
			if(inpts>0)
			{
				if(Bottom>CLH)
				{
					pos-=H; //以第一个tab为准的高度进行滚动
				}
			}
			else
			{
				if(Top<0)
				{
					pos+=H; //以第一个tab为准的高度进行滚动
				}
			}
			$(this).find('.tab').css('transform','translateY('+pos+'px)')
		}
		e.preventDefault();
	})
	menu.on('click','.tab > '+tabBTN,function(el){
		var index=$(el.currentTarget).parent().index();
		cont.find(".panel").eq(lastindex).hide();
		cont.find(".panel").eq(index).show();
		
		menu.find(".tab").eq(lastindex).removeClass(actionClass);
		$(el.currentTarget).parent().addClass(actionClass);
		
		lastindex=index;
	})
	this.addTab=function(tab,panel)
	{
		tab=tab||[];
		panel=panel||[];
		var tag=tab.tag||"div";
		var tag1=panel.tag||"div";
		
		var attr=tab.attr||[];
		var attr1=panel.attr||[];
		
		var tmp="";
		for(var n in attr)
		{
			tmp+=n+"='"+attr[n]+"'";
		}
		attr=tmp;
		
		tmp="";
		for(var n in attr1)
		{
			tmp+=n+"='"+attr[n]+"'";
		}
		attr1=tmp;
		
		var html=tab.title||"新选项";
		var htmlclose=tab.closetitle||"X";
		var html1=panel.title||"新内容";
		
		var menu_tab="<"+tag+" "+attr+" class='tab'><span>"+html+"</span><i class='close'>"+htmlclose+"</i></"+tag+">";
		var panel_tab="<"+tag1+" "+attr1+" class='panel'>"+html1+"</"+tag1+">";
		
		var $tab=menu.append(menu_tab);
		var $panel=cont.append(panel_tab);
		menu.find('.tab').css('transform','translateX('+pos+'px)'); //执行偏移tab标签
		$tab=$tab.find('.tab').eq($tab.find('.tab').length-1);
		$panel=$panel.find('.panel').eq($panel.find('.panel').length-1);
		return [$tab,$panel];
	}
	this.addTab1=function(tabEL,panelEL)
	{
		menu.append(tabEL);
		cont.append(panelEL);
	}
}


/*
 * 
 * 
 * var tabcontrol=function(ELID,OPTION){
	var EL=$("#"+ELID);
	var menu=EL.find(".menu").eq(0);
	var cont=EL.find(".cont").eq(0);
	var lastindex=0; //focusindex
	
	OPTION=OPTION||[];
	var tabBTN=OPTION.tabBtn||'span'; //JQ选择器(CSS格式)
	var tabcloseBTN=OPTION.closeBtn||'.close'; //JQ选择器(CSS格式)
	var actionClass=OPTION.tabActionclss||'action'; //类名
	
	menu.find(".tab").eq(0).addClass(actionClass);
	cont.find(".panel").eq(0).show();
	
	//close元素必须是在tab里面的元素
	menu.on('click','.tab > '+tabcloseBTN,function(el){
		var index=$(el.currentTarget).parent().index();
		menu.find(".tab").eq(index).remove();
		cont.find('.panel').eq(index).remove();
		if(index==lastindex) //点击的是之前选中的那个
		{
			if(index==0) //当点击关闭的标签是第一个的时候
			{
				menu.find(".tab").eq(index).find(tabBTN).trigger('click');
			}
			else
			{
				if((index-1)==menu.find(".tab").length-1) //当点击关闭的标签是最后一个并且是选中的那个
				{
					index-=1;
				}
				menu.find(".tab").eq(index).find(tabBTN).trigger('click');
			}
		}else{
			if(index<lastindex)
			{
				lastindex=lastindex-1;
			}
		}
		console.log(lastindex);
	})
	menu.on('click','.tab > '+tabBTN,function(el){
		var index=$(el.currentTarget).parent().index();
		cont.find(".panel").eq(lastindex).hide();
		cont.find(".panel").eq(index).show();
		
		menu.find(".tab").eq(lastindex).removeClass(actionClass);
		$(el.currentTarget).parent().addClass(actionClass);
		
		lastindex=index;
	})
	this.addTab=function(tab,panel)
	{
		tab=tab||[];
		panel=panel||[];
		var tag=tab.tag||"div";
		var tag1=panel.tag||"div";
		
		var attr=tab.attr||[];
		var attr1=panel.attr||[];
		
		var tmp="";
		for(var n in attr)
		{
			tmp+=n+"='"+attr[n]+"'";
		}
		attr=tmp;
		
		tmp="";
		for(var n in attr1)
		{
			tmp+=n+"='"+attr[n]+"'";
		}
		attr1=tmp;
		
		var html=tab.title||"新选项";
		var htmlclose=tab.closetitle||"X";
		var html1=panel.title||"新内容";
		
		var menu_tab="<"+tag+" "+attr+" class='tab'><span>"+html+"</span><i class='close'>"+htmlclose+"</i></"+tag+">";
		var panel_tab="<"+tag1+" "+attr1+" class='panel'>"+html1+"</"+tag1+">";
		
		var $tab=menu.append(menu_tab);
		var $panel=cont.append(panel_tab);
		$tab=$tab.find('.tab').eq($tab.find('.tab').length-1);
		$panel=$panel.find('.panel').eq($panel.find('.panel').length-1);
		return [$tab,$panel];
	}
	this.addTab1=function(tabEL,panelEL)
	{
		menu.append(tabEL);
		cont.append(panelEL);
	}
}

 * 
 * 
 */
/*
 * 
 * var tabcontrol=function(ELID,OPTION){
	var EL=$("#"+ELID);
	var menu=EL.find(".menu").eq(0);
	var cont=EL.find(".cont").eq(0);
	var lastindex=0; //focusindex
	menu.find(".tab").eq(0).addClass("action");
	cont.find(".panel").eq(0).show();
	
	var tabBTN=OPTION.tab||'span';
	var tabcloseBTN=OPTION.cls||'.close';
	var actionClass=OPTION.action||'action';
	
	//close元素必须是在tab里面的元素
	menu.on('click','.tab > .close',function(el){
		var index=$(el.currentTarget).parent().index();
		menu.find(".tab").eq(index).remove();
		cont.find('.panel').eq(index).remove();
		if(index==lastindex) //点击的是之前选中的那个
		{
			if(index==0) //当点击关闭的标签是第一个的时候
			{
				menu.find(".tab").eq(index).find('span').trigger('click');
			}
			else
			{
				if((index-1)==menu.find(".tab").length-1) //当点击关闭的标签是最后一个并且是选中的那个
				{
					index-=1;
				}
				menu.find(".tab").eq(index).find('span').trigger('click');
			}
		}else{
			if(index<lastindex)
			{
				lastindex=lastindex-1;
			}
		}
		console.log(lastindex);
	})
	menu.on('click','.tab > span',function(el){
		var index=$(el.currentTarget).parent().index();
		cont.find(".panel").eq(lastindex).hide();
		cont.find(".panel").eq(index).show();
		
		menu.find(".tab").eq(lastindex).removeClass('action');
		$(el.currentTarget).parent().addClass('action');
		
		lastindex=index;
	})
	this.addPanel(tabEL,panelEL)
	{
		menu.append(tabEL);
		cont.append(panelEL);
	}
}

 */