import logger from './logger';
import parent from './cluster/parent';
import child from './cluster/child';
module.exports = {
  logger,
  cluster: {
    parent,
    child
  }
}