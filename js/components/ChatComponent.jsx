import React, {useState} from 'react';
import MessageBox from "@/js/components/MessageBox";

function ChatComponent(props) {
	const [chatMessages, setChatMessages] = useState([]);

	return (
		<div className={"w-full max-w-[1500px] mx-auto my-10"}>
			<div className={"border border-b-0 rounded-lg border-gray-300'"}>
				<div className={'border-b text-center px-[20px] py-[10px]'}>
					<span className={'text-md font-bold text-gray-900'}>
						This a chat component that looks like Yahoo!
					</span>
				</div>
				<MessageBox chatMessages={chatMessages}/>
			</div>
		</div>
	);
}

export default ChatComponent;