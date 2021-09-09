# GitHub Action for AWS EC2 Start and Stop
Start and Stop AWS EC2 Instances with the AWS CLI.

This action executes the following commands to change an EC2 instance and outputs returned states:

**Start:**
```
aws ec2 start-instances --instance-ids <instance-id>
```
**Wait:**
```
aws ec2 wait instance-running --instance-ids <instance-id>
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

# Credentials

The AWS credentials and region environment variables must have been set before running this action. The environment variables can be configured with the [Configure AWS Credentials Action for GitHub Actions](https://github.com/marketplace/actions/configure-aws-credentials-action-for-github-actions).

# License
This code is made available under the MIT license.