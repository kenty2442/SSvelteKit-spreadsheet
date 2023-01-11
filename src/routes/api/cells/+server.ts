import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import fs from 'fs';

const PAHT = 'db.json';

const storage = { cells: undefined };

export const GET: RequestHandler = async () => {
	if (fs.existsSync(PAHT)) {
		const content = fs.readFileSync(PAHT, 'utf-8');
		const data = JSON.parse(content);
		return json(data);
	}
	return json({});
};

export const POST: RequestHandler = async ({ request }) => {
	const { cells } = await request.json();
	const data = JSON.stringify({ cells });
	fs.writeFileSync(PAHT, data, 'utf-8');
	return json({});
};
