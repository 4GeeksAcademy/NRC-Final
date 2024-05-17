const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			messages: [],
			users: [],
			token: JSON.parse(localStorage.getItem("token")) || [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			loadMessagesContactForm: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/contact_form`);
					const data = await response.json();
					setStore({ messages: data });
				} catch (error) {
					console.error(error);
				}
			},

			logout: () => {
				const endSession = [];
				localStorage.removeItem("token")
				setStore({ endSession });
			},

			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			loadUserData: () => {
				fetch(process.env.BACKEND_URL + "userProfile")
				.then(response => response.json())
				.then(response => setStore({users: response}))
				
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
