const core = require('@actions/core');
const github = require('@actions/github');

async function createRepo(octokit, pilot) {
    const template_owner = "armory-pilots";
    const template_repo = "armory-spinnaker-kustomize";

    const { data: newRepo } = await octokit.repos.createUsingTemplate({
        template_owner,
        template_repo,
        pilot
    });

    console.log(newRepo);
}

try {
    const ghToken = core.getInput('token');
    const octokit = github.getOctokit(ghToken);
    const pilot = core.getInput('name');
    createRepo(octokit, pilot);
} catch (error) {
    core.setFailed(error.message);
}