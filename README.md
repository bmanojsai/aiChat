# aiChat

**aiChat** is a basic AI Chat bot based out of open ai api and is written in Next js 13. 

To run this project in your local system, clone the repo to any folder

enter  “**pnpm install**” to install all the dependencies listed in package.json

enter “**pnpm run dev**” to run the project in local system at 3000 port.

After running the above command, you can see the website running at **[http://localhost:3000/](http://localhost:3000/)**

## Code Details

### Pages

/ ⇒ Home page (**Server Component**) ⇒ no need of client interaction.

→ contains login option, button to chat page. a short intro of website

/chat ⇒ Chat page (**Client Component**) ⇒ requires usage of state variables.

→ contains a ai powered chat box to chat.

### Modal

→ a modal for taking api key and storing it in local storage

### Components

- Navbar (**Client Component**) ⇒ needs to work with session data
    - Contains Navbar, which will be shown through out the app. so given in layout.tsx
    - Conditional renders the sign in and sign up buttons as well as profile.
- ApiKeyModal (**Client Component**) ⇒ has an input field and needs to store key to local storage
    - a popup modal for asking API key and store it in local storage
- ProvidersWrapper (**Client Component**) ⇒ has to work with session data
    - for providing the session data from next-auth to the entire app, So that we can check user is logged in or not in various pages.

### Helpers

- apiCalls.ts ⇒ for making api calls with open ai.
- chatManage.ts ⇒ for functions related to managing chat history.
- localStorage.ts ⇒ for getting and setting api call to local storage.

### Packages used:

- "next": "13.4.1" ⇒ written in app folder
- "next-auth": "^4.22.1" ⇒ for providing OAuth login functionality
- "openai": "^3.2.1” ⇒ for api calls to open ai api
- "tailwindcss": "3.3.2” ⇒ styling framwork for the app
- "typescript": "5.0.4” ⇒ for types.

### Features Implemented:

- google login with OAuth
- Mobile first Responsive design
- Stores an entire chat discussion
- clear button to clear entire chat in one go.
- focus to latest message in chat
- favicon for the webpage

### More features that can be implemented:

**Level 1 features :**

- **Problem** : Currently API key is stored in local storage with key Name “API_KEY”. That means it is not specific to USER!!!. I forgot till now. Consider this scenario, If one user logs in and enters his api key from his lap. and then logs out. Then if another user logs in . He will not be prompted for api key since local storage already has one. instead app will use the previous owner entered api key which should not happen!.
    - **Solution:** While storing Api key in local storage. store along with logged in user email , so that we can check whether an api key is entered by logged in user or not and use it.
    - example : {email@gmail.com : “api_key”
    - example : {email : email@gmail.com, api_key : “1234565”}
- encrypt the api key before storing in local storage and decrypted it when using.
- option to add multiple api keys by user and then a dropdown to select any one.
- add OAuth login with credentials(username and password) and github

**Level 2 features :** 

- store and manage chat history from google firebase
- ability to remember chat and answer questions
- ability to work on multiple topics.
- possibility to user to change open ai model, max token, temperature and show Price based on model selected.

**Level 3 features:**

- When user clicks chat now with out signing in , it will ask the user to sign in and shows the main page only. it needs to redirect to chat page.
- When user clicks signout , user need to redirected to Home page irrespective of where he is currently.
    - we can achieve both of the above using the redirect “*import* { redirect } *from* "next/navigation";”
- we can create error page and not-found pages.