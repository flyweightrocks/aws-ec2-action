const core = require('@actions/core');
const github = require('@actions/github');
const child_process = require('child_process');

try {
	const instanceId = core.getInput('instance-id');
	const stopInstance = core.getBooleanInput('stop-instance');

	if(stopInstance) {
		console.log(`Stop EC2 instance ${instanceId}`);

		const output = JSON.parse(child_process
			.execSync(`aws ec2 stop-instances --instance-ids ${instanceId}`)
			.toString());

		for (let state of output.StoppingInstances) {
			const previous = state.PreviousState.Name;
			const current = state.CurrentState.Name;

			console.log(`Previous state: ${previous}`);
			console.log(`Current state: ${current}`);

			core.setOutput("previous-state", previous);
			core.setOutput("current-state", current);
		}
	}

} catch (error) {
  core.setFailed(error.message);
}