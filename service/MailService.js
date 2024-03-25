import nodemailer from 'nodemailer'

import dotenv from 'dotenv'

dotenv.config()

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'Yandex',
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: 'true',
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		})
	}

	async sendActivationMail(to, link) {
		const mailOptions = {
			from: process.env.SMTP_USER,
			to,
			subject: 'Активация аккаунта на ' + process.env.API_URL,
			text: '',
			html: `
				<div>
					<h1>Кликните по ссылке ниже для активации вашего аккаунта</h1>
					<a href="${link}">${link}</a>
				</div>
			`,
		}
		await this.transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return console.log(error)
			}
		})
	}
}

export default new MailService()
