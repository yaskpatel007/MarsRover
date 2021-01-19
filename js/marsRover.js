
var maxX;
var maxY;
var cellX;
var cellY;
var x;
var y;
var str;
var direction;
var degree;
var target;
var index;
/*
Initialize 5 * 5 Grid View
*/
function initializeGridView()
{
	var $table = $('<table/>');
	for(var i=1;i<=cellY;i++)
	{
		var $tr=$('<tr/>');
		for(var j=1;j<=cellX;j++)
		{	
			var $wrap = $('<div/>');
			$wrap.attr('id',i.toString()+j.toString());
			$wrap.attr('class',"marsBox");
			var $td=$('<td/>');
			$td.append($wrap);
			$tr.append($td);
		}
		$table.prepend($tr);
	}
	$('#content').append($table);
}

/*Valiadte the input value inserted */
function validateInput()
{
    var temp=$('#direction').val().toUpperCase();
	
	if(temp.length==1)
    {
        if(temp=='N'||temp=='S'||temp=='E'||temp=='W')
        {
			str='';
            str=$('#command').val().toUpperCase();
            var bool=true;
            for(var i=0;i<str.length;i++)
            {
                    if(str[i]!='L' && str[i]!='R' && str[i]!='M')
                    bool=false;
            }
            return bool;           
        }
        else return false;        
    }
    else return false;
}

function detectLeftdirection()
{
	switch(direction)
	{
		case 'N': direction='W'; break;
		case 'W': direction='S'; break;
		case 'S': direction='E'; break;
		case 'E': direction='N'; break;
	}
	$('#curdir').val(direction);
}
function detectRightdirection()
{
	switch(direction)
	{
		case 'N': direction='E'; break;
		case 'E': direction='S'; break;
		case 'S': direction='W'; break;
		case 'W': direction='N'; break;
	}
	$('#curdir').val(direction);
}

function moveForward()
{
var flag=true;
	$('#'+y.toString()+x.toString()).attr('class','moveF');
	$('#'+y.toString()+x.toString()).html('');
	switch(direction)
	{
		case 'N': y++; y>cellY?flag=false:flag; break;
		case 'S': y--; y<=0?flag=false:flag; break;
		case 'E': x++; x>cellX?flag=false:flag;break;
		case 'W': x--; x<=0?flag=false:flag;break;
	}
	if(flag)
	{
		showError("Moving Forward",false);
		$('#'+y.toString()+x.toString()).html('<img src="img/arrow.png" id="img"/>');		
		$('#img').css({
		'-webkit-transform': 'rotate('+degree+'deg)',
		'-moz-transform': 'rotate('+degree+'deg)',
		'-ms-transform': 'rotate('+degree+'deg)',
		'-o-transform': 'rotate('+degree+'deg)',
		'transform': 'rotate('+degree+'deg)'
				});
		
		}
	else
      	    showError("Cannot move out of Grid",true);
return flag;  
}   
function startMovement()
{
    var success=true;
	var len=str.length;
	index=0;
	moved=function()
	{
		switch(str[index])
	   {
	        case 'L':
				target-=90;
				showError("Moving Left",false);
				moveLeft();
				detectLeftdirection();
                                setTimeout(function(){index++;check();},2000);
			 	break;
			case 'R':
				target+=90;
				showError("Moving Right",false);
				moveRight();
				detectRightdirection();
                                setTimeout(function(){index++;check();},2000);
			 	break;
			case 'M':
				if(!moveForward())
				{
					index=len;
					success=false;
				}
                                setTimeout(function(){index++;check();},1200);
			 	break;
		}
		function check()
		{
		    index<len?moved():(success==true?showError("Completed",false):$('#notify').append("<b> -- Terminated </b>"));
		}
		
	};
	moved();
}		


