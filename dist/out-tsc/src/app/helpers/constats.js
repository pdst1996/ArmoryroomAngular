var Constants = /** @class */ (function () {
    function Constants() {
    }
    Constants.PRODUCTION = !window.location
        .toString()
        .includes("localhost");
    Constants.application = "Armoryroom";
    Constants.applicationName = "Armory Room";
    Constants.SERVER = Constants.PRODUCTION
        ? "/" + Constants.application + "/"
        : "http://localhost:8080/" + Constants.application + "/";
    Constants.masterPageVersion = "1.2.0.1";
    Constants.logo = "assets/sanmina/armoryroom-logo.png";
    Constants.ico = "assets/sanmina/sanmina.ico";
    Constants.localStorage = Constants.application + "_dataAuth";
    Constants.plantLS = Constants.application + "_plant";
    Constants.mail = "dl-gdl3devsupport@sanmina.com";
    return Constants;
}());
export { Constants };
//# sourceMappingURL=constats.js.map