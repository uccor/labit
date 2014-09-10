function validateForm(){
	var x=document.forms["login"]["username"].value;
	if (x==null || x==""){
		return false;
	}
}