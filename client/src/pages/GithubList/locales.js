/* eslint-disable */
import { formatMessage } from 'umi/locale';

/**
 * @return {string}
 */
function FormatLeakageStatus(status) {
  switch (status) {
    case 0:
      return formatMessage({ id: 'github.filter.status.unsolved' });
    case 1:
      return formatMessage({ id: 'github.filter.status.solved' });
    case 2:
      return formatMessage({ id: 'github.filter.status.whitelist' });
    default:
      return 'Translation error!';
  }
}

export { FormatLeakageStatus };
