import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import BaseService from '../base/BaseService';

const MAILER_PORT: number = Number(process.env.MAILER_PORT) || 587;
const MAILER_SENDER = process.env.MAILER_SENDER;
const MAILER_HOST = process.env.MAILER_HOST;
const MAILER_USER = process.env.MAILER_USER;
const MAILER_PASSWORD = process.env.MAILER_PASSWORD;

export enum MailerAction {
	NewAccountRegister,
	PasswordReset
}

export interface IMailPayload {
	receiver: string;
	password: string;
}

interface ITransportOptions {
	host: string;
	port: number;
	secure: boolean;
	auth?: ITransportAuthOptions;
}

interface ITransportAuthOptions {
	user: string;
	pass: string;
}

/**
 * Handles business logic related to working with User and Role data
 */
export default class MailerService extends BaseService {

	readonly transporter: Mail;

	constructor() {
		super();
		this.transporter = nodemailer.createTransport(this.transportOptions());
	}

	async sendMail(action: MailerAction, payload: IMailPayload) {
		if (action === MailerAction.NewAccountRegister) {
			return await this.sendNewAccountPassword(payload);
		} else if (action === MailerAction.PasswordReset) {
			return await this.sendResetPassword(payload);
		}
	}

	private async sendNewAccountPassword(payload: IMailPayload) {
		const welcomeText = `
		Your new EaaSi account has been created.
		Your email: ${payload.receiver}
		Your password: ${payload.password}`;
		const emailTemplate = this.emailTemplate(payload.receiver, 'Welcome to EaaSi.', welcomeText);
		return await this.transporter.sendMail(emailTemplate);
	}
	
	private async sendResetPassword(payload: IMailPayload) {
		const passwordResetText = `
		Your password for EaaSi account has been reset.
		Your new password is ${payload.password}
		`;
		const emailTemplate = this.emailTemplate(payload.receiver, 'Password reset for your EaaSi account.', passwordResetText);
		return await this.transporter.sendMail(emailTemplate);
	}

	private emailTemplate(to, subject, text) {
		return {
			from: `EaaSi <${MAILER_SENDER}>`,
			to,
			subject,
			text
		}
	}

	private transportOptions(): ITransportOptions {
		let options: ITransportOptions = {
			host: MAILER_HOST,
			port: MAILER_PORT,
			secure: MAILER_PORT == 465,
		};
		if (MAILER_USER && MAILER_PASSWORD) {
			options.auth = {
				user: MAILER_USER,
				pass: MAILER_PASSWORD
			};
		}
		return options;
	}
	
}
