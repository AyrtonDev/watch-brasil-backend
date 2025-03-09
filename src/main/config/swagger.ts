import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";

export default (app: Express): void => {
  const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Desafio FullStack Watch Brasil",
            version: "1.0.0",
            description: "Documentação da API usando Swagger",
        },
        basePath: '/',
        servers: [
            {
                url: "http://localhost:5050",
                description: "Caso queira roda localmente"
            },
        ],
    },
    apis: ["./src/main/routes/**/*.ts"],
  };

  const swaggerSpec = swaggerJsdoc(options)

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}