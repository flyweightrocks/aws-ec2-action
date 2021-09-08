const core = require('@actions/core');
const github = require('@actions/github');
const child_process = require('child_process');

try {
  // `instance-id` input defined in action metadata file
	const instanceId = core.getInput('instance-id');
	const waitInstanceRunning = core.getInput('wait-instance-running');

	console.log(`Start instance ${instanceId}`);

	const output = JSON.parse(child_process
		.execSync(`aws ec2 start-instances --instance-ids ${instanceId}`)
		.toString());

	for (let state of output.StartingInstances) {
		const previous = state.PreviousState.Name;
		const current = state.CurrentState.Name;

		console.log(`Previous state: ${previous}`);
		console.log(`Current state: ${current}`);

		core.setOutput("previous-state", previous);
		core.setOutput("current-state", current);
	}

	if (waitInstanceRunning) {
		console.log(`Wait until the instance is running`);

		child_process.execSync(`aws ec2 wait instance-running --instance-ids ${instanceId}`)
	}

} catch (error) {
  core.setFailed(error.message);
}