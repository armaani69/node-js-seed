import { Router } from 'express';
import Route from 'src/interfaces/route.interfact';
import IndexController from 'src/controllers/index.controller';

class IndexRoute implements Route {
	public path = '/abc';
	public router = Router();
	public indexController = new IndexController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get('/', this.indexController.getMethod);

		this.router.post('/', this.indexController.postMethod);
	}
}

export default IndexRoute;
