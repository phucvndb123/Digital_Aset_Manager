(function () {
    var start = async function () {
        var w2xPath = "";

        if (typeof WebSquareExternal !== "undefined" && WebSquareExternal && WebSquareExternal.w2xPath) {
            w2xPath = WebSquareExternal.w2xPath;
        }

        if (!w2xPath) {
            try { w2xPath = new URLSearchParams(location.search).get("w2xPath") || ""; } catch (e) {}
        }

        await Promise.all([
            WebSquare._loadModuleDynamic("uiplugin.wframe"),
            WebSquare._loadModuleDynamic("uiplugin.tabControl"),
            WebSquare._loadModuleDynamic("uiplugin.textbox"),
            WebSquare._loadModuleDynamic("uiplugin.trigger"),
            WebSquare._loadModuleDynamic("uiplugin.group"),
            WebSquare._loadModuleDynamic("uiplugin.image"),
            WebSquare._loadModuleDynamic("uiplugin.gridView"),
            WebSquare._loadModuleDynamic("uiplugin.treeview"),
            WebSquare._loadModuleDynamic("uiplugin.input"),
            WebSquare._loadModuleDynamic("uiplugin.selectbox")
        ]);

        if (w2xPath) {
            return WebSquare.startApplication(w2xPath);
        }
        return WebSquare.startApplication();
    };

    start();
})();