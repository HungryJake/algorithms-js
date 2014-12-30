
var temp;
function outter () {
	var a = 10;
	function inner() {
		var b = 20;
		console.log(a);
	}
	temp = inner;
}

outter();
temp();

var i;
function output (num) {
	console.log(num, i);
}
for (i=0; i<20; i++) {
	// change this to inline function instead of external function and see.
	window.setTimeout(output.call(null, i), 1);
}