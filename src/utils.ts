export default class Util {

    /**
     * This method will read the input string and match it with uncheck mark([ ]).
     * Gets the pending tasks
     * 
     * @param body PR body that has tasks
     * 
     * Returns 
     *  empty string if there are no pending tasks
     *  pending tasks string
     */
    static getPendingTasks(body: string): string {

        let responseString = "";
        try {

            const uncompletedTasks = body.match(/(- \[[ ]\].+)/g);
            if (undefined != uncompletedTasks) {

                responseString += 'Uncompleted Tasks\n';
                uncompletedTasks.forEach(u => {
                    responseString += `${u}\n`;
                });
            }
        } catch (e) {
            responseString = "";
        }

        return responseString;
    }
}