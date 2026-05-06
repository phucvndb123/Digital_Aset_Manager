(function () {
    var start = async function () {
        var w2xPath = "";

        if (typeof WebSquareExternal !== "undefined" && WebSquareExternal && WebSquareExternal.w2xPath) {
            w2xPath = WebSquareExternal.w2xPath;
        }

        if (!w2xPath && WebSquare && WebSquare.net && typeof WebSquare.net.getParameter === "function") {
            w2xPath = WebSquare.net.getParameter("w2xPath") || "";
        }

        if (!w2xPath) {
            try {
                w2xPath = new URLSearchParams(location.search).get("w2xPath") || "";
            } catch (err) {}
        }

        if (w2xPath) {
            return WebSquare.startApplication(w2xPath);
        }
        return WebSquare.startApplication();
    };

    start();
})();
