import {sendBadRequest, sendMethodNotAllowed} from "@/js/utils/apiMethods";

const SYSTEM_PROMPTS = {
	SIMPLE_ASSISTANT: {
		MESSAGE: {
			'role': 'system',
			'content': 'You are a simple assistant. You respond with simple sentences.',
		},
		TEMPERATURE: 1,
		MAX_TOKENS: 50,
		TYPE: 'simple_assistant',
	},
	MICHAEL_SCOTT: {
		MESSAGE: {
			'role': 'system',
			'content': 'You are pretending to be Michael Scott from The Office. You try to be funny',
		},
		TEMPERATURE: 1,
		MAX_TOKENS: 100,
		TYPE: 'michael_scott',
	},
};

const chatCompletion = async (messagesArray, max_tokens, temperature) => {
	const rawResponse = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: messagesArray,
		max_tokens: max_tokens,
		temperature: temperature,
	});

	return rawResponse?.data?.choices[0];
}

const converse = (res, messages, type) => {
	switch (type) {
		case SYSTEM_PROMPTS.SIMPLE_ASSISTANT.TYPE:
			return;
		case SYSTEM_PROMPTS.MICHAEL_SCOTT.TYPE:
			return;
		default:
			return sendBadRequest(res, 'wrong_conversation_type');
	}
}

export default async function handler(req, res) {
	const isAllowedMethod = req.method === 'POST';

	const {
		messages,
		type
	} = req.body;

	console.log('Incoming request: ', req.method, req.body);

	if (!isAllowedMethod) {
		return sendMethodNotAllowed()
	}
	else if (!messages) {
		return sendBadRequest(res, 'Missing input');
	}
	else if(!type) {
		return sendBadRequest(res, 'wrong_conversation_type');
	}

	try{
		return converse(res, messages, type);
	}
	catch(error) {
		console.error(error);
	}
}