import { app } from './app';

import * as logger from './utils/logger';
import * as config from './utils/config';

app.listen(config.PORT, async () => {
  logger.info(`Server running on port ${config.PORT}`);
});
