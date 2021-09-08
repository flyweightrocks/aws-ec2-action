# aws-ec2-action
Start and Stop AWS EC2 Instances via AWS CLI commands.

This action executes the following commands to start and stop an EC2 instance and outputs returned states:

**Start:**
```
aws ec2 start-instances --instance-ids <instance-id>
```

**Stop:**
```
aws ec2 stop-instances --instance-ids <instance-id>
```

# Usage
```yaml
uses: flyweightrocks/aws-ec2-action@v1
with:
  instance-id: 'Your Instance ID'
  wait-instance-running: true  
	stop-instance: true
```	

## Inputs

`instance-id`
The instance ID of the EC2 container.

**Required: true**  

`wait-instance-running`
Wait until the instance is running.

**Default: true**  

`stop-instance`
Stop the instance during post job cleanup.

**Default: true**  

## Outputs

`current-state`
The current state of the instance.

`previous-state`
The previous state of the instance.