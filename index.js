const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    // This should be a token with access to your repository scoped in as a secret.
    // The YML workflow will need to set myToken with the GitHub Secret Token
    // myToken: ${{ secrets.GITHUB_TOKEN }}
    // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret


    // You can also pass in additional options as a second parameter to getOctokit
    // const octokit = github.getOctokit(myToken, {userAgent: "MyActionVersion1"});
    const ghToken = core.getInput('token');
    const octokit = github.getOctokit(ghToken);
    const pilot = core.getInput('name');
    const template_owner = "armory-pilots";
    const template_repo = "armory-spinnaker-kustomize";

    const { data: newRepo } = await octokit.repos.createUsingTemplate({
        template_owner,
        template_repo,
        pilot
    });

    console.log(newRepo);
}

run();


// try {
//     // `who-to-greet` input defined in action metadata file
//     const nameToGreet = core.getInput('name');
//     console.log(`Hello ${nameToGreet}!`);
//     // Get the JSON webhook payload for the event that triggered the workflow
//     // const payload = JSON.stringify(github.context.payload, undefined, 2)
//     // console.log(`The event payload: ${payload}`);
//     run('armory-pilots', 'armory-spinnaker-kustomize', nameToGreet)
// } catch (error) {
//     core.setFailed(error.message);
// }