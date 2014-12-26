// load script
// poorman's requirejs
var loadJS = function (path, callback) {
	if (!path) return; // required
	var script = document.getElementsByTagName('script')[0],
		done = false;
	var newScript = document.createElement('script');
		newScript.setAttribute('type', 'text/javascript');
		newScript.setAttribute('src', path + '.js');
		newScript.onload = function () {
			//console.log('the ready state: ', this.readyState);
			if (!done && (!this.readyState || this.readyState === 'complete') && callback) {
				done = true; // making sure it only called once.
				callback();
			}
		}
	script.parentNode.insertBefore(newScript, script);
};