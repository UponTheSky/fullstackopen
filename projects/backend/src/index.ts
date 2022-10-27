import { app } from './app';
import * as config from './utils/config';
import * as logger from './utils/logger';

// run the app
app.listen(config.PORT, () => {
  logger.info(`The server running on port ${config.PORT}`);  
});
