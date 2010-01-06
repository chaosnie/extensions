function DictFold(id){
	if($('dictc_'+id).style.display == 'none'){
		$('dictc_'+id).style.display = ''
	}else{
		$('dictc_'+id).style.display = 'none';
	}
}

function DictHide(id){

	$('dictc_'+id).style.display = 'none';

}
function $(element) {
  return document.getElementById(element);
}