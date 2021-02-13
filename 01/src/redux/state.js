const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

let store = {
	_state: {
		profilePage: {
			posts: [
				{ id: 1, message: 'Hi, how are you?', likesCount: 12 },
				{ id: 2, message: 'It\'s my first post', likesCount: 25 },
				{ id: 3, message: 'It\'s my first post', likesCount: 25 },
			],
			newPostText: 'it-kamasutra.com',
		},
		dialogsPage: {
			dialogs: [
				{ id: 1, name: 'Dimych' },
				{ id: 2, name: 'Andrei' },
				{ id: 3, name: 'Sveta' },
				{ id: 4, name: 'Sasha' },
				{ id: 5, name: 'Viktor' },
				{ id: 6, name: 'Valera' },
			],
			messages: [
				{ id: 1, message: 'Hi' },
				{ id: 2, message: 'You' },
				{ id: 3, message: 'Yo' },
				{ id: 4, message: 'Privet' },
				{ id: 5, message: 'Message' },
			],
			newMessageBody: '',
		},
		sideBar: {
		},
	},
	_callSubscriber() {
		console.log('State changed');
	},
	_addPost() {
		let newPost = {
			id: 5,
			message: this._state.profilePage.newPostText,
			likesCount: 0,
		};

		this._state.profilePage.posts.push(newPost);
		this._state.profilePage.newPostText = '';
		this._callSubscriber(this._state);
	},
	_updateNewPostText(newText) {
		this._state.profilePage.newPostText = newText;
		this._callSubscriber(this._state);
	},
	getState() {
		return this._state;
	},
	subscribe(observer) {
		this._callSubscriber = observer;
	},
	dispatch(action) { // { type: 'ADD-POST'} action is object
		if (action.type === ADD_POST) {
			this._addPost();

		} else if (action.type === UPDATE_NEW_POST_TEXT) {
			this._updateNewPostText(action.newText);

		} else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
			this._state.dialogsPage.newMessageBody = action.body;
			this._callSubscriber(this._state);

		} else if (action.type === SEND_MESSAGE) {
			let body = this._state.dialogsPage.newMessageBody;
			this._state.dialogsPage.newMessageBody = '';
			this._state.dialogsPage.messages.push({ id: 6, message: body });
			this._callSubscriber(this._state);
		}
	}
}

export const addPostActionCreator = () => {
	return {
		type: ADD_POST,
	}
}

export const updateNewPostTextActionCreator = (text) => {
	return {
		type: UPDATE_NEW_POST_TEXT,
		newText: text,
	}
}

export const sendMessageCreator = () => {
	return {
		type: SEND_MESSAGE,
	}
}

export const updateNewMessageBodyCreator = (body) => {
	return {
		type: UPDATE_NEW_MESSAGE_BODY,
		body: body,
	}
}

export default store;
