import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import Route from './interfaces/route.interfact';

class App {
	public app: express.Application;
	public port: string | number;

	constructor(routes: Route[]) {
		this.app = express();
		this.port = process.env.PORT || 3000;

		this.initializeMiddlewares();
		this.initializeRoutes(routes);
		this.initializeErrorHandling();
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log(`Server running on ${this.port}`);
		});
	}

	private initializeRoutes(routes: Route[]) {
		routes.forEach((route) => this.app.use(`/api${route.path}`, route.router));
	}

	private initializeMiddlewares() {
		this.app.use(express.json());
		this.app.use(
			express.urlencoded({
				extended: true,
			}),
		);
		this.app.use(cors({ origin: true, credentials: true }));
	}

	private initializeErrorHandling() {
		this.app.use(
			(error: any, _req: Request, res: Response, _next: NextFunction) => {
				const status: number = error.status || 500;
				const message: string = error.message || 'Internal server error';
				res.status(status).json({ message });
			},
		);
	}
}

export default App;
