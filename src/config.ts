export const spikeRequired = process.env.DEL_SPIKE_REQUIRED || 'false';

const phoneBookURL = process.env.PHONE_BOOK_URL || 'http://localhost';
const phoneBookPort = process.env.PHONE_BOOK_PORT || '80';
export const userServiceUrl = `${phoneBookURL}:${phoneBookPort}`;

export const host = process.env.DEL_HOST || '0.0.0.0';
export const port = process.env.DEL_PROT || '8080';

const healthCheckIntervalStr = process.env.DEL_HEALTH_CHECK_INTERVAL || '5000';
const healthCheckIntervalInt: number = parseInt(healthCheckIntervalStr, 10);
export const healthCheckInterval: number = healthCheckIntervalInt ? healthCheckIntervalInt : 5000;
