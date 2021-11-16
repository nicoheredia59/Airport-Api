"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const main = async () => {
    await typeorm_1.createConnection();
};
main();
//# sourceMappingURL=index.js.map