import {Express} from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

export const setupSwagger = (app: Express) => {
    const swaggerPath = path.join(__dirname, 'openapi.yaml');
    const swaggerDocument = YAML.load(swaggerPath);


    app.get('/v1/api-docs', (_req, res) => {
        res.json(swaggerDocument);
    });

    //swaggerDocument를 직접 넘기면 url 옵션이 무시되므로 null을 넘기고 swaggerOptions에 url을 명시적으로 설정
    app.use('/swagger-ui/index.html', swaggerUi.serve, swaggerUi.setup(null, {
        swaggerOptions: {
            url: '/v1/api-docs'
        }
    }));
};