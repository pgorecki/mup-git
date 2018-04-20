import joi from 'joi';

const schema = joi.object().keys({
  servers: joi.object().required(),
});

export default function validate(config, utils) {
  let details = [];

  details = utils.combineErrorDetails(
    details,
    joi.validate(config.wekan, schema, utils.VALIDATE_OPTIONS),
  );

  details = utils.combineErrorDetails(
    details,
    utils.serversExist(config.servers, config.app.servers),
  );

  if (!config.mongo) {
    details.push({
      message: 'Wekan requires the built-in mongodb to be enabled',
      path: '',
    });
  }

  return utils.addLocation(details, 'wekan');
}
