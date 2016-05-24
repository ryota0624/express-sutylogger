import logger from './logger';
import { clusterLogger } from './cluster/common';
module.exports = {
  logger,
  cluster: clusterLogger
}