import {glob} from 'glob';
import path from 'path';
import logger from '../util/logger';

/**
 * runs all tests and exits the program if any failed
 */
function run_tests() {

    logger.info('Beginning tests...')

    const tests:(()=>boolean)[] = [];

    glob.sync( __dirname+'/**/*.ts' ).forEach((file:string)=>{
        if (__filename === file) return;
        tests.push(require(path.resolve(file)).default);
    });

    let error = false;
    for (const test of tests)
        error = error || !test(); // test() returns true if it passed

    if (error) {
        // this *should* flush the buffers before exiting, but apparently it sometimes doesnt flush
        // fully when using log files
        logger.error('Tests failed!',()=>process.exit(1));
    } else {
        logger.info('All tests passed!');
    }
}

run_tests();
