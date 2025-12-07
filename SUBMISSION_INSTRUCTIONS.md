# Submission Instructions

Follow these steps to prepare and submit your assignment as required.

1. GitHub
   - Create a new private repository on GitHub and push the project files.
   - Include a build file if required (for Expo apps, this can be the project itself). Commit all source files.

2. Zip file
   - Create a zip of the project folder (exclude node_modules if you want a smaller archive).
   - In PowerShell (from the project folder):

```powershell
Compress-Archive -Path * -DestinationPath ../fitness-app-submission.zip -Force
```

3. Google Classroom
   - Upload the zip file to Google Classroom as your assignment submission.
   - Add the GitHub repository link as a private message in Google Classroom (per instructor instructions).

Notes
   - Do not submit late; late submissions are not accepted.
   - Keep plagiarism under 15%.

Running the app locally

1. Ensure you have `node`, `npm` and `expo-cli` installed.
2. From the project folder run:

```powershell
npm install
expo start
```

If your project expects `App.js` as the entry point but you used `index.js`, rename `index.js` to `App.js`.
