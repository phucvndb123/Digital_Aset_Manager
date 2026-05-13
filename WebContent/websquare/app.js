(function() {
	var promiseObj = null;
	var w2xPath = "";

	if (typeof WebSquareExternal !== "undefined" && WebSquareExternal && WebSquareExternal.w2xPath) {
		w2xPath = WebSquareExternal.w2xPath;
	}

	if ((typeof movePage === "undefined") || (movePage === "")) {
		promiseObj = w2xPath ? WebSquare.startApplication(w2xPath) : WebSquare.startApplication();
	} else {
		promiseObj = WebSquare.startApplication(w2xPath || movePage);
	}

	promiseObj.then(function() {
		if (typeof com !== "undefined" && com && com.win && typeof $p !== "undefined") {
			com.win.setLangCode($p, com.win.getLanguage($p));
		}
	});
})();