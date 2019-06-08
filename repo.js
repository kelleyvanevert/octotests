const octokit = require("./octokit");

(async () => {
  console.log((await octokit.repos.list()).data.map(r => r.name));

  console.log(
    (await octokit.repos.get({
      owner: "kelleyvanevert",
      repo: "octotests"
    })).data
  );

  console.log(
    (await octokit.git.getRef({
      owner: "kelleyvanevert",
      repo: "octotests",
      ref: "heads/master"
    })).data
  );
})();
