# Project Set Up 🏗️

Use the steps below to clone the repository and get the project running on your local machine.

1. Navigate to the develop branch of the repository and click the green "Code" button. Then copy the repository URL with the method of your choosing. We suggest SSH which can be setup by following [these docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).

2. Go to your terminal program of choice and navigate the the folder you want the project to live in. Then run the command below to clone the repository:

```s
git clone <repository_url>
```

![image](https://user-images.githubusercontent.com/41388783/199371149-b3154e01-59e6-45e7-8a96-319ef9f7552a.png)

4. Now that the repository is cloned you can navigate into it with the command `cd <project_name>`.

5. Once you are in the project you will need to install the node modules with the command:
```s
npm install
```
6. Finally, you need to run the set up command:
```s
npm run setup
```
This should be everything you need to move on to the usage instructions!

---

# Usage 🧑‍💻

## App

To run the development server, use the command:
```s
npm run dev
```
This will build and run the application in watch mode automatically. This means as you work on the application, your browser will automatically update when you save the code.

If you would like to see a deployed version of your work, push your branch to remote. Vercel will automatically deploy that branch in a test site. 

## Storybook

To run the storybook application, use the command:
```s
npm run storybook
```
The storybook application should automatically open in your web browser. This will also automatically update when you save the code.

See more in the [Storybook docs](https://github.com/Thenlie/Streamability/blob/main/docs/storybook.md).

---

# Troubleshooting 🛠️

If you run into issues with an npm install, use the command:
```s
npm run clean
```
This will delete and reinstall all `node_modules`. If this does not work, you may also need to reset your npm cache using the command:
```s
npm cache clean --force
```