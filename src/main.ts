import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  if (process.env.ENABLE_LOGGING?.toLowerCase() != "true") {
    console.log = function () {};
  }
}
bootstrap();
