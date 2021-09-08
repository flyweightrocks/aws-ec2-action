const core = require('@actions/core');
const github = require('@actions/github');
const child_process = require('child_process');

try {
  // `instance-id` input defined in action metadata file
  const instanceId = core.getInput('instance-id');
	console.log(`Start EC2 instance ${instanceId}!`);

	const startInstance = child_process.spawnSync('aws ec2 start-instances', ['--instance-ids', instanceId]);
	console.log('status: ' + startInstance.status);
	// console.log('stdout: ' + startInstance.stdout.toString('utf8'));
	// console.log('stderr: ' + startInstance.stderr.toString('utf8'));
	
	const out = JSON.stringify(startInstance, undefined, 2);
	console.log('output', out);

	const output = JSON.parse(startInstance.stdout.toString('utf8'));
	const error = JSON.parse(startInstance.stderr.toString('utf8'));

	for (let state of output.StartingInstances) {
		const previous = state.PreviousState.Name;
		const current = state.CurrentState.Name;

		console.log(`Previous state ${previous}!`);
		core.setOutput("previous-state", previous);

		console.log(`Current state ${current}!`);
		core.setOutput("current-state", current);
	}

	const json = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}