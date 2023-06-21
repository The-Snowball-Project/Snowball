import logger from "../util/logger";
import Authenticator from "../util/authenticator";

/**
 * tests the Authenticator class
 * 
 * @returns true if the test passed
 */
export default function test():boolean {

    logger.info('Starting Authenticator test...');

    let passed = true;

    const auth = new Authenticator();

    let token = auth.createToken("testID",false);
    let result = auth.verify(token);
    if (!result.valid || result.isAdmin) {
        logger.error(`Test 1 failed, test: admin=false, returned: ${JSON.stringify(result)}, token: '${token}'`);
        passed = false;
    } else logger.verbose('Test 1 passed!');
    
    token = auth.createToken("testID",true);
    result = auth.verify(token);
    if (!result.valid || !result.isAdmin) {
        logger.error(`Test 2 failed, test: admin=true, returned: ${JSON.stringify(result)}, token: '${token}'`);
        passed = false;
    } else logger.verbose('Test 2 passed!');

    token = auth.createToken("testID",false);
    token = token.substring(0,5)+'a'+token.substring(6);
    result = auth.verify(token);
    if (result.valid) {
        logger.error(`Test 3 failed, test: token mutability, returned: ${JSON.stringify(result)}, token: '${token}'`);
        passed = false;
    } else logger.verbose('Test 3 passed!');

    token = auth.createToken("testID",true);
    if (!auth.invalidate(token)) {
        logger.error(`invalidate() failed to verify token: '${token}`);
        passed = false;
    }
    result = auth.verify(token);
    if (result.valid) {
        logger.error(`Test 4 failed, test: invalidated token, returned: ${JSON.stringify(result)}, token: '${token}'`);
        passed = false;
    } else logger.verbose('Test 4 passed');
    
    logger.info('Authenticator test '+(passed?'passed!':'failed!'));

    return passed;
}