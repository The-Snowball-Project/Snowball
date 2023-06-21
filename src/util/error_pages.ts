import logger from './logger';

/**
 * gets an error page based off of the status code provided
 * 
 * @param status the error status code
 * @returns the content to serve to the user
 */
export default function getErrorPage(status:number) {
    switch (status) {
        case 401: return '401 authentication required';
        case 403: return '403 unauthorized';
        case 404: return '404 page not found';
        default:
            logger.warn(`Unknown error status code: ${status}`);
            return status+' error';
    }
}


