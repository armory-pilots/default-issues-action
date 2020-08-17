const core = require('@actions/core');
const github = require('@actions/github');

async function createRepo(octokit, pilot) {
    const templateOwner = "armory-pilots";
    const templateRepo = "armory-spinnaker-kustomize";

    const { data: newRepo } = await octokit.repos.createUsingTemplate({
        template_owner: templateOwner,
        template_repo: templateRepo,
        owner: templateOwner,
        name: pilot,
        private: true
    });

    console.log(newRepo);
}

try {
    const ghToken = core.getInput('pat');
    const octokit = github.getOctokit(ghToken);
    const pilot = core.getInput('name');

    createRepo(octokit, pilot);
} catch (error) {
    core.setFailed(error.message);
}