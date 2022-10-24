"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
// start express server
var PORT = 4040;
app_1.app.listen(PORT, function () {
    console.log("Server i starting at port :".concat(PORT));
});
