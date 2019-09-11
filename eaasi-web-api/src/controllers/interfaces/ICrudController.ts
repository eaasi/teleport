export default interface ICrudController {
	getAll(req: Express.Request, res: Express.Response): Express.Response;
	get(req: Express.Request, res: Express.Response): Express.Response;
	create(req: Express.Request, res: Express.Response): Express.Response;
	update(req: Express.Request, res: Express.Response): Express.Response;
	delete(req: Express.Request, res: Express.Response): Express.Response;
};