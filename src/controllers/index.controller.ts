import { Request, Response, NextFunction } from 'express';
import IndexService from 'src/services/index.service';

class IndexController {
	public indexService = new IndexService();

	public getMethod = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		res.send('Hello');
	};

	public postMethod = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const name = req.body.name as string;

		try {
			const result = this.indexService.checkArman(name);
			res.send(result);
		} catch (error) {
			next(error);
		}
	};
}

export default IndexController;
