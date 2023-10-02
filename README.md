## Install

Clone the repo and install dependencies:

```bash
git clone --depth 1 --branch main https://github.com/ElikaFilin/electron-chat your-project-name
cd your-project-name
npm install
```

## Starting Development

Start the app in the `dev` environment:

```bash
npm start
```

## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```

## Technologies

I've used the **Electron Storage** for persisting the global state because I know that it is used on the project and I
wanted to try. After completing the project I can say that Electron storage suits for storage simple types of the data.
If I would like to store array of objects I should use another tool: React Context or Redux, for example.

I've chosen **React Query** for interacting with the server because I know that it is used on the project and I
wanted to try. Moreover, it is powerful tool for caching, updating "out of date" data in the background, performance
optimizations like pagination and lazy loading data and managing memory and garbage collection of the data.
