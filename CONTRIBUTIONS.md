Contributions can be made by members of this repository.

## Step 1. Check if you are assigned to a feature branch

If you are not assigned to a feature head over to the trello board

## Step 2. Working on a feature branch

Start by cloning the repository. 

```
git clone https://github.com/Group-01-Match-Making-System-COSC2408/Group-01-Match-Making-System-COSC2408-
```

Head over to the kanban board on [Trello](https://trello.com/b/9R92ISw1/group-01-match-making-system-cosc2408) and locate the feature you are assigned to. Ensure you not the PBI number. 

Read through the [Feature Branches](#feature-branches)

Head over to the kanban board on [Trello](https://trello.com/b/9R92ISw1/group-01-match-making-system-cosc2408) and locate the feature you are assigned to. 

Once done create a pull request to either another feature or the delvelopment branch.

## Branches Guide

### Master Branch
The master branch stores the official release.

*This branch should only receive pull requests from release and hotfix branches.*

### Hotfix Branches
Hotfix branches are used to quickly patch production releases.

*Create a git issue for the relevent hotfix (and use the hotfix label)*

```
git checkout master
git checkout -b h/<IssueID>_<Shorthand_Name>
```

### Release Branches
Release branch is used when develop branch has acquired enough features to be fork off to the develop branch.

*This branch should only receive pull requests from develop.*

### Develop Branch
Develop branch is used to integrate features.

*This branch should only receive pull requests from feature branches*

### Feature Branches
Feature branches use the develop branch as their parent branch. Every feature will reside in its own branch, which can be pushed to the develop branch.

```
git checkout develop
git checkout -b f/<PBI>_-_<Shorthand_Name>
```

### Pull Request Process
- Ensure all dependencies are removed through either [/.gitignore](/.gitignore) or deleted. 
- (Optional) Increase the version numbers in package.json.
- Ensure the target branch is either the correct branch.


### References
- Git Workflow Diagram <https://docs.google.com/drawings/d/1Q8Il1f6kFPxv9Fy6Z7op8zpy0BJMV41yv-2vh7SOF1E>