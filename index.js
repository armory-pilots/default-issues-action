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

async function cloneIssues(octokit, pilot) {
    const { data: issues } = await octokit.issues.listForRepo({
        owner: "armory-pilots",
        repo: pilot
    });

    for (const issue of issues) {
        await octokit.issues.create({
            owner: "armory-pilots",
            repo: pilot,
            title: issue.title,
            body: issue.body
        })
    }
}

try {
    const ghToken = core.getInput('pat');
    const octokit = github.getOctokit(ghToken);
    const pilot = core.getInput('name');

    createRepo(octokit, pilot);
    cloneIssues(octokit, pilot);

} catch (error) {
    core.setFailed(error.message);
}