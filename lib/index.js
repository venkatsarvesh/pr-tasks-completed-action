"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const github = require("@actions/github");
const utils_1 = require("./utils");
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
function run() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // read the pr body for tasks
            const prBody = (_a = github.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.body;
            if (!prBody) {
                core.info("PR don't have tasks to check");
                return;
            }
            // get the status of pending tasks
            core.debug('Getting a list of uncompleted tasks: ');
            let pendingTasks = utils_1.default.getPendingTasks(prBody);
            core.debug(pendingTasks);
            let isTaskListCompleted = false;
            if (!pendingTasks) {
                isTaskListCompleted = true;
            }
            core.debug(`All tasks completed: ${isTaskListCompleted}`);
            if (isTaskListCompleted) {
                core.info(`SUCCESS: All tasks completed`);
                return;
            }
            else {
                core.setFailed(`FAILED: Some tasks are still pending! \n${pendingTasks}\nLength: ${pendingTasks.length}`);
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
