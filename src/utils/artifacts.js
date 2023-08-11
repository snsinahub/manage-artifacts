'use strict';


const _ = require('lodash');
const { Octokit } = require("@octokit/rest");
import fetch from "node-fetch";



module.exports = class Artifacts {

    constructor(token) {
        this.token = token;
        this.ops = {
            auth: this.token,
            request: {
                fetch: fetch,
            }
        }
        this.octokit = new Octokit(this.ops);
    }
 
    async getArtifacts(owner, repo) {
        await this.octokit.request('GET /repos/{owner}/{repo}/actions/artifacts', {
            owner: 'OWNER',
            repo: 'REPO',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
    }
    
}