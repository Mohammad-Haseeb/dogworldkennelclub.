"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    var _a;
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
    if (((_a = process.env.ENABLE_LOGGING) === null || _a === void 0 ? void 0 : _a.toLowerCase()) != "true") {
        console.log = function () { };
    }
}
bootstrap();
//# sourceMappingURL=main.js.map