function initiatePosition()
{
    showError("Initiate Position",false);
	direction='';
	direction=$('#direction').val().toUpperCase();
	$('#'+y.toString()+x.toString()).html('<img src="img/arrow.png" id="img"/>');
	switch(direction)
	{
		case 'N': 
		     degree=0;
			 startMovement();
			 break;
		case 'E':
		     degree=0;
			 target=degree+90;
			 moveRight();
			 setTimeout(function(){startMovement();},1800);
			 break;
	    	case 'W':
		     degree=0;
			 target=degree-90;
			 moveLeft();
			 setTimeout(function(){startMovement();},1800);
			 break;
		 case 'S':
		     degree=0;
			 target=degree-180;
			 moveLeft();
			 setTimeout(function(){startMovement();},4000);
			 break;	 
	}
	
}
function moveRight()
{
    if(degree==360) {degree=0;
    target=degree+90;
}
    move=function(){
                  degree+=10;
    $('#img').css({
		'-webkit-transform': 'rotate('+degree+'deg)',
		'-moz-transform': 'rotate('+degree+'deg)',
		'-ms-transform': 'rotate('+degree+'deg)',
		'-o-transform': 'rotate('+degree+'deg)',
		'transform': 'rotate('+degree+'deg)'
				});
    if(degree<target) setTimeout(move,100);
	    
		};
move();
}

function moveLeft()
{
    if(degree==-360) 
    {		
	degree=0;
    	target=degree-90;
    }
    move=function()
	{
        degree-=10;
    	$('#img').css({
			'-webkit-transform': 'rotate('+degree+'deg)',
			'-moz-transform': 'rotate('+degree+'deg)',
			'-ms-transform': 'rotate('+degree+'deg)',
			'-o-transform': 'rotate('+degree+'deg)',
			'transform': 'rotate('+degree+'deg)'
		});
              
	
    	if(degree>target) setTimeout(move,100);
		
    };
move();

}

function clearInput()
{
  $('#x').val('');
  $('#y').val('');
  $('#command').val('');
  $('#direction').val('');
  $('#x').prop('disabled', false); 
  $('#y').prop('disabled', false); 
  $('#command').prop('disabled', false);
  $('#direction').prop('disabled', false); 
  $('#start').prop('disabled', false);
  $('#notify').hide();
  $('#notify').html("");
  $('#content').html("");
  str='';
  
}


function showError(msg,terminate)
{
        if(terminate)
        {
             $('#notify').toggleClass("alert-info",false);
             $('#notify').toggleClass("alert-error",true);
             $('#notify').show();
	     $('#notify').html("<b>"+msg+"</b>");
        }
        else
        {
             $('#notify').toggleClass("alert-error",false);
             $('#notify').toggleClass("alert-info",true);
	     $('#notify').show();
	     $('#notify').html("<b>"+msg+"</b>");
        }
}
$(function()
{
$('#construct').click(function()
{
    if($.isNumeric($('#cellX').val()) && $.isNumeric($('#cellY').val()))
    {
		cellX=0;
        cellY=0;
        cellX=parseInt($('#cellX').val());
        cellY=parseInt($('#cellY').val());
        if((cellX<0 ||cellX>maxX)||(cellY<0 || cellY>maxY)) alert("Input Out of Bound. ");
        else
        {
			$('#cellX').prop('disabled', true); 
            $('#cellY').prop('disabled', true);
            $('#construct').prop('disabled', true);
	    $('#input').show();
	    initializeGridView();
	    $('#notify').hide();
	    $('#notify').html("");
	    }
    }
    else alert("Non-Numeric Input Not Allowed. ");

 });
 
 $('#gridReset').click(function(){gridReset()});

function gridReset()
 {
    maxX=10;
    maxY=10;
    cellX=0;
    cellY=0;
    x=0;
    y=0;
    str='';
    direction='';
    degree=0;
    target=0;
    index=0;
    $('#cellX').val('');
    $('#cellY').val('');
    $('#cellX').prop('disabled', false); 
    $('#cellY').prop('disabled', false); 
    $('#construct').prop('disabled', false);
    $('#input').hide();
    $('#notify').hide();
    $('#notify').html("");
    $('#content').html("");
    clearInput();                     
  }	

$( document ).ready(function() {
gridReset()});
			   
$('#start').click(function()
{
    if($.isNumeric($('#x').val()) && $.isNumeric($('#y').val()) && validateInput())
    {
		x=0;
        y=0;
        x=parseInt($('#x').val());
        y=parseInt($('#y').val());
		if((x<0 ||x>cellX)||(y<0 || y>cellY)) alert("Input Out of Bound.");
        else
        {
            $('#x').prop('disabled', true); 
            $('#y').prop('disabled', true);
	    	$('#start').prop('disabled', true);
            $('#direction').prop('disabled', true); 
            $('#command').prop('disabled', true);
            initiatePosition();
        }
    }
    else alert("Invalid Input ");                       
});

$('#reset').click(function(){clearInput();initializeGridView();});
});

