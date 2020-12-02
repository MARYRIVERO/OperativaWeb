export const onlyNumbers= (e)=> {
    let key = window.event ? e.which : e.keyCode;
        if (key < 48 || key > 57) {
            e.preventDefault();
        }
}

export const onlyLetters = (e) => {
    var regex = new RegExp("^[a-zA-Z ]+$");
    var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (!regex.test(key)) {
        e.preventDefault();
        return false;
    }
}

export const onlyAlphaNumeric = (e) => {
    var allowedCode = [8, 13, 32, 44, 45, 46, 95];
			var charCode = (e.charCode) ? e.charCode : ((e.keyCode) ? e.keyCode :
				  ((e.which) ? e.which : 0));
			 if (charCode > 31 && (charCode < 64 || charCode > 90) &&
				(charCode < 97 || charCode > 122) &&
				(charCode < 48 || charCode > 57) &&
				(allowedCode.indexOf(charCode) === -1)) {
				e.preventDefault();
    }
}

