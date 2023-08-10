const github = require('@actions/github');
const core = require('@actions/core');
const fs = require('fs');
const getTags = require('./utils/get-tags.js');
const Artifacts = require('./utils/artifacts.js');

async function run() {
    // Inputs
    const myToken = core.getInput('token');
    const actions = core.getInput('actions') == '' ? 'list' : core.getInput('actions');
    const repoFull = core.getInput('repo').split('/');

    // get repo and owner name
    let owner = repoFull[0];
    let repo = repoFull[1]
    
    const artifacts = new Artifacts(myToken);
    let artifactsList = await artifacts.getArtifacts(owner, repo);   
    console.log(artifactsList);
    console.log("artifacts=" + JSON.stringify(artifactsList)); 
    

    fs.appendFileSync(process.env.GITHUB_OUTPUT, "artifacts=" + JSON.stringify(artifactsList) + "\n");
    const octokit = github.getOctokit(myToken);
}

run();