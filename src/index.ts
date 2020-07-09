import * as core from '@actions/core'
import * as github from '@actions/github'
import Util from './utils'

/**
 * This action will
 * 1. Read the PR body
 * 2. Get all the tasks
 * 3. Checks if all tasks are completed(checked)
 * 4. Return 
 *      success if
 *          there is no pr body 
 *          no tasks in pr body
 *          all tasks are completed(checked) 
 *      failure if 
 *          there are any pending tasks to be complated
 */

async function run(): Promise<void> {

    try {

        // read the pr body for tasks
        const prBody = github.context.payload.pull_request?.body;
        if (!prBody) {

            core.info("PR don't have tasks to check");
            return
        }

        // get the status of pending tasks
        core.debug('Getting a list of uncompleted tasks: ');
        let pendingTasks = Util.getPendingTasks(prBody);
        core.debug(pendingTasks);

        let isTaskListCompleted = false;
        if (!pendingTasks) {
            isTaskListCompleted = true;
        }
        core.debug(`All tasks completed: ${isTaskListCompleted}`);

        if (isTaskListCompleted) {
            core.info(`SUCCESS: All tasks completed`);
            return;
        } else {
            core.setFailed(`FAILED: Some tasks are still pending! \n${pendingTasks}\nLength: ${pendingTasks.length}`);
        }
    } catch (error) {
        core.setFailed(error.message)
    }
}

run();